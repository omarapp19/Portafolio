"use client";

import { useEffect, useRef } from "react";

interface Tetromino {
  matrix: number[][];
  x: number;
  y: number;
  color: string;
  size: number;
}

interface LandedBlock {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  timestamp: number;
}

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 0], [1, 0], [1, 1]], // L
  [[0, 1], [0, 1], [1, 1]], // J
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]]  // Z
];

export default function TetrisOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activePieceRef = useRef<Tetromino | null>(null);
  const landedBlocksRef = useRef<LandedBlock[]>([]);
  const mouseRef = useRef<{ x: number } | null>(null);
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
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse horizontal coordinate relative to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
      };
      lastMoveTimeRef.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
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

    const spawnPiece = (): Tetromino => {
      const size = Math.floor(Math.min(canvas.width / 24, 20)); // scale block size with screen width
      const matrix = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      return {
        matrix,
        x: Math.random() * (canvas.width - size * 4) + size,
        y: -size * 3,
        size,
        color: isLightRef.current ? "rgba(37, 99, 235, 0.45)" : "rgba(59, 130, 246, 0.35)",
      };
    };

    const gameLoop = () => {
      if (!ctx || canvas.width === 0) return;

      // 1. Update logic
      const isLight = isLightRef.current;
      const mouse = mouseRef.current;
      const isMouseActive = mouse !== null && (Date.now() - lastMoveTimeRef.current < 2500);

      // Spawn piece if none active
      if (!activePieceRef.current) {
        activePieceRef.current = spawnPiece();
      }

      const piece = activePieceRef.current;
      const landed = landedBlocksRef.current;

      if (piece) {
        // Fall down
        piece.y += 2.2; // falling speed

        // Steer with mouse X
        if (isMouseActive) {
          const dx = mouse.x - (piece.x + (piece.matrix[0].length * piece.size) / 2);
          piece.x += dx * 0.08; // smooth horizontal drift towards cursor
        }

        // Keep inside boundaries
        piece.x = Math.max(0, Math.min(canvas.width - piece.matrix[0].length * piece.size, piece.x));

        // Check landing on bottom
        const bottomY = canvas.height;
        const pieceHeight = piece.matrix.length * piece.size;
        
        if (piece.y + pieceHeight >= bottomY) {
          // Add to landed blocks
          const now = Date.now();
          for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[r].length; c++) {
              if (piece.matrix[r][c]) {
                landed.push({
                  x: piece.x + c * piece.size,
                  y: canvas.height - (piece.matrix.length - r) * piece.size,
                  size: piece.size,
                  opacity: 1.0,
                  color: piece.color,
                  timestamp: now,
                });
              }
            }
          }
          // Reset active piece so a new one spawns
          activePieceRef.current = null;
        }
      }

      // Update landed blocks (fade out and remove after 6 seconds)
      const now = Date.now();
      landedBlocksRef.current = landed.filter((block) => {
        const elapsed = now - block.timestamp;
        if (elapsed > 5000) {
          block.opacity = Math.max(0, 1.0 - (elapsed - 5000) / 1000);
        }
        return block.opacity > 0;
      });

      // 2. Render logic
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw landed blocks
      landedBlocksRef.current.forEach((block) => {
        ctx.save();
        ctx.strokeStyle = block.color.replace(/[\d\.]+\)$/, `${block.opacity * 0.45})`);
        ctx.fillStyle = block.color.replace(/[\d\.]+\)$/, `${block.opacity * 0.12})`);
        ctx.lineWidth = 1;
        ctx.shadowBlur = block.opacity * 5;
        ctx.shadowColor = isLight ? "#2563eb" : "#3b82f6";
        
        ctx.beginPath();
        ctx.rect(block.x, block.y, block.size, block.size);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Draw active piece
      if (piece) {
        ctx.save();
        ctx.strokeStyle = isLight ? "rgba(37, 99, 235, 0.55)" : "rgba(59, 130, 246, 0.45)";
        ctx.fillStyle = isLight ? "rgba(37, 99, 235, 0.15)" : "rgba(59, 130, 246, 0.08)";
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = isLight ? "#2563eb" : "#3b82f6";

        for (let r = 0; r < piece.matrix.length; r++) {
          for (let c = 0; c < piece.matrix[r].length; c++) {
            if (piece.matrix[r][c]) {
              const px = piece.x + c * piece.size;
              const py = piece.y + r * piece.size;
              
              ctx.beginPath();
              ctx.rect(px, py, piece.size, piece.size);
              ctx.fill();
              ctx.stroke();
            }
          }
        }
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
