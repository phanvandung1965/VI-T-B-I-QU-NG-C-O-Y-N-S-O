import React, { useState } from 'react';
import type { FormState } from '../types';

interface Props {
  onGenerate: (formData: FormState) => void;
  isLoading: boolean;
}

const AdGeneratorForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [occasion, setOccasion] = useState<string>('Quảng cáo thường xuyên');
  const [promotion, setPromotion] = useState<string>('');
  const [length, setLength] = useState<FormState['length']>('medium');
  const [spinContent, setSpinContent] = useState<boolean>(true);
  const [market, setMarket] = useState<FormState['market']>('australia');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ occasion, promotion, length, spinContent, market });
  };

  const isSpecialOption = length === 'special';
  
  const occasionOptions = [
    'Quảng cáo thường xuyên',
    'Ngày của Mẹ',
    'Ngày của Cha',
    'Tết Âm Lịch',
    'Tết Dương Lịch',
    'Khai trương',
    'Giảm giá đặc biệt'
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-2xl font-bold mb-2 text-slate-900">Tạo nội dung quảng cáo</h2>
      <p className="text-slate-600 mb-6">Điền thông tin chi tiết để AI tạo ra các bài viết quảng cáo phù hợp nhất.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-md font-semibold mb-2 text-slate-700">
             <span className="text-amber-500 mr-2">1.</span>Chọn thị trường quảng cáo
          </label>
          <div className="flex space-x-4">
              <label className={`flex items-center p-3 w-full border rounded-lg cursor-pointer transition-all duration-200 ${market === 'australia' ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500' : 'border-slate-300 hover:border-amber-400'}`}>
                  <input type="radio" name="market" value="australia" checked={market === 'australia'} onChange={() => setMarket('australia')} className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"/>
                  <span className="ml-2 font-medium text-slate-800">🇦🇺 Australia</span>
              </label>
              <label className={`flex items-center p-3 w-full border rounded-lg cursor-pointer transition-all duration-200 ${market === 'vietnam' ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500' : 'border-slate-300 hover:border-amber-400'}`}>
                  <input type="radio" name="market" value="vietnam" checked={market === 'vietnam'} onChange={() => setMarket('vietnam')} className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"/>
                  <span className="ml-2 font-medium text-slate-800">🇻🇳 Việt Nam</span>
              </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="occasion" className="block text-md font-semibold mb-2 text-slate-700">
            <span className="text-amber-500 mr-2">2.</span>Chương trình quảng cáo nhân dịp nào?
          </label>
           <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            disabled={isSpecialOption}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            {occasionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="promotion" className="block text-md font-semibold mb-2 text-slate-700">
            <span className="text-amber-500 mr-2">3.</span>Nội dung khuyến mãi cụ thể là gì?
          </label>
          <textarea
            id="promotion"
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            disabled={isSpecialOption}
            rows={4}
            placeholder="Ví dụ: Mua 2 tặng 1, Freeship, hoặc dán chi tiết giảm giá sản phẩm..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
          <p className="text-sm text-slate-500 mt-1">Để trống nếu không có khuyến mãi. AI sẽ tự động hiển thị đầy đủ chi tiết này.</p>
        </div>

        <div>
          <h3 className="block text-md font-semibold mb-3 text-slate-700">
             <span className="text-amber-500 mr-2">4.</span>Anh/chị muốn bài viết dài bao nhiêu?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(
              [
                ['short', 'Ngắn gọn (50-80 từ)', 'Phù hợp để chạy quảng cáo Facebook Ads.'],
                ['medium', 'Vừa phải (80-120 từ)', 'Lý tưởng cho các bài post thông thường.'],
                ['long', 'Cảm xúc (150-200 từ)', 'Xây dựng kết nối, kể chuyện thương hiệu.'],
                ['special', 'Đặc biệt (200-300 từ)', 'Bài viết thông thường, không dịp, không KM.'],
              ] as const
            ).map(([value, title, description]) => (
              <label key={value} className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${length === value ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500' : 'border-slate-300 hover:border-amber-400'}`}>
                <input
                  type="radio"
                  name="length"
                  value={value}
                  checked={length === value}
                  onChange={(e) => setLength(e.target.value as FormState['length'])}
                  className="mt-1 h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                />
                <div className="ml-3 text-sm">
                  <span className="font-bold text-slate-800">{title}</span>
                  <p className="text-slate-500">{description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
                <label htmlFor="spin-toggle" className="font-semibold text-slate-800 cursor-pointer">Kích hoạt Spin Content</label>
                <p className="text-sm text-slate-500">Tự động tạo biến thể nội dung với cú pháp #icon{} và #text{}.</p>
            </div>
            <label htmlFor="spin-toggle" className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    id="spin-toggle" 
                    className="sr-only peer"
                    checked={spinContent}
                    onChange={() => setSpinContent(!spinContent)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
        </div>


        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-transform duration-200 transform hover:scale-105 disabled:bg-amber-300 disabled:cursor-wait disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang sáng tạo...
              </>
            ) : (
              '✨ Tạo 10 phiên bản quảng cáo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdGeneratorForm;