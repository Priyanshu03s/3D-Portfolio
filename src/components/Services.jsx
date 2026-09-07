import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiCpu, 
  FiServer, 
  FiLayout, 
  FiActivity, 
  FiBriefcase, 
  FiArrowRight,
  FiExternalLink
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);

  const mainServices = [
    {
      icon: <FiCpu size={24} />,
      title: "On-Premise & Local AI (RAG)",
      p: "Architecting privacy-first, air-gapped Retrieval-Augmented Generation (RAG) pipelines, quantized local LLMs (Ollama/GGUF), and vector search via PGVector with zero cloud API token costs.",
      badge: "Applied AI"
    },
    {
      icon: <FiServer size={24} />,
      title: "Enterprise Backend Architecture",
      p: "Engineering robust, scalable microservices, REST APIs, and transactional database schemas using Java (Spring Boot), PostgreSQL, and Spring Security (JWT / RBAC).",
      badge: "Java / Spring"
    },
    {
      icon: <FiLayout size={24} />,
      title: "Full-Stack Web Engineering",
      p: "Building responsive, component-driven web applications and interactive enterprise specification viewers utilizing Angular, TypeScript, Tailwind CSS, and clean UI architecture.",
      badge: "Angular / Web"
    },
    {
      icon: <FiActivity size={24} />,
      title: "Data Scraping & Automation",
      p: "Developing high-throughput web scraping pipelines and custom automated workflows with Python and FastAPI to aggregate real-time datasets and streamline operations.",
      badge: "Automation"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Header Animation
      tl.fromTo(headerRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: "none", stagger: 0.1 }
      );

      // 2. Main Services Grid Stagger
      tl.fromTo(".service-card", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.3, ease: "none", stagger: 0.1 },
        "-=0.2"
      );

      // 3. Experience Sidebar Slide
      tl.fromTo(sidebarRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: "none" },
        "-=0.3"
      );

      // UI corner lines animation for sidebar
      tl.fromTo(".corner-line",
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "none", stagger: 0.05 },
        "-=0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#000] text-white overflow-hidden scroll-mt-24"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <div className="inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-sm mb-4">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em]">TECHNICAL CAPABILITIES</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
          Core Services<span className="text-blue-500">.</span>
        </h2>
        <div className="w-24 h-[1px] bg-blue-500/40 mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-base leading-relaxed">
          Specialized in bridging high-performance enterprise backends with production-ready AI models and privacy-preserving RAG systems.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* Main Services Grid */}
        <div ref={gridRef} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainServices.map((service) => (
            <div
              key={service.title}
              className="service-card group p-8 bg-[#0a0a0a] border border-white/[0.06] hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-300 rounded-xl cursor-default flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                    {service.icon}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400/80 bg-blue-950/40 border border-blue-500/20 px-2.5 py-1 rounded">
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed mb-8">
                  {service.p}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 group-hover:text-blue-400 transition-colors pt-4 border-t border-white/5">
                <span>Enterprise Grade</span> 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Experience Card (Sidebar) */}
        <div ref={sidebarRef} className="lg:col-span-4 h-full relative">
          <div className="sticky top-32 p-8 bg-[#0c0c0c] border border-white/[0.08] rounded-xl group overflow-hidden shadow-2xl">
            
            {/* HUD Corner Lines */}
            <div className="corner-line absolute top-2 left-2 w-4 h-4 border-t border-l border-blue-500/50"></div>
            <div className="corner-line absolute top-2 right-2 w-4 h-4 border-t border-r border-blue-500/50"></div>
            <div className="corner-line absolute bottom-2 left-2 w-4 h-4 border-b border-l border-blue-500/50"></div>
            <div className="corner-line absolute bottom-2 right-2 w-4 h-4 border-b border-r border-blue-500/50"></div>

            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-1000" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
                  <FiBriefcase size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-widest uppercase">Work Experience</h3>
                  <span className="text-[8px] font-mono text-green-400 block tracking-[0.4em] mt-0.5">● PRODUCTION VERIFIED</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-3 py-1.5 bg-white text-black font-black text-[10px] tracking-tight rounded">
                   SHAHI EXPORTS
                </div>
                <div className="px-3 py-1.5 border border-blue-500/30 bg-blue-500/10 text-blue-300 font-bold text-[10px] tracking-widest rounded font-mono">
                   IT & AI LAB
                </div>
              </div>

              <h4 className="text-white text-sm font-semibold mb-2">AI Systems & Backend Developer</h4>
              <p className="text-gray-400 font-light text-xs leading-relaxed mb-6">
                Engineered an enterprise-grade local AI assistant and RAG pipeline to query internal technical manuals and garment construction libraries, eliminating third-party cloud APIs and reducing query lookup time to sub-seconds.
              </p>

              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg group/img h-36 border border-white/10">
                  <div className="absolute inset-0 bg-blue-500/10 z-10 mix-blend-overlay"></div>
                  <img 
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" 
                    src="/projects/proj1-shahi-ai.jpg" 
                    alt="AI System Showcase" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 font-mono text-[8px] text-blue-400 tracking-widest bg-black/80 px-2 py-0.5 rounded border border-white/10">RAG_SYSTEM_PIPELINE</div>
                </div>
                
                <a 
                  href="https://github.com/Priyanshu03s/Shahi-Ai-Assistent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 rounded-lg flex items-center justify-center space-x-2 group"
                >
                  <span>View Project Code</span>
                  <FiExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Micro HUD Footer */}
          <div className="mt-4 flex justify-between items-center font-mono text-[9px] text-gray-600 tracking-[0.2em] px-2">
            <span>&gt; ENTERPRISE_SYSTEM_SYNC</span>
            <span className="text-blue-500">v2.4.0</span>
          </div>
        </div>

      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03] z-10"></div>
      <div className="absolute top-0 right-1/2 w-[1px] h-full bg-white/[0.03] z-10"></div>
    </section>
  );
}
