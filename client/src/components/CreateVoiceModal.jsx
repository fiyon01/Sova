import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHeart, LuClock, LuPenLine } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

/* ================= ANIMATIONS ================= */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

/* ================= COMPONENT ================= */

const CreateVoiceModal = ({ isOpen, onClose, entry = "direct" }) => {
  const [selected, setSelected] = useState(null);
  const [tag, setTag] = useState("Vent");
  const [text, setText] = useState("");

  const handlePost = async (url) => {
    const toastId = toast.loading("Posting...");
    try {
      if (!selected || !text.trim()) {
        toast.update(toastId, {
          render: "Please select a post type and enter text",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      if (selected === "private") {
        const respponse = await axios.post(
          "http://localhost:3000/create-private/posts",
          {
            post_type: selected,
            content: text.trim(),
            tags: tag,
          },
        );

        if (response.status === 200) {
          toast.update(toastId, {
            render: "Post created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          onClose();
          setText("");
          setSelected(null);
          setTag("Vent");
        }

        console.log(response.data);
      }

      if (selected === "share") {
        const response = await axios.post(
          "http://localhost:3000/create-share/posts",
          {
            post_type: selected,
            content: text.trim(),
            tags: tag,
          },{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
          }
        );

        if (response.status === 200) {
          toast.update(toastId, {
            render: "Post created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          onClose();
          setText("");
          setSelected(null);
          setTag("Vent");
        }

        console.log(response.data);
      }

      if (selected === "sit") {
        const response = await axios.post(
          "http://localhost:3000/create-sit/posts",
          {
            post_type: selected,
            content: text.trim(),
            tags: tag,
          },
        );

        if (response.status === 200) {
          toast.update(toastId, {
            render: "Post created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          onClose();
          setText("");
          setSelected(null);
          setTag("Vent");
        }

        console.log(response.data);
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Error creating post",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl mx-4 rounded-2xl bg-[#F6F4F1] p-5 shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium">Create a Voice</h2>
                <p className="text-sm text-[#727C88]">
                  {entry === "checkin"
                    ? "Continue your check-in"
                    : "Share in your own way"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-[#727C88] hover:text-[#6C8E80] transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-between w-full gap-2 mt-2 border border-[#E6E2DC] rounded-xl p-2 bg-[#F6F4F1]">
              {/* Vent */}
              <button
                onClick={() => setTag("Vent")}
                className={`w-1/4 cursor-pointer border-r border-[#E6E2DC] py-1 font-medium transition-all duration-300 rounded-l-xl hover:scale-105
          ${tag === "Vent" ? "bg-[#6C8E80] text-white shadow-md" : "bg-[#E6E2DC] text-[#727C88] hover:bg-[#D6E5DD] hover:text-[#1C1C1C]"}
        `}
              >
                Vent
              </button>

              {/* Positivity */}
              <button
                onClick={() => setTag("Positivity")}
                className={`w-1/4 cursor-pointer border-r border-[#E6E2DC] py-1 font-medium transition-all duration-300 hover:scale-105
          ${tag === "Positivity" ? "bg-[#6C8E80] text-white shadow-md" : "bg-[#E6E2DC] text-[#727C88] hover:bg-[#D6E5DD] hover:text-[#1C1C1C]"}
        `}
              >
                Positivity
              </button>

              {/* Seeking Support */}
              <button
                onClick={() => setTag("Seeking Support")}
                className={`w-1/4 cursor-pointer border-r border-[#E6E2DC] py-1 font-medium transition-all duration-300 hover:scale-105
          ${tag === "Seeking Support" ? "bg-[#6C8E80] text-white shadow-md" : "bg-[#E6E2DC] text-[#727C88] hover:bg-[#D6E5DD] hover:text-[#1C1C1C]"}
        `}
              >
                Seeking Support
              </button>

              {/* Other */}
              <button
                onClick={() => setTag("Other")}
                className={`w-1/4 cursor-pointer py-1 font-medium transition-all duration-300 rounded-r-xl hover:scale-105
          ${tag === "Other" ? "bg-[#6C8E80] text-white shadow-md" : "bg-[#E6E2DC] text-[#727C88] hover:bg-[#D6E5DD] hover:text-[#1C1C1C]"}
        `}
              >
                Other
              </button>
            </div>

            {/* Content */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What’s sitting with you right now?"
              className="mt-4 w-full h-32 rounded-xl bg-white p-4 outline-none focus:ring-2 focus:ring-[#6C8E80]"
            />

            {/* Divider */}
            <div className="my-4 h-px bg-[#E6E2DC]" />

            <p className="text-sm mb-2">Choose what happens next</p>

            {/* OPTIONS */}
            <div className="flex flex-col gap-2">
              {[
                {
                  id: "private",
                  icon: <LuHeart />,
                  title: "Just for me",
                  desc: "Saved privately in My Space",
                },
                {
                  id: "share",
                  icon: <LuClock />,
                  title: "Share gently",
                  desc: "Appears in Voices feed",
                },
                {
                  id: "sit",
                  icon: <LuPenLine />,
                  title: "Sit with me",
                  desc: "Creates a quiet shared room",
                },
              ].map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(item.id)}
                  className={`flex gap-3 items-center rounded-xl px-2 py-1 border cursor-pointer transition
                    ${
                      selected === item.id
                        ? "border-[#6C8E80] bg-[#F3F7F5] ring-2 ring-[#6C8E80]"
                        : "border-[#E6E2DC] hover:border-[#6C8E80]"
                    }`}
                >
                  <span className="text-[#727C88]">{item.icon}</span>
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-xs text-[#727C88]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <button
              disabled={!selected || !text.trim()}
              className="mt-5 w-full rounded-xl bg-[#6C8E80] py-2 text-white transition disabled:opacity-40"
              onClick={handlePost}
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateVoiceModal;
