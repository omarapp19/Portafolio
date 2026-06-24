"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Food {
  x: number;
  y: number;
}

export default function SnakeOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const snakeRef = useRef<Point[]>([]);
  const foodsRef = useRef<Food[]>([]);
  const mouseRef = useRef<Point | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
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

      // Initialize snake in the center if empty
      if (snakeRef.current.length === 0) {
        const startX = canvas.width / 2;
        const startY = canvas.height / 2;
        for (let i = 0; i < 8; i++) {
          snakeRef.current.push({ x: startX + i * 8, y: startY });
        }
      }

      // Initialize foods if empty
      if (foodsRef.current.length === 0) {
        for (let i = 0; i < 4; i++) {
          foodsRef.current.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 60) + 30,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates relative to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      lastMoveTimeRef.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
        lastMoveTimeRef.current = Date.now();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("touchmove", handleTouchMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    let animationId: number;

    const gameLoop = () => {
      if (!ctx || canvas.width === 0) return;

      // 1. Update logic
      const snake = snakeRef.current;
      const foods = foodsRef.current;
      const mouse = mouseRef.current;
      const isLight = isLightRef.current;

      const isMouseActive = mouse !== null && (Date.now() - lastMoveTimeRef.current < 2500);
      let target: Point;

      if (isMouseActive) {
        target = mouse;
      } else {
        // Auto-play: head towards the closest food dot
        const head = snake[0];
        let closestFood = foods[0];
        let minDist = Infinity;
        
        foods.forEach((food) => {
          const dist = Math.hypot(food.x - head.x, food.y - head.y);
          if (dist < minDist) {
            minDist = dist;
            closestFood = food;
          }
        });
        
        target = closestFood || { x: canvas.width / 2, y: canvas.height / 2 };
      }

      // Move snake head towards target
      if (snake.length > 0) {
        const head = snake[0];
        const dx = target.x - head.x;
        const dy = target.y - head.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 3) {
          const speed = isMouseActive ? 2.8 : 1.8;
          head.x += (dx / dist) * speed;
          head.y += (dy / dist) * speed;
        }

        // Follow segments
        const segmentDist = 8;
        for (let i = 1; i < snake.length; i++) {
          const prev = snake[i - 1];
          const curr = snake[i];
          const segDx = prev.x - curr.x;
          const segDy = prev.y - curr.y;
          const segDist = Math.hypot(segDx, segDy);

          if (segDist > segmentDist) {
            curr.x = prev.x - (segDx / segDist) * segmentDist;
            curr.y = prev.y - (segDy / segDist) * segmentDist;
          }
        }

        // Collide with food
        foods.forEach((food, idx) => {
          const eatDist = Math.hypot(food.x - head.x, food.y - head.y);
          if (eatDist < 16) {
            // Relocate food
            foods[idx] = {
              x: Math.random() * (canvas.width - 60) + 30,
              y: Math.random() * (canvas.height - 60) + 30,
            };
            // Add segment to tail
            const tail = snake[snake.length - 1];
            if (snake.length < 24) { // Cap length to avoid clutter
              snake.push({ x: tail.x, y: tail.y });
            }
          }
        });
      }

      // 2. Render logic
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colors based on theme
      const glowColor = isLight ? "rgba(37, 99, 235, 0.18)" : "rgba(59, 130, 246, 0.12)";
      const strokeColor = isLight ? "rgba(37, 99, 235, 0.45)" : "rgba(59, 130, 246, 0.35)";
      const foodColor = isLight ? "rgba(6, 182, 212, 0.7)" : "rgba(6, 182, 212, 0.6)";

      // Draw foods
      foods.forEach((food) => {
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#06b6d4";
        ctx.fillStyle = foodColor;
        ctx.beginPath();
        ctx.arc(food.x, food.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw snake
      if (snake.length > 0) {
        ctx.save();
        
        // Draw glow path
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 14;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(snake[0].x, snake[0].y);
        for (let i = 1; i < snake.length; i++) {
          ctx.lineTo(snake[i].x, snake[i].y);
        }
        ctx.stroke();

        // Draw solid path
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(snake[0].x, snake[0].y);
        for (let i = 1; i < snake.length; i++) {
          ctx.lineTo(snake[i].x, snake[i].y);
        }
        ctx.stroke();

        // Draw glowing head
        ctx.fillStyle = isLight ? "#2563eb" : "#3b82f6";
        ctx.shadowBlur = 10;
        ctx.shadowColor = isLight ? "#2563eb" : "#3b82f6";
        ctx.beginPath();
        ctx.arc(snake[0].x, snake[0].y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("touchmove", handleTouchMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
