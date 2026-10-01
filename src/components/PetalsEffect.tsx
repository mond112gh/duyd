import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  sway: number; // px
  rotation: number; // deg
  opacity: number;
}

export const PetalsEffect: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) {
      setPetals([]);
      return;
    }

    const count = 18;
    const generated: Petal[] = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 16,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 10,
        sway: 30 + Math.random() * 40,
        rotation: Math.random() * 360,
        opacity: 0.35 + Math.random() * 0.45,
      });
    }
    setPetals(generated);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-40px] will-change-transform"
          style={{
            left: `${petal.left}%`,
            animation: `fallDown ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          {/* Rose petal SVG */}
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: "drop-shadow(0 2px 4px rgba(212,175,55,0.15))",
            }}
          >
            <path
              d="M15 0 C25 8, 30 22, 22 34 C16 42, 6 38, 3 28 C0 18, 5 4, 15 0 Z"
              fill={petal.id % 3 === 0 ? "#E8B4B8" : petal.id % 2 === 0 ? "#F2D1D1" : "#DDB892"}
            />
            {/* Subtle petal vein */}
            <path
              d="M15 4 C17 16, 14 26, 11 34"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fallDown {
          0% {
            transform: translateY(-40px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(35px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
