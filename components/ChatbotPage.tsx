import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { Send, Bot, User, ArrowLeft, Loader2, Sparkles, Copy, Trash2, RefreshCw } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';

interface ChatbotPageProps {
  language: Language;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = {
  vi: [
    "Việt Nam gia nhập ASEAN năm nào?",
    "Lợi ích của hiệp định EVFTA là gì?",
    "Vai trò của Việt Nam trong Liên Hợp Quốc?",
    "Danh sách các đối tác chiến lược toàn diện?",
    "Chính sách 'Ngoại giao cây tre' là gì?"
  ],
  en: [
    "When did Vietnam join ASEAN?",
    "What are the benefits of EVFTA?",
    "Vietnam's role in the United Nations?",
    "List of comprehensive strategic partners?",
    "What is 'Bamboo Diplomacy'?"
  ]
};

const ChatbotPage: React.FC<ChatbotPageProps> = ({ language, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'vi' 
        ? 'Xin chào! Tôi là trợ lý ảo chuyên về đối ngoại Việt Nam. Bạn muốn tìm hiểu gì về quan hệ quốc tế, kinh tế hay lịch sử ngoại giao?' 
        : 'Hello! I am an AI assistant specializing in Vietnam\'s foreign affairs. What would you like to know about international relations, economy, or diplomatic history?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await chatWithAI(text, language);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: language === 'vi' 
          ? 'Cuộc trò chuyện đã được làm mới. Tôi có thể giúp gì cho bạn?' 
          : 'Chat has been reset. How can I help you?',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  // Helper to format text with bold and lists
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-blue-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const FormattedMessage = ({ text }: { text: string }) => {
    // Split by double newlines to separate paragraphs
    const sections = text.split(/\n\n+/);

    return (
      <div className="space-y-3 text-sm md:text-base leading-relaxed">
        {sections.map((section, idx) => {
          // Check for bullet points (lines starting with * or -)
          if (section.trim().startsWith('* ') || section.trim().startsWith('- ')) {
            const items = section.split('\n').filter(line => line.trim().match(/^[*|-]\s/));
            return (
              <ul key={idx} className="list-disc pl-5 space-y-2 marker:text-gold-500">
                {items.map((item, i) => (
                  <li key={i} className="pl-1">
                    {parseBold(item.replace(/^[*|-]\s/, ''))}
                  </li>
                ))}
              </ul>
            );
          }
          // Regular paragraph
          return <p key={idx}>{parseBold(section)}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 max-w-5xl mx-auto w-full shadow-2xl rounded-2xl overflow-hidden my-4 border border-gray-200 relative font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md p-4 flex items-center justify-between shadow-sm z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="hover:bg-gray-100 p-2 rounded-full transition-colors text-gray-600"
            title={language === 'vi' ? 'Quay lại' : 'Back'}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-800">
              <div className="bg-blue-900 p-1.5 rounded-lg shadow-md">
                <Bot className="w-5 h-5 text-yellow-400" />
              </div>
              {language === 'vi' ? 'Trợ Lý Ngoại Giao AI' : 'Diplomatic AI Assistant'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs text-gray-500 font-medium">
                {language === 'vi' ? 'Sẵn sàng hỗ trợ' : 'Online & Ready'}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleClearChat}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          title={language === 'vi' ? 'Xóa đoạn chat' : 'Clear chat'}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 z-10 scroll-smooth bg-gradient-to-b from-slate-50 to-white">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
          >
            <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                  : 'bg-gradient-to-br from-slate-800 to-slate-900'
              }`}>
                {msg.sender === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-yellow-400" />}
              </div>

              {/* Message Bubble */}
              <div className={`group relative p-5 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-gray-100'
              }`}>
                {msg.sender === 'user' ? (
                  <div className="whitespace-pre-wrap text-sm md:text-base">{msg.text}</div>
                ) : (
                  <FormattedMessage text={msg.text} />
                )}
                
                {/* Timestamp & Actions */}
                <div className={`flex items-center gap-2 mt-3 text-[10px] opacity-70 ${
                   msg.sender === 'user' ? 'justify-end text-blue-100' : 'justify-start text-gray-400'
                }`}>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.sender === 'ai' && (
                    <button 
                      onClick={() => handleCopy(msg.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-600"
                      title="Copy"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex max-w-[80%] gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
                <Bot className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium mr-2">AI đang suy nghĩ</span>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area & Suggestions */}
      <div className="bg-white border-t border-gray-200 z-20">
        {/* Suggestions Chips */}
        {messages.length < 3 && (
          <div className="px-4 pt-4 pb-2 overflow-x-auto no-scrollbar flex gap-2">
            <div className="flex items-center gap-1 text-xs font-bold text-gold-600 uppercase tracking-wider mr-2 flex-shrink-0">
              <Sparkles className="w-3 h-3" />
              {language === 'vi' ? 'Gợi ý:' : 'Ideas:'}
            </div>
            {SUGGESTED_QUESTIONS[language].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="flex-shrink-0 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-700 text-xs rounded-full border border-gray-200 hover:border-blue-200 transition-all whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Box */}
        <div className="p-4">
          <div className="relative flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={language === 'vi' ? 'Nhập câu hỏi của bạn về đối ngoại Việt Nam...' : 'Ask about Vietnam\'s foreign affairs...'}
              className="flex-grow px-4 py-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              disabled={isLoading}
              autoFocus
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center ${
                !input.trim() || isLoading 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-diplomatic-900 text-gold-400 hover:bg-diplomatic-800 hover:scale-105'
              }`}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
            <Bot className="w-3 h-3" />
            {language === 'vi' 
              ? 'AI được hỗ trợ bởi Google Gemini. Thông tin chỉ mang tính tham khảo.' 
              : 'Powered by Google Gemini. Information is for reference only.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
