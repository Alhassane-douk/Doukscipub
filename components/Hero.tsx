import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-scipub-900 text-white pb-16 pt-24 sm:pb-24 sm:pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-scipub-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-scipub-800/50 rounded-full px-4 py-1.5 mb-8 border border-scipub-700 backdrop-blur-sm">
          <BookOpen size={16} className="text-scipub-100" />
          <span className="text-sm font-medium text-scipub-100">The Scientific Library of the Future</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight mb-6">
          Expand the Horizons of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">Human Knowledge</span>
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-scipub-100 mb-10 leading-relaxed">
          Access a curated collection of peer-reviewed publications, seminal textbooks, and groundbreaking research papers. Powered by AI to help you find exactly what you need.
        </p>
        
        <button 
          onClick={onExplore}
          className="group flex items-center gap-2 bg-white text-scipub-900 px-8 py-4 rounded-full font-semibold hover:bg-scipub-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Explore Collection
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
