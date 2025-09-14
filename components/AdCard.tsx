
import React, { useState } from 'react';
import type { AdCopy } from '../types';

interface Props {
  adCopy: AdCopy;
}

const AdCard: React.FC<Props> = ({ adCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // Combine content and hashtags for copying
    const fullText = `${adCopy.content}\n\n${adCopy.hashtags}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-amber-300">
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{adCopy.title}</h3>
            <button
                onClick={handleCopy}
                className={`flex items-center text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${isCopied ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700'}`}
            >
                {isCopied ? (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Đã chép!
                    </>
                ) : (
                    <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Chép
                    </>
                )}
            </button>
        </div>
        <div className="text-slate-700 whitespace-pre-wrap leading-relaxed text-base">
            {adCopy.content}
        </div>
        <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
            <p className="font-semibold text-slate-600 mb-2">Hashtags bổ sung:</p>
            <p className="text-amber-700 bg-amber-50 rounded-lg p-3 text-sm">{adCopy.hashtags}</p>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
