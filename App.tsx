
import React, { useState, Suspense } from 'react';
import { RegionData, RegionID, Language } from './types';
import InfoModal from './components/InfoModal';
import InteractiveMap from './components/InteractiveMap';
import { BookOpen, Map as MapIcon, Languages, ChevronRight, GraduationCap, BarChart3, Briefcase, History, Newspaper, Users, Bot, Loader2 } from 'lucide-react';

// Lazy load heavy components
const KnowledgePage = React.lazy(() => import('./components/KnowledgePage'));
const QuizPage = React.lazy(() => import('./components/QuizPage'));
const DashboardPage = React.lazy(() => import('./components/DashboardPage'));
const CooperationFieldsPage = React.lazy(() => import('./components/CooperationFieldsPage'));
const TimelinePage = React.lazy(() => import('./components/TimelinePage'));
const NewsPage = React.lazy(() => import('./components/NewsPage'));
const YouthPage = React.lazy(() => import('./components/YouthPage'));
const ChatbotPage = React.lazy(() => import('./components/ChatbotPage'));

// Static configuration for regions (Positions and basic info)
const RAW_REGIONS = [
  {
    id: RegionID.UN,
    name: { vi: "Liên Hợp Quốc (UN)", en: "United Nations (UN)" },
    shortDescription: { 
      vi: "Việt Nam là thành viên tích cực, có trách nhiệm, giữ vai trò quan trọng trong Hội đồng Bảo an.", 
      en: "Vietnam is an active, responsible member, playing an important role in the Security Council." 
    },
    coordinates: { top: '32%', left: '26%' }, // Approximate NY/US location
  },
  {
    id: RegionID.EU,
    name: { vi: "Liên Minh Châu Âu (EU)", en: "European Union (EU)" },
    shortDescription: { 
      vi: "Đối tác chiến lược về kinh tế, thương mại với Hiệp định EVFTA mang tính lịch sử.", 
      en: "Strategic partner in economy and trade with the historic EVFTA agreement." 
    },
    coordinates: { top: '25%', left: '52%' }, // Europe
  },
  {
    id: RegionID.AFRICA,
    name: { vi: "Châu Phi", en: "Africa" },
    shortDescription: { 
      vi: "Đối tác truyền thống, hợp tác nông nghiệp và lực lượng gìn giữ hòa bình Liên Hợp Quốc.", 
      en: "Traditional partner, agricultural cooperation and UN peacekeeping forces." 
    },
    coordinates: { top: '55%', left: '53%' }, // Central Africa
  },
  {
    id: RegionID.ASEAN,
    name: { vi: "ASEAN", en: "ASEAN" },
    shortDescription: { 
      vi: "Gia đình khu vực, nền tảng cho sự ổn định, hòa bình và thịnh vượng chung của Đông Nam Á.", 
      en: "Regional family, foundation for stability, peace, and shared prosperity of Southeast Asia." 
    },
    coordinates: { top: '55%', left: '78%' }, // SE Asia
  },
  {
    id: RegionID.APEC,
    name: { vi: "APEC", en: "APEC" },
    shortDescription: { 
      vi: "Diễn đàn hợp tác kinh tế hàng đầu, thúc đẩy tự do hóa thương mại và đầu tư.", 
      en: "Leading economic cooperation forum, promoting trade and investment liberalization." 
    },
    coordinates: { top: '38%', left: '90%' }, // Pacific / General representation
  },
];

type ViewState = 'map' | 'knowledge' | 'quiz' | 'dashboard' | 'cooperation' | 'timeline' | 'news' | 'youth' | 'chatbot';

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-diplomatic-900" />
      <p className="text-gray-500 font-medium">Loading...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('vi');
  const [currentView, setCurrentView] = useState<ViewState>('map');
  const [quizRegionId, setQuizRegionId] = useState<string | null>(null); // Track which region is being quizzed

  // Derived regions data based on language
  const regions: RegionData[] = RAW_REGIONS.map(r => ({
    id: r.id,
    name: language === 'vi' ? r.name.vi : r.name.en,
    shortDescription: language === 'vi' ? r.shortDescription.vi : r.shortDescription.en,
    coordinates: r.coordinates
  }));

  const activeRegion = regions.find(r => r.id === activeRegionId);
  
  // Handle special quiz case for Knowledge Page
  const HCM_IDEOLOGY_QUIZ_ID = 'HCM_IDEOLOGY';
  
  const quizRegion = quizRegionId === HCM_IDEOLOGY_QUIZ_ID 
    ? {
        id: HCM_IDEOLOGY_QUIZ_ID,
        name: language === 'vi' ? 'Vận Dụng Tư Tưởng Hồ Chí Minh' : 'Applying Ho Chi Minh\'s Ideology',
        shortDescription: '',
        coordinates: { top: '0', left: '0' }
      }
    : regions.find(r => r.id === quizRegionId);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const handleStartQuiz = (regionId?: string | any) => {
    if (typeof regionId === 'string' && regionId) {
      setQuizRegionId(regionId);
      setActiveRegionId(null);
      setCurrentView('quiz');
    } else if (activeRegionId) {
      setQuizRegionId(activeRegionId);
      setActiveRegionId(null); // Close modal
      setCurrentView('quiz');
    }
  };

  const texts = {
    title: language === 'vi' ? 'Kết Nối Quốc Tế Của Việt Nam' : 'Vietnam International Connections',
    subtitle: language === 'vi' 
      ? 'Khám phá hành trình hội nhập và các mối quan hệ ngoại giao chiến lược.'
      : 'Discover the integration journey and strategic diplomatic relationships.',
    mapLegendTitle: language === 'vi' ? 'Bản đồ Tương tác' : 'Interactive Map',
    mapLegendDesc: language === 'vi' 
      ? 'Nhấp vào các điểm đánh dấu trên bản đồ.' 
      : 'Click on the markers on the map.',
    quickAccess: language === 'vi' ? 'Danh sách khu vực' : 'Regions List',
    footer: language === 'vi' ? 'Ứng dụng giáo dục - Ngoại giao Việt Nam' : 'Vietnam Diplomacy Education App',
    knowledgeBtn: language === 'vi' ? 'Góc Học Tập' : 'Study Corner',
    mapBtn: language === 'vi' ? 'Bản Đồ' : 'Map',
    dashboardBtn: language === 'vi' ? 'Thống Kê' : 'Dashboard',
    fieldsBtn: language === 'vi' ? 'Lĩnh Vực' : 'Fields',
    timelineBtn: language === 'vi' ? 'Lịch Sử' : 'Timeline',
    newsBtn: language === 'vi' ? 'Tin Tức' : 'News',
    youthBtn: language === 'vi' ? 'Thanh Niên' : 'Youth',
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 flex flex-col">
      
      {/* Header Section */}
      <header className="bg-white shadow-sm z-20 sticky top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('map')}>
            <BookOpen className="text-diplomatic-900 w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-lg md:text-2xl font-serif font-bold text-diplomatic-900 uppercase tracking-wide hidden sm:block">
              {texts.title}
            </h1>
             <h1 className="text-lg font-serif font-bold text-diplomatic-900 uppercase tracking-wide sm:hidden">
              VN Connections
            </h1>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[60vw] md:max-w-none">
            {/* View Switcher Buttons (Only show if not in Quiz mode) */}
            {currentView !== 'quiz' && (
              <>
                <button
                  onClick={() => setCurrentView('timeline')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'timeline'
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={texts.timelineBtn}
                >
                  <History className="w-4 h-4" />
                  <span className="hidden lg:inline">{texts.timelineBtn}</span>
                </button>

                <button
                  onClick={() => setCurrentView('cooperation')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'cooperation'
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={texts.fieldsBtn}
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden lg:inline">{texts.fieldsBtn}</span>
                </button>

                 <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'dashboard'
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={texts.dashboardBtn}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden lg:inline">{texts.dashboardBtn}</span>
                </button>

                 <button
                  onClick={() => setCurrentView('news')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'news'
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={texts.newsBtn}
                >
                  <Newspaper className="w-4 h-4" />
                  <span className="hidden lg:inline">{texts.newsBtn}</span>
                </button>

                <button
                  onClick={() => setCurrentView('youth')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'youth'
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={texts.youthBtn}
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden lg:inline">{texts.youthBtn}</span>
                </button>

                <button
                  onClick={() => setCurrentView('chatbot')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'chatbot'
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={language === 'vi' ? 'Trợ Lý AI' : 'AI Assistant'}
                >
                  <Bot className="w-4 h-4" />
                  <span className="hidden lg:inline">{language === 'vi' ? 'Trợ Lý AI' : 'AI Assistant'}</span>
                </button>

                <button
                  onClick={() => setCurrentView('knowledge')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm whitespace-nowrap ${
                    currentView === 'knowledge' 
                      ? 'bg-gold-500 text-diplomatic-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={texts.knowledgeBtn}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden lg:inline">{texts.knowledgeBtn}</span>
                </button>

                {currentView !== 'map' && (
                   <button
                   onClick={() => setCurrentView('map')}
                   className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 font-medium text-sm shadow-sm bg-diplomatic-900 text-white hover:bg-diplomatic-800 whitespace-nowrap"
                 >
                   <MapIcon className="w-4 h-4" />
                   <span className="hidden lg:inline">{texts.mapBtn}</span>
                 </button>
                )}
              </>
            )}

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-diplomatic-100 hover:bg-diplomatic-50 transition-colors text-sm font-medium text-diplomatic-900 ml-2 whitespace-nowrap"
            >
              <Languages className="w-4 h-4" />
              {language === 'vi' ? 'VI' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* VIEW ROUTING */}
      <Suspense fallback={<LoadingScreen />}>
      {currentView === 'quiz' && quizRegion ? (
        <QuizPage 
          region={quizRegion} 
          language={language} 
          onBack={() => {
             setCurrentView('map');
             setQuizRegionId(null);
          }} 
        />
      ) : currentView === 'dashboard' ? (
         <DashboardPage language={language} onBack={() => setCurrentView('map')} />
      ) : currentView === 'timeline' ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <TimelinePage language={language} onBack={() => setCurrentView('map')} />
        </main>
      ) : currentView === 'news' ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <NewsPage language={language} onBack={() => setCurrentView('map')} />
        </main>
      ) : currentView === 'youth' ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <YouthPage language={language} onBack={() => setCurrentView('map')} />
        </main>
      ) : currentView === 'chatbot' ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <ChatbotPage language={language} onBack={() => setCurrentView('map')} />
        </main>
      ) : currentView === 'knowledge' ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <KnowledgePage 
            language={language} 
            onBack={() => setCurrentView('map')} 
            onStartQuiz={() => handleStartQuiz('HCM_IDEOLOGY')}
          />
        </main>
      ) : currentView === 'cooperation' ? (
        <main className="flex-grow container mx-auto px-4 py-8">
          <CooperationFieldsPage language={language} onBack={() => setCurrentView('map')} />
        </main>
      ) : (
        // MAP VIEW DEFAULT
        <>
          {/* Hero Description */}
          <div className="bg-white border-b border-gray-100 py-6 px-4 text-center animate-fade-in">
             <h2 className="text-2xl md:text-3xl font-serif font-bold text-diplomatic-900 mb-2 sm:hidden">{texts.title}</h2>
             <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                {texts.subtitle}
              </p>
          </div>

          {/* Main Content: Split View for better Web/Mobile capability */}
          <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 animate-fade-in overflow-hidden">
            
            {/* Left: Quick Access List (Better for Accessibility & Mobile) */}
            <div className="lg:w-1/4 order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="p-4 bg-diplomatic-50 border-b border-gray-100">
                  <h3 className="font-bold text-diplomatic-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {texts.quickAccess}
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {regions.map(region => (
                    <button
                      key={region.id}
                      onClick={() => setActiveRegionId(region.id)}
                      className={`w-full text-left p-4 hover:bg-blue-50 transition-colors flex items-center justify-between group ${activeRegionId === region.id ? 'bg-blue-50' : ''}`}
                    >
                      <span className={`font-medium ${activeRegionId === region.id ? 'text-diplomatic-900' : 'text-gray-700'}`}>
                        {region.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-diplomatic-900 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Map Area */}
            <div className="lg:w-3/4 order-1 lg:order-2">
              <InteractiveMap 
                regions={regions} 
                activeRegionId={activeRegionId} 
                onRegionSelect={setActiveRegionId} 
              />
              
              {/* Note below map */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 justify-center lg:justify-start">
                 <MapIcon className="w-4 h-4" />
                 <span>{texts.mapLegendDesc}</span>
              </div>
            </div>

          </main>
        </>
      )}
      </Suspense>

      {/* Footer (Only show on Map or Knowledge view) */}
      {currentView !== 'quiz' && (
        <footer className="bg-diplomatic-900 text-white py-6 text-center text-xs md:text-sm mt-auto">
          <p>{texts.footer} &copy; {new Date().getFullYear()}</p>
          <p className="opacity-60 text-[10px] mt-2">Powered by React & Google Gemini</p>
        </footer>
      )}

      {/* Modal Overlay (Only for Map View) */}
      {activeRegion && currentView === 'map' && (
        <InfoModal 
          region={activeRegion} 
          language={language}
          onClose={() => setActiveRegionId(null)} 
          onStartQuiz={handleStartQuiz}
        />
      )}
    </div>
  );
};

export default App;
