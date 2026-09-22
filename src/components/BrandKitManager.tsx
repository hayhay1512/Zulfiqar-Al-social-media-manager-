import React from 'react';
import { BrandKit } from '../types';
import { Palette, ShieldCheck, Type, Sparkles, Building2, Sliders } from 'lucide-react';

interface BrandKitManagerProps {
  brandKit: BrandKit;
  onUpdate: (updated: BrandKit) => void;
  onOpenWizard: () => void;
}

export const BrandKitManager: React.FC<BrandKitManagerProps> = ({
  brandKit,
  onUpdate,
  onOpenWizard,
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Brand Kit & Design Governance</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Live Lock-In
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            The Zulfiqar AI Social Media Manager uses this Brand Kit to enforce consistent palettes, typography, cultural modesty rules, and tone across every generated asset.
          </p>
        </div>

        <button
          onClick={onOpenWizard}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md shadow-emerald-500/20 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Brand Setup Wizard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Brand Values & Identity (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5 text-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Business DNA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={brandKit.businessName}
                onChange={(e) => onUpdate({ ...brandKit, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Brand Tone
              </label>
              <select
                value={brandKit.brandTone}
                onChange={(e) => onUpdate({ ...brandKit, brandTone: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              >
                {[
                  'premium',
                  'professional',
                  'friendly',
                  'educational',
                  'bold',
                  'inspirational',
                  'humorous',
                  'conversational',
                ].map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Business Niche & Category
            </label>
            <input
              type="text"
              value={brandKit.niche}
              onChange={(e) => onUpdate({ ...brandKit, niche: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Target Audience & Location
            </label>
            <input
              type="text"
              value={`${brandKit.targetAudience} (${brandKit.targetLocation})`}
              onChange={(e) => onUpdate({ ...brandKit, targetAudience: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Content Restrictions & Red Lines
            </label>
            <textarea
              rows={3}
              value={brandKit.contentRestrictions}
              onChange={(e) => onUpdate({ ...brandKit, contentRestrictions: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Right: Visual System & Modesty Rule (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-5 text-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Palette className="w-4 h-4" />
            <span>Visual Palette & Styling</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Primary</label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input
                  type="color"
                  value={brandKit.primaryColor}
                  onChange={(e) => onUpdate({ ...brandKit, primaryColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300">{brandKit.primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Secondary</label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input
                  type="color"
                  value={brandKit.secondaryColor}
                  onChange={(e) => onUpdate({ ...brandKit, secondaryColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300">{brandKit.secondaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Accent</label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input
                  type="color"
                  value={brandKit.accentColor}
                  onChange={(e) => onUpdate({ ...brandKit, accentColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300">{brandKit.accentColor}</span>
              </div>
            </div>
          </div>

          {/* Cultural Modesty Rule */}
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Cultural Modesty Rule
              </span>
              <input
                type="checkbox"
                checked={brandKit.modestImageryRule}
                onChange={(e) => onUpdate({ ...brandKit, modestImageryRule: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If women or persons are featured in AI-generated visual graphics, enforce strict full hijab coverage with zero visible hair.
            </p>
          </div>

          {/* Auto Publish Switch */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Auto-Publish Approved Content Types</span>
              <input
                type="checkbox"
                checked={brandKit.autoPublishApproved}
                onChange={(e) => onUpdate({ ...brandKit, autoPublishApproved: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              When checked, quotes and announcements that have been approved by you will automatically dispatch at scheduled times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
