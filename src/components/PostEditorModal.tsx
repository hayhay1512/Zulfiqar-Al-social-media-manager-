import React, { useState } from 'react';
import { PostItem, BrandKit, CarouselSlide } from '../types';
import { GraphicCanvas } from './GraphicCanvas';
import {
  Sparkles,
  Calendar,
  Send,
  Save,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle,
  Copy,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sliders,
  Type,
  Hash,
  Share2,
} from 'lucide-react';
import { improvePostCopy } from '../services/aiService';

interface PostEditorModalProps {
  post: PostItem;
  brandKit: BrandKit;
  onSave: (updated: PostItem) => void;
  onApprove: (post: PostItem) => void;
  onPublish: (post: PostItem) => void;
  onSchedule: (post: PostItem, dateIso: string) => void;
  onClose: () => void;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({
  post: initialPost,
  brandKit,
  onSave,
  onApprove,
  onPublish,
  onSchedule,
  onClose,
}) => {
  const [post, setPost] = useState<PostItem>({ ...initialPost });
  const [activeSlide, setActiveSlide] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait' | 'landscape' | 'story'>('square');
  const [isImproving, setIsImproving] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState(
    post.scheduledTime ? post.scheduledTime.slice(0, 16) : new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16)
  );

  const isCarousel = post.contentType === 'carousel' && post.carouselSlides && post.carouselSlides.length > 0;

  const handleImprove = async (
    action:
      | 'improve_hook'
      | 'more_persuasive'
      | 'more_professional'
      | 'make_shorter'
      | 'more_engaging'
      | 'roman_urdu'
      | 'english'
      | 'better_cta'
  ) => {
    setIsImproving(true);
    try {
      if (action === 'improve_hook') {
        const result = await improvePostCopy(post.hook, action);
        setPost({ ...post, hook: result });
      } else if (action === 'better_cta') {
        const result = await improvePostCopy(post.cta, action);
        setPost({ ...post, cta: result });
      } else {
        const result = await improvePostCopy(post.caption, action);
        setPost({ ...post, caption: result });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsImproving(false);
    }
  };

  const handleSlideChange = (field: 'title' | 'body', value: string) => {
    if (!post.carouselSlides) return;
    const slides = [...post.carouselSlides];
    slides[activeSlide] = {
      ...slides[activeSlide],
      [field]: value,
    };
    setPost({ ...post, carouselSlides: slides });
  };

  const handleAddSlide = () => {
    const slides = post.carouselSlides ? [...post.carouselSlides] : [];
    slides.push({
      slideNumber: slides.length + 1,
      title: `Slide ${slides.length + 1} Takeaway`,
      body: 'Actionable point explaining how to implement this solution.',
    });
    setPost({ ...post, carouselSlides: slides });
    setActiveSlide(slides.length - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {post.platform}
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{post.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {post.status.toUpperCase()}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSave(post)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Editable Form & AI Improver (7 cols) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-5 border-r border-slate-800/80 text-slate-200">
            {/* Quick AI Improvement Toolbar */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Enhancement Tools
                </span>
                {isImproving && <span className="text-[11px] text-emerald-300 animate-pulse font-mono">Enhancing with Gemini...</span>}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Improve Hook', action: 'improve_hook' },
                  { label: 'Make More Persuasive', action: 'more_persuasive' },
                  { label: 'Make Professional', action: 'more_professional' },
                  { label: 'Make Shorter', action: 'make_shorter' },
                  { label: 'Boost Engagement', action: 'more_engaging' },
                  { label: 'Translate to Roman Urdu', action: 'roman_urdu' },
                  { label: 'Convert to English', action: 'english' },
                  { label: 'Optimize CTA', action: 'better_cta' },
                ].map((btn) => (
                  <button
                    key={btn.action}
                    type="button"
                    disabled={isImproving}
                    onClick={() => handleImprove(btn.action as any)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-900 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-800 text-slate-300 transition-colors disabled:opacity-40"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hook Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Hook (Opening Sentence)
              </label>
              <textarea
                rows={2}
                value={post.hook}
                onChange={(e) => setPost({ ...post, hook: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Visual Headline
              </label>
              <input
                type="text"
                value={post.headline}
                onChange={(e) => setPost({ ...post, headline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Carousel Slide Editor (if carousel) */}
            {isCarousel && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Carousel Slide {activeSlide + 1} of {post.carouselSlides?.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSlide}
                    className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    + Add Slide
                  </button>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {post.carouselSlides?.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                        activeSlide === idx
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Slide {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={post.carouselSlides?.[activeSlide]?.title || ''}
                    onChange={(e) => handleSlideChange('title', e.target.value)}
                    placeholder="Slide Title"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                  <textarea
                    rows={2}
                    value={post.carouselSlides?.[activeSlide]?.body || ''}
                    onChange={(e) => handleSlideChange('body', e.target.value)}
                    placeholder="Slide Body Text"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* Caption */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Full Post Caption / Body Copy
              </label>
              <textarea
                rows={6}
                value={post.caption}
                onChange={(e) => setPost({ ...post, caption: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            {/* CTA & Hashtags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Call to Action (CTA)
                </label>
                <input
                  type="text"
                  value={post.cta}
                  onChange={(e) => setPost({ ...post, cta: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Hashtags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={post.hashtags.join(', ')}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      hashtags: e.target.value.split(',').map((t) => t.trim()),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Preview & Approval / Publishing Actions (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-950/50 flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  Live Graphic Preview
                </span>

                {/* Aspect ratio toggles */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {(['square', 'portrait', 'story'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded capitalize ${
                        aspectRatio === ratio
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphic Canvas */}
              <div className="max-w-sm mx-auto w-full">
                <GraphicCanvas
                  post={post}
                  brandKit={brandKit}
                  aspectRatio={aspectRatio}
                  slideIndex={activeSlide}
                />
              </div>

              {/* Carousel Controls */}
              {isCarousel && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={activeSlide === 0}
                    onClick={() => setActiveSlide(activeSlide - 1)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono">
                    Slide {activeSlide + 1} of {post.carouselSlides?.length}
                  </span>
                  <button
                    type="button"
                    disabled={activeSlide === (post.carouselSlides?.length || 1) - 1}
                    onClick={() => setActiveSlide(activeSlide + 1)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Approval & Scheduling Action Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Publishing Workflow</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Human-In-The-Loop
                </span>
              </div>

              {/* Date time picker */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Schedule Date & Time (Syncs with Google Calendar)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="datetime-local"
                    value={scheduleDateTime}
                    onChange={(e) => setScheduleDateTime(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => onSchedule(post, new Date(scheduleDateTime).toISOString())}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Schedule</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onApprove(post)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve Content</span>
                </button>
                <button
                  type="button"
                  onClick={() => onPublish(post)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
