import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroPreview from './HeroPreview';

export default function Hero({ onLaunchLab, onLearnMore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan/8 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg-card px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium tracking-wider text-text-muted">
              INTERACTIVE IMAGE PROCESSING
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
            Understand Images
            <br />
            <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
              Pixel by Pixel.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            Explore pixels, kernels and convolution through an interactive visual laboratory.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onLaunchLab}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
            >
              Launch Image Lab
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onLearnMore}
              className="inline-flex items-center rounded-lg border border-white/[0.08] bg-bg-card px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-white/[0.15] hover:text-text"
            >
              Learn How It Works
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}
