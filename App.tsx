import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookModal } from './components/BookModal';
import { BOOKS, CATEGORIES } from './constants';
import { Book, CartItem, ViewState } from './types';
import { X, Trash2, CreditCard, ArrowRight, Download } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('store');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Filter books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (book: Book) => {
    setCart(prev => {
      if (prev.find(item => item.id === book.id)) return prev;
      return [...prev, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setIsProcessingCheckout(true);
    // Simulate API call
    setTimeout(() => {
      const newBooks = cart.map(item => {
        const { quantity, ...book } = item;
        return book;
      });
      setLibrary(prev => [...prev, ...newBooks]);
      setCart([]);
      setIsProcessingCheckout(false);
      setIsCartOpen(false);
      setView('library');
      alert('Purchase successful! Books added to your library.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        currentView={view}
        onChangeView={setView}
        onSearch={setSearchQuery}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {view === 'store' ? (
          <>
            <Hero onExplore={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} />
            
            <div id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Latest Publications</h2>
                
                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 w-full sm:w-auto no-scrollbar">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-scipub-900 text-white shadow-md'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredBooks.map(book => {
                   const isOwned = library.some(libBook => libBook.id === book.id);
                   return (
                    <div 
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full"
                    >
                      <div className="aspect-[2/3] overflow-hidden bg-slate-100 relative">
                        <img 
                          src={book.coverUrl} 
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {isOwned && (
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                            OWNED
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-xs font-semibold text-scipub-600 mb-1">{book.category}</p>
                        <h3 className="font-serif font-bold text-slate-900 leading-snug mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-slate-500 mb-4">{book.author}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-lg font-bold text-slate-900">
                            ${book.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-medium text-scipub-600 group-hover:underline">Details</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-slate-500 text-lg">No publications found matching your criteria.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Library View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">My Library</h2>
            {library.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Your library is empty</h3>
                <p className="text-slate-500 mb-6">You haven't purchased any publications yet.</p>
                <button 
                  onClick={() => setView('store')}
                  className="inline-flex items-center gap-2 bg-scipub-600 text-white px-6 py-2 rounded-lg hover:bg-scipub-700 transition-colors"
                >
                  Browse Store <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {library.map(book => (
                  <div key={book.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="w-20 h-28 flex-shrink-0 shadow-md rounded overflow-hidden">
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-serif font-bold text-slate-900">{book.title}</h3>
                      <p className="text-slate-600 mb-2">{book.author}</p>
                      <p className="text-sm text-slate-400">Purchased on {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button 
                        onClick={() => setSelectedBook(book)}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                      >
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                        <Download size={18} /> Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button onClick={() => setIsCartOpen(false)} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-slate-500">Your cart is empty.</p>
                      </div>
                    ) : (
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-20 h-28 border border-gray-200 rounded-md overflow-hidden">
                                <img src={item.coverUrl} alt={item.title} className="w-full h-full object-center object-cover" />
                              </div>
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="line-clamp-2 leading-tight">{item.title}</h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.author}</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {item.quantity}</p>
                                  <button onClick={() => removeFromCart(item.id)} className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1">
                                    <Trash2 size={16} /> Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-slate-50">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Subtotal</p>
                      <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 mb-6">
                      Digital items are available for download immediately after purchase.
                    </p>
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessingCheckout}
                      className="w-full flex justify-center items-center gap-2 rounded-lg border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-scipub-600 hover:bg-scipub-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessingCheckout ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Checkout <CreditCard size={20} />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onAddToCart={(b) => {
            addToCart(b);
            setSelectedBook(null);
          }}
          isPurchased={library.some(b => b.id === selectedBook.id)}
          isInCart={cart.some(item => item.id === selectedBook.id)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
           <p className="mt-8 text-center text-base text-slate-400">
            &copy; {new Date().getFullYear()} SciPub Publications. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
