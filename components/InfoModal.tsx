
import React, { useEffect, useState } from 'react';
import { RegionData, RegionContentResponse, Language } from '../types';
import { fetchRegionDetails } from '../services/geminiService';
import { X, Globe, History, Handshake, Star, Calendar, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfoModalProps {
  region: RegionData;
  language: Language;
  onClose: () => void;
  onStartQuiz: () => void; // New prop
}

type TabType = 'overview' | 'milestones' | 'quiz';

const InfoModal: React.FC<InfoModalProps> = ({ region, language, onClose, onStartQuiz }) => {
  const [details, setDetails] = useState<RegionContentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      setLoading(true);
      setActiveTab('overview');

      const data = await fetchRegionDetails(region.id, region.name, language);
      if (isMounted) {
        setDetails(data);
        setLoading(false);
      }
    };

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [region.id, region.name, language]);


  const labels = {
    overview: language === 'vi' ? 'Tổng quan' : 'Overview',
    milestones: language === 'vi' ? 'Dòng thời gian' : 'Timeline',
    quiz: language === 'vi' ? 'Thử thách' : 'Challenge',
    loading: language === 'vi' ? 'Đang tải dữ liệu từ Gemini AI...' : 'Loading data from Gemini AI...',
    back: language === 'vi' ? 'Đóng' : 'Close',
    history: language === 'vi' ? 'Lịch sử & Bối cảnh' : 'History & Context',
    contribution: language === 'vi' ? 'Hợp tác & Vai trò' : 'Cooperation & Role',
    meaning: language === 'vi' ? 'Ý nghĩa chiến lược' : 'Strategic Meaning',
    quizTitle: language === 'vi' ? 'Kiểm tra kiến thức của bạn' : 'Test Your Knowledge',
    quizDesc: language === 'vi'
      ? `Tham gia thử thách 10 câu hỏi trắc nghiệm do AI tạo ra về quan hệ Việt Nam - ${region.name}.`
      : `Take a 10-question AI-generated quiz about Vietnam - ${region.name} relations.`,
    startQuiz: language === 'vi' ? 'Bắt đầu ngay' : 'Start Now'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="bg-white w-full max-w-2xl rounded-xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] md:max-h-[90vh]"
      >

        {/* Header */}
        <div className="bg-diplomatic-900 p-4 md:p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <Globe className="w-5 h-5 md:w-6 md:h-6 text-gold-400" />
            <h2 className="text-lg md:text-2xl font-serif font-bold tracking-wide line-clamp-1">{region.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-2 text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${activeTab === 'overview' ? 'text-diplomatic-900 border-b-2 border-diplomatic-900 bg-blue-50' : 'text-gray-500 hover:text-diplomatic-800'}`}
          >
            <BookIcon className="w-4 h-4" /> {labels.overview}
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`flex-1 py-3 px-2 text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${activeTab === 'milestones' ? 'text-diplomatic-900 border-b-2 border-diplomatic-900 bg-blue-50' : 'text-gray-500 hover:text-diplomatic-800'}`}
          >
            <Calendar className="w-4 h-4" /> {labels.milestones}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 px-2 text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${activeTab === 'quiz' ? 'text-diplomatic-900 border-b-2 border-diplomatic-900 bg-blue-50' : 'text-gray-500 hover:text-diplomatic-800'}`}
          >
            <HelpCircle className="w-4 h-4" /> {labels.quiz}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-grow overscroll-contain">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-diplomatic-900 border-t-gold-400 rounded-full animate-spin"></div>
              <p className="text-gray-500 italic text-sm md:text-base">{labels.loading}</p>
            </div>
          ) : (
            <div className="h-full">

              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && details && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 md:space-y-6"
                >
                  <div className="bg-diplomatic-100/50 p-3 md:p-4 rounded-lg border-l-4 border-gold-400">
                    <p className="text-diplomatic-900 font-medium italic text-sm md:text-base">"{region.shortDescription}"</p>
                  </div>

                  <section>
                    <div className="flex items-center gap-2 mb-2 text-diplomatic-800">
                      <History className="w-4 h-4 md:w-5 md:h-5" />
                      <h3 className="font-bold uppercase tracking-wider text-xs md:text-sm">{labels.history}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">{details.history}</p>
                  </section>
                  <hr className="border-gray-100" />
                  <section>
                    <div className="flex items-center gap-2 mb-2 text-diplomatic-800">
                      <Handshake className="w-4 h-4 md:w-5 md:h-5" />
                      <h3 className="font-bold uppercase tracking-wider text-xs md:text-sm">{labels.contribution}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">{details.contribution}</p>
                  </section>
                  <hr className="border-gray-100" />
                  <section>
                    <div className="flex items-center gap-2 mb-2 text-diplomatic-800">
                      <Star className="w-4 h-4 md:w-5 md:h-5" />
                      <h3 className="font-bold uppercase tracking-wider text-xs md:text-sm">{labels.meaning}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">{details.meaning}</p>
                  </section>
                </motion.div>
              )}

              {/* --- MILESTONES TAB --- */}
              {activeTab === 'milestones' && details && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 md:space-y-8 px-1 md:px-2 py-2 md:py-4"
                >
                  <div className="relative border-l-2 border-dashed border-diplomatic-200 ml-3 md:ml-6 space-y-8 md:space-y-10 pb-2">
                    {details.milestones.map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-6 md:pl-10 group"
                      >
                        {/* Dot with pulse effect */}
                        <div className="absolute -left-[9px] top-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white border-4 border-diplomatic-900 rounded-full z-10 group-hover:border-gold-500 transition-colors"></div>
                          <div className="absolute w-8 h-8 bg-diplomatic-900/10 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gold-200 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                          {/* Decorative background number */}
                          <div className="absolute -right-4 -bottom-6 text-7xl md:text-8xl font-bold text-gray-50 opacity-5 pointer-events-none select-none">
                            {idx + 1}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 md:mb-3 relative z-10">
                            <span className="inline-flex items-center justify-center px-3 py-1 md:px-4 md:py-1.5 bg-gradient-to-r from-diplomatic-900 to-diplomatic-800 text-gold-400 text-xs md:text-sm font-bold rounded-full shadow-sm w-fit">
                              {milestone.year}
                            </span>
                            <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent hidden sm:block"></div>
                          </div>
                          <p className="text-gray-700 font-medium leading-relaxed relative z-10 text-sm md:text-base">{milestone.event}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* --- QUIZ LAUNCHER TAB --- */}
              {activeTab === 'quiz' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                  className="flex flex-col items-center justify-center h-full text-center py-4 md:py-8"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-xl ring-4 ring-yellow-100">
                    <Star className="w-8 h-8 md:w-12 md:h-12 text-white fill-current" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif font-bold text-diplomatic-900 mb-3 md:mb-4">{labels.quizTitle}</h3>
                  <p className="text-gray-600 max-w-md mb-6 md:mb-8 leading-relaxed text-sm md:text-base px-2">
                    {labels.quizDesc}
                  </p>

                  <button
                    onClick={() => onStartQuiz()}
                    className="group relative px-6 py-3 md:px-8 md:py-4 bg-diplomatic-900 text-white font-bold rounded-xl shadow-lg overflow-hidden transition-transform active:scale-95 hover:shadow-2xl text-sm md:text-base"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {labels.startQuiz} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </motion.div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 shrink-0 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm text-gray-700"
          >
            {labels.back}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

// Simple Icon component for the tabs
const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
)

export default InfoModal;
