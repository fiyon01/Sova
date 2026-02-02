import React, { useState, useEffect, useRef, useCallback } from "react";
import "../components/css/voices.css";
import {
  LuHeart,
  LuClock,
  LuPenLine,
  LuEllipsis,
  LuPlus,
  LuCheck // Ensure you are using LuCheck (not LuCheckCircle)
} from "react-icons/lu";
import { motion } from "framer-motion"; // <--- 1. Import Framer Motion
import CreateVoiceModal from "../components/CreateVoiceModal";

// CONSTANTS
const MAX_VOICES = 40;
const BATCH_SIZE = 8;

const Voices = () => {
  const [openCreate, setOpenCreate] = useState(false);
  
  const [voices, setVoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);
  const hasReachedLimit = voices.length >= MAX_VOICES;

  const fetchVoices = useCallback(async () => {
    if (loading || hasReachedLimit) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newVoices = Array.from({ length: BATCH_SIZE }).map((_, i) => ({
      id: Date.now() + i,
      user: "Anonymous",
      time: "Just now",
      content: "I am tired of pretending to be happy. At work I hide it, but I can’t continue this way. I want to feel okay again.",
    }));

    setVoices((prev) => {
      const updated = [...prev, ...newVoices];
      return updated.length > MAX_VOICES ? updated.slice(0, MAX_VOICES) : updated;
    });

    setLoading(false);
  }, [loading, hasReachedLimit]);

  useEffect(() => {
    fetchVoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasReachedLimit && !loading) {
          fetchVoices();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [fetchVoices, hasReachedLimit, loading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#F6F4F1] pt-16 overflow-x-hidden voices">
      
      {/* Header with Fade In */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mt-6 gap-1 text-center"
      >
        <h1 className="text-2xl font-semibold text-[#1C1C1C]">You are not alone</h1>
        <p className="text-[#727C88]">Read, sit with, or share gently</p>

        <button
          onClick={() => setOpenCreate(true)}
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full
          bg-[#6C8E80] text-white text-sm
          hover:scale-[1.02] active:scale-95 transition"
        >
          <LuPlus className="w-4 h-4" />
          Create a Voice
        </button>
      </motion.div>

      {/* Filters */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2 border border-[#E6E2DC] rounded-full p-2 bg-white">
          {["Vent", "Seeking Support", "Positivity"].map((tag) => (
            <div
              key={tag}
              className="voices-item px-4 py-1 text-sm text-[#5C5C5C] hover:bg-[#F6F4F1] rounded-full cursor-pointer transition"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Voices Feed Container */}
      <div className="voices-container flex flex-col gap-4 items-center mt-6 pb-20">
        
        {/* Render the Voices List */}
        {voices.map((voice, index) => (
          <VoiceCard key={voice.id} data={voice} index={index} />
        ))}

        {/* --- THE SENTINEL / LOADER AREA --- */}
        <div ref={observerTarget} className="w-full flex justify-center py-6">
          
          {loading && !hasReachedLimit && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 text-[#727C88]"
            >
              <div className="w-6 h-6 border-2 border-[#6C8E80] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs">Gathering voices...</span>
            </motion.div>
          )}

          {/* State 2: Limit Reached Animation */}
          {hasReachedLimit && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:w-[90%] w-full p-8 bg-[#E8E6E1] rounded-xl text-center border border-[#D1CDC7]"
            >
              <div className="flex justify-center mb-3 text-[#6C8E80]">
                <LuCheck size={32} />
              </div>
              <h3 className="text-lg font-medium text-[#1C1C1C]">You've heard 40 voices today.</h3>
              <p className="text-[#5C5C5C] text-sm mt-2 max-w-md mx-auto leading-relaxed">
                To protect your peace, we limit the feed. Take a moment to reflect on what you've read, or share your own story.
              </p>
              <button 
                onClick={scrollToTop}
                className="mt-6 text-sm text-[#6C8E80] underline hover:text-[#557266] transition"
              >
                Back to top
              </button>
            </motion.div>
          )}
        </div>

      </div>

      <CreateVoiceModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </div>
  );
};

// --- ANIMATED CARD COMPONENT ---
const VoiceCard = ({ data, index }) => (
  <motion.div
    // 1. Initial State: Invisible and pushed down 20px
    initial={{ opacity: 0, y: 20 }}
    // 2. Animate To: Visible and in place when it enters viewport
    whileInView={{ opacity: 1, y: 0 }}
    // 3. Viewport settings: Run once, trigger when 50px from bottom
    viewport={{ once: true, margin: "-50px" }}
    // 4. Transition details: Smooth ease-out over 0.5 seconds
    transition={{ duration: 0.5, ease: "easeOut" }}
    
    className="bg-white w-full p-5 rounded-xl shadow-sm hover:shadow-md transition md:w-[90%] border border-transparent hover:border-[#E6E2DC]"
  >
    {/* Meta */}
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        <p className="text-sm font-medium text-[#1C1C1C]">{data.user}</p>
        <p className="text-xs text-[#727C88] mt-0.5">{data.time}</p>
      </div>
      <button className="text-[#727C88] hover:text-[#6C8E80] transition">
        <LuEllipsis className="w-5 h-5" />
      </button>
    </div>

    {/* Content */}
    <div className="mt-3 md:w-[90%]">
      <p className="text-[#1C1C1C] leading-relaxed text-[15px]">
        {data.content}
      </p>
    </div>

    {/* Actions */}
    <div className="flex justify-between mt-5 text-sm">
      <Action icon={<LuHeart />} label="I hear you" />
      <Action icon={<LuClock />} label="Sit with" />
      <Action icon={<LuPenLine />} label="Respond" />
    </div>
  </motion.div>
);

const Action = ({ icon, label }) => (
  <button
    className="flex items-center gap-2 px-3 py-2 rounded-lg
    bg-transparent 
    text-[#727C88]
    hover:bg-[#F6F4F1] hover:text-[#6C8E80]
    transition active:scale-95"
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default Voices;