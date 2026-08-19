import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import FilterPanel from './FilterPanel';
import ImageViewer from './ImageViewer';
import PixelInspector from './PixelInspector';
import NeighborhoodMatrix from './NeighborhoodMatrix';
import KernelDisplay from './KernelDisplay';
import CalculationPanel from './CalculationPanel';
import ActionBar from './ActionBar';
import ProcessingOverlay from './ProcessingOverlay';
import { FILTERS } from '../utils/kernels';
import {
  applyFilter,
  getPixel,
  getNeighborhood,
  computeConvolutionResult,
  buildCalculationSteps,
  getIntensity,
  downloadImageData,
} from '../utils/imageProcessing';

export default function LabWorkspace({ onResetAll }) {
  const [originalImageData, setOriginalImageData] = useState(null);
  const [processedImageData, setProcessedImageData] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [selectedPixel, setSelectedPixel] = useState(null);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [processKey, setProcessKey] = useState(0);

  const handleImageLoad = useCallback(({ imageData, name, width, height }) => {
    setOriginalImageData(imageData);
    setProcessedImageData(imageData);
    setImageMeta({ name, width, height });
    setSelectedPixel(null);
    setSelectedFilter('original');
    setProcessKey((k) => k + 1);
  }, []);

  const handleClear = useCallback(() => {
    setOriginalImageData(null);
    setProcessedImageData(null);
    setImageMeta(null);
    setSelectedPixel(null);
    setSelectedFilter('original');
  }, []);

  const handleReset = useCallback(() => {
    if (originalImageData) {
      setProcessedImageData(
        new ImageData(
          new Uint8ClampedArray(originalImageData.data),
          originalImageData.width,
          originalImageData.height,
        ),
      );
      setSelectedFilter('original');
      setSelectedPixel(null);
      setProcessKey((k) => k + 1);
    }
  }, [originalImageData]);

  const handleApplyFilter = useCallback(async () => {
    if (!originalImageData) return;

    setProcessingStatus('processing');

    await new Promise((r) => setTimeout(r, 300));

    const filter = FILTERS[selectedFilter];
    const result = applyFilter(originalImageData, filter);
    setProcessedImageData(result);
    setProcessKey((k) => k + 1);

    setProcessingStatus('complete');
    setTimeout(() => setProcessingStatus(null), 800);
  }, [originalImageData, selectedFilter]);

  const handlePixelClick = useCallback(
    (x, y) => {
      if (!originalImageData) return;
      const { data, width, height } = originalImageData;
      const pixel = getPixel(data, x, y, width, height);
      setSelectedPixel({ x, y, ...pixel });
    },
    [originalImageData],
  );

  const pixelInfo = useMemo(() => {
    if (!selectedPixel) return null;
    return selectedPixel;
  }, [selectedPixel]);

  const neighborhood = useMemo(() => {
    if (!originalImageData || !selectedPixel) return null;
    return getNeighborhood(originalImageData, selectedPixel.x, selectedPixel.y);
  }, [originalImageData, selectedPixel]);

  const calculation = useMemo(() => {
    if (!selectedPixel || !originalImageData) return null;

    const filter = FILTERS[selectedFilter];
    const key = `${selectedPixel.x}-${selectedPixel.y}-${selectedFilter}`;

    if (filter.type === 'point') {
      const { r, g, b } = selectedPixel;
      if (filter.id === 'grayscale') {
        const result = getIntensity(r, g, b);
        return {
          type: 'point',
          key,
          formula: `gray = 0.299(${r}) + 0.587(${g}) + 0.114(${b}) = ${result}`,
          result,
        };
      }
      if (filter.id === 'invert') {
        const result = getIntensity(255 - r, 255 - g, 255 - b);
        return {
          type: 'point',
          key,
          formula: `invert = 255 − ${selectedPixel.intensity} = ${255 - selectedPixel.intensity}`,
          result: 255 - selectedPixel.intensity,
        };
      }
      return null;
    }

    if (filter.type === 'convolution' && neighborhood) {
      const { result } = computeConvolutionResult(neighborhood, filter.kernel);
      const rows = buildCalculationSteps(neighborhood, filter.kernel);
      return {
        type: 'convolution',
        key,
        rows,
        result,
      };
    }

    return null;
  }, [selectedPixel, originalImageData, selectedFilter, neighborhood]);

  const handleDownload = () => {
    if (processedImageData) {
      const filterName = FILTERS[selectedFilter].name.toLowerCase().replace(/\s+/g, '-');
      downloadImageData(processedImageData, `processed-${filterName}.png`);
    }
  };

  const handleFullReset = () => {
    handleClear();
    onResetAll?.();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <span className="mb-3 inline-block rounded-full border border-white/[0.08] bg-bg-card px-3 py-1 text-xs font-medium tracking-wider text-text-muted">
            IMAGE PROCESSING LAB
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Interactive Workspace
          </h1>
          <p className="mt-2 max-w-xl text-sm text-text-muted">
            Upload an image, apply filters and explore how individual pixels are transformed.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-bg-card px-4 py-2">
          <span
            className={`h-2 w-2 rounded-full ${
              imageMeta ? 'bg-emerald-400' : 'bg-text-dim'
            }`}
          />
          <span className="text-xs font-medium text-text-muted">
            {imageMeta ? 'Image Loaded' : 'Ready'}
          </span>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-3">
          <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
            <ImageUploader
              imageMeta={imageMeta}
              onImageLoad={handleImageLoad}
              onClear={handleClear}
            />
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
            <FilterPanel
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              disabled={!originalImageData}
            />
          </div>
        </aside>

        <div className="space-y-6 lg:col-span-9">
          <div className="grid gap-6 md:grid-cols-2">
            <ImageViewer
              title="ORIGINAL"
              imageData={originalImageData}
              selectedPixel={selectedPixel}
              onPixelClick={handlePixelClick}
              interactive
            />
            <div className="relative">
              <ImageViewer
                title="PROCESSED"
                imageData={processedImageData}
                fadeKey={processKey}
              />
              <ProcessingOverlay status={processingStatus} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <PixelInspector pixel={pixelInfo} />
            <NeighborhoodMatrix
              neighborhood={neighborhood}
              selectedPixel={selectedPixel}
            />
            <KernelDisplay filterId={selectedFilter} />
            <CalculationPanel
              calculation={calculation}
              filterName={FILTERS[selectedFilter]?.name}
              hasKernel={FILTERS[selectedFilter]?.type === 'convolution'}
            />
          </div>

          <ActionBar
            hasImage={!!originalImageData}
            onReset={handleReset}
            onApply={handleApplyFilter}
            onDownload={handleDownload}
            isProcessing={processingStatus === 'processing'}
          />
        </div>
      </div>
    </div>
  );
}
