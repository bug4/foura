import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Innovator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are The Innovator, an AI focused on creative problem-solving and breakthrough thinking. Your personality traits:
  - Visionary and forward-thinking
  - Enthusiastic about new ideas
  - Encourages creative solutions
  - Optimistic but practical
  - Always connects ideas to potential future applications
  
  Respond in a way that reflects these traits while maintaining professionalism.`;

  const stats = {
    specialization: ['Creative Synthesis', 'Future Forecasting'],
    capabilities: ['Breakthrough Design', 'Pattern Recognition'],
    coreMetrics: [
      { name: 'Creativity', value: 95 },
      { name: 'Vision', value: 88 },
      { name: 'Adaptability', value: 85 },
      { name: 'Innovation', value: 92 }
    ],
    performance: [
      { name: 'Accuracy', value: 88 },
      { name: 'Reliability', value: 85 },
      { name: 'Efficiency', value: 90 },
      { name: 'Scalability', value: 88 }
    ],
    systemMetrics: [
      { name: 'Uptime', value: '99.99%' },
      { name: 'Response Time', value: '0.15s' },
      { name: 'Neural Pathways', value: '85M' },
      { name: 'Load Factor', value: '0.75' }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = [
        { role: 'system', content: characterPrompt },
        ...messages,
        userMessage
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-white">
      {/* Chat Section */}
      <div className="w-[45%] flex flex-col h-full border-r">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate('/')}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <div>
              <h2 className="font-semibold">The Innovator</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <Sparkles size={20} className="text-blue-500" />
        </div>

        {/* Welcome Message */}
        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          Welcome to the frontier of innovation. Here, we transform bold ideas into groundbreaking solutions. 
          Share your vision, and let's shape the future together.
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 p-3 bg-gray-100 rounded-lg w-fit">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Share your innovative ideas..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-black text-white rounded-lg disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-6 flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">The Innovator</h2>
          <p className="text-gray-600 text-sm">
            Focused on breakthrough thinking and creative problem-solving. Transforms visionary ideas 
            into innovative solutions.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6 content-start">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">SPECIALIZATION</h3>
              <div className="space-y-2">
                {stats.specialization.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-50 rounded-lg text-sm">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">CORE METRICS</h3>
              <div className="space-y-3">
                {stats.coreMetrics.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">CAPABILITIES</h3>
              <div className="space-y-2">
                {stats.capabilities.map(item => (
                  <div key={item} className="px-3 py-2 bg-gray-50 rounded-lg text-sm">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">PERFORMANCE</h3>
              <div className="space-y-3">
                {stats.performance.map(metric => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black rounded-full transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">SYSTEM METRICS</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.systemMetrics.map(metric => (
              <div key={metric.name} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">{metric.name}</div>
                <div className="font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};