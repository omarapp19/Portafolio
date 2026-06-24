"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface PacDot {
  x: number;
  y: number;
  eaten: boolean;
  respawnTime: number;
}

export default function PacmanOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const pacmanRef = useRef({
    x: 0,
    y: 0,
    radius: 12,
    angle: 0,
    mouthAngle: 0.2,
    mouthDirection: 1, // 1 for opening, -1 for closing
    direction: "none" as "none" | "left" | "right" | "up" | "down",
  });
  
  const dotsRef = useRef<PacDot[]>([]);
  const isLightRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect light mode
    const checkTheme = () => {
      isLightRef.current = document.documentElement.classList.contains("light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // Initialize Pacman position in the center
      if (pacmanRef.current.x === 0) {
        pacmanRef.current.x = canvas.width / 2;
        pacmanRef.current.y = canvas.height / 2;
      }

      // Initialize dots
      if (dotsRef.current.length === 0) {
        for (let i = 0; i < 12; i++) {
          dotsRef.current.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 60) + 30,
            eaten: false,
            respawnTime: 0,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;

    const gameLoop = () => {
      if (!ctx || canvas.width === 0) return;

      const isLight = isLightRef.current;
      const pacman = pacmanRef.current;
      const dots = dotsRef.current;
      const now = Date.now();

      // Find the nearest active dot
      let closestDot: PacDot | null = null;
      let minDist = Infinity;

      dots.forEach((dot) => {
        if (!dot.eaten) {
          const dist = Math.hypot(dot.x - pacman.x, dot.y - pacman.y);
          if (dist < minDist) {
            minDist = dist;
            closestDot = dot;
          }
        }
      });

      const target = closestDot || { x: canvas.width / 2, y: canvas.height / 2 };

      const dx = target.x - pacman.x;
      const dy = target.y - pacman.y;
      const speed = 1.6; // Autoplay speed
      const alignThreshold = 4.0;

      // 1. Direct opposite correction (if target changes to behind Pacman)
      if (pacman.direction === "right" && dx < -alignThreshold) {
        pacman.direction = "left";
      } else if (pacman.direction === "left" && dx > alignThreshold) {
        pacman.direction = "right";
      } else if (pacman.direction === "down" && dy < -alignThreshold) {
        pacman.direction = "up";
      } else if (pacman.direction === "up" && dy > alignThreshold) {
        pacman.direction = "down";
      }

      // 2. Choose direction if none
      if (pacman.direction === "none") {
        if (Math.abs(dx) > alignThreshold) {
          pacman.direction = dx > 0 ? "right" : "left";
        } else if (Math.abs(dy) > alignThreshold) {
          pacman.direction = dy > 0 ? "down" : "up";
        }
      }

      // 3. Move strictly in straight lines along the chosen direction
      if (pacman.direction === "right") {
        const step = Math.min(dx, speed);
        if (step > 0) {
          pacman.x += step;
          pacman.angle = 0;
        }
        if (pacman.x >= target.x - alignThreshold) {
          pacman.x = target.x;
          // Alternate to Y axis if needed
          if (Math.abs(dy) > alignThreshold) {
            pacman.direction = dy > 0 ? "down" : "up";
          } else {
            pacman.direction = "none";
          }
        }
      } else if (pacman.direction === "left") {
        const step = Math.min(Math.abs(dx), speed);
        if (step > 0) {
          pacman.x -= step;
          pacman.angle = Math.PI;
        }
        if (pacman.x <= target.x + alignThreshold) {
          pacman.x = target.x;
          if (Math.abs(dy) > alignThreshold) {
            pacman.direction = dy > 0 ? "down" : "up";
          } else {
            pacman.direction = "none";
          }
        }
      } else if (pacman.direction === "down") {
        const step = Math.min(dy, speed);
        if (step > 0) {
          pacman.y += step;
          pacman.angle = Math.PI / 2;
        }
        if (pacman.y >= target.y - alignThreshold) {
          pacman.y = target.y;
          // Alternate to X axis if needed
          if (Math.abs(dx) > alignThreshold) {
            pacman.direction = dx > 0 ? "right" : "left";
          } else {
            pacman.direction = "none";
          }
        }
      } else if (pacman.direction === "up") {
        const step = Math.min(Math.abs(dy), speed);
        if (step > 0) {
          pacman.y -= step;
          pacman.angle = -Math.PI / 2;
        }
        if (pacman.y <= target.y + alignThreshold) {
          pacman.y = target.y;
          if (Math.abs(dx) > alignThreshold) {
            pacman.direction = dx > 0 ? "right" : "left";
          } else {
            pacman.direction = "none";
          }
        }
      }

      // Animate mouth opening/closing
      pacman.mouthAngle += 0.04 * pacman.mouthDirection;
      if (pacman.mouthAngle >= 0.45) {
        pacman.mouthAngle = 0.45;
        pacman.mouthDirection = -1;
      } else if (pacman.mouthAngle <= 0.05) {
        pacman.mouthAngle = 0.05;
        pacman.mouthDirection = 1;
      }

      // Check collision with dots & handle respawn
      dots.forEach((dot) => {
        if (!dot.eaten) {
          const eatDist = Math.hypot(dot.x - pacman.x, dot.y - pacman.y);
          if (eatDist < pacman.radius + 4) {
            dot.eaten = true;
            dot.respawnTime = now + 4000; // Respawn after 4 seconds
          }
        } else if (now >= dot.respawnTime) {
          // Respawn in a new position
          dot.x = Math.random() * (canvas.width - 60) + 30;
          dot.y = Math.random() * (canvas.height - 60) + 30;
          dot.eaten = false;
        }
      });

      // 2. Render logic
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render dots
      const dotColor = isLight ? "rgba(37, 99, 235, 0.65)" : "rgba(250, 204, 21, 0.5)";
      dots.forEach((dot) => {
        if (!dot.eaten) {
          ctx.save();
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Render Pac-Man (glowing yellow character)
      ctx.save();
      ctx.fillStyle = isLight ? "#d97706" : "#facc15";
      ctx.shadowBlur = 10;
      ctx.shadowColor = isLight ? "#d97706" : "#facc15";
      
      ctx.beginPath();
      // Draw standard pie sector representing Pac-Man
      ctx.arc(
        pacman.x,
        pacman.y,
        pacman.radius,
        pacman.angle + pacman.mouthAngle,
        pacman.angle + 2 * Math.PI - pacman.mouthAngle
      );
      ctx.lineTo(pacman.x, pacman.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
}
