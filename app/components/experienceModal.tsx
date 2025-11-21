import { motion } from "framer-motion";
import { X } from "lucide-react";
import { TimelineItem } from "./bigDipperTimeline";

interface ModalProps {
  item: TimelineItem;
  onClose: () => void;
}

export default function ExperienceModal({ item, onClose }: ModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(23,28,45,0.95),rgba(12,15,25,0.95))] shadow-2xl text-white overflow-hidden p-5"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div className="space-y-2">
          <div className="flex flex-row justify-between items-start">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white hover:text-white hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-white/70 text-sm">{item.date}</p>
          {item.summary.map((line, i) => (
            <div key={i}>
              <p
                className={`leading-snug text-xs md:text-sm border-l-2 border-white pl-2 ${
                  i < item.summary.length - 1 ? "my-3" : "mt-3"
                }`}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
