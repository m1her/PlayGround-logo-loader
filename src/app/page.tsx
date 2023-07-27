"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";

export default function Home() {
  const [gameOn, setGameOn] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x:  670, y: 265 });
  const svgRef = useRef(null);
  const [animation, changeAnimation] = useCycle("animationOne", "animationTwo");

  const getRotation = () => {
    const { x, y } = cursorPosition;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    return (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
  };

  const rocketAnimation = {
    animationOne: {
      x: !gameOn ? 0 : cursorPosition.x - 670,
      y: !gameOn ? 0 : cursorPosition.y - 265,
      scale: gameOn ? 1 : [1, 1, 1, 2, 1],
      transition: {
        type: gameOn ? "spring" : "tween",
        duration: gameOn ? 0.01 : 2,
        ease: "linear",
        stiffness: 120,
      },
      rotate: gameOn ? getRotation() : 0,
     
    },
    animationTwo: {
      x: gameOn ? cursorPosition.x - 670 : 0,
      y: gameOn ? cursorPosition.y - 265 : 0,
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      changeAnimation();
    }, 4000);
  }, []);

  useEffect(() => {
    if (gameOn) {
      const onMouseMove = (e: { clientX: any; clientY: any }) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      document.addEventListener("mousemove", onMouseMove);

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [gameOn]);

 


  return (
    <div
      id="container"
      className="fixed top-0 left-0 w-full h-screen bg-[#02010a] flex justify-center items-center"
    >
      <motion.div className="flex justify-between items-center text-indigo-500 ">
        <motion.svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-28 h-28 cursor-pointer"
          initial={{ x: "-80vw", y: "100vh", scale: 1 }}
          drag={gameOn}
          dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
          variants={rocketAnimation}
          animate={animation}
          onClick={() => {
            setGameOn(true);
            changeAnimation();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </motion.svg>
        <div className="flex flex-col">
          <motion.div
            className="font-semibold text-2xl ml-4"
            initial={{ opacity: 0, x: 120 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 2.2,
              duration: 0.4,
            }}
          >
            Leap Start
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90%" }}
            transition={{ duration: 0.6, delay: 2.8 }}
            style={{
              height: "3px",
              background: "#6366f1",
              position: "relative",
              marginLeft: "15px",
              marginTop: "4px",
            }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
}
