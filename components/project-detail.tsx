"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  ExternalLink
} from "lucide-react"

// Import client-only components with dynamic imports
const DrawingBoard = dynamic(() => import("./drawing-board").then(mod => mod.DrawingBoard), { ssr: false })
const ProjectVideo = dynamic(() => import("./project-video").then(mod => mod.ProjectVideo), { ssr: false })

// Add CSS for animations
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8) rotate(var(--rotate-start)); }
    to { opacity: 1; transform: scale(1) rotate(var(--rotate)); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .item-animation {
    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
  }
  
  .tech-animation {
    opacity: 0;
    animation-name: fadeInUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  
  .item-animation.active {
    z-index: 100 !important;
    opacity: 0.9;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    cursor: grabbing !important;
    transform: scale(1.02) rotate(var(--rotate)) !important;
    transition: all 0.1s ease-out;
  }
  
  .title-text {
    font-size: 2.5rem;
    font-weight: 600;
    color: rgba(30, 30, 30, 0.8);
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
    line-height: 1.2;
    transform: rotate(-1deg);
    text-decoration: underline;
    text-align: center;
    max-width: 80%;
    margin: 0 auto;
  }
  
  /* Hide tech stickers on mobile */
  @media (max-width: 768px) {
    .tech-sticker {
      display: none !important;
    }
    
    .mobile-bottom-controls {
      bottom: 1rem !important;
      left: 1rem !important;
      right: 1rem !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 0.5rem !important;
    }
  }
`;

interface ProjectDetailProps {
  project: {
    id: string
    name: string
    description: string
    videoUrl: string | null
    thumbnailUrl: string
    tags: string[]
    technologies: string[]
    links: Array<{ title: string; url: string }>
    items: Array<{
      id: number
      type: "sticker" | "note" | "image"
      src: string
      alt: string
      width: number
      height: number
      position: { top?: string; left?: string; right?: string; bottom?: string }
      rotate: number
    }>
  }
  dictionary: {
    viewProject: string
    technology: string
    backToProjects: string
  }
  onClose: () => void
}

// This component is fully client-side rendered to avoid hydration errors
export function ProjectDetail({ project, dictionary, onClose }: ProjectDetailProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const deskRef = useRef<HTMLDivElement>(null)
  
  // Add state for tech icon positions
  const [techIconsVisible, setTechIconsVisible] = useState(false);
  
  // Effect to display tech icons with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setTechIconsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add dragging functionality via JavaScript after mount
  useEffect(() => {
    // Add the animations to the document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
    
    // Wait for a moment to ensure tech icons are rendered
    const setupDragging = () => {
      // Apply animations to elements with a small delay
      const items = document.querySelectorAll('.item-animation');
      items.forEach((item, index) => {
        (item as HTMLElement).style.animationDelay = `${0.4 + (index * 0.1)}s`;
      });
      
      // Apply animation to tech stack
      const techStack = document.querySelector('.tech-animation');
      if (techStack) {
        (techStack as HTMLElement).style.animationDelay = '0.3s';
      }
      
      // Add drag functionality
      const draggableItems = document.querySelectorAll('.item-animation');
      
      const cleanup: Array<() => void> = [];
      
      draggableItems.forEach(item => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        const onMouseDown = (e: MouseEvent) => {
          isDragging = true;
          const itemElement = item as HTMLElement;
          const rect = itemElement.getBoundingClientRect();
          
          // Calculate the offset of the mouse within the element
          offsetX = e.clientX - rect.left;
          offsetY = e.clientY - rect.top;
          
          // Add active class for visual feedback
          itemElement.classList.add('active');
          
          // Prevent default behaviors
          e.preventDefault();
        };
        
        const onMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;
          
          const itemElement = item as HTMLElement;
          const deskElement = deskRef.current;
          
          if (!deskElement) return;
          
          const deskRect = deskElement.getBoundingClientRect();
          
          // Calculate new position relative to the desk
          const newLeft = e.clientX - deskRect.left - offsetX;
          const newTop = e.clientY - deskRect.top - offsetY;
          
          // Set new position
          itemElement.style.left = `${newLeft}px`;
          itemElement.style.top = `${newTop}px`;
          
          // Remove any right or bottom positioning that might interfere
          itemElement.style.right = 'auto';
          itemElement.style.bottom = 'auto';
        };
        
        const onMouseUp = () => {
          if (!isDragging) return;
          
          isDragging = false;
          const itemElement = item as HTMLElement;
          
          // Remove active class
          itemElement.classList.remove('active');
        };
        
        // Add event listeners with proper TypeScript typing
        const element = item as HTMLElement;
        element.addEventListener('mousedown', onMouseDown as EventListener);
        
        document.addEventListener('mousemove', onMouseMove as EventListener);
        document.addEventListener('mouseup', onMouseUp as EventListener);
        
        // Touch events for mobile with proper typing
        const handleTouchStart = (e: TouchEvent) => {
          const touch = e.touches[0];
          isDragging = true;
          const itemElement = item as HTMLElement;
          const rect = itemElement.getBoundingClientRect();
          
          offsetX = touch.clientX - rect.left;
          offsetY = touch.clientY - rect.top;
          
          itemElement.classList.add('active');
          e.preventDefault();
        };
        
        const handleTouchMove = (e: TouchEvent) => {
          if (!isDragging) return;
          
          const touch = e.touches[0];
          const itemElement = item as HTMLElement;
          const deskElement = deskRef.current;
          
          if (!deskElement) return;
          
          const deskRect = deskElement.getBoundingClientRect();
          
          const newLeft = touch.clientX - deskRect.left - offsetX;
          const newTop = touch.clientY - deskRect.top - offsetY;
          
          itemElement.style.left = `${newLeft}px`;
          itemElement.style.top = `${newTop}px`;
          itemElement.style.right = 'auto';
          itemElement.style.bottom = 'auto';
          
          e.preventDefault();
        };
        
        const handleTouchEnd = () => {
          if (!isDragging) return;
          
          isDragging = false;
          const itemElement = item as HTMLElement;
          itemElement.classList.remove('active');
        };
        
        element.addEventListener('touchstart', handleTouchStart as EventListener);
        document.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });
        document.addEventListener('touchend', handleTouchEnd as EventListener);
        
        // Push cleanup functions
        cleanup.push(() => {
          element.removeEventListener('mousedown', onMouseDown as EventListener);
          document.removeEventListener('mousemove', onMouseMove as EventListener);
          document.removeEventListener('mouseup', onMouseUp as EventListener);
          
          element.removeEventListener('touchstart', handleTouchStart as EventListener);
          document.removeEventListener('touchmove', handleTouchMove as EventListener);
          document.removeEventListener('touchend', handleTouchEnd as EventListener);
        });
      });
      
      return cleanup;
    };
    
    // Initial setup
    let cleanup = setupDragging();
    
    // Watch for tech icons being added and reapply dragging
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Clean up previous event listeners
          cleanup.forEach(fn => fn());
          
          // Setup new event listeners
          cleanup = setupDragging();
        }
      });
    });
    
    // Start observing the container for tech icons
    if (deskRef.current) {
      observer.observe(deskRef.current, { childList: true, subtree: true });
    }
    
    // Cleanup
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
      cleanup.forEach(fn => fn());
      observer.disconnect();
    };
  }, []);

  // Create tech icon elements based on the project technologies
  const getTechIconPath = (tech: string): string => {
    const techMap: Record<string, string> = {
      'react': '/techicons/React.png',
      'typescript': '/techicons/typescript.png',
      'javascript': '/techicons/javascript.png',
      'python': '/techicons/python.png',
      'next': '/techicons/nextjs.png',
      'nextjs': '/techicons/nextjs.png',
      'tailwind': '/techicons/Tailwind Logo.png',
      'shadcn': '/techicons/shadcn.png',
      'figma': '/techicons/figma.png',
      'git': '/techicons/git.png',
      'openai': '/techicons/openai.png',
      'langchain': '/techicons/langchain.webp',
      'vite': '/techicons/vite.png',
      'electron': '/techicons/electron.png',
      'react-native': '/techicons/reactnative.svg',
      'cursor': '/techicons/cursor.jpeg',
      'node': '/techicons/nodejs.png',
      'express': '/techicons/express.png',
      'mongodb': '/techicons/MongoDB Logo.svg',
      'aws': '/techicons/aws.png',
      'redis': '/techicons/redis.webp',
      'redux': '/techicons/redux.png',
      'ec2': '/techicons/AWS EC2 Logo.svg',
      'gateway': '/techicons/aws_gateway.png',
    };
    
    // Try to match the tech name (case insensitive)
    const techLower = tech.toLowerCase();
    for (const [key, path] of Object.entries(techMap)) {
      if (techLower.includes(key)) {
        return path;
      }
    }
    
    // Default placeholder if no match
    return '/placeholder.svg';
  };

  // Generate random positions for tech icons
  const getRandomPosition = (index: number): { top: string, left: string } => {
    // Create more random positions across the whiteboard
    // Define different areas of the whiteboard
    const areas = [
      { top: [10, 25], left: [10, 30] },      // top-left
      { top: [10, 25], left: [70, 90] },      // top-right
      { top: [60, 85], left: [5, 25] },       // bottom-left
      { top: [60, 85], left: [75, 95] },      // bottom-right
      { top: [40, 70], left: [40, 60] },      // center
      { top: [15, 35], left: [40, 60] },      // top-center
      { top: [60, 80], left: [40, 60] }       // bottom-center
    ];
    
    // Select a random area, with some weighting to avoid center (where video likely is)
    let areaIndex = Math.floor(Math.random() * areas.length);
    if (areaIndex === 4) { // If center area, 50% chance to pick another area
      if (Math.random() > 0.5) {
        areaIndex = Math.floor(Math.random() * (areas.length - 1));
        if (areaIndex >= 4) areaIndex++; // Skip center
      }
    }
    
    const area = areas[areaIndex];
    
    // Get random position within the selected area
    const top = area.top[0] + Math.random() * (area.top[1] - area.top[0]);
    const left = area.left[0] + Math.random() * (area.left[1] - area.left[0]);
    
    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div
        ref={sectionRef}
        className="relative w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Fullscreen whiteboard */}
        <div 
          ref={deskRef}
          className="absolute inset-0 z-20"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        >
          <div className="relative w-full h-full">
            {/* Client-only DrawingBoard - will only render on client */}
            <DrawingBoard containerRef={deskRef} />
            
            {/* Project title written on the whiteboard as handwriting - centered */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 item-animation title-text cursor-grab active:cursor-grabbing">
              {project.name}
            </div>

            {/* Project description as a sticky note */}
            <div 
              className="absolute top-24 left-8 z-40 bg-yellow-100 p-4 shadow-md item-animation cursor-grab active:cursor-grabbing" 
              style={{
                width: '300px',
                minHeight: '150px',
                transform: 'rotate(-2deg)',
                ['--rotate' as any]: '-2deg',
                ['--rotate-start' as any]: '-4deg'
              }}
            >
              <p className="font-handwriting text-gray-700 leading-tight">
                {project.description}
              </p>
            </div>
            
            {/* Center the video in the whiteboard */}
            <div 
              className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 z-40 item-animation cursor-grab active:cursor-grabbing" 
              style={{
                ['--rotate' as any]: '0deg',
                ['--rotate-start' as any]: '0deg',
              }}
            >
              {/* Client-only ProjectVideo - will only render on client */}
              <ProjectVideo 
                videoUrl={project.videoUrl} 
                thumbnailUrl={project.thumbnailUrl} 
                name={project.name}
              />
            </div>

            {/* Tech icons as stickers */}
            {techIconsVisible && project.technologies.map((tech, index) => (
              <div
                key={`tech-${index}`}
                className="absolute cursor-grab active:cursor-grabbing item-animation tech-sticker transition-all duration-300"
                style={{
                  ...getRandomPosition(index),
                  zIndex: 45 + index,
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                  ['--rotate' as any]: `${Math.random() * 10 - 5}deg`,
                  ['--rotate-start' as any]: `${Math.random() * 20 - 10}deg`,
                }}
              >
                <div 
                  className="relative overflow-hidden border-4 border-white shadow-md bg-white rounded-lg"
                  style={{
                    width: 80,
                    height: 80,
                    padding: '6px',
                  }}
                >
                  <Image
                    src={getTechIconPath(tech)}
                    alt={tech}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-white/80 text-center text-xs py-1 font-medium">
                    {tech}
                  </div>
                </div>
                
                {/* Shadow effect for images */}
                <div 
                  className="absolute -z-10" 
                  style={{
                    width: 80, 
                    height: 80,
                    top: '6px',
                    left: '6px',
                    background: 'rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    filter: 'blur(4px)'
                  }}
                ></div>
              </div>
            ))}

            {/* Project items (stickers, notes, images) */}
            {project.items.map((item) => (
              <div
                key={item.id}
                className="absolute cursor-grab active:cursor-grabbing item-animation transition-all duration-300"
                style={{
                  ...item.position,
                  zIndex: 40 + item.id,
                  // Apply static styles instead of animations for the initial render
                  transform: `rotate(${item.rotate}deg)`,
                  // Custom properties to be used by the animation
                  ['--rotate' as any]: `${item.rotate}deg`,
                  ['--rotate-start' as any]: `${item.rotate * 2}deg`,
                }}
              >
                <div 
                  className={`
                    relative overflow-hidden
                    ${item.type === "image" ? "border-4 border-white shadow-md" : ""}
                    ${item.type === "note" ? "bg-yellow-100 p-3 shadow-md" : ""}
                  `}
                  style={{
                    width: item.width,
                    height: item.height,
                  }}
                >
                  {item.type !== "note" && (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className={`
                        ${item.type === "image" ? "object-cover" : ""}
                        ${item.type === "sticker" ? "object-contain" : ""}
                      `}
                    />
                  )}
                  
                  {item.type === "note" && (
                    <p className="font-handwriting text-sm text-gray-700 leading-tight">
                      {item.alt}
                    </p>
                  )}
                </div>
                
                {/* Shadow effect for images */}
                {item.type === "image" && (
                  <div 
                    className="absolute -z-10" 
                    style={{
                      width: item.width, 
                      height: item.height,
                      top: '6px',
                      left: '6px',
                      background: 'rgba(0,0,0,0.15)',
                      borderRadius: '2px',
                      filter: 'blur(8px)'
                    }}
                  ></div>
                )}
              </div>
            ))}

            {/* Tech stack panel */}
            <div
              className="absolute bottom-8 right-8 max-w-xs p-4 bg-background/90 backdrop-blur-sm rounded-lg shadow-lg border z-40 tech-animation"
            >
              <h3 className="text-sm font-semibold mb-2">{dictionary.technology}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                {project.links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-medium text-primary hover:underline"
                  >
                    {link.title}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Back to projects button integrated on whiteboard */}
            <Button 
              variant="outline" 
              onClick={onClose}
              className="absolute bottom-8 left-8 z-40 bg-white hover:bg-gray-100 mobile-bottom-controls"
            >
              {dictionary.backToProjects}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add default export for dynamic import
export default ProjectDetail; 