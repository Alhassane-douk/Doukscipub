import React from 'react';
import { BookMarked, Search, ShoppingBag, Library } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, currentView, onChangeView, onSearch }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onChangeView('store')}>
            <BookMarked className="h-8 w-8 text-scipub-600" />
            <span className="ml-2 text-xl font-serif font-bold text-slate-900 tracking-tight">SciPub</span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search titles, authors, or ISBNs..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-scipub-500 focus:border-transparent sm:text-sm transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onChangeView('library')}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
                currentView === 'library' ? 'bg-scipub-50 text-scipub-700' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Library className="h-6 w-6" />
              <span className="hidden sm:inline font-medium text-sm">My Library</span>
            </button>
            
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
