import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

// 1. DATA CONFIGURATION
const avatarOptions = {
  hairstyle: [
    "NoHair", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved",
    "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShaggy", "ShortHairTheCaesar",
    "LongHairStraight", "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida",
    "LongHairFro", "LongHairFroBand", "LongHairMiaWallace", "LongHairNotTooLong", "LongHairShavedSides",
    "Hat", "Hijab", "Turban"
  ],
  hairColor: [
    "Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "PastelPink", "Platinum", "Red", "SilverGray"
  ],
  facialHair: ["Blank", "BeardMedium", "BeardLight", "MoustacheFancy", "MoustacheMagnum"],
  eyes: ["Default", "Happy", "Squint", "Surprised", "Wink", "WinkWacky", "Dizzy"],
  eyebrows: ["Default", "RaisedExcited", "SadConcerned", "Angry", "UnibrowNatural"],
  skinColor: ["Light", "Yellow", "Pale", "Tanned", "Brown", "DarkBrown", "Black"],
  clothes: ["ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck", "Hoodie", "Overall", "BlazerShirt", "GraphicShirt"],
  accessories: ["Blank", "PrescriptionGlasses", "Sunglasses", "RoundGlasses", "Earring", "Hat", "EmojiSmile"],
  avatarStyle: ["Transparent", "Circle"]
};

const steps = [
  "Hairstyle", "Hair Color", "Facial Hair", "Eyes", "Eyebrows", "Skin", "Clothes", "Accessories", "Background"
];

const stepKeyMap = [
  "hairstyle", "hairColor", "facialHair", "eyes", "eyebrows", "skinColor", "clothes", "accessories", "avatarStyle"
];

const AvatarModal = ({ isOpen,setIsOpen,onClose, onSave }) => {
  const [step, setStep] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);

  // Initial State
  const [avatar, setAvatar] = useState({
    hairstyle: "ShortHairShortFlat",
    hairColor: "Black",
    facialHair: "Blank",
    eyes: "Default",
    eyebrows: "Default",
    skinColor: "Light",
    clothes: "ShirtCrewNeck",
    accessories: "Blank",
    avatarStyle: "Circle"
  });

  const handleChange = (category, value) => {
    setAvatar((prev) => ({ ...prev, [category]: value }));
    setHasSelected(true);
  };

  const handlePrev = () => { if (step > 0) setStep(step - 1); };
  const handleNext = () => { if (step < steps.length - 1) setStep(step + 1); };

  // 2. URL Builder
  const getAvatarUrl = (config, isMini = false) => {
    const style = isMini ? "Transparent" : config.avatarStyle;
    
    const params = new URLSearchParams({
      avatarStyle: style,
      topType: config.hairstyle,
      hairColor: config.hairColor,
      facialHairType: config.facialHair,
      clotheType: config.clothes,
      eyeType: config.eyes,
      eyebrowType: config.eyebrows,
      skinColor: config.skinColor,
      accessoriesType: config.accessories,
    });

    return `https://avataaars.io/?${params.toString()}`;
  };

  const currentKey = stepKeyMap[step];
  const currentOptions = avatarOptions[currentKey] || [];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
    {isOpen && (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* LAYOUT FIX: 
         1. max-h-[90vh] ensures it fits on screen.
         2. flex flex-col md:flex-row sets up the two main columns.
      */}
      <div className="bg-[#F6F4F1] rounded-xl w-full max-w-5xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] h-full md:h-auto animate-fadeIn">
        
        {/* LEFT: Main Preview */}
        {/* On mobile, this is a fixed height at the top. On desktop, it's the left column. */}
        <div className="w-full h-48 md:w-1/4 md:h-auto bg-[#E6E2DC] flex items-center justify-center p-4 md:p-8 flex-shrink-0">
          <div className="relative h-full aspect-square md:w-full md:h-auto">
             <img
              src={getAvatarUrl(avatar)}
              alt="Avatar Preview"
              className="w-full h-full object-contain drop-shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* RIGHT: Controls */}
        {/* LAYOUT FIX:
           1. flex-1: Takes remaining width.
           2. flex flex-col: Stacks Header -> Breadcrumbs -> Grid -> Footer.
           3. min-h-0: CRITICAL. Allows the nested scroll container to work properly within a flex parent.
        */}
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          
          {/* Header (Fixed Height) */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white flex-shrink-0">
            <h2 className="text-lg font-bold text-gray-700">{steps[step]}</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-red-500 transition p-2">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Breadcrumbs (Fixed Height) */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide flex-shrink-0">
            <div className="flex gap-2">
              {steps.map((s, idx) => (
                <button
                  key={s}
                  onClick={() => setStep(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    idx === step
                      ? "bg-[#6C8E80] text-white shadow-md transform scale-105"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Options Grid (Scrollable Area) */}
          {/* flex-1 ensures this fills the middle space. overflow-y-auto enables scrolling. */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {currentOptions.map((opt) => {
                const previewConfig = { ...avatar, [currentKey]: opt };
                const isSelected = avatar[currentKey] === opt;

                return (
                  <button
                    key={opt}
                    onClick={() => handleChange(currentKey, opt)}
                    className={`
                      relative group flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-200
                      ${isSelected 
                        ? "border-[#6C8E80] bg-white shadow-md ring-2 ring-[#6C8E80]/20" 
                        : "border-transparent bg-white hover:border-gray-300 hover:shadow-sm"
                      }
                    `}
                  >
                    {step !== 8 ? (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2 overflow-hidden">
                        <img
                          src={getAvatarUrl(previewConfig, true)}
                          alt={opt}
                          loading="lazy"
                          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-full mb-2 border flex items-center justify-center ${opt === 'Circle' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                         {opt === 'Circle' ? <div className="w-8 h-8 rounded-full bg-blue-500" /> : <FaTimes className="text-gray-400"/>}
                      </div>
                    )}
                    
                    <span className={`text-[10px] text-center w-full truncate ${isSelected ? "font-bold text-[#6C8E80]" : "text-gray-500"}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer (Fixed Height) */}
          {/* flex-shrink-0 ensures this is NEVER squashed or hidden */}
          <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center  z-10 ">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LuArrowLeft /> <span className="hidden sm:inline">Back</span>
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-[#6C8E80] text-white hover:bg-[#5a7a6c] shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                Next <LuArrowRight />
              </button>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                {!hasSelected && (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={() => onSave(avatar)}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#6C8E80] text-white hover:bg-[#5a7a6c] shadow-md hover:shadow-lg transition-all transform active:scale-95"
                >
                  Save
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default AvatarModal;