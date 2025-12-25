
import React from 'react';
import { School } from '../types';

interface SchoolModalProps {
  school: School | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const SchoolModal: React.FC<SchoolModalProps> = ({ school, onClose, isFavorite, onToggleFavorite }) => {
  if (!school) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-md transition-all">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className="relative p-8 bg-indigo-600 text-white shrink-0">
          <div className="absolute top-6 left-6 flex gap-2">
            <button 
              onClick={() => onToggleFavorite(school.id)}
              className={`p-2 rounded-full transition-all active:scale-90 ${isFavorite ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/20' : 'bg-white/20 hover:bg-white/40 text-white'}`}
            >
              <svg className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all active:scale-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-amber-400 text-indigo-950 rounded-full text-[10px] font-black uppercase">
              {school.status}
            </span>
            <span className="text-xs font-bold opacity-80">تاريخ البدء: {school.startDate}</span>
          </div>
          <h2 className="text-2xl font-black leading-tight ml-20">{school.name}</h2>
        </div>
        
        <div className="p-8 space-y-8 overflow-y-auto grow">
          <section className="space-y-3">
            <h4 className="flex items-center text-sm font-black text-indigo-600 gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              التخصصات المتاحة
            </h4>
            <p className="text-gray-800 bg-indigo-50 p-4 rounded-2xl font-semibold leading-relaxed border border-indigo-100">
              {school.specialty}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-2">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">الشريك الصناعي</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>
                </div>
                <p className="text-indigo-950 font-black text-sm">{school.industrialPartner}</p>
              </div>
            </section>
            
            {school.academicPartner && (
              <section className="space-y-2">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">الشريك الأكاديمي</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
                  </div>
                  <p className="text-indigo-950 font-black text-sm">{school.academicPartner}</p>
                </div>
              </section>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
            <section>
              <h4 className="text-xs font-black text-indigo-600 mb-1">الموقع الجغرافي</h4>
              <p className="text-gray-800 font-bold">{school.governorate} - {school.city}</p>
              <p className="text-gray-500 text-xs mt-1">{school.address}</p>
            </section>
            <section>
              <h4 className="text-xs font-black text-indigo-600 mb-1">النوع المتاح</h4>
              <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-black shadow-inner">
                {school.gender}
              </span>
            </section>
          </div>

          <section className="bg-amber-50 p-6 rounded-3xl border border-amber-200 shadow-sm">
            <h4 className="flex items-center text-sm font-black text-amber-800 mb-3 gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              المناطق التي تقبل منها المدرسة
            </h4>
            <p className="text-amber-900 text-sm font-bold leading-relaxed">{school.acceptanceRegions}</p>
          </section>

          {school.notes && (
            <section className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
               <h4 className="text-xs font-black text-gray-500 mb-1">ملاحظات إضافية</h4>
               <p className="text-gray-600 text-xs italic">{school.notes}</p>
            </section>
          )}
        </div>

        <div className="p-8 bg-gray-50 shrink-0 flex flex-col sm:flex-row gap-4 border-t border-gray-200">
          {school.mapUrl && (
            <a 
              href={school.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-indigo-950 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              افتح على الخريطة
            </a>
          )}
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-indigo-100"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolModal;
