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

const QUICK_PROMPTS = [
  'Find the best shirt for an interview',
  'Show products under ₹1500',
  'Track my order',
  'What is your return policy?',
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

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(closeChat());
      }
    };
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [isOpen, dispatch]);

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
    if (window.confirm('Clear your conversation with ShopSphere AI?')) {
      dispatch(clearChatSession(sessionId));
    }
  };

  const handleActionClick = (action) => {
    if (!action) return;
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
      {/* ─── Floating Launcher Button ─── */}
      {!isOpen && (
        <button
          onClick={() => dispatch(openChat())}
          aria-label="Open AI Shopping Concierge"
          aria-expanded={isOpen}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-teal-600 animate-ping" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            ShopSphere AI
          </span>
          <span className="text-[11px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full font-medium hidden md:inline">
            Ask me anything
          </span>
        </button>
      )}

      {/* ─── Chat Window (Responsive: full-screen on mobile, floating card on desktop) ─── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="ShopSphere AI Shopping Assistant"
          className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[440px] h-[95vh] sm:h-[640px] max-h-[96vh] flex flex-col bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/25 shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5 leading-tight">
                  ShopSphere AI
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                </h3>
                <p className="text-[11px] text-teal-100">
                  Real-time smart shopping assistant
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
                  className="p-1.5 rounded-lg hover:bg-white/15 text-teal-100 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => dispatch(closeChat())}
                aria-label="Close chat window"
                title="Close chat"
                className="p-1.5 rounded-lg hover:bg-white/15 text-teal-100 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50/60 dark:bg-slate-950/60">
            {/* Welcome message if empty */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-6 px-2 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Welcome to ShopSphere Concierge! 👋
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[300px]">
                    Ask about products, compare sizes, check order status, or get quick store policies.
                  </p>
                </div>

                {/* Quick suggestions */}
                <div className="w-full pt-3 flex flex-col gap-1.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-left pl-1">
                    Try Asking
                  </p>
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="text-left text-xs bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-between group"
                    >
                      <span className="truncate pr-2 font-medium">{prompt}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 transition-transform group-hover:translate-x-0.5 shrink-0" />
                    </button>
                  ))}
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
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                      isUser
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        : 'bg-teal-600 text-white'
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
                    className={`flex flex-col w-full max-w-[85%] ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words ${
                        isUser
                          ? 'bg-teal-600 text-white rounded-tr-xs shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Execution Engine Indicator */}
                    {!isUser && msg.executionMode && (
                      <div className="flex items-center gap-1 mt-1 px-1">
                        {msg.executionMode === 'GROQ_LLM' && (
                          <span className="text-[9px] font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded border border-orange-200 dark:border-orange-800">
                            ⚡ Groq AI
                          </span>
                        )}
                        {msg.executionMode === 'GEMINI_LLM' && (
                          <span className="text-[9px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                            ✨ Gemini 2.0
                          </span>
                        )}
                        {msg.executionMode === 'DETERMINISTIC_ENGINE' && (
                          <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            ⚡ ShopSphere Engine
                          </span>
                        )}
                        {msg.executionMode === 'CONVERSATIONAL_SHORT_CIRCUIT' && (
                          <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                            💬 Quick Dialog
                          </span>
                        )}
                        {msg.executionMode === 'SECURITY_INJECTION_BLOCKED' && (
                          <span className="text-[9px] font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800">
                            🛡️ Security Guard
                          </span>
                        )}
                      </div>
                    )}

                    {/* Cart Summary Card (if returned) */}
                    {msg.cartSummary && (
                      <div className="w-full mt-2 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 rounded-xl p-3 shadow-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Shopping Cart ({msg.cartSummary.totalItem} items)
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
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
                          onClick={() => navigate('/cart')}
                          className="mt-2.5 w-full py-1.5 text-center text-[11px] font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors shadow-xs"
                        >
                          Go to Cart
                        </button>
                      </div>
                    )}

                    {/* Order Summary Card (if returned) */}
                    {msg.orderSummary && (
                      <div className="w-full mt-2 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-3 shadow-xs">
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
                          onClick={() => navigate('/account/orders')}
                          className="mt-2.5 w-full py-1.5 text-center text-[11px] font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs"
                        >
                          View Orders
                        </button>
                      </div>
                    )}

                    {/* Product Recommendation Cards (if any) */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="w-full mt-2.5 flex gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/50 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 transition-colors shadow-xs"
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
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:3s]" />
                </div>
                <div className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>ShopSphere AI is thinking</span>
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
            <div className="px-3 py-1.5 bg-slate-100/70 dark:bg-slate-900/70 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="whitespace-nowrap text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition-colors shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
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
                placeholder={loading ? 'Waiting for assistant...' : 'Ask about products, sizes, policies...'}
                disabled={loading}
                aria-label="Ask ShopSphere AI a question"
                className="flex-1 bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-teal-500 text-slate-800 dark:text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none transition-all placeholder:text-slate-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-xl transition-all shadow-xs active:scale-95 disabled:scale-100 shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
