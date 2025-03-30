"use client"

import { useRef, useState, useEffect } from "react"
import { 
  Pencil, 
  Eraser, 
  Trash2, 
  Circle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Slider
} from "@/components/ui/slider"

type DrawingMode = "draw" | "erase" | "none";

interface DrawingBoardProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function DrawingBoard({ containerRef }: DrawingBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("none")
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(3)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  const colors = [
    "#000000", "#4a5568", "#e53e3e", "#38a169", "#3182ce", 
    "#805ad5", "#d69e2e", "#dd6b20", "#ffffff", "#4299e1"
  ]

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        setCanvasContext(context);
        
        // Set canvas dimensions to match container
        const resizeCanvas = () => {
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (containerRect) {
            canvas.width = containerRect.width;
            canvas.height = containerRect.height;
            context.lineCap = 'round';
            context.lineJoin = 'round';
          }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        return () => {
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    }
  }, [containerRef]);

  // Drawing functions
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (drawingMode === "none") return;
    
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas || !canvasContext) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setLastPos({ x, y });
    
    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || drawingMode === "none" || !lastPos) return;
    
    const canvas = canvasRef.current;
    if (!canvas || !canvasContext) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling on touch
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    canvasContext.lineWidth = brushSize;
    canvasContext.lineTo(x, y);
    
    if (drawingMode === "draw") {
      canvasContext.strokeStyle = brushColor;
      canvasContext.globalCompositeOperation = 'source-over';
    } else if (drawingMode === "erase") {
      canvasContext.strokeStyle = '#ffffff';
      canvasContext.globalCompositeOperation = 'destination-out';
    }
    
    canvasContext.stroke();
    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
    if (canvasContext) {
      canvasContext.closePath();
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current && canvasContext) {
      canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const getCursorClass = () => {
    return drawingMode === "draw" ? "cursor-crosshair" : drawingMode === "erase" ? "cursor-cell" : "cursor-default";
  };

  return (
    <>
      {/* Drawing tools */}
      <div className="absolute top-20 left-4 z-50 flex flex-col gap-2 bg-background/80 p-2 rounded-lg backdrop-blur-sm shadow-md border">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={drawingMode === "draw" ? "default" : "outline"}
                size="icon"
                onClick={() => setDrawingMode(drawingMode === "draw" ? "none" : "draw")}
              >
                <Pencil size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Draw</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={drawingMode === "erase" ? "default" : "outline"}
                size="icon"
                onClick={() => setDrawingMode(drawingMode === "erase" ? "none" : "erase")}
              >
                <Eraser size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Eraser</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={clearCanvas}
              >
                <Trash2 size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Clear All</p>
            </TooltipContent>
          </Tooltip>

          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="mt-2" style={{ backgroundColor: brushColor }}>
                    <Circle size={18} className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Color</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64" side="right">
              <div className="flex flex-wrap gap-2 justify-center">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrushColor(color)}
                    className={`w-8 h-8 rounded-full border ${brushColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="mt-2">
                    <div className="h-[18px] w-[18px] flex items-center justify-center">
                      <div 
                        className="rounded-full bg-black" 
                        style={{ width: `${Math.min(brushSize * 2, 16)}px`, height: `${Math.min(brushSize * 2, 16)}px` }}
                      />
                    </div>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Brush Size</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64" side="right">
              <div className="space-y-2">
                <h4 className="font-medium">Brush Size</h4>
                <Slider
                  value={[brushSize]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(value) => setBrushSize(value[0])}
                />
              </div>
            </PopoverContent>
          </Popover>
        </TooltipProvider>
      </div>

      {/* Canvas layer for drawing */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-30 ${getCursorClass()}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* Interaction guide */}
      <div className="absolute top-4 right-4 text-xs text-gray-400 font-medium z-40">
        {drawingMode !== "none" ? "Click and drag to draw" : "Drag items to rearrange"}
      </div>
    </>
  );
} 