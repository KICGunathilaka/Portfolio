"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const PHOTOS = [
  // Waterfalls
  {
    id: 1,
    src: "/images/explorer/486480782_590334667384950_7960085291165407875_n.jpg",
    title: "Canyon Falls",
    location: "Central Highlands, Sri Lanka",
    category: "Waterfalls",
    tall: true,
  },
  {
    id: 2,
    src: "/images/explorer/486576493_591631987255218_8361187685238473632_n.jpg",
    title: "Jungle Cascade",
    location: "Central Highlands, Sri Lanka",
    category: "Waterfalls",
    tall: true,
  },
  {
    id: 3,
    src: "/images/explorer/485953006_590964420655308_652628750809018196_n.jpg",
    title: "Rocky Waterfall",
    location: "Sri Lanka",
    category: "Waterfalls",
    tall: true,
  },
  {
    id: 4,
    src: "/images/explorer/691304310_17877711891598039_2618341167109967770_n.webp",
    title: "Forest River Rush",
    location: "Sri Lanka",
    category: "Waterfalls",
    tall: true,
  },
  // Mountains
  {
    id: 5,
    src: "/images/explorer/671227272_17872996098598039_3283153268389051503_n.webp",
    title: "Summit Panorama",
    location: "Knuckles Range, Sri Lanka",
    category: "Mountains",
    tall: false,
  },
  {
    id: 6,
    src: "/images/explorer/703720695_940892928995787_7548368580049026280_n.jpg",
    title: "Ridge Walk",
    location: "Knuckles Range, Sri Lanka",
    category: "Mountains",
    tall: true,
  },
  {
    id: 7,
    src: "/images/explorer/670734986_17872996128598039_4251368599022219744_n.webp",
    title: "Drone Peak",
    location: "Sri Lanka Highlands",
    category: "Mountains",
    tall: false,
  },
  {
    id: 8,
    src: "/images/explorer/486102177_590334697384947_1681605172734809889_n.jpg",
    title: "Green Meadow Summit",
    location: "Central Highlands, Sri Lanka",
    category: "Mountains",
    tall: true,
  },
  // Hiking
  {
    id: 9,
    src: "/images/explorer/486611432_591130220638728_526179435091926367_n.jpg",
    title: "Through the Tall Grass",
    location: "Sri Lanka",
    category: "Hiking",
    tall: false,
  },
  {
    id: 10,
    src: "/images/explorer/486542653_591631947255222_8781936745614695504_n.jpg",
    title: "River Crossing",
    location: "Southern Wilderness, Sri Lanka",
    category: "Hiking",
    tall: true,
  },
  {
    id: 11,
    src: "/images/explorer/570875438_766683776416704_2065194432800988606_n.jpg",
    title: "Mossy Steps",
    location: "Sinharaja, Sri Lanka",
    category: "Hiking",
    tall: true,
  },
  {
    id: 12,
    src: "/images/explorer/571037945_766686076416474_2251018351582989707_n.jpg",
    title: "Jungle Trail",
    location: "Sri Lanka",
    category: "Hiking",
    tall: true,
  },
  // Camping
  {
    id: 13,
    src: "/images/explorer/486553809_590959253989158_1003449634325424260_n.jpg",
    title: "Ridge Camp",
    location: "Nuwara Eliya, Sri Lanka",
    category: "Camping",
    tall: false,
  },
  // Scenic
  {
    id: 14,
    src: "/images/explorer/487491069_594655966952820_2266355550664252025_n.jpg",
    title: "Horton Plains",
    location: "Horton Plains, Sri Lanka",
    category: "Scenic",
    tall: false,
  },
  {
    id: 15,
    src: "/images/explorer/PXL_20260509_084457403_(1).jpg",
    title: "Misty Stream",
    location: "Sri Lanka",
    category: "Scenic",
    tall: true,
  },
  {
    id: 16,
    src: "/images/explorer/486413810_591631997255217_623691734168320186_n.jpg",
    title: "Cliff Face",
    location: "Central Highlands, Sri Lanka",
    category: "Scenic",
    tall: true,
  },
  {
    id: 17,
    src: "/images/explorer/486634577_591130217305395_6209662910116439150_n.jpg",
    title: "Waterfall Forest",
    location: "Sri Lanka",
    category: "Waterfalls",
    tall: true,
  },
  {
    id: 18,
    src: "/images/explorer/486573858_591630810588669_2539235579458442274_n.jpg",
    title: "Crossing the Flood",
    location: "Southern Wilderness, Sri Lanka",
    category: "Hiking",
    tall: true,
  },
];

const CATEGORIES = ["All", "Waterfalls", "Mountains", "Hiking", "Camping", "Scenic"];

export function PhotoGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<(typeof PHOTOS)[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 md:py-32" style={{ background: "#080504" }}>
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400 mb-3 block">
            Photography
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#F5EDD8" }}>
            Gallery
          </h2>
          <p className="text-orange-200/40 text-lg max-w-xl">
            A frame from every trail, summit, and waterfall — straight from the highlands of Sri Lanka.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{
                background: activeCategory === cat ? "rgba(251,146,60,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeCategory === cat ? "rgba(251,146,60,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: activeCategory === cat ? "#FB923C" : "rgba(245,237,216,0.4)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ marginBottom: "1rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(photo)}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: photo.tall ? "3/4" : "4/3" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={16} className="text-white" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm">{photo.title}</p>
                  <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                    📍 {photo.location}
                  </p>
                </div>

                {/* Category badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "rgba(251,146,60,0.2)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(251,146,60,0.3)",
                    color: "#FB923C",
                  }}
                >
                  {photo.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
            <motion.div
              className="relative max-w-5xl w-full mx-4 rounded-3xl overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative"
                style={{ aspectRatio: lightbox.tall ? "3/4" : "16/9", maxHeight: "80vh" }}
              >
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
              <div
                className="p-6 flex items-center justify-between"
                style={{ background: "rgba(8,5,4,0.95)" }}
              >
                <div>
                  <p className="text-white font-bold">{lightbox.title}</p>
                  <p className="text-orange-400/70 text-sm">📍 {lightbox.location}</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "rgba(251,146,60,0.12)",
                    border: "1px solid rgba(251,146,60,0.25)",
                    color: "#FB923C",
                  }}
                >
                  {lightbox.category}
                </span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
