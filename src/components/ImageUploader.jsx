import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, X, ImageIcon } from 'lucide-react';
import { SAMPLE_IMAGES } from '../utils/sampleImages';
import { loadImageFromFile, loadImageFromCanvas } from '../utils/imageProcessing';

export default function ImageUploader({ imageMeta, onImageLoad, onClear }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    async (file) => {
      if (!file || !file.type.startsWith('image/')) return;
      const result = await loadImageFromFile(file);
      onImageLoad(result);
    },
    [onImageLoad],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile],
  );

  const handleSample = (sample) => {
    const canvas = sample.generate();
    const result = loadImageFromCanvas(canvas, `${sample.name.toLowerCase()}.png`);
    onImageLoad(result);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-3 text-xs font-semibold tracking-wider text-text-muted">
          IMAGE SOURCE
        </h3>

        {!imageMeta ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? 'border-accent bg-accent/5'
                : 'border-white/[0.12] hover:border-accent/50 hover:bg-white/[0.02]'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
              aria-label="Upload image file"
            />
            <Upload className="mx-auto mb-3 h-8 w-8 text-text-dim" />
            <p className="text-sm font-medium text-text">Upload an image</p>
            <p className="mt-1 text-xs text-text-dim">Drag & drop here</p>
            <p className="my-2 text-xs text-text-dim">or</p>
            <span className="inline-block rounded-md bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Browse Files
            </span>
            <p className="mt-3 text-[10px] text-text-dim">PNG • JPG • WEBP</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/[0.08] bg-bg-secondary p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <ImageIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text truncate max-w-[140px]">
                    {imageMeta.name}
                  </p>
                  <p className="text-xs text-text-dim">
                    {imageMeta.width} × {imageMeta.height}
                  </p>
                </div>
              </div>
              <button
                onClick={onClear}
                className="flex h-7 w-7 items-center justify-center rounded-md text-text-dim transition-colors hover:bg-white/[0.06] hover:text-text"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              Loaded
            </div>
          </motion.div>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold tracking-wider text-text-muted">
          TRY A SAMPLE
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSample(sample)}
              className="group rounded-lg border border-white/[0.08] bg-bg-secondary p-2 text-left transition-all hover:scale-[1.02] hover:border-accent/40"
              aria-label={`Load ${sample.name} sample image`}
            >
              <div className="mb-2 aspect-[4/3] overflow-hidden rounded-md border border-white/[0.06]">
                <SampleThumbnail sample={sample} />
              </div>
              <p className="text-xs font-medium text-text">{sample.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SampleThumbnail({ sample }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const canvas = sample.generate();
    const ctx = node.getContext('2d');
    node.width = canvas.width;
    node.height = canvas.height;
    ctx.drawImage(canvas, 0, 0);
  }, [sample]);

  return <canvas ref={canvasRef} className="h-full w-full object-cover" aria-hidden="true" />;
}
