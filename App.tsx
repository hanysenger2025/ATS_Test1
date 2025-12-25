
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { School, FilterState } from './types';
import { schools } from './data';
import SchoolCard from './components/SchoolCard';
import SchoolModal from './components/SchoolModal';
import MapView from './components/MapView';

const GraduationCapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const GuideSection = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 text-right dir-rtl">
    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
      <h3 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-amber-400 rounded-full"></span>
        ما هي مدارس التكنولوجيا التطبيقية؟
      </h3>
      <p className="text-gray-700 leading-relaxed font-bold text-lg mb-6">
        مدارس التكنولوجيا التطبيقية هي مدارس حكومية نموذجية للتعليم الفني، تُدار بالشراكة بين وزارة التربية والتعليم والقطاع الخاص. تهدف إلى تطبيق المعايير الدولية في التعليم والتدريب، ويحصل خريجها على ثلاث شهادات: شهادة إتمام الدراسة، شهادة تدريب صناعي، وشهادة دولية معتمدة. تعتمد هذه المدارس على نظام التعليم المزدوج الذي يجمع بين الدراسة النظرية والتدريب العملي داخل المصانع، مما يضمن جاهزية الخريجين لسوق العمل.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
           <h4 className="text-indigo-900 font-black mb-3">أهداف مدارس التكنولوجيا التطبيقية</h4>
           <ul className="space-y-3 text-gray-700 font-bold text-sm">
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> توفير بيئة تعليمية متميزة.</li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> تطبيق المعايير الدولية في التعليم.</li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> إنشاء تخصصات تقنية حديثة.</li>
             <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> إعداد خريجين مؤهلين لسوق العمل المحلي والدولي.</li>
           </ul>
        </div>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
           <h4 className="text-amber-900 font-black mb-3">التخصصات والمجالات</h4>
           <p className="text-amber-900/80 font-bold text-sm leading-relaxed">
             تم إنشاؤها لتلبية احتياجات سوق العمل في مجالات حديثة مثل: البرمجيات والذكاء الاصطناعي، الصناعات الثقيلة، الخدمات الفندقية والزراعية، وصيانة الطائرات.
           </p>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <h4 className="font-black text-indigo-900 mb-2">التوسع والنمو</h4>
        <p className="text-xs font-bold text-gray-500">بدأت عام 2018 بـ 3 مدارس ووصلت لـ 115 مدرسة في 27 محافظة بحلول 2026.</p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h4 className="font-black text-indigo-900 mb-2">الفرص المتاحة</h4>
        <p className="text-xs font-bold text-gray-500">الالتحاق بسوق العمل مباشرة، إكمال التعليم بالجامعات، أو استكمال دراسات عليا (MBA).</p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.718 2.153a2 2 0 01-1.14 1.258l-2.154.718a2 2 0 01-1.414-1.96l.477-2.387a2 2 0 00-.547-1.022l-1.636-1.636a2 2 0 01.547-1.022l2.387-.477a2 2 0 001.96-1.414l.718-2.153a2 2 0 011.14-1.258l2.154-.718a2 2 0 011.414 1.96l-.477 2.387a2 2 0 00.547 1.022l1.636 1.636a2 2 0 01-.547 1.022z" /></svg>
        </div>
        <h4 className="font-black text-indigo-900 mb-2">شروط الالتحاق</h4>
        <p className="text-xs font-bold text-gray-500">خريج الإعدادية، سن لا يزيد عن 18 سنة، اجتياز الاختبارات والمقابلة.</p>
      </div>
    </div>

    <section className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl">
      <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">مراحل التقديم والقبول</h3>
      <div className="space-y-6">
        {[
          { t: "تسجيل الالتحاق إلكترونيًا", d: "عبر موقع الوزارة الرسمي" },
          { t: "تحديد الرغبات والمدرسة", d: "اختيار المدرسة المناسبة جغرافياً" },
          { t: "اجتياز اختبار القبول", d: "اختبار إلكتروني في اللغة والذكاء" },
          { t: "المقابلة الشخصية", d: "لتقييم مهارات الطالب وشخصيته" },
          { t: "إعلان نتيجة القبول", d: "المرحلة النهائية للالتحاق بالمدرسة" }
        ].map((step, i) => (
          <div key={i} className="flex gap-4 items-start bg-white/5 p-5 rounded-2xl hover:bg-white/10 transition-colors">
            <span className="w-10 h-10 rounded-full bg-amber-400 text-indigo-950 flex items-center justify-center font-black shrink-0">{i+1}</span>
            <div>
              <h5 className="font-black text-lg">{step.t}</h5>
              <p className="text-indigo-200 text-sm font-bold">{step.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
      <h3 className="text-xl font-black text-indigo-900 mb-6">عوامل النجاح والإنجازات</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          "تغيير الصورة الذهنية للتعليم الفني",
          "دعم رئاسي وحكومي مباشر",
          "شراكات مع كيانات صناعية كبرى",
          "أكثر من 90% من الطلاب من المتفوقين",
          "تطوير البنية التحتية والمعامل بأحدث التقنيات",
          "توفير فرص عمل حقيقية داخل وخارج مصر"
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl font-bold text-gray-700 text-sm">
            <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            {item}
          </div>
        ))}
      </div>
    </section>
  </div>
);

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [activeTab, setActiveTab] = useState<'directory' | 'guide'>('guide');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    governorate: '',
    gender: '',
    search: ''
  });
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('school_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('school_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  }, []);

  const governorates = useMemo(() => {
    return Array.from(new Set(schools.map(s => s.governorate))).sort();
  }, []);

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchFav = !showFavoritesOnly || favorites.includes(school.id);
      const matchGov = !filters.governorate || school.governorate === filters.governorate;
      const matchGender = !filters.gender || school.gender === filters.gender;
      const matchSearch = !filters.search || 
        school.name.includes(filters.search) || 
        school.specialty.includes(filters.search) ||
        school.industrialPartner.includes(filters.search);
      return matchFav && matchGov && matchGender && matchSearch;
    });
  }, [filters, showFavoritesOnly, favorites]);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSchoolSelect = useCallback((school: School) => {
    setSelectedSchool(school);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.search.trim()) {
      setShowMainContent(true);
      setActiveTab('directory');
    }
  };

  if (!showMainContent) {
    return (
      <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden font-['Cairo']">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="z-10 text-center space-y-10 max-w-lg w-full animate-in fade-in zoom-in duration-700">
          <div className="flex flex-col items-center gap-6">
            <div className="w-28 h-28 bg-white/10 rounded-[2.2rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
              <GraduationCapIcon className="w-14 h-14 text-amber-400" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-black text-amber-400">دليل المدارس التطبيقية</h1>
              <p className="text-indigo-200 text-lg font-bold leading-relaxed px-4">
                مرحبا فى النسخة التجريبية لدليل مدارس التكنولوجيا التطبيقية
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setShowMainContent(true); setActiveTab('guide'); }}
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-indigo-950 font-black py-5 rounded-3xl shadow-xl transition-all text-lg flex flex-col items-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                الدليل التعريفي
              </button>
              
              <button 
                onClick={() => { setShowMainContent(true); setActiveTab('directory'); }}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black py-5 rounded-3xl shadow-xl transition-all text-lg flex flex-col items-center gap-2 border border-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                تصفح المدارس
              </button>
            </div>

            <form onSubmit={handleQuickSearch} className="relative group">
              <input
                type="text"
                placeholder="بحث سريع (مثال: اللوجيستيات، العربي...)"
                className="w-full bg-white/5 border border-white/20 rounded-2xl py-4 pr-12 pl-4 text-white placeholder-white/40 font-bold outline-none focus:bg-white/10 focus:border-amber-400 transition-all shadow-inner"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 max-w-4xl mx-auto px-4 pt-6 animate-in fade-in duration-500 font-['Cairo']">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <button 
              onClick={() => {
                setShowFavoritesOnly(false);
                setShowMainContent(false);
              }}
              className="p-3 bg-white hover:bg-gray-100 rounded-2xl text-gray-600 shadow-sm border border-gray-100 transition-all active:scale-90"
            >
              <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-indigo-950 leading-none">دليل المدارس التطبيقية</h1>
              <p className="text-gray-500 text-xs font-black mt-1">النسخة التجريبية 1.5</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'guide' && (
              <button 
                onClick={() => setActiveTab('directory')}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all flex items-center gap-1 border border-indigo-100 shadow-sm"
              >
                تصفح المدارس
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
              </button>
            )}
            
            {activeTab === 'directory' && (
              <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400'}`}
                >
                  قائمة
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'map' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400'}`}
                >
                  خريطة
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'directory' && (
          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن اسم مدرسة، تخصص، أو شريك..."
                className="w-full bg-white border-none rounded-[1.5rem] py-5 pr-14 pl-6 shadow-sm focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-bold outline-none"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <button 
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 border-none rounded-2xl py-3 px-6 shadow-sm text-sm font-black outline-none transition-all shrink-0 ${showFavoritesOnly ? 'bg-rose-500 text-white' : 'bg-white text-rose-500'}`}
              >
                المفضلة ({favorites.length})
              </button>

              <select
                className="bg-white border-none rounded-2xl py-3 px-6 shadow-sm text-sm font-black text-indigo-900 outline-none focus:ring-4 focus:ring-indigo-100 shrink-0"
                value={filters.governorate}
                onChange={(e) => handleFilterChange('governorate', e.target.value)}
              >
                <option value="">كل المحافظات</option>
                {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
              </select>

              <select
                className="bg-white border-none rounded-2xl py-3 px-6 shadow-sm text-sm font-black text-indigo-900 outline-none focus:ring-4 focus:ring-indigo-100 shrink-0"
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="">كل الأنواع</option>
                <option value="بنين">بنين</option>
                <option value="بنات">بنات</option>
                <option value="مشترك">مشترك</option>
              </select>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-[500px]">
        {activeTab === 'guide' ? (
          <GuideSection />
        ) : (
          <>
            <div className="mb-4 text-xs font-black text-gray-400 px-1 uppercase tracking-widest flex justify-between">
              <span>تم العثور على {filteredSchools.length} مدرسة متاحة</span>
              {showFavoritesOnly && <span className="text-rose-500">(تصفية حسب المفضلة)</span>}
            </div>
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-300">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map(school => (
                    <SchoolCard 
                      key={school.id} 
                      school={school} 
                      onClick={handleSchoolSelect}
                      isFavorite={favorites.includes(school.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-200">
                    <p className="text-gray-400 font-black">
                      {showFavoritesOnly ? "لم تقم بإضافة أي مدارس للمفضلة بعد" : "عفواً، لا توجد مدارس تطابق هذه المعايير"}
                    </p>
                    {showFavoritesOnly && (
                      <button onClick={() => setShowFavoritesOnly(false)} className="mt-4 text-indigo-600 font-bold text-sm underline">عرض كل المدارس</button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <MapView 
                schools={filteredSchools} 
                selectedSchool={selectedSchool}
                onSelectSchool={handleSchoolSelect}
              />
            )}
          </>
        )}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-indigo-950 text-white rounded-[2rem] p-2 flex gap-2 shadow-2xl z-50 border border-white/10 backdrop-blur-md">
        <button 
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-4 rounded-2xl text-sm font-black flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'guide' ? 'bg-amber-500 text-indigo-950 shadow-lg' : 'text-white/60 hover:text-white'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          الدليل التعريفي
        </button>
        <button 
          onClick={() => setActiveTab('directory')}
          className={`flex-1 py-4 rounded-2xl text-sm font-black flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'directory' ? 'bg-amber-500 text-indigo-950 shadow-lg' : 'text-white/60 hover:text-white'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
          تصفح المدارس
        </button>
      </nav>

      <SchoolModal 
        school={selectedSchool} 
        onClose={() => setSelectedSchool(null)}
        isFavorite={selectedSchool ? favorites.includes(selectedSchool.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;
