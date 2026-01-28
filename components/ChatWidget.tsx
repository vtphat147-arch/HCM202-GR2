import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { Send, Bot, User, X, Loader2, Sparkles, Copy, Trash2, MessageSquare } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatWidgetProps {
    language: Language;
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

const ChatWidget: React.FC<ChatWidgetProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: language === 'vi'
                ? 'Xin chào! Tôi là trợ lý ảo AI. Bạn cần tìm hiểu gì về đối ngoại Việt Nam?'
                : 'Hello! I am an AI assistant. What would you like to know about Vietnam\'s foreign affairs?',
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
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

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
        const sections = text.split(/\n\n+/);
        return (
            <div className="space-y-2 text-sm leading-relaxed">
                {sections.map((section, idx) => {
                    if (section.trim().startsWith('* ') || section.trim().startsWith('- ')) {
                        const items = section.split('\n').filter(line => line.trim().match(/^[*|-]\s/));
                        return (
                            <ul key={idx} className="list-disc pl-4 space-y-1 marker:text-gold-500">
                                {items.map((item, i) => (
                                    <li key={i} className="pl-1">
                                        {parseBold(item.replace(/^[*|-]\s/, ''))}
                                    </li>
                                ))}
                            </ul>
                        );
                    }
                    return <p key={idx}>{parseBold(section)}</p>;
                })}
            </div>
        );
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 bg-white w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden pointer-events-auto flex flex-col font-sans"
                    >
                        {/* Header */}
                        <div className="bg-diplomatic-900 text-white p-4 flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-full">
                                    <Bot className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm md:text-base">
                                        {language === 'vi' ? 'Trợ lý AI' : 'AI Assistant'}
                                    </h3>
                                    <div className="flex items-center gap-1.5 opacity-80">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                        <p className="text-[10px] font-medium">Online</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleClearChat}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                                    title={language === 'vi' ? 'Xóa đoạn chat' : 'Clear chat'}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm'} p-3 shadow-sm`}>
                                        {msg.sender === 'user' ? (
                                            <div className="text-sm">{msg.text}</div>
                                        ) : (
                                            <FormattedMessage text={msg.text} />
                                        )}
                                        <div className={`text-[9px] mt-1 flex justify-end gap-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {msg.sender === 'ai' && (
                                                <button onClick={() => handleCopy(msg.text)} title="Copy">
                                                    <Copy className="w-3 h-3 hover:text-blue-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                        <span className="text-xs text-gray-500">AI is typing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input & Suggestions */}
                        <div className="bg-white border-t border-gray-100 p-3 z-10">
                            {/* Chips */}
                            {messages.length < 3 && (
                                <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-1">
                                    {SUGGESTED_QUESTIONS[language].map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(q)}
                                            className="whitespace-nowrap px-3 py-1 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 rounded-full text-xs transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="relative flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-blue-400 transition-colors">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={language === 'vi' ? 'Hỏi tôi bất cứ điều gì...' : 'Ask me anything...'}
                                    className="flex-grow px-3 py-1.5 bg-transparent text-sm focus:outline-none text-gray-700"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className={`p-2 rounded-full transition-all flex-shrink-0 ${!input.trim() || isLoading
                                            ? 'bg-gray-200 text-gray-400'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-[9px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Powered by Gemini
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`pointer-events-auto p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative group ${isOpen ? 'bg-gray-200 text-gray-600 rotate-90' : 'bg-diplomatic-900 text-gold-400 hover:bg-blue-900'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}

                {/* Tooltip */}
                {!isOpen && (
                    <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {language === 'vi' ? 'Trợ lý AI' : 'AI Assistant'}
                    </span>
                )}

                {/* Ping Animation when closed */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
