import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Minimize2, Expand } from 'lucide-react';
import { getMegapixels } from '../utils/imageProcessing';

export default function ImageViewer({
  title,
  imageData,
  selectedPixel,
  onPixelClick,
  interactive = false,
  fadeKey,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [fitMode, setFitMode] = useState(true);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !imageData) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = imageData;

    let displayWidth = width;
    let displayHeight = height;

    if (fitMode) {
      const maxW = container.clientWidth - 32;
      const maxH = 320;
      const scale = Math.min(maxW / width, maxH / height, 1);
      displayWidth = width * scale;
      displayHeight = height * scale;
    } else {
      displayWidth = width * zoom;
      displayHeight = height * zoom;
    }

    canvas.width = displayWidth;
    canvas.height = displayHeight;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCanvas.getContext('2d').putImageData(imageData, 0, 0);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, displayWidth, displayHeight);

    if (selectedPixel && interactive) {
      const scaleX = displayWidth / width;
      const scaleY = displayHeight / height;
      const px = selectedPixel.x * scaleX;
      const py = selectedPixel.y * scaleY;
      const cellW = scaleX;
      const cellH = scaleY;

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, cellW, cellH);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(px + cellW / 2, 0);
      ctx.lineTo(px + cellW / 2, displayHeight);
      ctx.moveTo(0, py + cellH / 2);
      ctx.lineTo(displayWidth, py + cellH / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [imageData, selectedPixel, interactive, zoom, fitMode]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas, fadeKey]);

  useEffect(() => {
    const handleResize = () => drawCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawCanvas]);

  const handleClick = (e) => {
    if (!interactive || !imageData || !onPixelClick) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const scaleX = imageData.width / rect.width;
    const scaleY = imageData.height / rect.height;
    const x = Math.floor(clickX * scaleX);
    const y = Math.floor(clickY * scaleY);
    onPixelClick(x, y);
  };

  const toggleZoom = () => {
    if (fitMode) {
      setFitMode(false);
      setZoom(2);
    } else if (zoom === 2) {
      setZoom(1);
    } else {
      setFitMode(true);
      setZoom(1);
    }
  };

  const megapixels = imageData ? getMegapixels(imageData.width, imageData.height) : null;

  return (
    <div className="flex flex-col rounded-xl border border-white/[0.08] bg-bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <span className="text-xs font-semibold tracking-wider text-text-muted">{title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setFitMode(true);
              setZoom(1);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md text-text-dim transition-colors hover:bg-white/[0.06] hover:text-text"
            aria-label="Fit to screen"
            disabled={!imageData}
          >
            <Expand className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={toggleZoom}
            className="flex h-7 w-7 items-center justify-center rounded-md text-text-dim transition-colors hover:bg-white/[0.06] hover:text-text"
            aria-label="Toggle zoom"
            disabled={!imageData}
          >
            {fitMode || zoom === 1 ? (
              <Maximize2 className="h-3.5 w-3.5" />
            ) : (
              <Minimize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="checkerboard flex min-h-[200px] items-center justify-center p-4"
      >
        {imageData ? (
          <motion.canvas
            key={fadeKey}
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            className={interactive ? 'cursor-crosshair rounded-sm' : 'rounded-sm'}
            role={interactive ? 'button' : 'img'}
            aria-label={interactive ? 'Click to select a pixel' : `${title} image`}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 py-12 text-text-dim">
            <div className="h-16 w-16 rounded-lg border border-dashed border-white/[0.12]" />
            <p className="text-xs">No image loaded</p>
          </div>
        )}
      </div>

      {imageData && (
        <div className="flex items-center gap-4 border-t border-white/[0.08] px-4 py-2.5 text-[11px] text-text-dim">
          <span>
            {imageData.width} × {imageData.height}
          </span>
          <span>RGB</span>
          <span>{megapixels} MP</span>
        </div>
      )}
    </div>
  );
}
