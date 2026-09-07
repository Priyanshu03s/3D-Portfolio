import React from "react";
import { FiGithub, FiExternalLink, FiCpu, FiLayers, FiShield, FiTv, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const projectData = [
  {
    id: "01",
    title: "Enterprise Local AI Assistant",
    subtitle: "Privacy-First RAG Pipeline",
    role: "AI Systems & Backend Developer",
    organization: "Shahi Exports Pvt. Ltd.",
    icon: <FiCpu className="text-blue-400" size={18} />,
    image: "/projects/proj1-shahi-ai.jpg",
    description: "An on-premise, localized conversational AI system built to query proprietary enterprise technical manuals and compliance documentation without public cloud dependencies.",
    highlights: [
      "On-Premise inference with quantized open-weights LLMs (Ollama / GGUF)",
      "Semantic Search RAG pipeline with PostgreSQL & PGVector embeddings",
      "Strict context-grounded guardrails ensuring hallucination-free responses"
    ],
    impact: "100% data privacy with zero cloud token costs; cut manual lookup from 15+ min to sub-second.",
    tags: ["Python", "Local LLMs", "PGVector", "PostgreSQL", "LangChain", "REST APIs"],
    github: "https://github.com/Priyanshu03s/Shahi-Ai-Assistent",
    link: "https://github.com/Priyanshu03s/Shahi-Ai-Assistent",
  },
  {
    id: "02",
    title: "Garment Construction Knowledge Library",
    subtitle: "Enterprise Technical Specification System",
    role: "Full-Stack Architect & Developer",
    organization: "Enterprise Manufacturing",
    icon: <FiLayers className="text-cyan-400" size={18} />,
    image: "/projects/proj2-garment-lib.jpg",
    description: "A full-stack enterprise digital repository and technical specification system designed for industrial apparel manufacturing workflows.",
    highlights: [
      "Functional Requirement Architecture (FDD) translating assembly into schemas",
      "Component-driven Angular frontend with dynamic spec viewers & pattern guides",
      "Spring Boot REST endpoints managing complex hierarchical garment operations"
    ],
    impact: "Replaced fragmented spreadsheets with a unified single source of truth across factory lines.",
    tags: ["Angular", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Priyanshu03s/CONSTRUCTION-LIBRARY",
    link: "https://github.com/Priyanshu03s/CONSTRUCTION-LIBRARY",
  },
  {
    id: "03",
    title: "e-Sahmati",
    subtitle: "Digital Consent & Compliance Engine",
    role: "Backend & Systems Developer",
    organization: "Compliance Platform",
    icon: <FiShield className="text-emerald-400" size={18} />,
    image: "/projects/proj3-esahmati.jpg",
    description: "A secure digital consent management platform engineered to record, track, and audit user consent and compliance authorizations.",
    highlights: [
      "Auditable consent workflows with immutable timestamps and audit trails",
      "Role-Based Access Control (RBAC) and JWT authentication security",
      "Relational schemas tracking consent states, versions, and revocation histories"
    ],
    impact: "Tamper-resistant compliance architecture guaranteeing regulatory data governance and security.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "REST APIs"],
    github: "https://github.com/Priyanshu03s",
    link: "https://github.com/Priyanshu03s",
  },
  {
    id: "04",
    title: "Netflix Clone",
    subtitle: "Modern Streaming & UI Experience",
    role: "Frontend Developer",
    organization: "Web Streaming App",
    icon: <FiTv className="text-rose-400" size={18} />,
    image: "/projects/proj4-netflix.jpg",
    description: "A responsive single-page web streaming application replicating modern on-demand video browsing, catalog exploration, and dynamic media playback.",
    highlights: [
      "Pixel-perfect dark streaming dashboard with auto-updating hero & modal cards",
      "Asynchronous TMDB REST API integration for trending titles, categories, and ratings",
      "Interactive media streaming with embedded trailer previews on demand"
    ],
    impact: "High-performance client-side routing, asynchronous state handling, and fluid responsive UX.",
    tags: ["Angular", "JavaScript", "HTML5/CSS3", "Tailwind CSS", "TMDB API", "YouTube API"],
    github: "https://github.com/Priyanshu03s/netflix-clone-",
    link: "https://github.com/Priyanshu03s/netflix-clone-",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-[#020202] py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[11px] mb-3"
          >
            ENGINEERING & AI PORTFOLIO
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4"
          >
            Selected Works<span className="text-blue-500">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-light"
          >
            Production-grade systems bridging robust enterprise backends, applied machine learning, and intuitive web interfaces.
          </motion.p>
        </div>

        {/* Projects Grid (2x2 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Card Image Banner */}
              <div className="relative overflow-hidden aspect-[16/9] w-full border-b border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
                
                {/* Index / Badge Overlays */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-mono text-blue-400 font-bold">
                    PROJ_{project.id}
                  </span>
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-mono text-gray-300 flex items-center space-x-1.5">
                    {project.icon}
                    <span>{project.role}</span>
                  </span>
                </div>

                {/* Organization watermark */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400/90 bg-blue-950/60 border border-blue-500/20 px-2 py-0.5 rounded">
                    {project.organization}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 space-y-2 border-t border-white/5">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] md:text-xs text-gray-400">
                        <FiCheckCircle className="text-blue-400 shrink-0 mt-0.5" size={13} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Callout */}
                  <div className="p-3 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-md">
                    <p className="text-[11px] text-gray-300 font-light">
                      <span className="font-semibold text-blue-400 font-mono uppercase text-[10px] mr-1">Impact:</span>
                      {project.impact}
                    </p>
                  </div>
                </div>

                {/* Tech Tags & Links Footer */}
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] uppercase tracking-wider font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-md hover:border-blue-500/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      Status: Production Ready
                    </span>
                    <div className="flex gap-3">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Github Repository" 
                        className="p-2.5 bg-white/5 text-gray-300 hover:text-white rounded-lg hover:bg-blue-600 transition-all border border-white/10"
                      >
                        <FiGithub size={16} />
                      </a>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Live Demo" 
                        className="p-2.5 bg-white/5 text-gray-300 hover:text-white rounded-lg hover:bg-blue-600 transition-all border border-white/10"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
