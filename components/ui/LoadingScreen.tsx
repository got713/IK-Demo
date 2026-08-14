"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Disable scrolling when loading screen is visible
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2000);
    
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="relative w-[280px] h-[90px]">
              <Image
                src="/images/logo-light.png"
                alt="Ibrahim Khoder Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="h-[1px] bg-brand-gold"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
