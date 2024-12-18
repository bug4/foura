import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Innovator } from './components/Innovator';
import { Navigator } from './components/Navigator';
import { Constructor } from './components/Constructor';
import { Observer } from './components/Observer';

const Notification = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="fixed top-4 left-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50"
  >
    Public GitHub repository for Foura will be available in the next update.
  </motion.div>
);

const LoadingScreen = ({ onLoadingComplete }) => {
  const items = [
    "Initializing system components",
    "Loading AI neural networks",
    "Connecting to data streams",
    "Rendering user interface",
    "System ready"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-gray-600">{item}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.5 + 0.3 }}
              className="text-green-500"
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MainScreen = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const models = [
    {
      title: "The Innovator",
      description: "Breaking boundaries through creative ideation and transformative thinking, crafting tomorrow's solutions today.",
      path: "/innovator",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 12h5v9h10v-9h5L12 2z" />
          <circle cx="12" cy="15" r="1" />
        </svg>
      )
    },
    {
      title: "The Navigator",
      description: "Guiding through complexity with strategic precision and systematic decision architecture.",
      path: "/navigator",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
        </svg>
      )
    },
    {
      title: "The Constructor",
      description: "Building robust solutions and optimized systems with technical excellence and precision.",
      path: "/constructor",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      title: "The Observer",
      description: "Transforming data into insight through pattern recognition and predictive understanding.",
      path: "/observer",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M5.6 5.6l2.1 2.1" />
          <path d="M16.3 16.3l2.1 2.1" />
          <path d="M5.6 18.4l2.1-2.1" />
          <path d="M16.3 7.7l2.1-2.1" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* System Status */}
      <div className="fixed top-4 right-4 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm text-gray-600">System Online</span>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && <Notification />}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold mb-6 text-gray-900"
            >
              Foura
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Four specialized intelligences working in harmony: visionary innovation, strategic guidance, technical mastery, and analytical precision. Each contributing its unique perspective to solve tomorrow's challenges.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {models.map((model, index) => (
              <motion.div
                key={model.title}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                className="bg-white p-6 rounded-xl shadow-lg cursor-pointer border border-gray-100 hover:border-gray-200"
                onClick={() => navigate(model.path)}
              >
                <motion.div 
                  className="text-gray-800 mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {model.icon}
                </motion.div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{model.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{model.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <button 
              onClick={() => navigate('/innovator')} 
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Begin Interaction →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-4 py-6">
        <div 
          className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          onClick={() => window.open('https://twitter.com/FouraAI', '_blank')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        </div>
        <div 
          className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          onClick={() => {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/innovator" element={<Innovator />} />
          <Route path="/navigator" element={<Navigator />} />
          <Route path="/constructor" element={<Constructor />} />
          <Route path="/observer" element={<Observer />} />
        </Routes>
      )}
    </div>
  );
};

export default App;