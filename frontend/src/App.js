import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "@/App.css";
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Toaster } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ========== DATA ==========
const launches = [
  {
    id: "SPACE & HEALTHCARE",
    product: "Architects",
    location: "GRID_NODE_01",
    tag: "OPTIMIZED FLOW",
    description: "Technology that steps back, so life has space again.",
    color: "#FF4D00",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
    fullDescription: "Architects represents a breakthrough in energy grid management. Our physical AI system analyzes real-time grid data, predicting load fluctuations with 99.7% accuracy. By understanding the physics of electrical distribution, Architects optimizes power flow, reduces waste, and prevents blackouts before they occur.",
    features: [
      "Real-time load prediction with sub-second latency",
      "Integration with existing SCADA systems",
      "Self-learning adaptation to grid topology changes",
      "Predictive maintenance alerts for transformers"
    ],
    techSpecs: {
      accuracy: "99.7%",
      latency: "<100ms",
      coverage: "500,000+ nodes",
      deployment: "Cloud / Edge hybrid"
    },
    videoPlaceholder: "https://images.unsplash.com/photo-1509390836518-d2e50c4addaa?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509390836518-d2e50c4addaa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1466611653911-954815391f6c?auto=format&fit=crop&q=80&w=800"
    ]
  },
];



// ========== COMPONENTS ==========

const MetadataBar = () => {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 w-full z-[70] px-4 py-2 border-b border-black flex justify-between font-mono text-[9px] uppercase tracking-tighter bg-[#F2F2F2]" data-testid="metadata-bar">
      <div className="flex gap-4">
        <span className="font-bold">KEDORION_R&D_CORE // v.2024.08</span>
        <span className="hidden md:block opacity-40 italic">"ANCHORING_REALITY"</span>
      </div>
      <span className="hidden md:block">LOC: 51.2217° N, 6.7762° E</span>
      <span>SYS_TIME: {time || '00:00:00'}</span>
    </div>
  );
};

const Navigation = ({ onMenuToggle, isMenuOpen, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-10 w-full z-50 px-6" data-testid="navigation">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between border-2 border-black bg-white p-4 shadow-brutal">
        <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop} data-testid="logo-home-link">
          <img src="/kedorion.svg" alt="Kedorion" className="w-8 h-8" />
          <span className="text-2xl font-teko font-bold uppercase tracking-tighter">"KEDORION"</span>
          <div className="bg-[#FF4D00] text-white text-[8px] font-mono px-1 py-0.5 uppercase hidden sm:block">EST. 2025</div>
        </div>

        <div className="hidden lg:flex items-center gap-12 font-mono text-[10px] font-bold uppercase tracking-tighter">
        </div>

        <button 
          onClick={onMenuToggle} 
          className="p-2 border border-black hover:bg-black hover:text-white transition-all"
          data-testid="menu-toggle"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

const FullscreenMenu = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const menuItems = [];

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-white flex flex-col p-12 justify-between border-[20px] border-black menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="fullscreen-menu"
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs font-bold text-[#FF4D00] tracking-widest">// DIRECTORY</span>
        <button
          onClick={onClose}
          className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all"
          data-testid="menu-close"
        >
          <X size={40} />
        </button>
      </div>
      <div className="flex flex-col">
        {menuItems.map((item, idx) => (
          <a
            key={item.href}
            href={`#${item.href}`}
            onClick={onClose}
            className="text-5xl md:text-[100px] font-teko font-bold italic uppercase tracking-tighter hover:text-[#FF4D00] transition-colors leading-[0.9] group"
            data-testid={`menu-item-${item.href}`}
          >
            <span className="text-sm font-mono not-italic mr-4 text-black/20 group-hover:text-[#FF4D00]">0{idx+1}</span>
            "{item.label}"
          </a>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[10px] font-bold text-black/40 uppercase">
        <span>Berlin // San Francisco</span>
        <span>Ground Truth Architects</span>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const launch = launches[0];

  return (
    <main className="relative z-10 pt-32 md:pt-48 pb-20 px-4 md:px-6 min-h-screen flex flex-col justify-center" data-testid="hero-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12" data-testid={`hero-slide-${launch.id.toLowerCase()}`}>
          <div className="flex-1 border-l-4 border-black pl-8 md:pl-16 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] bg-black text-white px-2 py-1 uppercase font-bold tracking-widest">{launch.id}</span>
              <span className="font-mono text-[10px] text-black/40 tracking-tighter">SPEC_V.3 // {launch.location}</span>
            </div>

            <h1 className="text-5xl md:text-[90px] font-teko font-bold italic uppercase tracking-tighter leading-[0.85] mb-10">
              Ground Truth <br />
              <span className="product-title" style={{ color: launch.color }}>
                "{launch.product}"
              </span>
            </h1>

            <p className="text-lg md:text-xl font-bold uppercase leading-[1.1] mb-10 tracking-tight max-w-xl">
              {launch.description}
            </p>

          </div>

        </div>
      </div>
    </main>
  );
};





const Footer = ({ onOpenImpressum, onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-20 px-6 border-t-4 border-black bg-[#F2F2F2]" data-testid="footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={scrollToTop} data-testid="footer-logo-link">
            <img src="/kedorion.svg" alt="Kedorion" className="w-10 h-10" />
            <span className="text-2xl font-teko font-bold uppercase tracking-tighter">KEDORION</span>
          </div>
          <p className="font-mono text-[10px] uppercase font-bold text-black/40 leading-relaxed">
            Ground Truth Architects.<br />
            Anchoring Intelligence in Reality.<br />
            © 2026. All Rights Reserved.
          </p>
        </div>

        <div className="md:col-span-8 font-mono text-[10px] uppercase tracking-tighter">
          <div className="space-y-6 md:border-l-2 border-black/10 md:pl-6">
            <div className="font-bold text-black italic">"Mission_Control"</div>
            <p className="text-[9px] text-black/30 font-bold leading-tight">
              Our mission is to develop AI that makes physical operations safer, more efficient, and more responsive.
            </p>
            <a
              href="https://linkedin.com/company/kedorion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[9px] font-bold text-black/50 hover:text-[#FF4D00] transition-colors"
            >
              LinkedIn/Kedorion →
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

// ========== PROJECT DETAIL MODAL ==========
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return ReactDOM.createPortal(
    <motion.div 
      className="fixed inset-0 bg-black/95 flex items-start md:items-center justify-center p-2 md:p-4 overflow-y-auto"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="project-detail-modal"
    >
      <motion.div 
        className="bg-white border-2 border-black w-full max-w-5xl my-2 md:my-4 shadow-brutal-lg relative max-h-[95vh] md:max-h-[85vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b-2 border-black flex justify-between items-start flex-shrink-0" style={{ backgroundColor: project.color + '10' }}>
          <div>
            <div className="font-mono text-[9px] md:text-[10px] uppercase font-bold mb-2" style={{ color: project.color }}>{project.id} // {project.location}</div>
            <h2 className="text-2xl md:text-4xl font-teko font-bold uppercase tracking-tighter">{project.product}</h2>
            <p className="mt-1 font-mono text-[10px] md:text-xs uppercase text-black/50">{project.tag}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 border-2 border-black hover:bg-black hover:text-white transition-all flex-shrink-0"
            data-testid="project-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative mb-4 md:mb-6 border-2 border-black overflow-hidden">
            <img 
              src={project.image} 
              alt={project.product}
              className="w-full h-32 md:h-56 object-cover"
            />
            <div className="absolute top-2 left-2 md:top-3 md:left-3 font-mono text-[7px] md:text-[8px] bg-white border border-black px-1.5 md:px-2 py-0.5 md:py-1 uppercase font-bold">
              Product_Visual // Blueprint
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-2 md:mb-3" style={{ color: project.color }}>// Overview</h3>
            <p className="text-sm md:text-base text-black/80 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Video Placeholder */}
          <div className="mb-4 md:mb-6">
            <h3 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-2 md:mb-3" style={{ color: project.color }}>// Demo Video</h3>
            <div className="relative border-2 border-black overflow-hidden group cursor-pointer">
              <img 
                src={project.videoPlaceholder} 
                alt="Video thumbnail"
                className="w-full h-32 md:h-48 object-cover grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-white rounded-full flex items-center justify-center">
                  <Play size={20} className="text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 font-mono text-[8px] md:text-[10px] bg-black text-white px-2 py-1 uppercase font-bold">
                Video_Preview // Coming Soon
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <h3 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-2 md:mb-3" style={{ color: project.color }}>// Key Features</h3>
              <ul className="space-y-1.5 md:space-y-2">
                {project.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
                    <span style={{ color: project.color }} className="mt-0.5">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-2 md:mb-3" style={{ color: project.color }}>// Tech Specs</h3>
              <div className="space-y-1.5">
                {project.techSpecs && Object.entries(project.techSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-black/10 pb-1.5">
                    <span className="font-mono text-[10px] md:text-xs uppercase text-black/50">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-mono text-[10px] md:text-xs font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-mono text-[10px] md:text-xs uppercase font-bold mb-2 md:mb-3" style={{ color: project.color }}>// Gallery</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {project.galleryImages?.map((img, i) => (
                <div key={i} className="border-2 border-black overflow-hidden group">
                  <img 
                    src={img} 
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-16 md:h-24 object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t-2 border-black bg-[#F2F2F2] flex flex-col md:flex-row justify-between items-center gap-3 flex-shrink-0">
          <span className="font-mono text-[8px] md:text-[10px] uppercase text-black/50">Project_ID: {project.id}_2024</span>
          <button 
            onClick={onClose}
            className="w-full md:w-auto bg-black text-white px-6 md:px-8 py-3 font-mono font-bold uppercase text-xs tracking-widest hover:bg-[#FF4D00] transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};


const VideoBackground = () => {
  return (
    <div className="video-background">
      <div className="absolute inset-0 border-[30px] border-black/5 z-20 pointer-events-none"></div>
      <img
        src="/assets/images/brain.gif"
        alt="background"
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-[#F2F2F2]/30"></div>
    </div>
  );
};

// ========== IMPRESSUM MODAL ==========
const ImpressumModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <motion.div 
      className="fixed inset-0 bg-black/95 flex items-start md:items-center justify-center p-2 md:p-4 overflow-y-auto"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="impressum-modal"
    >
      <motion.div 
        className="bg-white border-2 border-black w-full max-w-3xl my-2 md:my-8 shadow-brutal-lg relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-8 border-b-2 border-black flex justify-between items-start bg-[#F2F2F2]">
          <div>
            <div className="font-mono text-[9px] md:text-[10px] uppercase font-bold mb-2 text-[#FF4D00]">// LEGAL_DOCUMENT</div>
            <h2 className="text-2xl md:text-4xl font-teko font-bold uppercase tracking-tighter">IMPRINT</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 border-2 border-black hover:bg-black hover:text-white transition-all flex-shrink-0"
            data-testid="impressum-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-h-[60vh] md:max-h-none overflow-y-auto">
          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">COMPANY INFORMATION</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              Kedorion GmbH<br />
              Sample Street 123<br />
              10115 Berlin<br />
              Germany
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">REPRESENTED BY</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              Managing Director: [Name of Managing Director]
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">CONTACT</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              Phone: +49 30 1234 5678<br />
              Email: contact@kedorion.io
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">COMMERCIAL REGISTER</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              Entry in the Commercial Register<br />
              Registry Court: District Court Berlin-Charlottenburg<br />
              Registration Number: HRB [Number]
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">VAT IDENTIFICATION NUMBER</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              VAT identification number according to §27 a of the German VAT Act:<br />
              DE [Number]
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">RESPONSIBLE FOR CONTENT</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              [Name]<br />
              Sample Street 123<br />
              10115 Berlin
            </p>
          </div>

          <div className="p-4 md:p-6 border-l-4 border-[#FF4D00] bg-[#F2F2F2]">
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">DISCLAIMER</h3>
            <p className="text-xs md:text-sm text-black/70 leading-relaxed">
              Despite careful content control, we assume no liability for the content of external links. 
              The operators of the linked pages are solely responsible for their content.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-8 border-t-2 border-black bg-[#F2F2F2] flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[8px] md:text-[10px] uppercase text-black/50">DOCUMENT_TYPE: IMPRINT // EN</span>
          <button 
            onClick={onClose}
            className="w-full md:w-auto bg-black text-white px-6 md:px-8 py-3 font-mono font-bold uppercase text-xs tracking-widest hover:bg-[#FF4D00] transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// ========== PRIVACY MODAL ==========
const PrivacyModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <motion.div 
      className="fixed inset-0 bg-black/95 flex items-start md:items-center justify-center p-2 md:p-4 overflow-y-auto"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="privacy-modal"
    >
      <motion.div 
        className="bg-white border-2 border-black w-full max-w-3xl my-2 md:my-8 shadow-brutal-lg relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-8 border-b-2 border-black flex justify-between items-start bg-[#F2F2F2]">
          <div>
            <div className="font-mono text-[9px] md:text-[10px] uppercase font-bold mb-2 text-[#0057FF]">// LEGAL_DOCUMENT</div>
            <h2 className="text-2xl md:text-4xl font-teko font-bold uppercase tracking-tighter">PRIVACY POLICY</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 border-2 border-black hover:bg-black hover:text-white transition-all flex-shrink-0"
            data-testid="privacy-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">1. PRIVACY AT A GLANCE</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed mb-3 md:mb-4">
              <strong>General Information</strong><br />
              The following information provides a simple overview of what happens to your personal data 
              when you visit our website.
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">2. DATA COLLECTION ON OUR WEBSITE</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed mb-3 md:mb-4">
              <strong>Who is responsible for data collection on this website?</strong><br />
              Data processing on this website is carried out by the website operator. You can find their 
              contact details in the imprint of this website.
            </p>
            <p className="text-sm md:text-base text-black/70 leading-relaxed mb-3 md:mb-4">
              <strong>How do we collect your data?</strong><br />
              Your data is collected when you provide it to us. This may include data you enter into a 
              contact form, for example.
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">3. NEWSLETTER</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              If you wish to receive the newsletter offered on our website, we require an email address 
              from you as well as information that allows us to verify that you are the owner of the 
              specified email address and that you agree to receive the newsletter.
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">4. CONTACT FORM</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              If you send us inquiries via the contact form, your details from the inquiry form including 
              the contact data you provided there will be stored by us for the purpose of processing the 
              inquiry and in case of follow-up questions.
            </p>
          </div>

          <div>
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">5. JOB APPLICATIONS</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              When you apply to us, we process your application data (name, email, resume, cover letter) 
              exclusively for the purpose of conducting the application process. The data will be deleted 
              after completion of the application process, unless legal retention obligations exist.
            </p>
          </div>

          <div className="p-4 md:p-6 border-l-4 border-[#0057FF] bg-[#F2F2F2]">
            <h3 className="font-teko text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">YOUR RIGHTS</h3>
            <p className="text-xs md:text-sm text-black/70 leading-relaxed">
              You have the right to access, rectification, deletion, restriction of processing, data 
              portability, and objection. Please contact: contact@kedorion.io
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-8 border-t-2 border-black bg-[#F2F2F2] flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[8px] md:text-[10px] uppercase text-black/50">DOCUMENT_TYPE: PRIVACY_POLICY // EN</span>
          <button 
            onClick={onClose}
            className="w-full md:w-auto bg-black text-white px-6 md:px-8 py-3 font-mono font-bold uppercase text-xs tracking-widest hover:bg-[#FF4D00] transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// ========== MAIN APP ==========
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#1A1A1A] overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            border: '2px solid #000',
            borderRadius: '0',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            textTransform: 'uppercase'
          }
        }}
      />

      <VideoBackground />
      <MetadataBar />
      <Navigation onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} onNavigate={() => {}} />

      <AnimatePresence>
        {isMenuOpen && <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={() => {}} />}
      </AnimatePresence>

      <HeroSection />
      <Footer 
        onOpenImpressum={() => setShowImpressum(true)} 
        onOpenPrivacy={() => setShowPrivacy(true)} 
      />

      {/* Impressum Modal */}
      <AnimatePresence>
        {showImpressum && (
          <ImpressumModal onClose={() => setShowImpressum(false)} />
        )}
      </AnimatePresence>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <PrivacyModal onClose={() => setShowPrivacy(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
