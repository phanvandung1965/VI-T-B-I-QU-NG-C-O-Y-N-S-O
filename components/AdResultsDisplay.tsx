import React from 'react';
import type { AdCopy } from '../types';
import AdCard from './AdCard';

interface Props {
  adCopies: AdCopy[];
  isLoading: boolean;
  error: string | null;
}

const AdResultsDisplay: React.FC<Props> = ({ adCopies, isLoading, error }) => {
  const handleExportTxt = () => {
    if (adCopies.length === 0) return;

    const fileContent = adCopies
      .map((ad) => {
        // Format the content to look exactly like a Facebook post
        const fullContent = `${ad.content}\n\n${ad.hashtags}`;
        return `--- ${ad.title} ---\n\n${fullContent}`;
      })
      .join('\n\n==================================================\n\n');

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vietsun_ad_copies.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="flex justify-center items-center mb-4">
          <svg className="animate-spin h-8 w-8 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-lg font-semibold text-slate-700">Chuyên gia AI đang soạn bài...</p>
        <p className="text-slate-500">Vui lòng chờ trong giây lát.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
        <p className="font-bold">Đã xảy ra lỗi</p>
        <p>{error}</p>
      </div>
    );
  }

  if (adCopies.length === 0) {
    return (
        <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-gray-900">Sẵn sàng để bắt đầu</h3>
            <p className="mt-1 text-md text-gray-500">Điền thông tin vào biểu mẫu trên và nhấn nút để tạo nội dung quảng cáo.</p>
        </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center md:text-left">✨ 10 phiên bản quảng cáo của bạn ✨</h2>
        {adCopies.length > 0 && (
          <button
            onClick={handleExportTxt}
            className="w-full md:w-auto flex items-center justify-center bg-white border border-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Xuất ra file .txt
          </button>
        )}
      </div>
      <div className="space-y-6">
          {adCopies.map((ad, index) => (
          <AdCard key={index} adCopy={ad} />
          ))}
      </div>
    </div>
  );
};

export default AdResultsDisplay;