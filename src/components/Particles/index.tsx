import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Particle = ({ x, y, size, color }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: y - 100, // You can adjust this value to control the particle's upward movement
        rotate: Math.random() * 360, // Random rotation
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
    />
  );
};

const ParticleAnimation = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleInterval = setInterval(() => {
      // Generate a new particle with random properties
      const newParticle = {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        size: Math.random() * 20 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      };

      // Add the new particle to the array
      setParticles((prevParticles) => [...prevParticles, newParticle]);
    }, 200); // Adjust the interval to control the frequency of new particles

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </div>
  );
};

export default ParticleAnimation;
