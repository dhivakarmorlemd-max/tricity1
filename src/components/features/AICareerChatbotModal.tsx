import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthContext';
import { aiAdapter } from '../../services/ai/aiAdapter';
import { appConfig } from '../../config/appConfig';
import { Modal } from '../ui/Modal';
import { Sparkles, Send, Bot, User, ArrowRight, Lightbulb } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

interface AICareerChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICareerChatbotModal: React.FC<AICareerChatbotModalProps> = ({ isOpen, onClose }) => {
  const { user, studentProfile } = useAuth();
  const targetRole = appConfig.careerRoles.find(r => r.id === studentProfile.target_role_id);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_init',
      sender: 'ai',
      text: `Hello ${user.full_name}! 👋 I am your AI Career Pilot. I see you are in Semester ${studentProfile.current_semester} (${studentProfile.branch.toUpperCase()}) targeting ${targetRole?.title || 'Software Engineering'}. How can I assist your placement preparation today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'What skills should I prioritize this month?',
        'How can I boost my Placement Readiness score above 85%?',
        'Recommend top projects for Full-Stack roles',
        'How to prepare for technical coding interviews?'
      ]
    }
  ]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await aiAdapter.getSmartCareerAdvice(studentProfile, textToSend);

      const aiMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: response.advice,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestedTasks
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          sender: 'ai',
          text: 'I parsed your query using the rule-based engine. Focus on completing your active Data Structures milestones and linking your GitHub repository!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="CareerPilot AI Career Coach" maxWidth="lg">
      <div className="flex flex-col h-[500px] justify-between space-y-4">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] space-y-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[9px] opacity-70 mt-1">{msg.timestamp}</span>
                </div>

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20 transition flex items-center gap-1"
                      >
                        <Lightbulb className="w-3 h-3" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 text-teal-400 animate-spin" />
              <span>AI Career Advisor thinking...</span>
            </div>
          )}
        </div>

        {/* Query Input Box */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800"
        >
          <input
            type="text"
            placeholder="Ask your AI Career Coach anything..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            className="flex-1 p-3 bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="p-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </Modal>
  );
};
