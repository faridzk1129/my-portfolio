"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Tipe data struktur proyek
type ProjectItem = {
  title: string;
  images: string[];
  description: string;
  techStack: string[];
};

type ProjectDataStructure = {
  [key: string]: ProjectItem[];
};

interface ModalProjectsProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: string;
  theme: "a" | "b" | "c" | "d";
}

// Data Proyek Lengkap sesuai spesifikasi data dari Anda
const PROJECTS_DATA: ProjectDataStructure = {
  "UI Design": [
    {
      title: "Careline Web",
      images: Array.from({ length: 5 }, (_, i) => `/ui-design/project 1-${i + 1}.png`),
      description:
        'A UI/UX design project for "Careline", a funded PKM-PM website platform dedicated to domestic violence reporting and education in Pinrang Regency. Serving as the UI/UX designer, I crafted an intuitive interface for the core reporting system alongside educational features, including self-defense guides, abuse indicators, emergency contacts, local help centers, and reported case data.',
      techStack: ["Figma"],
    },
    {
      title: "Authentication Pages",
      images: Array.from({ length: 2 }, (_, i) => `/ui-design/project 2-${i + 1}.png`),
      description:
        "A UI design exploration project featuring clean and minimalist Sign In and Sign Up pages, created as part of my Figma learning process. This design adopts a clean and minimalist user interface concept, combined with engaging modern illustrations to enhance visual aesthetics and provide a more interactive user authentication experience.",
      techStack: ["Figma"],
    },
    {
      title: "iOS Music App",
      images: ["/ui-design/project 3-1.png"],
      description:
        "A UI design exploration for an iOS music application, created as part of the Figma learning process. This project focuses on the application of smooth linear color gradients, combined with glassmorphism effects and modern 3D elements to deliver a sleek, aesthetic, and clean interface for user music experiences.",
      techStack: ["Figma"],
    },
    {
      title: "Weather & Travel Dashboard",
      images: ["/ui-design/project 4-1.png"],
      description:
        "A UI design exploration for a weather and travel dashboard, created as part of the Figma learning process. This project integrates real-time weather forecasting with holiday destination recommendations, utilizing a clean and modern card-based layout to provide a seamless, intuitive, and visually appealing trip-planning experience.",
      techStack: ["Figma"],
    },
    {
      title: "Creative Agency Landing Page",
      images: ["/ui-design/project 5-1.png"],
      description:
        "A UI design exploration for a creative agency landing page, created as part of the Figma learning process. This project applies a modern editorial design style featuring bold, expressive typography, high-contrast layouts, and dynamic overlapping elements to deliver a visually striking and professional user interface.",
      techStack: ["Figma"],
    },
    {
      title: "Digital Coffee Shop Menu",
      images: ["/ui-design/project 6-1.png"],
      description:
        "A UI design exploration for a digital coffee shop menu page, created as part of the Figma learning process. This project features a fresh, clean green-themed aesthetic combined with a card-based product display and interactive customization components to deliver a seamless, modern ordering experience for users.",
      techStack: ["Figma"],
    },
    {
      title: "Manga Reader App",
      images: ["/ui-design/project 7-1.png"],
      description:
        "A UI design exploration for a manga reader application, created as part of the Figma learning process. This project features a sleek dark mode theme with vibrant purple and orange gradients, incorporating 3D visual elements and a content-focused layout to deliver a modern and immersive reading experience for users.",
      techStack: ["Figma"],
    },
    {
      title: "Sports Mobile App",
      images: ["/ui-design/project 8-1.png"],
      description:
        "A UI design exploration for a Nike sports mobile application, created as part of the Figma learning process. This project implements an elegant dark mode theme with smooth, subtle gradients, seamlessly integrating an e-commerce product showcase with an activity tracking widget to deliver a sleek, modern, and dynamic user experience.",
      techStack: ["Figma"],
    },
  ],
  "Mobile App": [
    {
      title: "Fitness Tracker",
      images: Array.from({ length: 5 }, (_, i) => `/mobile-app/project 1-${i + 1}.png`),
      description:
        'A cross-platform fitness mobile application (iOS and Android) named "FitFlux" developed using React Native. This application tracks user workout statistics, including weekly calorie expenditure and exercise duration, while offering a variety of guided workout programs categorized by difficulty levels through a clean, modern, and highly interactive user interface.',
      techStack: ["React Native", "Firebase", "Expo"],
    },
    {
      title: "Shuttlecock Classifier",
      images: Array.from({ length: 2 }, (_, i) => `/mobile-app/project 2-${i + 1}.png`),
      description:
        '"Scancock" is an Android-based mobile application that integrates Machine Learning for real-time physical quality classification of shuttlecocks. This research involved experimenting with three CNN architectures—TinyVGG, MobileNetV2, and ResNet50—trained on a dataset of 1,000 images. MobileNetV2 was selected as the optimal model due to its superior accuracy and computational efficiency, then converted into TFLite format and implemented using Kotlin to provide instant "Good" or "Bad" shuttlecock detection results via the device\'s camera.',
      techStack: ["Android", "Kotlin", "MobileNetV2", "TFLite"],
    },
    {
      title: "Card Game",
      images: ["/mobile-app/project 3-1.png"],
      description:
        'A classic mobile card game application named "WAR" developed for the iOS platform as part of the Swift learning process. This project implements a simple card-dealing game mechanic pitting the player against the computer (COM), featuring real-time score tracking and a clean, intuitive card-table themed user interface.',
      techStack: ["iOS", "Swift"],
    },
  ],
  "Web App": [
    {
      title: "Pelindo Monitoring Dashboard",
      images: Array.from({ length: 14 }, (_, i) => `/web-app/project 1-${i + 1}.png`),
      description:
        "A feature expansion and enhancement project for the Pelindo Jasa Maritim monitoring dashboard website, built to streamline the tracking and management of core operational workflows. This system facilitates the monitoring of dredging projects, vessel docking schedules, fuel (BBM) requests, and centralized approval management to significantly boost efficiency, data accuracy, and workflow productivity in maritime operations.",
      techStack: ["PHP", "Laravel", "MySQL", "Oracle", "Bootstrap"],
    },
    {
      title: "Futsal Online Booking System",
      images: Array.from({ length: 11 }, (_, i) => `/web-app/project 2-${i + 1}.png`),
      description:
        "A modern and responsive website landing page for futsal business built using Next.js and Tailwind CSS. The platform features comprehensive information regarding facilities, court availability, and user reviews, integrated with an intuitive online booking form to streamline court reservations.",
      techStack: ["Next JS", "Tailwindcss", "Firebase"],
    },
    {
      title: "Mood Tracking Platform",
      images: Array.from({ length: 4 }, (_, i) => `/web-app/project 3-${i + 1}.png`),
      description:
        'A web application project called "Moodi" a mood tracking platform built with Next.js and Tailwind CSS. Designed with a clean, modern, and calming user interface, the platform allows users to log daily activities, monitor emotional trends through visual statistics, and intuitively manage their mental well-being.',
      techStack: ["Next JS", "Tailwindcss", "Firebase"],
    },
    {
      title: "AI Data Provisioning System",
      images: Array.from({ length: 4 }, (_, i) => `/web-app/project 4-${i + 1}.png`),
      description:
        'An AI-powered web application project named "Port-GPT," developed as an automated enterprise data provisioning system for PT Pelindo Jasa Maritim. This platform utilizes an AI chat interface, enabling employees to independently query and retrieve detailed data directly from the database without requiring manual intervention from the IT division.',
      techStack: ["Next JS", "Tailwindcss", "LangChain", "FastAPI", "Docker", "MySQL"],
    },
    {
      title: "Student Activity Classifier",
      images: Array.from({ length: 4 }, (_, i) => `/web-app/project 5-${i + 1}.png`),
      description:
        "A web application project designed to classify final-year student activities using Natural Language Processing (NLP) and the Support Vector Machine (SVM) algorithm. The system automatically processes and categorizes text-based activity logs into distinct classes, such as thesis-focused or working, providing valuable strategic insights for JTIK FT UNM leadership to support effective data-driven decision-making.",
      techStack: ["Next JS", "Tailwindcss", "FastAPI", "Supabase", "Joblib"],
    },
    {
      title: "Personal Portfolio Website v1",
      images: Array.from({ length: 3 }, (_, i) => `/web-app/project 6-${i + 1}.png`),
      description:
        "My first personal landing page website project, built specifically to sharpen and strengthen my web CSS styling skills. This portfolio platform features a clean, responsive dark-themed aesthetic designed to display personal profile information, a technical skills summary, and a project showcase layout seamlessly.",
      techStack: ["HTML", "CSS"],
    },
    {
      title: "Personal Portfolio Website v2",
      images: ["/web-app/project 7-1.png"],
      description:
        "My first personal landing page website project, built specifically to sharpen and strengthen my web CSS styling skills. This portfolio platform features a clean, responsive dark-themed aesthetic designed to display personal profile information, a technical skills summary, and a project showcase layout seamlessly.",
      techStack: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Digital Art Museum Gallery",
      images: ["/web-app/project 8-1.png"],
      description:
        "A digital art museum gallery website project dedicated to showcasing the legendary masterpieces of Vincent van Gogh. Developed with Tailwind CSS, this platform implements an aesthetic, clean, and immersive gallery-like theme, presenting collections of iconic paintings, historical timelines, and artist biographies within a modern and responsive layout.",
      techStack: ["HTML", "Tailwindcss", "JavaScript"],
    },
    {
      title: "Interactive JS Utilities",
      images: Array.from({ length: 3 }, (_, i) => `/web-app/project 9-${i + 1}.png`),
      description:
        "An interactive web application project built to understand JavaScript programming, focusing on DOM manipulation and event handling. This platform features multiple experimental utilities, including a dynamic background color changer triggered by mouse movement, a card interaction feature (card removal), and an interactive mini Suits Game all presented within a clean, functional, and responsive user interface.",
      techStack: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "AI Administrative Assistant",
      images: Array.from({ length: 2 }, (_, i) => `/web-app/project 10-${i + 1}.png`),
      description:
        'A web application project named "LayananAI" an AI-powered integrated administrative service assistant designed to help citizens seamlessly understand, prepare, and complete document management processes. Built on a modern full-stack architecture, the platform integrates an intelligent AI chatbot with a RAG (Retrieval-Augmented Generation) framework to provide interactive step-by-step guidance, automated document text extraction, and adaptive, structured workflows to eliminate slow and complicated procedures.',
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "Laravel",
        "PostgreSQL + pgvector",
        "OpenAI (RAG)",
        "Spatie PDF-to-Text",
      ],
    },
    {
      title: "Skin Cancer Detection",
      images: ["/web-app/project 11-1.png"],
      description:
        "A Machine Learning-powered web API project designed for skin lesion image classification to detect early indications of skin cancer (such as Squamous cell carcinoma and Vascular lesion) or non-cancerous conditions (Melanocytic nevus). Built using Node.js with the Hapi framework and TensorFlow.js, the system processes user image uploads to perform real-time model inference—delivering diagnostic confidence scores, detailed explanations, and actionable medical suggestions.",
      techStack: ["Node.js", "Hapi", "TensorFlow.js", "Google Cloud Firestore"],
    },
  ],

  "Desktop App": [
    {
      title: "Laundry Management",
      images: Array.from({ length: 3 }, (_, i) => `/desktop-app/project 1-${i + 1}.png`),
      description:
        'A desktop laundry management application named "CUCITA" developed using Java within the NetBeans IDE. This application is designed to efficiently streamline laundry business operations, handling customer transaction logging, laundry status tracking, and structured database management via SQL through a clean, functional, and user-friendly desktop interface.',
      techStack: ["Java", "SQL", "Netbeans"],
    },
  ],
  "Extension App": [
    {
      title: "IG Utility Extension",
      images: ["/extension-app/project 1-1.png"],
      description:
        "A multifunctional browser extension project designed as an integrated utility, productivity, and privacy tool for Instagram. This extension enables users to conveniently download various media (photos, videos, reels, and profile pictures), provides a timer-based website blocker for focus management, and features privacy protections that can blur direct messages.",
      techStack: ["Vite JS", "TypeScript", "Flask API"],
    },
  ],
};

const modalThemeMap = {
  a: {
    border: "border-white/20",
    text: "text-white",
    glow: "shadow-white/5",
    accent: "bg-white/10 text-white border-white/20",
    btn: "bg-white text-black hover:bg-gray-200",
    dotActive: "bg-white w-6",
    scrollbar:
      "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/25",
  },
  b: {
    border: "border-green-500/30",
    text: "text-green-400",
    glow: "shadow-green-500/10",
    accent: "bg-green-500/10 text-green-400 border-green-500/20",
    btn: "bg-green-500 text-black hover:bg-green-400",
    dotActive: "bg-green-500 w-6",
    scrollbar:
      "[&::-webkit-scrollbar-thumb]:bg-green-500/20 hover:[&::-webkit-scrollbar-thumb]:bg-green-500/40",
  },
  c: {
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    glow: "shadow-indigo-500/10",
    accent: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    btn: "bg-indigo-500 text-white hover:bg-indigo-400",
    dotActive: "bg-indigo-500 w-6",
    scrollbar:
      "[&::-webkit-scrollbar-thumb]:bg-indigo-500/20 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/40",
  },
  d: {
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/10",
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    btn: "bg-blue-500 text-white hover:bg-blue-400",
    dotActive: "bg-blue-500 w-6",
    scrollbar:
      "[&::-webkit-scrollbar-thumb]:bg-blue-500/20 hover:[&::-webkit-scrollbar-thumb]:bg-blue-500/40",
  },
};

export default function ModalProjects({
  isOpen,
  onClose,
  initialCategory,
  theme,
}: ModalProjectsProps) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setProjectIndex(0);
    setImageIndex(0);
  }, [initialCategory, isOpen]);

  if (!isOpen || !initialCategory) return null;

  const currentProjects = PROJECTS_DATA[initialCategory] || [];
  const project = currentProjects[projectIndex];

  if (!project) return null;

  const style = modalThemeMap[theme];

  const handleNextProject = () => {
    if (projectIndex < currentProjects.length - 1) {
      setProjectIndex((prev) => prev + 1);
      setImageIndex(0);
    }
  };

  const handlePrevProject = () => {
    if (projectIndex > 0) {
      setProjectIndex((prev) => prev - 1);
      setImageIndex(0);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex < project.images.length - 1) {
      setImageIndex((prev) => prev + 1);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 transition-all duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#171717] border ${style.border} ${style.glow} shadow-2xl rounded-[24px] w-full max-w-5xl max-h-[94vh] overflow-y-auto flex flex-col relative
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-[#1a1a1a]/40
          [&::-webkit-scrollbar-track]:rounded-r-[24px]
          ${style.scrollbar}
          [&::-webkit-scrollbar-thumb]:rounded-full`}
      >
        {/* Header Modal */}
        <div
          className={`py-5 px-6 border-b ${style.border} flex justify-between items-center bg-[#1c1c1c] rounded-t-[24px] shrink-0 sticky top-0 z-20`}
        >
          <div>
            <span
              className={`text-xs font-mono uppercase tracking-widest ${style.text} opacity-60`}
            >
              Project Exploration / {initialCategory}
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-sans text-white mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition shrink-0"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Konten Utama */}
        <div className="p-6 flex flex-col lg:flex-row gap-6">
          {/* Sisi Kiri: Rombakan Total Viewport & Dot Indicators */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            {/* Wrapper Utama Image Area */}
            {/* Wrapper Utama Image Area */}
            <div className="relative w-full flex items-center justify-center px-10 md:px-12">
              {/* Navigasi Kiri */}
              {project.images.length > 1 && imageIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute -left-1  top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1f1f1f]/70 backdrop-blur-md border border-white/15 text-white/80 flex items-center justify-center hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 z-10 shadow-xl group/btn"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 transition-transform group-hover/btn:-translate-x-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              )}

              {/* Container Gambar Utama */}
              <div className="relative flex-1 bg-black/40 border border-white/5 rounded-2xl overflow-hidden aspect-video flex items-center justify-center group h-[300px] md:h-[380px]">
                {/* Inner Wrapper Jarak Gambar */}
                <div className="absolute inset-4 md:inset-6">
                  <Image
                    src={project.images[imageIndex]}
                    alt={`${project.title} screenshot ${imageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                    className="object-contain"
                  />
                </div>

                {/* Indikator Slider Angka Ringkas */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/70 border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-mono text-white/90 z-10">
                    {imageIndex + 1} / {project.images.length}
                  </div>
                )}
              </div>

              {/* Navigasi Rerata Kanan */}
              {project.images.length > 1 && imageIndex < project.images.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1f1f1f]/70 backdrop-blur-md border border-white/15 text-white/80 flex items-center justify-center hover:bg-neutral-800 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 z-10 shadow-xl group/btn"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Navigasi Dot Indicators Minimalis (Rombakan Utama) */}
            {project.images.length > 1 && (
              <div className="flex justify-center items-center gap-2 py-1.5 transition-all">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${
                      idx === imageIndex ? style.dotActive : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sisi Kanan: Spesifikasi Deskripsi dan Tech Stack */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-mono tracking-wider text-white/40 mb-1">Description</h4>
                <p className="text-sm text-gray-300 leading-relaxed text-justify font-sans">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-wider text-white/40 mb-2 mt-5">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs font-mono border px-2.5 py-1 rounded-md ${style.accent}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination Proyek */}
            <div className={`flex items-center gap-3 pt-4 border-t ${style.border}`}>
              {projectIndex > 0 ? (
                <button
                  onClick={handlePrevProject}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-white bg-white/5 hover:bg-white/10 font-sans text-xs md:text-sm font-medium transition text-center"
                >
                  ← Previous Project
                </button>
              ) : (
                <div className="flex-1" />
              )}

              {projectIndex < currentProjects.length - 1 ? (
                <button
                  onClick={handleNextProject}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-sans text-xs md:text-sm font-medium transition text-center ${style.btn}`}
                >
                  Next Project →
                </button>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
