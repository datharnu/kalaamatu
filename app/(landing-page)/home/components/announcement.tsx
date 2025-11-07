"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { text } from "stream/consumers";

const ShippingAnnouncements = () => {
  const announcements = [
    "Free Lagos shipping on all orders",
    "Welcome to Boots and More!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: any) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prev) =>
        (prev + newDirection + announcements.length) % announcements.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative  py-3 overflow-hidden">
      <div className="max-w-screen-xl lg:mx-72 mx-8   flex items-center justify-between ">
        <button
          onClick={() => paginate(-1)}
          className="p-1 hover:bg-gray-200 rounded-full z-10"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3 h-3" />
        </button>

        <div
          className="mx-4 relative overflow-hidden w-[300px] h-[24px]"
          style={{
            background: "rgb(var(--color-background))",
            color: "rgb(var(--color-foreground))",
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 30 },
                opacity: { duration: 3 },
              }}
              className="absolute w-full text-center text-xs tracking-widest  "
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              {announcements[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => paginate(1)}
          className="p-1 hover:bg-gray-200 rounded-full z-10"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <hr className="my-2 border-gray-200" />
    </div>
  );
};

export default ShippingAnnouncements;
