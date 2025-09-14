
import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-white mt-8">
    <div className="container mx-auto px-4 md:px-8 py-4 text-center text-slate-500 text-sm">
      <p>&copy; {new Date().getFullYear()} AI Content Assistant. All Rights Reserved.</p>
    </div>
  </footer>
);
