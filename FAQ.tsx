
import React, { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const faqItems = [
  {
    question: "What do I need to get started?",
    answer: "Just share the content you want us to promote, or let us know where we can find it. We'll walk you through any quick setup steps and align on your brand goals so we can get to work."
  },
  {
    question: "Will I need to do anything?",
    answer: "Nope. Once we've got your content and preferences, you're hands-off. Our team handles clipping, strategy, and distribution, so you can stay focused on creating."
  },
  {
    question: "How long does it take to see results?",
    answer: "While some clips go viral immediately, we typically see consistent growth within the first 30 days as we optimize for your specific audience niche and algorithm signals."
  },
  {
    question: "Do you offer custom packages?",
    answer: "Yes, we tailor our strategy to your volume and platform needs. Book a strategy call to discuss a plan that fits your specific goals."
  }
];

const FAQ: React.FC = () => {
  // Start with all closed (null), so we can animate the first one opening
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Ref for intersection observer to trigger auto-open
  const listRef = useRef(null);
  // margin: "-10%" ensures it triggers when the element is well within the viewport
  const isInView = useInView(listRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      // Delay slightly to allow the user to perceive the list entering, then expand smoothly
      const timer = setTimeout(() => {
        setOpenIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Parent container variant to stagger children
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const leftColumnVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const contentFadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const },
    },
  };

  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
    },
  };

  const faqListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
    },
  };

  return (
    <motion.section
      id="faq"
      // Added overflow-hidden to prevent background elements from breaking mobile layout
      className="w-full py-24 md:py-32 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* REFINED: Background subtle glow - Luxury Gold Tint */}
      <div 
        className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-50"
        style={{
            background: 'radial-gradient(circle closest-side, rgba(212, 175, 55, 0.02), transparent)',
            transform: 'translate3d(0,0,0)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Header */}
          <motion.div
            className="lg:col-span-5"
            variants={leftColumnVariants}
          >
            <div>
              {/* Badge */}
              <motion.div
                variants={contentFadeUpVariants}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                <span className="text-xs font-medium text-neutral-300 uppercase tracking-wider">How We Work?</span>
              </motion.div>

              <motion.h2
                className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                variants={titleContainerVariants}
              >
                <motion.span variants={wordVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">Frequently</motion.span>
                <br />
                <span className="text-neutral-500">
                  <motion.span variants={wordVariants} className="inline-block">Asked</motion.span>
                  {' '}
                  <motion.span variants={wordVariants} className="inline-block">Questions</motion.span>
                </span>
              </motion.h2>

              <motion.p
                variants={contentFadeUpVariants}
                className="text-lg text-neutral-400 max-w-md"
              >
                Everything you need to know about our process and how we scale your brand.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Column: List */}
          <motion.div
            ref={listRef}
            className="lg:col-span-7 flex flex-col gap-4"
            variants={faqListVariants}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={faqItemVariants}
                // Updated transition duration to 1200ms and using a very smooth cubic-bezier for the "Apple" feel
                className={`group rounded-2xl border transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
                  openIndex === index
                    ? 'bg-[#0f0f0f]/80 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'
                    : 'bg-[#0f0f0f]/40 backdrop-blur-md border-white/5 hover:bg-[#0f0f0f]/60 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between p-6 sm:p-8 text-left focus:outline-none"
                >
                  <span className={`text-xl font-bold transition-colors duration-500 pr-8 ${
                    openIndex === index ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]' : 'text-neutral-300 group-hover:text-white'
                  }`}>
                    {item.question}
                  </span>
                  <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                     openIndex === index
                       ? 'border-white/20 bg-white/10 text-white rotate-0'
                       : 'border-white/10 text-neutral-500 group-hover:text-white group-hover:border-white/20'
                  }`}>
                    {openIndex === index ? <X size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                
                {/* 
                   Expansion Animation Logic
                   1200ms duration for slow, luxurious open
                   Grid-template-rows trick for height animation
                */}
                <div
                  className={`grid transition-[grid-template-rows,opacity,padding] duration-[1200ms] ease-[cubic-bezier(0.04,0.62,0.23,0.98)] ${
                    openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 sm:px-8 pb-8 text-neutral-400 leading-relaxed text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
