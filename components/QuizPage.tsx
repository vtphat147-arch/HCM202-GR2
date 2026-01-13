
import React, { useState, useEffect } from 'react';
import { QuizQuestion, RegionData, Language } from '../types';
import { fetchRegionQuiz } from '../services/geminiService';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Award, RefreshCw, ChevronRight } from 'lucide-react';

interface QuizPageProps {
  region: RegionData;
  language: Language;
  onBack: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ region, language, onBack }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({}); // { questionIndex: answerIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const isVi = language === 'vi';
  
  const texts = {
    loading: isVi ? `Đang để AI soạn bộ đề thi về ${region.name}...` : `AI is generating quiz for ${region.name}...`,
    title: isVi ? 'Thử Thách Kiến Thức' : 'Knowledge Challenge',
    subtitle: region.name,
    question: isVi ? 'Câu hỏi' : 'Question',
    next: isVi ? 'Tiếp theo' : 'Next',
    finish: isVi ? 'Nộp bài & Xem điểm' : 'Submit & Check Score',
    score: isVi ? 'Điểm số của bạn' : 'Your Score',
    perfect: isVi ? 'Xuất sắc! Bạn là nhà ngoại giao tài ba!' : 'Excellent! You are a master diplomat!',
    good: isVi ? 'Rất tốt! Bạn có kiến thức vững chắc.' : 'Very good! Solid knowledge.',
    average: isVi ? 'Khá tốt. Hãy ôn lại thêm nhé.' : 'Not bad. Review a bit more.',
    poor: isVi ? 'Cần cố gắng thêm.' : 'Keep trying.',
    review: isVi ? 'Chi tiết đáp án' : 'Answer Review',
    yourAns: isVi ? 'Bạn chọn:' : 'You chose:',
    correctAns: isVi ? 'Đáp án đúng:' : 'Correct answer:',
    explain: isVi ? 'Giải thích:' : 'Explanation:',
    back: isVi ? 'Quay lại bản đồ' : 'Back to Map',
    retry: isVi ? 'Làm bộ đề mới' : 'New Quiz',
  };

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      const data = await fetchRegionQuiz(region.name, language);
      setQuestions(data);
      setLoading(false);
    };
    loadQuiz();
  }, [region.name, language]);

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setLoading(true);
    fetchRegionQuiz(region.name, language).then(data => {
      setQuestions(data);
      setLoading(false);
    });
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-diplomatic-200 border-t-gold-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-diplomatic-900 animate-pulse text-center">{texts.loading}</h2>
        <p className="text-gray-500 mt-2 text-center text-sm max-w-md">Gemini AI đang tổng hợp dữ liệu lịch sử và sự kiện mới nhất...</p>
      </div>
    );
  }

  // --- Result View ---
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = texts.poor;
    if (percentage === 100) message = texts.perfect;
    else if (percentage >= 80) message = texts.good;
    else if (percentage >= 50) message = texts.average;

    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Result */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-8 border-diplomatic-900 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="w-40 h-40 text-gold-500" />
             </div>
             
             <h2 className="text-3xl font-serif font-bold text-diplomatic-900 mb-2">{texts.subtitle}</h2>
             <p className="text-gray-500 mb-6 uppercase tracking-wider text-sm">{texts.title}</p>
             
             <div className="inline-block p-6 rounded-full bg-diplomatic-50 mb-4 ring-4 ring-diplomatic-100">
               <span className={`text-5xl font-bold ${percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-gold-600' : 'text-red-500'}`}>
                 {score}/{questions.length}
               </span>
             </div>
             
             <h3 className="text-xl font-bold text-gray-800 mb-6">{message}</h3>
             
             <div className="flex justify-center gap-4 flex-wrap">
               <button onClick={onBack} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition flex items-center gap-2">
                 <ArrowLeft className="w-4 h-4" /> {texts.back}
               </button>
               <button onClick={handleRetry} className="px-6 py-2 rounded-lg bg-diplomatic-900 text-white font-bold hover:bg-diplomatic-800 transition flex items-center gap-2 shadow-lg hover:shadow-xl">
                 <RefreshCw className="w-4 h-4" /> {texts.retry}
               </button>
             </div>
          </div>

          {/* Detailed Review */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-diplomatic-900 border-b pb-2">{texts.review}</h3>
            {questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctAnswerIndex;
              const userChoice = userAnswers[idx];
              
              return (
                <div key={q.id} className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-white text-sm ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-gray-800 text-lg">{q.question}</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* User Answer */}
                    <div className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <span className="text-xs font-bold uppercase block mb-1 opacity-70">{texts.yourAns}</span>
                      <div className="flex items-center gap-2 font-medium">
                        {isCorrect ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        {userChoice !== undefined ? q.options[userChoice] : '(Không trả lời)'}
                      </div>
                    </div>
                    
                    {/* Correct Answer (if wrong) */}
                    {!isCorrect && (
                      <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                        <span className="text-xs font-bold uppercase block mb-1 opacity-70">{texts.correctAns}</span>
                        <div className="flex items-center gap-2 font-medium text-blue-900">
                          <CheckCircle className="w-4 h-4" />
                          {q.options[q.correctAnswerIndex]}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 flex gap-2">
                    <AlertCircle className="w-5 h-5 text-gold-500 shrink-0" />
                    <div>
                      <span className="font-bold mr-1">{texts.explain}</span>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- Active Quiz View ---
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
              {isVi ? "Hệ thống AI đang bận" : "AI System Busy"}
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
              {isVi 
                ? "Hiện tại Gemini AI đang quá tải hoặc đã hết hạn mức sử dụng miễn phí. Vui lòng quay lại sau." 
                : "Gemini AI is currently overloaded or free quota exceeded. Please try again later."}
          </p>
          <button onClick={onBack} className="px-6 py-2 rounded-lg bg-diplomatic-900 text-white font-bold hover:bg-diplomatic-800 transition">
              {texts.back}
          </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIdx];
  const isLastQ = currentQuestionIdx === questions.length - 1;
  const progress = ((currentQuestionIdx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="font-bold text-diplomatic-900 uppercase text-sm tracking-wider">{texts.title}</h1>
            <p className="text-gold-600 font-bold text-lg">{region.name}</p>
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
          
          {/* Progress Bar */}
          <div className="bg-gray-100 h-2 w-full">
            <div 
              className="bg-gold-500 h-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {texts.question} {currentQuestionIdx + 1} / {questions.length}
              </span>
              <span className="text-xs px-2 py-1 bg-diplomatic-100 text-diplomatic-800 rounded font-bold">
                10 Points
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-8 leading-snug">
              {currentQ.question}
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group ${
                    userAnswers[currentQuestionIdx] === idx
                      ? 'border-diplomatic-900 bg-diplomatic-50 shadow-md transform scale-[1.01]'
                      : 'border-gray-100 hover:border-gold-400 hover:bg-yellow-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors ${
                    userAnswers[currentQuestionIdx] === idx
                      ? 'bg-diplomatic-900 border-diplomatic-900 text-white'
                      : 'border-gray-300 text-gray-400 group-hover:border-gold-400 group-hover:text-gold-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`font-medium text-lg ${
                    userAnswers[currentQuestionIdx] === idx ? 'text-diplomatic-900' : 'text-gray-600'
                  }`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
               {isLastQ ? (
                 <button
                    onClick={handleSubmit}
                    disabled={userAnswers[currentQuestionIdx] === undefined}
                    className="px-8 py-3 bg-gradient-to-r from-gold-500 to-yellow-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                   {texts.finish} <CheckCircle className="w-5 h-5" />
                 </button>
               ) : (
                 <button
                    onClick={handleNext}
                    disabled={userAnswers[currentQuestionIdx] === undefined}
                    className="px-8 py-3 bg-diplomatic-900 text-white rounded-xl font-bold shadow-lg hover:bg-diplomatic-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                   {texts.next} <ChevronRight className="w-5 h-5" />
                 </button>
               )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
