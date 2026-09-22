import { BrandKit, PostItem, SocialAccount } from './types';

export const DEFAULT_BRAND_KIT: BrandKit = {
  businessName: 'Apex Media & AI Ads',
  niche: 'Meta Ads & AI Video Advertising for Pakistani Business Owners',
  description: 'We run high-converting Meta Ads and AI video campaigns designed to scale e-commerce, real estate, and B2B businesses across Pakistan and GCC.',
  productsServices: 'Meta (Facebook & Instagram) Ad management, AI UGC Video Creation, Ad Creatives, Lead Gen Funnels',
  targetAudience: 'Pakistani entrepreneurs, business owners, e-commerce brand founders, agency owners',
  targetLocation: 'Pakistan, UAE, Saudi Arabia, Global Pakistani Diaspora',
  contentGoals: ['Leads', 'Authority', 'Engagement', 'Sales'],
  preferredLanguages: ['en', 'roman_ur', 'ur'],
  brandTone: 'premium',
  primaryColor: '#059669', // Emerald
  secondaryColor: '#0f172a', // Slate 900
  accentColor: '#10b981', // Bright Emerald
  fontHeading: 'Plus Jakarta Sans',
  fontBody: 'Inter',
  visualStyle: 'luxury_dark',
  modestImageryRule: true,
  contentRestrictions: 'Avoid cheap clickbait, overpromising overnight millions, or revealing proprietary client metrics without consent.',
  autoPublishApproved: false,
};

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'meta-fb-1',
    platform: 'facebook',
    accountName: 'Apex Media Pakistan (Page)',
    handle: '@apexmedia.pk',
    connected: true,
    isMock: false,
    permissions: ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts'],
    lastSync: '10 minutes ago',
    followersCount: 24800,
  },
  {
    id: 'meta-ig-1',
    platform: 'instagram',
    accountName: 'Apex Media AI (Business)',
    handle: '@apexmedia.ai',
    connected: true,
    isMock: false,
    permissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_insights'],
    lastSync: '10 minutes ago',
    followersCount: 38200,
  },
  {
    id: 'linkedin-1',
    platform: 'linkedin',
    accountName: 'Apex Media Agency',
    handle: 'company/apex-media-ai',
    connected: true,
    isMock: false,
    permissions: ['w_member_social', 'r_organization_social'],
    lastSync: '1 hour ago',
    followersCount: 14500,
  },
  {
    id: 'x-1',
    platform: 'twitter',
    accountName: 'Apex Media Global',
    handle: '@ApexMediaAI',
    connected: false,
    isMock: false,
    permissions: ['tweet.read', 'tweet.write'],
    followersCount: 8900,
  },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'post-1',
    title: '5 Meta Ads Mistakes Pakistani Businesses Make in 2026',
    platform: 'instagram',
    contentType: 'carousel',
    pillar: 'educational',
    language: 'en',
    hook: 'Stop burning your ad spend on "Boost Post" in 2026. Here is what really converts.',
    alternativeHooks: [
      'Why 80% of Pakistani e-commerce brands waste PKR 500k+ on Facebook Ads every month.',
      'The silent budget killer inside your Meta Ads Manager that no guru mentions.',
    ],
    headline: '5 Meta Ads Mistakes You Must Stop Making Right Now',
    caption: `If you are still hitting the blue "Boost Post" button and wondering why you only get likes instead of paying orders, read this carefully.

In 2026, Meta’s Advantage+ algorithms reward creative velocity and structured testing over manual interest micro-targeting.

Here are the 5 biggest leaks in Pakistani ad accounts:
1. Optimizing for Traffic instead of Purchase Conversions
2. Single generic creative instead of 5 visual hooks
3. Neglecting local payment friction on your landing page
4. Retargeting too small audiences without fresh creative
5. Zero video hook in the first 2.5 seconds

Swipe through the carousel to see the exact structure we use to generate 4.8x ROAS for local apparel & electronics brands.`,
    cta: 'Comment "AUDIT" below and my team will review your Meta Ad account for free this week.',
    hashtags: ['#MetaAds', '#PakistanBusiness', '#EcommercePakistan', '#DigitalMarketingPK', '#AIAdvertising', '#ROAS'],
    visualPrompt: 'Luxury dark emerald theme with gold accents, showing high-converting ad analytics graphs and structured carousel slide badges.',
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    demoMode: false,
    carouselSlides: [
      {
        slideNumber: 1,
        title: '5 Meta Ads Mistakes Burning Your Budget',
        body: 'Pakistani entrepreneurs spend millions on ads every week, yet only 10% get consistent ROAS. Here is why.',
      },
      {
        slideNumber: 2,
        title: 'Mistake #1: The "Boost Post" Trap',
        body: 'Boosting optimizes for comments and cheap clicks, never for completed checkout purchases or qualified WhatsApp leads.',
      },
      {
        slideNumber: 3,
        title: 'Mistake #2: Weak First 3-Second Hooks',
        body: 'If your video does not call out the target buyer pain-point immediately, 85% scroll past in under 2 seconds.',
      },
      {
        slideNumber: 4,
        title: 'Mistake #3: No Roman Urdu or Local Context',
        body: 'Pure high-brow English fails to build trust for COD buyers. Conversational Roman Urdu copy beats stiff agency jargon every time.',
      },
      {
        slideNumber: 5,
        title: 'The Fix: Creative Testing Framework',
        body: 'Test 3 visual angles, 2 caption hooks, and send traffic to a fast-loading frictionless landing page.',
      },
    ],
    performance: {
      reach: 18400,
      impressions: 24100,
      engagement: 1940,
      likes: 820,
      comments: 142,
      shares: 95,
      saves: 310,
      clicks: 580,
    },
  },
  {
    id: 'post-2',
    title: 'Roman Urdu Quote: Consistent Execution over Overthinking',
    platform: 'facebook',
    contentType: 'quote',
    pillar: 'inspirational',
    language: 'roman_ur',
    hook: 'Kamyaabi perfect waqt ka intezaar karne se nahi, rozana consistent action lene se aati hai.',
    headline: 'Business Mein Strategy Se Zyada Execution Jeetti Hai',
    caption: `Bohat se log saalon se business shuru karne ya scale karne ka soch rahe hotay hain, lekin ad launch karne se darrte hain.

Haqeeqat yeh hai:
Market feedback hamesha aapki assumptions se 10 guna behtar guide karta hai. Ek average creative jo live hai, us perfect ad se behtar hai jo sirf Canva draft mein band hai.

Apne business ko scale karein, seekhein aur aagay barhein!`,
    cta: 'Aapka agla launch kab schedule hai? Comments mein batayein.',
    hashtags: ['#PakistaniEntrepreneurs', '#BusinessMotivation', '#UrduQuotes', '#Karobar', '#SuccessMindset'],
    visualPrompt: 'Minimalist emerald typography quote card with clean dark charcoal backdrop and subtle gold badge.',
    status: 'published',
    publishedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    demoMode: false,
    performance: {
      reach: 32600,
      impressions: 41200,
      engagement: 3420,
      likes: 1890,
      comments: 312,
      shares: 440,
      saves: 520,
      clicks: 260,
    },
  },
  {
    id: 'post-3',
    title: 'AI Video Ads: How We Cut Production Costs by 70%',
    platform: 'linkedin',
    contentType: 'case_study',
    pillar: 'authority',
    language: 'en',
    hook: 'Traditional video production in Lahore costs PKR 300k+ per shoot. Here is how we produce 15 winning ad variants for a fraction of that using AI.',
    headline: 'Case Study: 3.9x ROAS with AI-Generated UGC Ad Creatives',
    caption: `The biggest bottleneck in scaling digital ad spend isn't budget—it's creative fatigue.

When we onboarded a national retail client running PKR 2M/month in ad spend:
- Their cost per purchase had jumped from PKR 1,200 to PKR 2,800
- Ad frequency was hitting 4.2x in 2 weeks
- Traditional shoots took 3 weeks from storyboard to final edit

Our Solution:
We deployed AI script generation, synthetic voiceovers with natural Pakistani-English cadences, and dynamic B-roll variations with modest, culturally aligned imagery.

The Result in 30 days:
• 18 fresh creative variations tested in week 1
• Cost per purchase reduced back to PKR 1,350
• Net ROAS increased by 42%

Scale your creative velocity before increasing your ad budget.`,
    cta: 'Connect with me or DM "SCALE" for a breakdown of our agency video workflow.',
    hashtags: ['#AIVideo', '#MetaAds', '#DigitalAgency', '#GrowthHacking', '#B2BMarketing', '#PakistanTech'],
    visualPrompt: 'Split comparison graph showing 70% cost reduction and 3.9x ROAS with dark emerald branding.',
    status: 'needs_review',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    demoMode: false,
  },
  {
    id: 'post-4',
    title: 'Quick Checklist: Landing Page Readiness for COD Buyers',
    platform: 'facebook',
    contentType: 'tips',
    pillar: 'problem_solution',
    language: 'en',
    hook: 'If your Cash on Delivery (COD) confirmation rate is under 70%, fix these 4 checkout issues immediately.',
    headline: 'The Ultimate COD Checkout Optimization Checklist',
    caption: `In Pakistan, Cash on Delivery accounts for 80%+ of e-commerce transactions. But return-to-origin (RTO) and fake orders eat your margins.

Check your store against this list:
✅ WhatsApp 1-click order confirmation trigger
✅ Address field split into (Area / Street / Landmark) to help couriers
✅ Mobile load speed under 2.2 seconds on 4G networks
✅ Clear return & exchange policy banner on the product page

A 10% increase in COD delivery rate directly doubles your net monthly profits.`,
    cta: 'Save this post for your store development team.',
    hashtags: ['#EcommercePK', '#CODOptimization', '#PakistanBusiness', '#ShopifyPakistan', '#AdAgency'],
    visualPrompt: 'Checklist card layout with green verification badges and modern dark UI framing.',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    demoMode: false,
  },
];
