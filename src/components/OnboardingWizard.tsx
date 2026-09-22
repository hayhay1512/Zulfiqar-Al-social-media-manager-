import React, { useState } from 'react';
import { BrandKit } from '../types';
import { Sparkles, Check, ArrowRight, ShieldCheck, Palette, Target, Globe, Building2, Layers } from 'lucide-react';

interface OnboardingWizardProps {
  initialBrandKit: BrandKit;
  onComplete: (brandKit: BrandKit) => void;
  onCancel: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  initialBrandKit,
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [brandKit, setBrandKit] = useState<BrandKit>(initialBrandKit);

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(brandKit);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleGoal = (goal: string) => {
    const goals = brandKit.contentGoals.includes(goal)
      ? brandKit.contentGoals.filter((g) => g !== goal)
      : [...brandKit.contentGoals, goal];
    setBrandKit({ ...brandKit, contentGoals: goals });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Setup Your AI Social Media Manager</h2>
              <p className="text-xs text-slate-400">Step {step} of {totalSteps}: Tailoring Zulfiqar AI to your business</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800"
          >
            Skip for now
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-emerald-500 h-1 transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Business & Brand Identity</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Business / Page Name
                </label>
                <input
                  type="text"
                  value={brandKit.businessName}
                  onChange={(e) => setBrandKit({ ...brandKit, businessName: e.target.value })}
                  placeholder="e.g. Apex Media AI"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Business Niche & Category
                </label>
                <input
                  type="text"
                  value={brandKit.niche}
                  onChange={(e) => setBrandKit({ ...brandKit, niche: e.target.value })}
                  placeholder="e.g. Meta Ads & AI Video Advertising for Pakistani Businesses"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Business Description
                </label>
                <textarea
                  rows={3}
                  value={brandKit.description}
                  onChange={(e) => setBrandKit({ ...brandKit, description: e.target.value })}
                  placeholder="Describe what your business does and why customers choose you..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <Target className="w-4 h-4" />
                <span>Products & Target Audience</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Products or Services Offered
                </label>
                <input
                  type="text"
                  value={brandKit.productsServices}
                  onChange={(e) => setBrandKit({ ...brandKit, productsServices: e.target.value })}
                  placeholder="e.g. Meta Ads Management, AI UGC Videos, Shopify Stores"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={brandKit.targetAudience}
                  onChange={(e) => setBrandKit({ ...brandKit, targetAudience: e.target.value })}
                  placeholder="e.g. Pakistani entrepreneurs, e-commerce founders, local brand builders"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Location / Countries
                </label>
                <input
                  type="text"
                  value={brandKit.targetLocation}
                  onChange={(e) => setBrandKit({ ...brandKit, targetLocation: e.target.value })}
                  placeholder="e.g. Pakistan, UAE, Saudi Arabia, Diaspora"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <Globe className="w-4 h-4" />
                <span>Content Goals & Language Preference</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Primary Goals (Select Multiple)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Brand awareness', 'Leads', 'Sales', 'Authority', 'Engagement', 'Community building'].map((goal) => {
                    const isSelected = brandKit.contentGoals.includes(goal);
                    return (
                      <button
                        type="button"
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Preferred Content Languages
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'roman_ur', label: 'Roman Urdu' },
                    { id: 'ur', label: 'Urdu (اردو)' },
                  ].map((lang) => {
                    const active = brandKit.preferredLanguages.includes(lang.id as any);
                    return (
                      <button
                        type="button"
                        key={lang.id}
                        onClick={() => {
                          const updated = active
                            ? brandKit.preferredLanguages.filter((l) => l !== lang.id)
                            : [...brandKit.preferredLanguages, lang.id as any];
                          setBrandKit({ ...brandKit, preferredLanguages: updated });
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border ${
                          active
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {lang.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <Palette className="w-4 h-4" />
                <span>Brand Colors & Visual Theme</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Color</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={brandKit.primaryColor}
                      onChange={(e) => setBrandKit({ ...brandKit, primaryColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-300">{brandKit.primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Secondary (Dark)</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={brandKit.secondaryColor}
                      onChange={(e) => setBrandKit({ ...brandKit, secondaryColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-300">{brandKit.secondaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Accent Color</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={brandKit.accentColor}
                      onChange={(e) => setBrandKit({ ...brandKit, accentColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-300">{brandKit.accentColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Visual Design Aesthetic
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'luxury_dark', label: 'Luxury Dark & Emerald' },
                    { id: 'minimal_modern', label: 'Clean Tech & Minimal' },
                    { id: 'bold_vibrant', label: 'Bold High Contrast' },
                    { id: 'warm_editorial', label: 'Editorial Warm Tone' },
                  ].map((style) => (
                    <button
                      type="button"
                      key={style.id}
                      onClick={() => setBrandKit({ ...brandKit, visualStyle: style.id as any })}
                      className={`p-3 rounded-xl border text-xs text-left font-medium ${
                        brandKit.visualStyle === style.id
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Special AI Image & Content Safeguards</span>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Modest & Cultural Representation Rule
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Enforce strict cultural modesty guidelines for all AI-generated graphic visuals. If women or people are depicted in social creatives, guarantee full hijab covering with zero visible hair.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={brandKit.modestImageryRule}
                    onChange={(e) => setBrandKit({ ...brandKit, modestImageryRule: e.target.checked })}
                    className="w-5 h-5 accent-emerald-500 rounded mt-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Brand Content Restrictions & Rules
                </label>
                <textarea
                  rows={3}
                  value={brandKit.contentRestrictions}
                  onChange={(e) => setBrandKit({ ...brandKit, contentRestrictions: e.target.value })}
                  placeholder="e.g. Do not promise unrealistic overnight results, avoid clickbait, preserve brand dignity..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Your Zulfiqar AI Agent is Ready</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Zulfiqar AI has locked in your brand guidelines for <span className="text-emerald-400 font-semibold">{brandKit.businessName}</span>. Every hook, carousel, quote, and ad graphic generated will follow your precise colors, tone, and goals.
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="text-slate-400">Niche: <span className="text-slate-200">{brandKit.niche}</span></div>
                <div className="text-slate-400">Targeting: <span className="text-slate-200">{brandKit.targetAudience} ({brandKit.targetLocation})</span></div>
                <div className="text-slate-400">Languages: <span className="text-slate-200">{brandKit.preferredLanguages.join(', ')}</span></div>
                <div className="text-slate-400">Modesty Rule: <span className="text-emerald-400">{brandKit.modestImageryRule ? 'Enforced' : 'Off'}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 border border-slate-800 hover:bg-slate-800"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <span>{step === totalSteps ? 'Complete & Start Managing' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
