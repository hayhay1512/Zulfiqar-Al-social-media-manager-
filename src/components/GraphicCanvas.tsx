import React from 'react';
import { PostItem, BrandKit } from '../types';
import { CheckCircle2, Sparkles, Layers, Quote, ArrowRight, Share2, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

interface GraphicCanvasProps {
  post: Partial<PostItem>;
  brandKit: BrandKit;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'story';
  slideIndex?: number;
  className?: string;
}

export const GraphicCanvas: React.FC<GraphicCanvasProps> = ({
  post,
  brandKit,
  aspectRatio = 'square',
  slideIndex = 0,
  className = '',
}) => {
  const primary = brandKit.primaryColor || '#059669';
  const secondary = brandKit.secondaryColor || '#0f172a';
  const accent = brandKit.accentColor || '#10b981';

  // Aspect ratio classes
  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[4/5]'
      : aspectRatio === 'story'
      ? 'aspect-[9/16]'
      : aspectRatio === 'landscape'
      ? 'aspect-[1.91/1]'
      : 'aspect-square';

  // Handle Carousel slide data if present
  const isCarousel = post.contentType === 'carousel' && post.carouselSlides && post.carouselSlides.length > 0;
  const currentSlide = isCarousel ? post.carouselSlides![slideIndex] : null;

  const headline = currentSlide ? currentSlide.title : post.headline || post.title || 'Master Meta Ads in 2026';
  const subtext = currentSlide
    ? currentSlide.body
    : post.hook || 'High-converting strategies for Pakistani brands & scaling agencies.';
  const isQuote = post.contentType === 'quote';

  return (
    <div
      id={`canvas-preview-${post.id || 'new'}`}
      className={`relative overflow-hidden rounded-xl border border-slate-700/60 shadow-2xl flex flex-col justify-between text-white select-none ${aspectClass} ${className}`}
      style={{
        background: `radial-gradient(circle at 80% 20%, ${primary}33 0%, ${secondary} 70%)`,
        backgroundColor: secondary,
      }}
    >
      {/* Subtle modern geometric background overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Glow highlight */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: `${accent}40` }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: `${primary}30` }}
      />

      {/* Top Header Row: Brand Identity & Pillar Badge */}
      <div className="relative z-10 p-5 md:p-6 flex items-center justify-between border-b border-white/10 backdrop-blur-sm bg-black/10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm tracking-wider shadow-md"
            style={{ backgroundColor: primary, color: '#ffffff' }}
          >
            {brandKit.businessName ? brandKit.businessName.substring(0, 2).toUpperCase() : 'ZA'}
          </div>
          <div>
            <div className="font-semibold text-xs md:text-sm tracking-tight text-white leading-none">
              {brandKit.businessName || 'Zulfiqar AI Agency'}
            </div>
            <div className="text-[10px] text-slate-300 tracking-wide mt-0.5 font-mono">
              {post.platform ? `@${post.platform.toUpperCase()} GUIDE` : 'OFFICIAL INSIGHT'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCarousel && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 border border-emerald-500/30">
              {slideIndex + 1} / {post.carouselSlides?.length || 1}
            </span>
          )}
          <span
            className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border"
            style={{
              borderColor: `${accent}60`,
              backgroundColor: `${accent}20`,
              color: '#a7f3d0',
            }}
          >
            {post.pillar ? post.pillar.replace('_', ' ') : 'INSIGHT'}
          </span>
        </div>
      </div>

      {/* Center Body Content */}
      <div className="relative z-10 p-6 md:p-8 my-auto flex flex-col justify-center">
        {isQuote ? (
          <div className="space-y-4">
            <Quote className="w-10 h-10 text-emerald-400 opacity-60" />
            <h2 className="text-xl md:text-2xl font-serif italic text-slate-100 leading-snug">
              &ldquo;{post.hook || headline}&rdquo;
            </h2>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-6 h-[2px] bg-emerald-500"></div>
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                {brandKit.businessName} &bull; Wisdom
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {post.contentType && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" />
                <span>{post.contentType.toUpperCase().replace('_', ' ')}</span>
              </div>
            )}

            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              {headline}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal max-w-prose">
              {subtext}
            </p>

            {/* If checklist or points */}
            {post.contentType === 'tips' && (
              <div className="mt-3 space-y-1.5 bg-black/25 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Test Advantage+ creative hooks</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Optimize COD checkout for high deliverability</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Use native Roman Urdu copy variants</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Row */}
      <div className="relative z-10 px-6 py-4 border-t border-white/10 backdrop-blur-sm bg-black/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span className="font-semibold text-white">{brandKit.targetLocation || 'Pakistan'}</span>
          <span>&bull;</span>
          <span className="truncate max-w-[140px]">{brandKit.niche?.split(' ')[0] || 'Meta Ads'}</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium text-[11px]" style={{ color: accent }}>
          <span>{isCarousel ? 'Swipe for next slide' : 'Read caption for details'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
