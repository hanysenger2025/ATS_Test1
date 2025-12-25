
import React from 'react';
import { School } from '../types';

interface SchoolCardProps {
  school: School;
  onClick: (school: School) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, onClick, isFavorite, onToggleFavorite }) => {
  const genderColor = school.gender === 'بنين' ? 'bg-blue-100 text-blue-800' : 
                      school.gender === 'بنات' ? 'bg-pink-100 text-pink-800' : 
                      'bg-purple-100 text-purple-800';

  return (
    <div 
      className="animate-slide-up bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer duration-300 group relative"
    >
      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(school.id);
        }}
        className={`absolute top-4 left-4 p-2 rounded-xl transition-all z-10 ${isFavorite ? 'bg-rose-50 text-rose-500 scale-110 shadow-sm' : 'bg-gray-50 text-gray-300 hover:text-rose-400'}`}
      >
        <svg className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div onClick={() => onClick(school)}>
        <div className="flex justify-between items-start mb-4 pl-8">
          <h3 className="text-lg font-black text-indigo-950 flex-1 leading-tight group-hover:text-indigo-600 transition-colors">{school.name}</h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-[10px] px-3 py-1 rounded-full font-black ${genderColor}`}>
            {school.gender}
          </span>
          <span className="text-[10px] px-3 py-1 rounded-full font-black bg-gray-100 text-gray-600">
            {school.governorate}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center ml-3 shrink-0">
               <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
               </svg>
            </div>
            <span className="font-semibold">{school.city}</span>
          </div>
          
          <div className="flex items-start text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center ml-3 shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
              </svg>
            </div>
            <span className="line-clamp-2 leading-snug">{school.specialty}</span>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-indigo-600 font-black text-xs">تفاصيل القبول والشروط</span>
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
