import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:vignesh@example.com?subject=${subject}&body=${body}`;
  };
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 bg-transparent text-white z-10 flex flex-col items-center justify-center px-4">
      
      {/* Background glow for contact section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#00f0ff]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center mb-16 contact-anim">
        <h2 className="text-5xl md:text-7xl font-black mb-4">
          Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">Connection</span>
        </h2>
        <p className="text-gray-400 font-light text-xl max-w-2xl mx-auto">
          Currently open to new opportunities. Whether you have a question or just want to connect, my inbox is open.
        </p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Form */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl contact-anim w-full relative group shadow-2xl">
          <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-[#ffffff05] to-[#ffffff00] pointer-events-none" />
          
          <form className="space-y-6 relative z-10" onSubmit={handleTransmit}>
            <div className="space-y-2">
              <label className="text-sm font-mono text-[#00f0ff] uppercase tracking-widest pl-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#ffffff0a] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all text-white"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-mono text-[#b026ff] uppercase tracking-widest pl-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#ffffff0a] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#b026ff] focus:ring-1 focus:ring-[#b026ff] transition-all text-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-mono text-[#00ffaa] uppercase tracking-widest pl-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#ffffff0a] border border-white/10 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#00ffaa] focus:ring-1 focus:ring-[#00ffaa] transition-all min-h-[150px] resize-none text-white"
                placeholder="Type your message..."
                required
              />
            </div>

            <button type="submit" className="w-full group/btn relative overflow-hidden py-4 rounded-xl font-bold bg-white text-black mt-4 hover:bg-gray-200 transition-colors">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Transmit <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </span>
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="flex flex-col justify-center space-y-8 contact-anim">
          <a href="https://github.com/Kakarlavignesh" target="_blank" rel="noreferrer" className="group glass-panel p-6 rounded-2xl flex items-center gap-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
              <Github size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1 group-hover:text-[#00f0ff] transition-colors">GitHub</h4>
              <p className="text-sm text-gray-400 font-mono">github.com/Kakarlavignesh</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/kakarla-vignesh/" target="_blank" rel="noreferrer" className="group glass-panel p-6 rounded-2xl flex items-center gap-6 hover:shadow-[0_0_30px_rgba(0,119,181,0.2)] transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
              <Linkedin size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1 group-hover:text-[#0077b5] transition-colors">LinkedIn</h4>
              <p className="text-sm text-gray-400 font-mono">Connect professionally</p>
            </div>
          </a>

          <a href="mailto:vignesh@example.com" className="group glass-panel p-6 rounded-2xl flex items-center gap-6 hover:shadow-[0_0_30px_rgba(176,38,255,0.2)] transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#b026ff] group-hover:bg-[#b026ff] group-hover:text-white transition-colors">
              <Mail size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1 group-hover:text-[#b026ff] transition-colors">Email</h4>
              <p className="text-sm text-gray-400 font-mono">Direct inbox</p>
            </div>
          </a>
        </div>
      </div>

      <footer className="mt-32 text-center text-gray-600 font-mono text-xs w-full contact-anim border-t border-white/5 pt-8">
        <p>&copy; {new Date().getFullYear()} Kakarla Vignesh Reddy. All rights reserved.</p>
        <p className="mt-2">Designed & Engineered with passion.</p>
      </footer>
    </section>
  );
}
