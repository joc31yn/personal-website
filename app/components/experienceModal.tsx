import { motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ExperienceModal({
  children,
  onClose,
}: ModalProps) {
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(23,28,45,0.95),rgba(12,15,25,0.95))] shadow-2xl text-white overflow-hidden p-5"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}
