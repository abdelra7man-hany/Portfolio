"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
<section
  id="about"
  className="
    relative
    scroll-mt-[64px]   /* phones: was 80px → now 64px */
    sm:scroll-mt-[80px]/* small screens: ~header 96px → land a bit higher */
    md:scroll-mt-[88px]/* tablets */
    lg:scroll-mt-[96px]/* large: match big header */
    pt-8 sm:pt-10 md:pt-1
    pb-12 sm:pb-1 md:pb-90
  "
>
      {/* background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute right-[-10%] top-[-8%] h-[46vmin] w-[46vmin] sm:h-[40vmin] sm:w-[40vmin] md:h-[34vmin] md:w-[34vmin] lg:h-[26vmin] lg:w-[26vmin] xl:h-[22vmin] xl:w-[22vmin] rounded-full blur-2xl lg:blur-xl opacity-35 lg:opacity-25"
          style={{
            background:
              "radial-gradient(closest-side at 45% 40%, rgba(34,211,238,.45), transparent 68%), radial-gradient(at 70% 60%, rgba(20,184,166,.35), transparent 65%)",
          }}
        />
        <div
          className="absolute left-[-12%] bottom-[-12%] h-[40vmin] w-[40vmin] sm:h-[36vmin] sm:w-[36vmin] md:h-[30vmin] md:w-[30vmin] lg:h-[24vmin] lg:w-[24vmin] xl:h-[20vmin] xl:w-[20vmin] rounded-full blur-2xl lg:blur-xl opacity-25 lg:opacity-20"
          style={{
            background:
              "radial-gradient(closest-side at 60% 50%, rgba(59,130,246,.25), transparent 70%), radial-gradient(at 30% 50%, rgba(56,189,248,.25), transparent 65%)",
          }}
        />
      </div>

      {/* container */}
      <div className="mx-auto w-[92%] sm:w-[88%] md:w-[80%] lg:w-[57%] xl:max-w-5xl px-4">
        <h2 className="mb-8 text-center text-3xl md:text-4xl font-semibold text-white">
          About
        </h2>

        {/* glass card */}
        <div className="mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-8 lg:p-10 shadow-[0_10px_40px_rgba(2,6,23,.30)]">
          <div className="grid md:grid-cols-2 items-start gap-8 md:gap-12">
            {/* left: portrait */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20"
            >
              {/* aspect ratio wrapper */}
              <div
                className="
                  relative w-full
                  aspect-[4/5]           /* phones: tall portrait */
                  sm:aspect-[3/4]        /* small tablets */
                  md:aspect-[4/3]        /* tablets */
                  lg:aspect-[3/4] xl:aspect-[4/5] /* desktops: taller so whole image fits */
                  max-h-[560px] lg:max-h-[620px] mx-auto
                "
              >
                <Image
                  src="/Portfolio/Abdelrahman.jpg"
                  alt="Abdelrahman Hany portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 92vw, (max-width: 768px) 88vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 560px"
                  /* phones show full image; tablets fill; desktops show full again */
                  className="rounded-[inherit] object-cover [object-position:50%_20%]"
                />
              </div>
            </motion.div>

            {/* right: text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-cyan-200">
                Welcome
              </h1>

              <p className="mt-6 leading-7 md:leading-8 text-gray-300/90">
                I&apos;m Abdelrahman Hany, a Cloud &amp; Data Engineer with experience in cloud
                computing, data engineering, and technical enablement, with a proven ability to
                optimize pipelines, deliver cloud migration projects, and provide technical training.
              </p>

              <div className="mt-10">
                <a
                  href="https://drive.google.com/file/d/1jfKYBElcgGiFXWMdXekjxFX9MMPALXNT/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-cyan-200 hover:bg-cyan-400/20 hover:border-cyan-300/60 transition"
                >
                  <span className="inline-block h-2 w-2 rounded-sm bg-orange-400" />
                  Review CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
