import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, BookOpen, BrainCircuit, Sparkles, Check, Download } from 'lucide-react';
import { Book, AIInsights } from '../types';
import { generateBookInsights } from '../services/geminiService';

interface BookModalProps {
  book: Book;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  isPurchased: boolean;
  isInCart: boolean;
}

export const BookModal: React.FC<BookModalProps> = ({ book, onClose, onAddToCart, isPurchased, isInCart }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'insights'>('details');
  const [insights, setInsights] = useState<AIInsights | null>(null);

  useEffect(() => {
    // Reset insights when book changes
    setInsights(null);
    setActiveTab('details');
  }, [book]);

  const fetchInsights = async () => {
    setInsights({ summary: '', keyTakeaways: [], loading: true });
    const data = await generateBookInsights(book.title, book.author);
    setInsights({ ...data, loading: false });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="bg-white/80 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 h-full md:h-[600px]">
            {/* Left Column: Image & Actions */}
            <div className="bg-slate-50 p-8 flex flex-col items-center justify-between border-r border-slate-100">
              <div className="w-48 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src={book.coverUrl} alt={book.title} className="rounded-r-lg rounded-l-sm w-full h-auto object-cover" />
              </div>
              
              <div className="w-full mt-8 space-y-3">
                {isPurchased ? (
                  <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors shadow-sm">
                    <Download size={20} />
                    Download PDF
                  </button>
                ) : (
                  <button 
                    onClick={() => onAddToCart(book)}
                    disabled={isInCart}
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-sm ${
                      isInCart 
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                      : 'bg-scipub-600 hover:bg-scipub-700 text-white hover:shadow-md'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check size={20} />
                        In Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Buy for ${book.price.toFixed(2)}
                      </>
                    )}
                  </button>
                )}
                <div className="text-xs text-center text-slate-400 mt-2">
                  Secure transaction • Instant digital delivery
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="col-span-1 md:col-span-2 flex flex-col h-full overflow-hidden">
              <div className="p-8 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-scipub-100 text-scipub-800">
                    {book.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {book.publishedDate} • {book.pages} pages
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight mb-2">
                  {book.title}
                </h2>
                <p className="text-lg text-slate-600 font-medium">{book.author}</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 px-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'details' 
                      ? 'border-scipub-600 text-scipub-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BookOpen size={16} /> Description
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ml-6 ${
                    activeTab === 'insights' 
                      ? 'border-purple-600 text-purple-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BrainCircuit size={16} /> AI Insights
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-white">
                {activeTab === 'details' ? (
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {book.description}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Publisher</h4>
                        <p className="text-sm text-slate-600">Academic Press Ltd.</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">ISBN</h4>
                        <p className="text-sm text-slate-600">978-3-16-148410-0</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Language</h4>
                        <p className="text-sm text-slate-600">English</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-1">Format</h4>
                        <p className="text-sm text-slate-600">PDF, ePub</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {!insights ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-purple-50 p-4 rounded-full mb-4">
                          <Sparkles size={32} className="text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Generate Smart Insights</h3>
                        <p className="text-slate-600 max-w-sm mb-6">
                          Use Gemini AI to analyze this book and provide a scientific summary and key takeaways.
                        </p>
                        <button 
                          onClick={fetchInsights}
                          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <BrainCircuit size={18} />
                          Generate Insights
                        </button>
                      </div>
                    ) : insights.loading ? (
                       <div className="flex flex-col items-center justify-center py-12">
                         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
                         <p className="text-purple-600 font-medium animate-pulse">Consulting the neural network...</p>
                       </div>
                    ) : (
                      <div className="animate-fade-in">
                        <div className="mb-6">
                          <h3 className="text-sm uppercase tracking-wide text-purple-600 font-bold mb-3 flex items-center gap-2">
                            <Sparkles size={14} /> AI Summary
                          </h3>
                          <p className="text-slate-800 bg-purple-50 p-4 rounded-lg border border-purple-100 leading-relaxed">
                            {insights.summary}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm uppercase tracking-wide text-purple-600 font-bold mb-3">Key Takeaways</h3>
                          <ul className="space-y-3">
                            {insights.keyTakeaways.map((point, idx) => (
                              <li key={idx} className="flex gap-3 items-start">
                                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-slate-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
                          Generated by Gemini 2.5 Flash. AI output may vary.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
