import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Minimize2,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Bot,
  User as UserIcon,
  RotateCcw,
  CheckCircle2,
  PackageCheck,
  Truck,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import {
  sendChatMessage,
  fetchChatHistory,
  clearChatSession,
  toggleChat,
  openChat,
  closeChat,
  addOptimisticUserMessage,
} from '../../../State/customer/ChatSlice';
import ProductCardChat from './ProductCardChat';
import ConfirmDialog from '../../../common/dialog/ConfirmDialog';
import { toast } from '../../../common/toast';

const QUICK_PROMPT_CARDS = [
  {
    icon: '👔',
    title: 'Interview Attire',
    prompt: 'Find the best shirt for an interview',
    desc: 'Formal & executive shirts',
  },
  {
    icon: '⚡',
    title: 'Under ₹1500',
    prompt: 'Show products under ₹1500',
    desc: 'Top value-for-money picks',
  },
  {
    icon: '📦',
    title: 'Track Order',
    prompt: 'Track my order',
    desc: 'Check live delivery status',
  },
  {
    icon: '🔄',
    title: 'Return Policy',
    prompt: 'What is your return policy?',
    desc: 'Easy 7-day return guidelines',
  },
  {
    icon: '🛒',
    title: 'My Cart',
    prompt: "What's in my cart?",
    desc: 'View active bag items',
  },
];

const QUICK_PROMPTS = [
  'Find shirts for interview',
  'Products under ₹1500',
  'Track my order',
  'Return policy?',
  "What's in my cart?",
];

export default function AiChatWidget() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fine-grained Redux state selectors to prevent broad-selector re-renders
  const sessionId = useAppSelector((state) => state.chat?.sessionId);
  const messages = useAppSelector((state) => state.chat?.messages || []);
  const loading = useAppSelector((state) => state.chat?.loading);
  const isOpen = useAppSelector((state) => state.chat?.isOpen);
  const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn);

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load history if sessionId exists
  useEffect(() => {
    if (sessionId && messages.length === 0) {
      dispatch(fetchChatHistory(sessionId));
    }
  }, [sessionId, dispatch]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle ESC and Ctrl/Cmd+K keyboard shortcuts
  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(closeChat());
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dispatch(toggleChat());
      }
    };
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [isOpen, dispatch]);

  // Lock background scroll strictly on mobile (<640px) when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleCopy = (id, text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setInput('');
    dispatch(addOptimisticUserMessage(query));

    await dispatch(
      sendChatMessage({
        message: query,
        sessionId: sessionId || undefined,
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setClearConfirmOpen(true);
  };

  const handleConfirmClear = () => {
    dispatch(clearChatSession(sessionId));
    toast.info("Conversation cleared.");
    setClearConfirmOpen(false);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    dispatch(closeChat());
    if (action.type === 'VIEW_PRODUCT' && action.productId) {
      navigate(`/product-details/all/${action.productId}`);
    } else if (action.type === 'VIEW_CART') {
      navigate('/cart');
    } else if (action.type === 'NAVIGATE_LOGIN') {
      navigate('/login');
    } else if (action.type === 'TRACK_ORDER' || action.type === 'VIEW_ORDERS') {
      navigate('/account/orders');
    } else if (action.url) {
      navigate(action.url);
    }
  };

  return (
    <>
      {/* ─── Floating Launcher Button (Desktop only) ─── */}
      {!isOpen && (
        <button
          onClick={() => dispatch(openChat())}
          aria-label="Open ShopSphere AI Assistant"
          aria-expanded={isOpen}
          className="hidden md:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2.5 px-4.5 py-3 rounded-full bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-teal-700/25 hover:shadow-xl hover:shadow-teal-700/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer select-none group border border-white/20"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-teal-700" />
          </div>
          <span className="tracking-tight">ShopSphere AI</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
            Ask
          </span>
        </button>
      )}

      {/* ─── Backdrop (Mobile) ─── */}
      {isOpen && (
        <div
          onClick={() => dispatch(closeChat())}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 sm:hidden cursor-pointer"
          aria-hidden="true"
        />
      )}

      {/* ─── Chat Window (Responsive: bottom-sheet drawer on mobile, floating card on desktop) ─── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="ShopSphere AI Shopping Assistant"
          className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[410px] md:w-[420px] h-[92dvh] sm:h-[620px] max-h-[92dvh] sm:max-h-[620px] flex flex-col bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl border-t sm:border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom"
        >
          {/* Header */}
          <div className="px-4.5 py-3 bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 text-white shrink-0 shadow-sm select-none">
            {/* Mobile Drag Indicator Bar */}
            <div
              className="sm:hidden flex justify-center pb-2 cursor-pointer"
              onClick={() => dispatch(closeChat())}
              title="Close chat"
            >
              <div className="w-11 h-1 rounded-full bg-white/40 hover:bg-white/60 transition-colors" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-inner">
                  <Sparkles className="w-4.5 h-4.5 text-amber-300" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-teal-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-tight">
                    <h3 className="text-sm font-bold tracking-tight text-white">ShopSphere AI</h3>
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                      Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-100 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse inline-block" />
                    Online • Ready to help
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear conversation history"
                    title="Clear conversation"
                    className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center text-teal-100 hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(closeChat())}
                  aria-label="Close chat window"
                  title="Close chat"
                  className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center text-teal-100 hover:text-white transition-all cursor-pointer active:scale-95"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50/60 dark:bg-slate-950/60 touch-pan-y overscroll-contain">
            {/* Welcome message if empty */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-6 px-3 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/25">
                    <Sparkles className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
                </div>

                <div className="space-y-1 max-w-[300px]">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Hi! How can I help you today? 👋
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Ask about product recommendations, sizing, active deals, or track your orders.
                  </p>
                </div>

                {/* Quick Prompts Grid */}
                <div className="w-full pt-2">
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left mb-2 px-1">
                    Popular Questions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    {QUICK_PROMPT_CARDS.slice(0, 4).map((card, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(card.prompt)}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-50/70 dark:hover:bg-teal-950/30 border border-slate-200/80 dark:border-slate-800 transition-all shadow-2xs hover:border-teal-400 group cursor-pointer active:scale-[0.98] flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-lg shrink-0">{card.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                              {card.title}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                              {card.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat message bubbles */}
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'USER';

              return (
                <div
                  key={msg.id || idx}
                  className={`flex gap-2.5 ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold shadow-xs ${
                      isUser
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        : 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white'
                    }`}
                  >
                    {isUser ? (
                      <UserIcon className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    )}
                  </div>

                  {/* Content Container */}
                  <div
                    className={`flex flex-col w-full max-w-[88%] sm:max-w-[82%] ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="relative group/msg w-full">
                      <div
                        className={`px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words ${
                          isUser
                            ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-tr-xs shadow-xs font-medium'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 rounded-tl-xs shadow-xs pr-8'
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* Desktop Hover Copy Button on Assistant messages */}
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id || idx, msg.content)}
                          title="Copy answer"
                          aria-label="Copy answer to clipboard"
                          className="opacity-0 group-hover/msg:opacity-100 transition-opacity absolute top-2 right-2 p-1 rounded-md bg-slate-100/90 dark:bg-slate-800/90 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs cursor-pointer"
                        >
                          {copiedId === (msg.id || idx) ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Execution Engine Indicator */}
                    {!isUser && msg.executionMode && (
                      <div className="flex items-center gap-1 mt-1 px-1">
                        {msg.executionMode === 'GROQ_LLM' && (
                          <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded-md border border-orange-200 dark:border-orange-800">
                            ⚡ Groq AI
                          </span>
                        )}
                        {msg.executionMode === 'GEMINI_LLM' && (
                          <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                            ✨ Gemini 2.0
                          </span>
                        )}
                        {msg.executionMode === 'DETERMINISTIC_ENGINE' && (
                          <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                            ⚡ ShopSphere Engine
                          </span>
                        )}
                        {msg.executionMode === 'CONVERSATIONAL_SHORT_CIRCUIT' && (
                          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                            💬 Quick Dialog
                          </span>
                        )}
                        {msg.executionMode === 'SECURITY_INJECTION_BLOCKED' && (
                          <span className="text-[9px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded-md border border-red-200 dark:border-red-800">
                            🛡️ Security Guard
                          </span>
                        )}
                      </div>
                    )}

                    {/* Cart Summary Card (if returned) */}
                    {msg.cartSummary && (
                      <div className="w-full mt-2 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 rounded-2xl p-3 shadow-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Shopping Cart ({msg.cartSummary.totalItem} items)
                          </span>
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            ₹{msg.cartSummary.totalSellingPrice?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {msg.cartSummary.items && msg.cartSummary.items.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.cartSummary.items.slice(0, 3).map((ci, cIdx) => (
                              <div key={cIdx} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300">
                                <span className="truncate pr-2">{ci.quantity}x {ci.productTitle}</span>
                                <span className="font-semibold shrink-0">₹{ci.sellingPrice}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(closeChat());
                            navigate('/cart');
                          }}
                          className="mt-2.5 w-full py-2 text-center text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                        >
                          Go to Cart
                        </button>
                      </div>
                    )}

                    {/* Order Summary Card (if returned) */}
                    {msg.orderSummary && (
                      <div className="w-full mt-2 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-3 shadow-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <PackageCheck className="w-3.5 h-3.5" />
                            Order #{msg.orderSummary.orderId}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {msg.orderSummary.orderStatus}
                          </span>
                        </div>
                        <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                          <p>Total: <strong className="text-slate-900 dark:text-white">₹{msg.orderSummary.totalAmount?.toLocaleString('en-IN')}</strong></p>
                          {msg.orderSummary.deliveryDate && (
                            <p className="text-[10px] text-slate-400">Est. Delivery: {new Date(msg.orderSummary.deliveryDate).toLocaleDateString()}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(closeChat());
                            navigate('/account/orders');
                          }}
                          className="mt-2.5 w-full py-2 text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                        >
                          View Orders
                        </button>
                      </div>
                    )}

                    {/* Product Recommendation Cards (if any) */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="w-full mt-2.5 flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth touch-pan-x">
                        {msg.products.map((prod) => (
                          <ProductCardChat key={prod.id} product={prod} />
                        ))}
                      </div>
                    )}

                    {/* Interactive Action Buttons (if any) */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, actIdx) => (
                          <button
                            key={actIdx}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/50 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>{act.label || 'View'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Polished Typing / Loading State */}
            {loading && (
              <div className="flex items-center gap-2.5 animate-in fade-in">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:3s]" />
                </div>
                <div className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span>ShopSphere AI is typing</span>
                  <div className="flex items-center gap-1 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions footer when messages exist */}
          {messages.length > 0 && (
            <div className="px-3 py-2 bg-slate-100/90 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center gap-2 overflow-x-auto no-scrollbar touch-pan-x">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="whitespace-nowrap text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-all shrink-0 active:scale-95 disabled:opacity-50 shadow-2xs cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div
            className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800"
            style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={loading ? 'ShopSphere AI is thinking...' : 'Ask about products, sizes, policies...'}
                disabled={loading}
                aria-label="Ask ShopSphere AI a question"
                className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 focus:border-teal-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm rounded-full px-4 py-2.5 focus:outline-none transition-all placeholder:text-slate-400 disabled:opacity-60 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-10 h-10 flex items-center justify-center bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-full transition-all shadow-xs active:scale-95 disabled:scale-100 shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={clearConfirmOpen}
        title="Clear Conversation"
        message="Are you sure you want to clear your conversation history with ShopSphere AI? This cannot be undone."
        confirmText="Clear Chat"
        isDestructive={true}
        onConfirm={handleConfirmClear}
        onClose={() => setClearConfirmOpen(false)}
      />
    </>
  );
}
