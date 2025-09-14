
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
      <div className="flex items-center space-x-3">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A11.208 11.208 0 0118 10.5c0 1.905-.484 3.68-1.33 5.165a.75.75 0 001.214.865A12.708 12.708 0 0020.25 10.5c0-4.965-3.266-9.182-7.697-10.632l.41 1.428zM11.037 2.286a.75.75 0 011.071 1.052A11.208 11.208 0 006 10.5c0 1.905.484 3.68 1.33 5.165a.75.75 0 11-1.214.865A12.708 12.708 0 013.75 10.5c0-4.965 3.266-9.182 7.697-10.632l-.41 1.428zM12 6.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 6.75zM12 12.75a.75.75 0 00-1.5 0v5.25a.75.75 0 001.5 0v-5.25z" clipRule="evenodd" />
            <path d="M12 21a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zm0-1.5a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" />
          </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          AI Ad Copy Generator
        </h1>
        <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Viet Sun Bird's Nest</span>
      </div>
    </div>
  </header>
);
