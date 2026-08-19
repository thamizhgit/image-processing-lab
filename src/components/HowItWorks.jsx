import { motion } from 'framer-motion';
import { Upload, Sliders, MousePointer, Calculator, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: Upload,
    title: 'Upload an Image',
    description:
      'Drag and drop your own image or try one of the built-in sample images to get started instantly.',
  },
  {
    icon: Sliders,
    title: 'Select a Filter',
    description:
      'Choose from basic, spatial, and edge detection filters. View the kernel matrix that drives each transformation.',
  },
  {
    icon: MousePointer,
    title: 'Inspect Pixels',
    description:
      'Click any pixel on the original image to see its RGB values, intensity, and surrounding 3×3 neighbourhood.',
  },
  {
    icon: Calculator,
    title: 'View the Math',
    description:
      'Watch the convolution calculation unfold in real time — every multiplication and sum computed from your actual data.',
  },
];

export default function HowItWorks({ onLaunchLab }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <span className="mb-4 inline-block rounded-full border border-white/[0.08] bg-bg-card px-3 py-1 text-xs font-medium tracking-wider text-text-muted">
          HOW IT WORKS
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          From Pixels to Processing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          A step-by-step walkthrough of how this interactive laboratory helps you understand
          image processing fundamentals.
        </p>
      </motion.div>

      <div className="mt-12 space-y-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex gap-5 rounded-xl border border-white/[0.08] bg-bg-card p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <step.icon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-semibold text-accent">Step {i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-white/[0.08] bg-bg-secondary p-6">
        <h3 className="text-sm font-semibold text-text">Convolution Explained</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Convolution slides a small matrix (kernel) over every pixel of an image. At each
          position, neighbouring pixel values are multiplied by the corresponding kernel weights
          and summed to produce the output pixel. Edge detection filters like Sobel highlight
          intensity changes, while blur and sharpen adjust local contrast.
        </p>
        <div className="mt-4 rounded-lg border border-white/[0.08] bg-bg-card p-4 font-mono text-sm text-text-muted">
          output(x, y) = Σ Σ neighbourhood(i, j) × kernel(i, j)
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onLaunchLab}
          className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
        >
          Try It Yourself
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
