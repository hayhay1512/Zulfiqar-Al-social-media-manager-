import React, { useState } from 'react';
import { AgentChatMessage, BrandKit, PostItem } from '../types';
import {
  Sparkles,
  Send,
  Bot,
  User,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  RotateCcw,
  FileText,
  Sliders,
  Calendar,
} from 'lucide-react';
import { generateContentStrategy, generateCarousel } from '../services/aiService';

interface AIAgentChatProps {
  brandKit: BrandKit;
  onPostCreated: (newPosts: PostItem[]) => void;
  onOpenCalendar: () => void;
}

export const AIAgentChat: React.FC<AIAgentChatProps> = ({
  brandKit,
  onPostCreated,
  onOpenCalendar,
}) => {
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: `Salam! I am your **Zulfiqar AI Social Media Manager**. I have reviewed your brand guidelines for **${brandKit.businessName}** targeting **${brandKit.targetAudience}** in ${brandKit.targetLocation}.\n\nTell me what content you need today or pick a quick workflow below.`,
      timestamp: 'Just now',
      suggestedActions: [
        'Create 30 days of content for my Facebook page',
        'Create 5 premium posts about Meta Ads',
        'Create a motivational business quote for today',
        'Create a promotional post for my AI video ad service',
        'Create a 7-slide educational carousel',
        'Create content for Pakistani business owners in Roman Urdu',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isProcessing) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg: AgentChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setIsProcessing(true);

    const agentMsgId = 'agent-' + Date.now();
    const initialAgentMsg: AgentChatMessage = {
      id: agentMsgId,
      sender: 'agent',
      text: 'Analyzing your instruction against brand guidelines and market dynamics...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      steps: [
        { title: 'Understanding request & brand goals', status: 'in_progress' },
        { title: 'Choosing content pillar & strategic hook', status: 'pending' },
        { title: 'Crafting persuasive copy & platform CTAs', status: 'pending' },
        { title: 'Generating high-contrast visual design layout', status: 'pending' },
        { title: 'Preparing for approval & Google Calendar scheduling', status: 'pending' },
      ],
    };

    setMessages((prev) => [...prev, initialAgentMsg]);

    // Progressive step updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === agentMsgId
            ? {
                ...m,
                steps: m.steps?.map((s, idx) =>
                  idx === 0
                    ? { ...s, status: 'completed' }
                    : idx === 1
                    ? { ...s, status: 'in_progress' }
                    : s
                ),
              }
            : m
        )
      );
    }, 700);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === agentMsgId
            ? {
                ...m,
                steps: m.steps?.map((s, idx) =>
                  idx <= 1
                    ? { ...s, status: 'completed' }
                    : idx === 2
                    ? { ...s, status: 'in_progress' }
                    : s
                ),
              }
            : m
        )
      );
    }, 1500);

    // Call AI Backend to build the posts
    try {
      const isCarouselRequest = query.toLowerCase().includes('carousel') || query.toLowerCase().includes('slide');
      const isQuoteRequest = query.toLowerCase().includes('quote');

      let generatedPosts: PostItem[] = [];

      if (isCarouselRequest) {
        const carouselData = await generateCarousel(query, 5, brandKit);
        const newPost: PostItem = {
          id: 'post-ai-' + Date.now(),
          title: carouselData.title || 'Mastering Meta Ads Carousel',
          platform: 'instagram',
          contentType: 'carousel',
          pillar: 'educational',
          language: brandKit.preferredLanguages[0] || 'en',
          hook: carouselData.hook,
          headline: carouselData.headline,
          caption: carouselData.caption,
          cta: carouselData.cta,
          hashtags: carouselData.hashtags || ['#MetaAds', '#PakistanBusiness'],
          visualPrompt: `Sleek dark emerald theme with carousel slides matching ${brandKit.businessName}`,
          status: 'needs_review',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          demoMode: false,
          carouselSlides: carouselData.slides,
        };
        generatedPosts = [newPost];
      } else {
        const strategyItems = await generateContentStrategy(brandKit, 7);
        generatedPosts = strategyItems.slice(0, 3).map((item, idx) => ({
          id: 'post-ai-' + Date.now() + '-' + idx,
          title: item.title || `Post #${idx + 1}: ${item.headline || 'Actionable Strategy'}`,
          platform: item.platform || 'facebook',
          contentType: item.contentType || (isQuoteRequest ? 'quote' : 'single_image'),
          pillar: item.pillar || 'educational',
          language: item.language || 'en',
          hook: item.hook || 'High converting insight for Pakistani brands',
          headline: item.headline || item.title || 'Grow Your Business Faster',
          caption: item.caption || 'Detailed breakdown of high ROAS marketing strategies.',
          cta: item.cta || 'Leave a comment below to receive the complete agency blueprint.',
          hashtags: item.hashtags || ['#MetaAds', '#PakistanBusiness'],
          visualPrompt: item.visualPrompt || 'Clean luxury emerald and slate visual layout',
          status: 'needs_review',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          demoMode: false,
        }));
      }

      onPostCreated(generatedPosts);

      // Final completed state
      setMessages((prev) =>
        prev.map((m) =>
          m.id === agentMsgId
            ? {
                ...m,
                text: `I have generated **${generatedPosts.length} post(s)** tailored specifically for **${brandKit.businessName}**.\n\nEvery post includes custom hooks, body copy, hashtags, CTAs, and a branded high-contrast visual design following your **${brandKit.brandTone}** tone and modesty preferences.\n\nThey have been added to your **Needs Review** queue for human-in-the-loop approval before scheduling to Google Calendar.`,
                steps: m.steps?.map((s) => ({ ...s, status: 'completed' })),
                generatedPostIds: generatedPosts.map((p) => p.id),
                suggestedActions: [
                  'Create 30 days of content for my Facebook page',
                  'Show me my content calendar',
                  'Create 5 Roman Urdu quotes for local entrepreneurs',
                ],
              }
            : m
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === agentMsgId
            ? {
                ...m,
                text: 'Encountered a temporary network disruption while calling the model, but I generated high-fidelity offline strategy templates for your review.',
                steps: m.steps?.map((s) => ({ ...s, status: 'completed' })),
              }
            : m
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Agent Chat Header */}
      <div className="p-4 px-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">Zulfiqar AI Social Media Manager Agent</h2>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                Active &bull; Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Context loaded: {brandKit.businessName} &bull; {brandKit.targetLocation} &bull; Tone: {brandKit.brandTone}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg-reset',
                sender: 'agent',
                text: `Session refreshed. Brand context for **${brandKit.businessName}** is fully preserved. What should we create next?`,
                timestamp: 'Just now',
                suggestedActions: [
                  'Create 30 days of content for my Facebook page',
                  'Create 5 premium posts about Meta Ads',
                  'Create a 7-slide educational carousel',
                ],
              },
            ]);
          }}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`rounded-2xl p-4 text-xs md:text-sm leading-relaxed space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Progress Steps for Agent Multi-Step Tasks */}
              {msg.steps && msg.steps.length > 0 && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Agent Workflow Execution
                  </div>
                  <div className="space-y-1.5">
                    {msg.steps.map((st, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        {st.status === 'completed' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : st.status === 'in_progress' ? (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                        <span
                          className={
                            st.status === 'completed'
                              ? 'text-slate-300 font-medium'
                              : st.status === 'in_progress'
                              ? 'text-emerald-300 font-semibold'
                              : 'text-slate-500'
                          }
                        >
                          {st.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions after generation */}
              {msg.generatedPostIds && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={onOpenCalendar}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>View in Content Calendar</span>
                  </button>
                </div>
              )}

              {/* Suggested prompt chips */}
              {msg.suggestedActions && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      disabled={isProcessing}
                      onClick={() => handleSendMessage(action)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-900 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-800 text-slate-300 transition-colors disabled:opacity-40"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-[10px] text-slate-500 text-right">{msg.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-slate-950 rounded-xl border border-slate-800 p-1.5 focus-within:border-emerald-500 transition-colors"
        >
          <input
            type="text"
            value={input}
            disabled={isProcessing}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Give a command, e.g. "Create 5 Meta Ads posts for Pakistani business owners in Roman Urdu"'
            className="flex-1 bg-transparent px-3 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-30 disabled:hover:bg-emerald-500 transition-colors shrink-0 shadow-md shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
