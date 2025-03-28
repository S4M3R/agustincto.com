"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Section } from "@/components/ui/section"

interface SkillsProps {
  dictionary: {
    title: string
    categories: {
      name: string
      skills: string[]
    }[]
  }
}

export function Skills({ dictionary }: SkillsProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])
  
  // States for interactive toolbox effects
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<{
    skill: string;
    icon: string;
    color: string;
  } | null>(null)
  const [copySuccess, setCopySuccess] = useState(false);
  const [dropAnimationComplete, setDropAnimationComplete] = useState(false);
  
  // Get tool icon based on skill name
  const getToolIcon = (skill: string) => {
    const skillLower = skill.toLowerCase();
    
    if (skillLower.includes('javascript') || skillLower.includes('js')) return "🔧"; // Wrench
    if (skillLower.includes('typescript') || skillLower.includes('ts')) return "🔩"; // Nut and bolt
    if (skillLower.includes('react')) return "⚙️"; // Gear
    if (skillLower.includes('next')) return "🛠️"; // Hammer and wrench
    if (skillLower.includes('node')) return "🧰"; // Toolbox
    if (skillLower.includes('python')) return "🪛"; // Screwdriver
    if (skillLower.includes('langchain') || skillLower.includes('llm')) return "🧠"; // Brain
    if (skillLower.includes('tailwind')) return "🎨"; // Paint palette
    if (skillLower.includes('express')) return "🚀"; // Rocket
    if (skillLower.includes('redux')) return "🧩"; // Puzzle piece
    if (skillLower.includes('mongo') || skillLower.includes('sql')) return "🗄️"; // Filing cabinet
    if (skillLower.includes('aws') || skillLower.includes('cloud')) return "☁️"; // Cloud
    if (skillLower.includes('docker')) return "🐳"; // Whale
    if (skillLower.includes('git')) return "🔄"; // Arrows
    if (skillLower.includes('ci/cd')) return "🔄"; // Arrows
    if (skillLower.includes('native')) return "📱"; // Mobile phone
    if (skillLower.includes('electron')) return "💻"; // Laptop
    
    // Default tools for other skills
    const defaultTools = ["🔨", "🪚", "🪓", "🔧", "🪛", "🔩", "🧱", "📏", "✂️", "📌", "🧲"];
    return defaultTools[skill.length % defaultTools.length];
  };
  
  // Generate varying colors for different tool types
  const getToolColor = (index: number) => {
    const colors = [
      "bg-amber-600", // Brighter amber for better contrast
      "bg-slate-500", // Lighter slate for better contrast
      "bg-emerald-600", // Brighter emerald for better contrast
      "bg-blue-600", // Brighter blue for better contrast
      "bg-red-600" // Brighter red for better contrast
    ]
    return colors[index % colors.length]
  }

  // Pre-calculate positions for toolbox layout
  const toolPositions = useMemo(() => {
    return dictionary.categories.map(category => {
      const totalSkills = category.skills.length;
      const itemsPerRow = Math.min(5, Math.ceil(Math.sqrt(totalSkills * 1.5)));
      const rows = Math.ceil(totalSkills / itemsPerRow);
      
      return category.skills.map((skill, i) => {
        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;
        
        // Calculate absolute positions
        const gapSize = 10; // Gap between tools in pixels
        const marginSize = 20; // Margin from toolbox edges
        
        return {
          row,
          col,
          // Will be used in the grid layout
          delay: i * 0.05
        };
      });
    });
  }, [dictionary.categories]);

  // Function to copy all skills to clipboard
  const copySkillsToClipboard = () => {
    let allSkills = "# SKILLS\n\n";
    
    dictionary.categories.forEach(category => {
      allSkills += `## ${category.name}\n`;
      category.skills.forEach(skill => {
        allSkills += `- ${skill}\n`;
      });
      allSkills += "\n";
    });
    
    navigator.clipboard.writeText(allSkills)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy skills: ', err);
      });
  };

  // Reset animation state when a tool is selected
  useEffect(() => {
    if (selectedTool) {
      setDropAnimationComplete(false);
    }
  }, [selectedTool]);

  return (
    <Section id="skills" className="py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div
          ref={sectionRef}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">{dictionary.title}</h2>
          <p className="text-muted-foreground mb-4">Here's my developer toolbox with the skills I've mastered over the years</p>
          
          <motion.button
            className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium shadow-md inline-flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copySkillsToClipboard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform duration-300"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            {copySuccess ? 'Copied!' : 'Copy Skills to Clipboard'}
            {copySuccess && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="ml-1"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </motion.button>
        </div>

        <motion.div 
          ref={containerRef}
          className="relative"
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tool categories as tabs */}
          <div className="flex justify-center mb-6 gap-4 flex-wrap">
            {dictionary.categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-5 py-2 rounded-md text-base font-medium transition-all shadow-sm ${
                  activeCategory === index 
                    ? "bg-amber-600 text-white" // Improved contrast
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: activeCategory === index ? "0 2px 8px rgba(180, 83, 9, 0.4)" : ""
                }}
              >
                {category.name}
              </motion.button>
            ))}
            <motion.button
              className={`px-5 py-2 rounded-md text-base font-medium transition-all shadow-sm ${
                activeCategory === null 
                  ? "bg-amber-600 text-white" // Improved contrast
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: dictionary.categories.length * 0.1 }}
              onClick={() => setActiveCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: activeCategory === null ? "0 2px 8px rgba(180, 83, 9, 0.4)" : ""
              }}
            >
              All Tools
            </motion.button>
          </div>

          {/* Toolbox container */}
          <motion.div 
            className="relative mx-auto max-w-5xl rounded-lg overflow-hidden"
            style={{ translateY }}
          >
            {/* Toolbox top with handle */}
            <motion.div 
              className="bg-red-700 h-10 rounded-t-lg flex justify-center items-center"
              initial={{ scaleX: 0 }}
              animate={sectionInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-24 h-4 bg-slate-600 rounded-lg"></div>
            </motion.div>
            
            {/* Main toolbox */}
            <motion.div 
              className="bg-gradient-to-b from-red-600 to-red-800 p-6 md:p-8 shadow-2xl overflow-hidden"
              initial={{ height: 0 }}
              animate={sectionInView ? { height: "auto" } : { height: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              {/* Metal clasp details */}
              <div className="absolute top-0 left-6 w-6 h-3 bg-slate-400 rounded-b-lg"></div>
              <div className="absolute top-0 right-6 w-6 h-3 bg-slate-400 rounded-b-lg"></div>
              
              {/* Toolbox interior with grid layout */}
              <div className="bg-amber-900 rounded-md p-4 min-h-[400px] relative">
                {/* Tool drawer lines */}
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent top-1/3"></div>
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent top-2/3"></div>
                
                {/* Skills as tools */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative">
                  {dictionary.categories.map((category, categoryIndex) => (
                    <AnimatePresence key={categoryIndex}>
                      {(activeCategory === null || activeCategory === categoryIndex) && (
                        <>
                          {category.skills.map((skill, i) => {
                            const position = toolPositions[categoryIndex][i];
                            const toolColor = getToolColor(i % 5);
                            const toolIcon = getToolIcon(skill);
                            
                            return (
                              <motion.div 
                                key={`${categoryIndex}-${i}`}
                                initial={{ opacity: 0, scale: 0, y: 20 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1, 
                                  y: 0,
                                  transition: {
                                    duration: 0.4,
                                    delay: position.delay,
                                    ease: "backOut"
                                  }
                                }}
                                exit={{ 
                                  opacity: 0, 
                                  scale: 0.6, 
                                  transition: { duration: 0.2 }
                                }}
                                className="flex flex-col items-center"
                                onMouseEnter={() => setHoveredSkill(skill)}
                                onMouseLeave={() => setHoveredSkill(null)}
                              >
                                <motion.div
                                  className={`w-16 h-16 md:w-20 md:h-20 ${toolColor} rounded shadow-md flex items-center justify-center text-2xl md:text-3xl cursor-pointer border border-white/10`}
                                  whileHover={{ 
                                    scale: 1.15, 
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.5 }
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setSelectedTool({
                                    skill,
                                    icon: toolIcon,
                                    color: toolColor
                                  })}
                                >
                                  <span>{toolIcon}</span>
                                </motion.div>
                                <motion.div 
                                  className="mt-2 text-center text-xs md:text-sm font-medium text-amber-50" // Improved contrast with amber-50
                                  animate={{ 
                                    scale: hoveredSkill === skill ? 1.1 : 1,
                                  }}
                                >
                                  {skill}
                                </motion.div>
                              </motion.div>
                            )
                          })}
                        </>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
                
                {/* Toolbox shadow effect */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] rounded-md"></div>
              </div>
              
              {/* Toolbox details */}
              <motion.div 
                className="absolute bottom-2 right-3 text-xs text-amber-200/70 font-mono"
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.5 }}
              >
                DEV • TOOLBOX • v2.0
              </motion.div>
            </motion.div>
            
            {/* Toolbox bottom with shadow */}
            <motion.div 
              className="bg-red-800 h-4 rounded-b-lg shadow-[0_8px_15px_-1px_rgba(0,0,0,0.3)]"
              initial={{ scaleX: 0 }}
              animate={sectionInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>

          {/* Hint text */}
          <motion.div
            className="text-center mt-4 text-sm text-white/90 font-medium"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            Click on a tool to see it in action!
          </motion.div>
        </motion.div>
      </div>

      {/* Enlarged Tool with Gravity Animation */}
      <AnimatePresence mode="wait">
        {selectedTool && (
          <motion.div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTool(null)}
          >
            <motion.div
              className="flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              {/* Drop animation with spring physics */}
              <motion.div
                className={`${selectedTool.color} w-40 h-40 rounded-xl shadow-2xl flex items-center justify-center text-7xl border-4 border-white/20`}
                initial={{ y: -100 }}
                animate={{ y: 10 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 15,
                  bounce: 0.5 
                }}
                onAnimationComplete={() => setDropAnimationComplete(true)}
              >
                {/* Small wobble rotation animation after drop */}
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={dropAnimationComplete ? { 
                    rotate: [0, -3, 3, -2, 0] 
                  } : {}}
                  transition={dropAnimationComplete ? { 
                    duration: 0.8, 
                    ease: "easeInOut"
                  } : {}}
                >
                  {selectedTool.icon}
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-6 bg-white text-black text-xl font-bold py-3 px-6 rounded-lg shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedTool.skill}
              </motion.div>

              <motion.p
                className="mt-4 text-white text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                This tool represents my expertise in {selectedTool.skill}. 
                Click anywhere to close.
              </motion.p>

              <motion.div 
                className="absolute bottom-0 w-full h-4 bg-amber-900/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  transformOrigin: "center"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

