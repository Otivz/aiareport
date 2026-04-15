import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Shield, Lock, AlertTriangle, CheckCircle2, XCircle, Database, Code, Server, Terminal } from 'lucide-react';

interface Section {
  heading: string;
  items?: string[];
  content?: string[];
  status?: 'success' | 'warning' | 'danger';
}

interface Slide {
  id: number;
  type: 'title' | 'content' | 'summary';
  title: string;
  subtitle?: string;
  date?: string;
  sections?: Section[];
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'title',
    title: 'OWASP Secure Coding Practices Audit',
    subtitle: 'Project: 3022-Cafe-Go',
    date: 'April 14, 2026',
    sections: [
      {
        heading: 'Members',
        items: [
          'Geronimo, Eron Dave G.',
          'Santiago, Mark Angelo',
          'Frias, Kyla Bianca S.',
          'Vito Cruz, Emmanuel F.',
          'Arriola, Kyla Joy',
        ],
      },
    ],
  },
  {
    id: 2,
    type: 'content',
    title: 'Audit Objective & Scope',
    sections: [
      {
        heading: 'Objective',
        content: ['Evaluate system security using OWASP Secure Coding Practices']
      },
      {
        heading: 'Scope',
        items: ['Django Backend', 'REST API', 'Authentication', 'Database Security']
      }
    ]
  },
  {
    id: 3,
    type: 'content',
    title: 'Security Summary',
    sections: [
      {
        heading: 'Existing',
        items: ['Password hashing (PBKDF2)', 'Server-side validation', 'Parameterized queries', 'Secure token generation'],
        status: 'success'
      },
      {
        heading: 'Partial',
        items: ['Input validation', 'Access control', 'Logging', 'HTTPS enforcement'],
        status: 'warning'
      }
    ]
  },
  {
    id: 4,
    type: 'content',
    title: 'Input & Output Security',
    sections: [
      {
        heading: 'Existing',
        items: ['Server-side validation', 'UTF-8 encoding'],
        status: 'success'
      },
      {
        heading: 'Partial',
        items: ['Manual validation', 'Manual response building'],
        status: 'warning'
      },
      {
        heading: 'Risk',
        content: ['Injection & XSS vulnerabilities'],
        status: 'danger'
      }
    ]
  },
  {
    id: 5,
    type: 'content',
    title: 'Authentication & Session Security',
    sections: [
      {
        heading: 'Existing',
        items: ['Django authentication', 'Secure password hashing', 'POST authentication'],
        status: 'success'
      },
      {
        heading: 'Partial',
        items: ['Custom token authentication', 'Cookies not fully HttpOnly'],
        status: 'warning'
      },
      {
        heading: 'Risk',
        content: ['Authentication bypass'],
        status: 'danger'
      }
    ]
  },
  {
    id: 6,
    type: 'content',
    title: 'Access Control & Data Protection',
    sections: [
      {
        heading: 'Partial',
        items: ['AllowAny permissions', 'Inconsistent role enforcement', 'Tokens in sessionStorage', 'Float currency calculations'],
        status: 'warning'
      },
      {
        heading: 'Risk',
        content: ['Unauthorized access', 'Token theft'],
        status: 'danger'
      }
    ]
  },
  {
    id: 7,
    type: 'content',
    title: 'Cryptography & Communication Security',
    sections: [
      {
        heading: 'Existing',
        items: ['Server-side hashing', 'JWT signing'],
        status: 'success'
      },
      {
        heading: 'Partial',
        items: ['Hardcoded fallback secrets', 'HTTP only configuration'],
        status: 'warning'
      },
      {
        heading: 'Risk',
        content: ['Secret exposure', 'Data interception'],
        status: 'danger'
      }
    ]
  },
  {
    id: 8,
    type: 'content',
    title: 'Error Handling & System Configuration',
    sections: [
      {
        heading: 'Existing',
        items: ['Directory listing disabled'],
        status: 'success'
      },
      {
        heading: 'Partial',
        items: ['Raw exception responses', 'Print debugging', 'Test code in production'],
        status: 'warning'
      },
      {
        heading: 'Risk',
        content: ['Information disclosure'],
        status: 'danger'
      }
    ]
  },
  {
    id: 9,
    type: 'content',
    title: 'Database & Coding Practices',
    sections: [
      {
        heading: 'Existing',
        items: ['Parameterized queries', 'Python memory management'],
        status: 'success'
      },
      {
        heading: 'Partial',
        items: ['Root database user', 'Raw SQL usage', 'Manual dictionary building'],
        status: 'warning'
      },
      {
        heading: 'Risk',
        content: ['Database compromise'],
        status: 'danger'
      }
    ]
  },
  {
    id: 10,
    type: 'summary',
    title: 'Key Issues & Recommendations',
    sections: [
      {
        heading: 'Critical Issues',
        items: ['Authentication bypass risk', 'AllowAny admin endpoints', 'No HTTPS enforcement', 'Root database access'],
        status: 'danger'
      },
      {
        heading: 'Recommendations',
        items: ['Enforce authentication', 'Implement HTTPS', 'Replace root DB user', 'Add structured logging'],
        status: 'success'
      }
    ]
  }
];

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(30, 136, 229, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(30, 136, 229, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E88E5] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent" />
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1E88E5]/50 to-transparent"
      initial={{ top: '-2px' }}
      animate={{ top: '100%' }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}

function TitleSlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative px-2 sm:px-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center relative w-full max-w-3xl"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-10"
        >
          <Shield size={200} strokeWidth={1} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 inline-block"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#1E88E5]" />
            <Terminal className="text-[#1E88E5]" size={32} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#1E88E5]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl xs:text-5xl sm:text-6xl mb-8 tracking-tight break-words"
          style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
        >
          <span className="bg-gradient-to-r from-[#1E88E5] to-[#FF6B35] bg-clip-text text-transparent">
            OWASP
          </span>
          <br />
          <span className="text-white">Secure Coding</span>
          <br />
          <span className="text-white/90">Practices Audit</span>
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="text-lg xs:text-xl sm:text-2xl text-[#1E88E5]" style={{ fontFamily: 'Azeret Mono, monospace' }}>
            {'>'} {slide.subtitle}
          </div>
          <div className="text-base xs:text-lg sm:text-xl text-white/60" style={{ fontFamily: 'Syne, sans-serif' }}>
            {slide.date}
          </div>
        </motion.div>

        {/* Members Section */}
        {slide.sections && slide.sections[0]?.heading === 'Members' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 sm:mt-12"
          >
            <div className="text-lg xs:text-xl sm:text-2xl text-white font-semibold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Members:
            </div>
            <ul className="space-y-1 text-base xs:text-lg sm:text-xl text-white/80" style={{ fontFamily: 'Syne, sans-serif' }}>
              {slide.sections[0].items?.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function ContentSlide({ slide }: { slide: Slide }) {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 size={18} className="text-[#4CAF50]" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-[#FF6B35]" />;
      case 'danger':
        return <XCircle size={18} className="text-[#F44336]" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'border-[#4CAF50]/30 bg-[#4CAF50]/5';
      case 'warning':
        return 'border-[#FF6B35]/30 bg-[#FF6B35]/5';
      case 'danger':
        return 'border-[#F44336]/30 bg-[#F44336]/5';
      default:
        return 'border-[#1E88E5]/30 bg-[#1E88E5]/5';
    }
  };

  return (
    <div className="h-full flex flex-col py-8 xs:py-12 sm:py-16 md:py-20 px-2 xs:px-4 sm:px-8 md:px-16 lg:px-24">
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl xs:text-4xl sm:text-5xl mb-8 xs:mb-10 sm:mb-16 relative inline-block break-words"
        style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
      >
        <span className="relative z-10 text-white">{slide.title}</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1E88E5] to-[#FF6B35]"
        />
      </motion.h2>

      <div className="flex-1 space-y-6 xs:space-y-8">
        {slide.sections?.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + idx * 0.15, duration: 0.5 }}
            className={`border rounded-lg p-4 xs:p-5 sm:p-6 backdrop-blur-sm ${getStatusColor(section.status)}`}
          >
            <div className="flex items-center gap-3 mb-4">
              {getStatusIcon(section.status)}
              <h3
                className="text-lg xs:text-xl sm:text-2xl text-white/90"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 500 }}
              >
                {section.heading}
              </h3>
            </div>

            {section.items && (
              <ul className="space-y-2 xs:space-y-3">
                {section.items.map((item, itemIdx) => (
                  <motion.li
                    key={itemIdx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.15 + itemIdx * 0.1 }}
                    className="flex items-start gap-2 xs:gap-3 text-white/80"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    <span className="text-[#1E88E5] mt-1.5" style={{ fontFamily: 'Azeret Mono, monospace' }}>
                      {'//'}
                    </span>
                    <span className="text-base xs:text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {section.content && (
              <div className="space-y-2">
                {section.content.map((text, textIdx) => (
                  <motion.p
                    key={textIdx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.15 + textIdx * 0.1 }}
                    className="text-base xs:text-lg text-white/80"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SummarySlide({ slide }: { slide: Slide }) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'border-[#4CAF50]/30 bg-[#4CAF50]/5';
      case 'danger':
        return 'border-[#F44336]/30 bg-[#F44336]/5';
      default:
        return 'border-[#1E88E5]/30 bg-[#1E88E5]/5';
    }
  };

  return (
    <div className="h-full flex flex-col py-8 xs:py-12 sm:py-16 md:py-20 px-2 xs:px-4 sm:px-8 md:px-16 lg:px-24">
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl xs:text-4xl sm:text-5xl mb-8 xs:mb-10 sm:mb-16 relative inline-block break-words"
        style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 600 }}
      >
        <span className="relative z-10 text-white">{slide.title}</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1E88E5] to-[#FF6B35]"
        />
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 flex-1">
        {slide.sections?.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + idx * 0.2, duration: 0.5 }}
            className={`border rounded-lg p-4 xs:p-6 sm:p-8 backdrop-blur-sm ${getStatusColor(section.status)} flex flex-col`}
          >
            <h3
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl mb-4 xs:mb-6 text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 500 }}
            >
              {section.heading}
            </h3>

            <ul className="space-y-2 xs:space-y-3 sm:space-y-4 flex-1">
              {section.items?.map((item, itemIdx) => (
                <motion.li
                  key={itemIdx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + idx * 0.2 + itemIdx * 0.1 }}
                  className="flex items-start gap-2 xs:gap-3 text-white/80"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  <span className={`mt-1.5 ${section.status === 'danger' ? 'text-[#F44336]' : 'text-[#4CAF50]'}`}>
                    {section.status === 'danger' ? '✕' : '✓'}
                  </span>
                  <span className="text-base xs:text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="size-full relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#0d2847] to-[#0B1F3A]">
      <GridBackground />
      <ScanLine />

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            {slide.type === 'title' && <TitleSlide slide={slide} />}
            {slide.type === 'content' && <ContentSlide slide={slide} />}
            {slide.type === 'summary' && <SummarySlide slide={slide} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentSlide > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full border border-[#1E88E5]/30 bg-[#1E88E5]/10 hover:bg-[#1E88E5]/20 transition-all backdrop-blur-sm group"
        >
          <ChevronLeft size={32} className="text-[#1E88E5] group-hover:text-white transition-colors" />
        </motion.button>
      )}

      {currentSlide < slides.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full border border-[#1E88E5]/30 bg-[#1E88E5]/10 hover:bg-[#1E88E5]/20 transition-all backdrop-blur-sm group"
        >
          <ChevronRight size={32} className="text-[#1E88E5] group-hover:text-white transition-colors" />
        </motion.button>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-12 bg-[#1E88E5]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        <div
          className="text-white/60 text-sm"
          style={{ fontFamily: 'Azeret Mono, monospace' }}
        >
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      <div className="absolute top-8 right-8 flex items-center gap-3 px-4 py-2 border border-[#1E88E5]/30 bg-[#1E88E5]/10 rounded-full backdrop-blur-sm">
        <Lock size={16} className="text-[#1E88E5]" />
        <span className="text-white/80 text-sm" style={{ fontFamily: 'Azeret Mono, monospace' }}>
          SECURITY AUDIT
        </span>
      </div>
    </div>
  );
}