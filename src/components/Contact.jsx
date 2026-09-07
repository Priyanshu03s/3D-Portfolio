import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend, FiMail, FiActivity, FiShield, FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef();
  
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const myEmail = "priyanshurajput60@gmail.com";
  const frameCount = 160;
  const imagesRef = useRef([]);
  const seqRef = useRef({ frame: 0 });

  const currentFrame = (index) => `/image3/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  // 1. Preload Sequence
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) setLoaded(true);
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) setLoaded(true);
        };
        imagesRef.current.push(img);
    }
  }, []);

  // 2. GSAP Scroll and Render Logic
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Responsive Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      if (!canvas || !imagesRef.current.length) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let frameIdx = Math.round(seqRef.current.frame);
      if (frameIdx >= frameCount) frameIdx = frameCount - 1;

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalWidth !== 0) {
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      setCurrentFrameIdx(frameIdx);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(seqRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render
    });

    const targetContainer = containerRef.current;
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().filter(t => t.trigger === targetContainer).forEach(t => t.kill());
    };
  }, [loaded]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    toast.success("EMAIL COPIED TO CLIPBOARD 📋");
    setTimeout(() => setCopied(false), 2500);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const name = formData.get("name") || "Developer";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";

    // Attempt emailjs, with automatic mailto fallback
    emailjs
      .sendForm(
        "service_ezep6zg",
        "template_6fbergt",
        formRef.current,
        "0GSfZwE2fSCw9lqcZ"
      )
      .then(() => {
        toast.success("TRANSMISSION_DISPATCHED 🚀");
        formRef.current.reset();
      })
      .catch(() => {
        // Fallback to opening mailto client
        window.location.href = `mailto:${myEmail}?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
        toast.info("OPENING DIRECT EMAIL CLIENT 📬");
        formRef.current.reset();
      });
  };

  return (
    <div
      ref={containerRef}
      id="contactme"
      className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-mono select-none"
    >
      {/* 1. Loading Module */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-[#020202]"
          >
            <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 animate-pulse">
              SYNCING_COMM_STREAM {loadingProgress}%
            </div>
            <div className="w-64 h-[2px] bg-cyan-950/30 overflow-hidden">
               <motion.div 
                 className="h-full bg-cyan-500" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Cinematic Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 3. Aesthetic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-vignette opacity-40" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* 4. Peripheral HUD Elements */}
      <AnimatePresence>
        {loaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 pointer-events-none p-10"
          >
            {/* Top-left animated text */}
            <div className="absolute top-12 left-12">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.7em] font-bold"
              >
                Establish Sub-Space Connection
              </motion.div>
            </div>

            {/* Brackets */}
            <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-cyan-500/20" />
            <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-cyan-500/20" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-cyan-500/20" />
            <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-cyan-500/20" />

            {/* Static HUD Text */}
            <div className="absolute top-12 left-12 flex items-center space-x-3">
               <FiActivity className="text-cyan-400 text-xs animate-pulse" />
               <span className="text-cyan-400/40 text-[9px] tracking-[0.4em] uppercase font-bold">Signal_Stable</span>
            </div>
            
            <div className="absolute bottom-12 right-12 text-right hidden lg:block">
               <span className="text-white/10 text-[9px] tracking-[0.6em] uppercase block mb-1">Archive_003</span>
               <span className="text-cyan-500/30 text-[9px] tracking-[0.4em] uppercase">&gt; System_Ready</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Central Contact UI */}
      <AnimatePresence>
        {loaded && currentFrameIdx >= 120 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 w-full max-w-4xl px-6 pointer-events-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-3">
                COMM<span className="text-cyan-500 block sm:inline">.LINK</span>
              </h2>
              <div className="flex items-center justify-center space-x-2 text-cyan-500/60 font-mono text-[9px] tracking-[0.6em] uppercase">
                <FiShield />
                <span>Protocol: Neural_Gate</span>
              </div>
            </div>

            {/* Quick Action Email Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-xl">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="text-cyan-400" size={16} />
                <span className="text-xs font-mono text-white tracking-wider">{myEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-cyan-300 text-[10px] font-mono tracking-widest uppercase rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  {copied ? <FiCheck className="text-green-400" size={13} /> : <FiCopy size={13} />}
                  <span>{copied ? "COPIED" : "COPY EMAIL"}</span>
                </button>
                <a
                  href={`mailto:${myEmail}`}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-black text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>MAILTO</span>
                  <FiExternalLink size={13} />
                </a>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/60 block ml-1">IDENT_SIGNATURE</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="YOUR NAME"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-white text-xs outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/60 block ml-1">COMM_PATH_ADDR</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="YOUR EMAIL"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-white text-xs outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/60 block ml-1">DATA_PAYLOAD</label>
                <textarea
                  name="message"
                  placeholder="ENTER TRANSMISSION / INQUIRY..."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 text-white text-xs outline-none focus:border-cyan-500 transition-all resize-none placeholder:text-gray-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center space-x-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-[0.4em] px-12 py-4 rounded-lg shadow-xl transition-all cursor-pointer"
                >
                  <span>TRANSMIT DISPATCH</span>
                  <FiSend className="text-base transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        toastClassName="bg-black border border-cyan-500/30 text-white font-mono text-[9px] rounded-lg backdrop-blur-xl"
        progressClassName="bg-cyan-600"
      />
    </div>
  );
};

export default Contact;
