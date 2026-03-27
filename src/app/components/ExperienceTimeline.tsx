// src/app/components/ExperienceTimeline.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Experience = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

const EXPERIENCES: Experience[] = [
  // Professional Experience
  {
    title: "Cloud Engineer",
    org: "Huawei",
    period: "03/2025 – Present",
    bullets: [
      "Delivered cloud migration projects, including AWS → Huawei Cloud.",
      "AWS: Cognito, SNS, EventBridge, Elasticsearch, DynamoDB.",
      "Huawei Cloud: Equivalent services for authentication, messaging, event processing, search, and databases.",
      "Designed and delivered training sessions & certification courses on Huawei Cloud (Tech Essentials, Cloud Migration, Big Data, Cloud Native).",
      "Led communication & management with partners and universities, representing Huawei in technical enablement programs.",
    ],
  },
  {
    title: "Data Engineer",
    org: "Badgewell",
    // NOTE: Your text says “2025/10 – 2025/03”. That goes backward in time. 
    // I assumed you meant Oct 2024 – Mar 2025. Change if needed.
    period: "10/2024 – 03/2025",
    bullets: [
      "Optimized data processing workflows by integrating APIs, validating data with Pydantic models, and ensuring data integrity and reliability.",
      "Developed and deployed scalable data pipelines using Python, Docker, AWS ECS, and Step Functions to automate data transformation and storage in AWS S3 and OpenSearch.",
      "Collaborated with cross-functional teams to design and implement robust solutions, ensuring seamless integration and efficient data handling.",
    ],
  },

  // Education
  {
    title: "Microsoft Data Engineering (DEPI)",
    org: "skills dynamix",
    period: "05/2024 – 10/2024",
    bullets: [
      "Developed core Microsoft Data Engineer skills in data management, SQL, and data warehousing.",
      "Hands-on with Synapse Studio; SQL & Spark Pools (serverless and dedicated); Azure Functions; Resource Groups.",
    ],
  },
  {
    title: "Bachelor of Business in Management Information Systems & Computers",
    org: "Alexandria University",
    period: "09/2019 – 07/2023 • GPA: 3.3/4.0",
    bullets: [],
  },
];


const INITIAL_VISIBLE = 3;        // show first 3
const BATCH_SIZE = 2;             // then load 2 more each time the sentinel hits

export default function ExperienceTimeline() {
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  // sentinel that triggers when scrolled near the end
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sentinelRef, { margin: "0px 0px -30% 0px" });

  useEffect(() => {
    if (inView) {
      setVisible((v) => Math.min(v + BATCH_SIZE, EXPERIENCES.length));
    }
  }, [inView]);

  const items = EXPERIENCES.slice(0, visible);
  const hasMore = visible < EXPERIENCES.length;

  return (
    <div className="relative">
      {/* vertical rail (now in #00BFFF) */}
      <div className="pointer-events-none absolute left-[10px] top-0 h-full w-px bg-gradient-to-b from-[#00BFFF]/60 via-[#00BFFF]/20 to-transparent md:left-3" />

      <ol className="space-y-12 pl-10 md:pl-12">
        {items.map((exp, i) => (
          <TimelineItem key={i} {...exp} index={i} />
        ))}

        {/* Lazy-load sentinel */}
        {hasMore && (
          <li className="relative">
            <div ref={sentinelRef} className="h-6 w-full" />
            {/* Fallback button (keyboard/low-power devices) */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() =>
                  setVisible((v) => Math.min(v + BATCH_SIZE, EXPERIENCES.length))
                }
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                Show more
              </button>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}

function TimelineItem({
  title,
  org,
  period,
  bullets,
  index,
}: Experience & { index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative"
    >
      {/* glow dot in #00BFFF */}
      <span
        className="
          absolute -left-[20px] top-1 h-4 w-4 rounded-full
          bg-[#00BFFF]
          shadow-[0_0_30px_8px_rgba(0,191,255,0.35)]
          ring-2 ring-[#00BFFF]/5
          md:-left-[30px]
        "
        aria-hidden
      />

      <header className="mb-2">
        <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
        <p className="text-[#00BFFF]/90 text-sm md:text-base">{org}</p>
        <p className="text-[13px] md:text-sm text-slate-400">{period}</p>
      </header>

      <ul
        className="
          mt-3 list-disc list-inside pl-2
          marker:text-[#00BFFF]
          text-[15px] leading-relaxed text-slate-300
          space-y-2
        "
      >
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {/* subtle card backdrop */}
      <div className="pointer-events-none absolute -inset-x-2 -inset-y-3 -z-10 rounded-2xl bg-gradient-to-br from-white/2 to-white/0 backdrop-blur-[1px] ring-1 ring-white/5" />
    </motion.li>
  );
}
