import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LabWorkspace from './components/LabWorkspace';
import HowItWorks from './components/HowItWorks';

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.style.setProperty('--color-bg-primary', '#f8fafc');
      document.documentElement.style.setProperty('--color-bg-secondary', '#f1f5f9');
      document.documentElement.style.setProperty('--color-bg-card', '#ffffff');
      document.documentElement.style.setProperty('--color-text', '#0f172a');
      document.documentElement.style.setProperty('--color-text-muted', '#64748b');
      document.documentElement.style.setProperty('--color-text-dim', '#94a3b8');
    } else {
      document.documentElement.style.setProperty('--color-bg-primary', '#080a0f');
      document.documentElement.style.setProperty('--color-bg-secondary', '#0d1118');
      document.documentElement.style.setProperty('--color-bg-card', '#11161f');
      document.documentElement.style.setProperty('--color-text', '#f8fafc');
      document.documentElement.style.setProperty('--color-text-muted', '#94a3b8');
      document.documentElement.style.setProperty('--color-text-dim', '#64748b');
    }
  }, [theme]);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text">
      <Navbar
        page={page}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onReset={() => navigate('home')}
        showReset={page === 'lab'}
      />

      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Hero
              onLaunchLab={() => navigate('lab')}
              onLearnMore={() => navigate('how-it-works')}
            />
            <footer className="border-t border-white/[0.08] py-8 text-center">
              <p className="text-xs text-text-dim">
                Image Processing Lab — Interactive Educational Tool
              </p>
            </footer>
          </motion.main>
        )}

        {page === 'lab' && (
          <motion.main
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LabWorkspace onResetAll={() => {}} />
          </motion.main>
        )}

        {page === 'how-it-works' && (
          <motion.main
            key="how-it-works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HowItWorks onLaunchLab={() => navigate('lab')} />
            <footer className="border-t border-white/[0.08] py-8 text-center">
              <p className="text-xs text-text-dim">
                Image Processing Lab — Interactive Educational Tool
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
