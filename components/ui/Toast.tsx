"use client";

import { useShop } from "@/context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Info, AlertTriangle } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full p-4 sm:p-0 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center justify-between gap-3 bg-brand-soft-black border border-brand-gold/30 px-4 py-3.5 shadow-2xl rounded-sm"
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle className="text-brand-gold w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
              {toast.type === "info" && <Info className="text-brand-off-white w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
              {toast.type === "error" && <AlertTriangle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
              <p className="text-brand-off-white text-xs sm:text-sm font-inter tracking-wide font-light">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-brand-gray hover:text-brand-off-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
