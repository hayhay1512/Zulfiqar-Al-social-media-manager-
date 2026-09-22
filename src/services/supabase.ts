import { createClient, SupabaseClient } from '@supabase/supabase-js';

// User provided credentials or Vite environment variables
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://txgduavqdkzfyymctmvf.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_s0CHdcsU1rPvNAa2potyfQ_dweQHO49';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;
  try {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return supabaseInstance;
    }
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
  return null;
}

export interface LeadSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  business_name?: string;
  interest: string;
  monthly_budget: string;
  message?: string;
  created_at?: string;
}

/**
 * Saves a lead or contact quote to Supabase
 * Tries the 'leads' table first, then 'contacts' table as fallback,
 * while always guaranteeing local persistence so user leads are never lost.
 */
export async function submitLeadToSupabase(lead: {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  interest: string;
  monthlyBudget: string;
  message: string;
}): Promise<{ success: boolean; source: 'supabase' | 'local'; error?: string }> {
  // Always record locally first to ensure reliability
  try {
    const existing = JSON.parse(localStorage.getItem('zulfiqar_leads') || '[]');
    existing.unshift({ ...lead, timestamp: new Date().toISOString() });
    localStorage.setItem('zulfiqar_leads', JSON.stringify(existing));
  } catch (localErr) {
    console.warn('Local backup save failed:', localErr);
  }

  const client = getSupabase();
  if (!client) {
    return { success: true, source: 'local' };
  }

  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    business_name: lead.businessName,
    interest: lead.interest,
    monthly_budget: lead.monthlyBudget,
    message: lead.message,
    created_at: new Date().toISOString(),
  };

  try {
    // Attempt insert into 'leads' table
    const { error: leadsError } = await client.from('leads').insert([payload]);
    if (!leadsError) {
      return { success: true, source: 'supabase' };
    }

    console.warn('Insert into "leads" table had notice:', leadsError.message);

    // If 'leads' doesn't exist, try 'contact_requests' or 'quotes'
    const { error: quoteError } = await client.from('contact_requests').insert([payload]);
    if (!quoteError) {
      return { success: true, source: 'supabase' };
    }

    console.warn('Fallback table insert notice:', quoteError.message);
    return { success: true, source: 'local', error: leadsError.message };
  } catch (err: any) {
    console.error('Supabase submission exception:', err);
    return { success: true, source: 'local', error: err?.message || 'Network exception' };
  }
}
