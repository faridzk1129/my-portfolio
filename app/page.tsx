"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import ModalProjects from "@/components/ModalProjects";

type TerminalHistory = {
  command: string;
  output: React.ReactNode;
};

export default function Portfolio() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  const [theme, setTheme] = useState<"a" | "b" | "c" | "d">("a");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const colorMap = {
    a: {
      prompt: "text-gray-200",
      output: "text-white",
      input: "text-gray-200",
      header: "text-white/80",
      headerBorder: "border-white/15",
      headerHover: "hover:text-white",
    },
    b: {
      prompt: "text-green-500",
      output: "text-green-400",
      input: "text-green-500",
      header: "text-green-400/80",
      headerBorder: "border-green-500/20",
      headerHover: "hover:text-green-300",
    },
    c: {
      prompt: "text-indigo-500",
      output: "text-indigo-400",
      input: "text-indigo-500",
      header: "text-indigo-400/80",
      headerBorder: "border-indigo-500/20",
      headerHover: "hover:text-indigo-300",
    },
    d: {
      prompt: "text-blue-500",
      output: "text-blue-400",
      input: "text-blue-500",
      header: "text-blue-400/80",
      headerBorder: "border-blue-500/20",
      headerHover: "hover:text-blue-300",
    },
  };

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLSpanElement>(null);

  const validCommands = [
    "projects",
    "education",
    "skill",
    "contact",
    "about",
    "help",
    "clear",
    "color a",
    "color b",
    "color c",
    "color d",
  ];

  const loremIpsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation.";

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (history.length > 0) {
      scrollToBottom();
    }
  }, [history]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.toLowerCase().trim();
    if (cmd === "") return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let response: React.ReactNode = "";

    if (cmd === "help") {
      response = (
        <span className="whitespace-pre-wrap">
          {`Use <command>

Usage:
  "help"       Show this help menu.
  "projects"   List projects by Farid.
  "education"  View educational history.
  "skill"      Show technical skills.
  "contact"    Show contact links.
  "about"      Show profile overview.
  "clear"      Clear terminal history.
  "color a"    Reset terminal color.
  "color b"    Change color to green.
  "color c"    Change color to indigo.
  "color d"    Change color to blue.`}
        </span>
      );
    } else if (cmd === "about") {
      response = (
        <p className="text-justify leading-relaxed">
          Currently, I am a graduate from Makassar State University majoring in Computer
          Engineering. I am highly interested in web development, frequently utilizing technologies
          like Next.js and Tailwind CSS. Additionally, I have a strong interest in mobile app
          development, especially iOS, using React Native and Swift. I am also passionate about
          cloud computing using Google Cloud Platform. I am skilled at analyzing and solving
          problems related to application design and development. Apart from that, I am very
          interested in UI/UX design, creating user-friendly interfaces. I enjoy teamwork, sharing
          ideas, and learning collaboratively with others.
        </p>
      );
      // 3. PERUBAHAN: Modifikasi kondisi perintah "projects" untuk menampilkan kategori mirip dengan grid "skill"
    } else if (cmd === "projects") {
      const projectCategories = [
        { cat: "UI Design", icon: "🎨" },
        { cat: "Mobile App", icon: "📱" },
        { cat: "Web App", icon: "🌐" },
        { cat: "Desktop App", icon: "💻" },
        { cat: "Extension App", icon: "🧩" },
      ];

      response = (
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-current font-semibold opacity-90 animate-pulse">
            👉 Please click on the project category you want to see:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            {projectCategories.map((project, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah bentrok dengan klik area terminal parent
                  setSelectedCategory(project.cat);
                  setIsModalOpen(true);
                }}
                className="bg-current/5 p-3 rounded-xl border border-current/10 hover:border-current/30 hover:bg-current/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="text-current font-bold flex items-center gap-1.5 mb-1 text-xs md:text-sm tracking-wide uppercase border-b border-current/10 pb-3">
                  <span>{project.icon}</span> {project.cat}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmd === "contact") {
      response = (
        <div className="flex flex-col gap-2 mt-1 my-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold min-w-[85px]">Linkedin</span>:
            <a
              href="https://www.linkedin.com/in/mmfarid1129"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:underline break-all"
            >
              mmfarid1129
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold min-w-[85px]">Email</span>:
            <a href="mailto:mmfarid1129@gmail.com" className=" hover:underline break-all">
              mmfarid1129@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold min-w-[85px]">Instagram</span>:
            <a
              href="https://www.instagram.com/mfrd11z/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline break-all"
            >
              mfrd11z
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold min-w-[85px]">Whatsapp</span>:
            <span className=" break-all">+6287860221798</span>
          </div>
        </div>
      );
    } else if (cmd === "education") {
      response = (
        <div className="flex flex-col gap-3 mt-2 border-l border-current/20 pl-4 ml-2 transition-colors duration-300">
          {[
            { name: "SDN 161 Pinrang", status: "Completed" },
            { name: "SMPN 1 Pinrang", status: "Completed" },
            { name: "Boarding School SMAN 11 Pinrang", status: "Completed" },
            { name: "State University of Makassar", status: "Computer Engineering Graduate" },
          ].map((edu, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-current/40 group-hover:bg-current transition-colors duration-300" />
              <div className="font-semibold text-current transition-colors duration-300">
                {edu.name}
              </div>
              <div className="text-xs opacity-60 transition-opacity duration-300">{edu.status}</div>
            </div>
          ))}
        </div>
      );
    } else if (cmd === "skill") {
      const skillsData = [
        { cat: "Web", items: ["Next.js", "Tailwindcss", "Laravel", "FastAPI", "SQL"] },
        { cat: "Mobile", items: ["iOS", "React Native", "Swift"] },
        { cat: "Cloud Computing", items: ["Google Cloud Platform", "VPS"] },
        {
          cat: "Artificial Intelligence",
          items: ["Preprocessing Data", "Natural Language Processing (NLP)", "Computer Vision"],
        },
        { cat: "UI/UX", items: ["Figma", "Wireframing", "Prototyping", "Design System"] },
        {
          cat: "Soft Skills",
          items: ["Problem Solving", "Teamwork & Collaboration", "Time Management", "Adaptability"],
        },
      ];
      response = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {skillsData.map((skill, idx) => (
            <div
              key={idx}
              className="bg-current/5 p-3 rounded-xl border border-current/10 hover:border-current/20 transition-all duration-300"
            >
              <div className="text-current font-bold flex items-center gap-1.5 mb-1 text-xs md:text-sm tracking-wide uppercase border-b border-current/10 pb-1 transition-colors duration-300">
                <span>⚡</span> {skill.cat}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] md:text-xs bg-current/10 text-current/90 px-2 py-0.5 rounded-md font-mono transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (cmd === "color a") {
      setTheme("a");
      response = "";
    } else if (cmd === "color b") {
      setTheme("b");
      response = "";
    } else if (cmd === "color c") {
      setTheme("c");
      response = "";
    } else if (cmd === "color d") {
      setTheme("d");
      response = "";
    } else if (validCommands.includes(cmd)) {
      response = loremIpsum;
    } else {
      response =
        'Please enter a command according to the system format. If you\'re not sure what to do, type "Help" to see the available commands.';
    }

    setHistory([...history, { command: cmdText, output: response }]);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();

      if (typeof window !== "undefined") {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(inputRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);

        if (window.innerWidth < 768) {
          setTimeout(() => {
            inputRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 350);
        }
      }
    }
  };

  const handleNavClick = (cmd: string) => {
    setInput(cmd);
    if (inputRef.current) {
      inputRef.current.textContent = cmd;
    }
    focusInput();
  };
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 md:p-5">
      <div className="bg-[#e4e4e4] w-full max-w-8xl min-h-[650px] md:h-[94vh] rounded-[20px] shadow-md relative flex flex-col md:flex-row overflow-hidden">
        {/* Traffic Light Buttons (Desktop) */}
        <div className="absolute top-6 left-6 z-20">
          <Image
            src="/traffic-light-buttons.svg"
            alt="controls"
            width={60}
            height={25}
            className="w-16 h-auto"
          />
        </div>
        {/* 4. TAMBAHKAN: Letakkan komponen modal tepat sebelum penutupan akhir tag main */}
        <ModalProjects
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialCategory={selectedCategory}
          theme={theme}
        />

        {/* --- SISI KIRI (Left Container) --- */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center items-center md:items-start text-center md:text-left relative ">
          <div className="z-10 mt-12 relative md:-top-42 ">
            <h2 className="text-2xl md:mb-4 md:text-4xl font-light tracking-wider  text-[#333333] mb-1">
              Lets explore
            </h2>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider  text-[#333333] mb-8">
              My Portfolio
            </h2>

            {/* Arrow Right (Desktop Only) */}
            <div className="hidden md:block my-6">
              <Image
                src="/arrow-right.svg"
                alt="arrow"
                width={450}
                height={40}
                className="w-auto h-auto"
              />
            </div>

            <p className=" hidden md:block  text-lg md:text-xl text-[#333333] mb-8 font-light tracking-wider ">
              Use this terminal
            </p>
          </div>

          <div className="md:absolute md:bottom-0 md:inset-x-0 md:mx-auto w-full flex justify-center overflow-hidden">
            <Image
              src="/photo-me-1.png"
              alt="Farid"
              width={400}
              height={400}
              priority
              className="[image-rendering:pixelated] [clip-path:inset(2px_0px_0px_0px)] w-auto h-auto "
            />
          </div>
          <p className="text-lg md:text-xl text-[#333333] mt-8 font-light tracking-wider md:hidden ">
            Use this terminal
          </p>

          <button className="md:hidden bg-[#1D1D1D] p-4 rounded-full mt-8 shadow-lg active:scale-85 scale-90 transition">
            <Image
              src="/arrow-bottom.svg"
              alt="down"
              width={20}
              height={20}
              className="w-auto h-auto"
            />
          </button>
        </div>

        {/* --- SISI KANAN (Right Container / Terminal) --- */}
        <div className="w-full md:w-1/2 p-2 md:p-4  flex flex-col h-[600px] md:h-full ">
          <div
            className="bg-[#1D1D1D] w-full h-full rounded-[25px] shadow-xl flex flex-col overflow-hidden text-white font-mono cursor-text"
            onClick={focusInput}
          >
            <div
              className={`px-4 py-4 border-b ${colorMap[theme].headerBorder} flex flex-wrap text-[11px] lg:text-sm ${colorMap[theme].header} justify-evenly transition-colors duration-300`}
            >
              {validCommands
                .filter((item) => !item.startsWith("color") && item !== "clear")
                .map((item, idx, filteredArray) => (
                  <React.Fragment key={item}>
                    <span
                      className={`cursor-pointer transition-colors duration-300 ${colorMap[theme].headerHover}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item);
                      }}
                    >
                      {item}
                    </span>
                    {idx !== filteredArray.length - 1 && <span className="opacity-50">|</span>}
                  </React.Fragment>
                ))}
            </div>

            {/* Terminal Content Area */}
            <div className="flex-1 overflow-y-auto p-5 terminal-scrollbar text-xs md:text-sm font-ibm-plex">
              {/* History */}
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="break-all leading-relaxed">
                    <span
                      className={`${colorMap[theme].prompt} mr-2 transition-colors duration-300`}
                    >
                      (base) user@aboutfarid %
                    </span>
                    <span className={`${colorMap[theme].input} transition-colors duration-300`}>
                      {item.command}
                    </span>
                  </div>
                  <div
                    className={`mt-1 ${colorMap[theme].output} leading-relaxed transition-colors duration-300`}
                  >
                    {item.output}
                  </div>
                </div>
              ))}
              {/* Current Prompt (Input) */}
              <div className="break-all leading-relaxed w-full block">
                <span
                  className={`${colorMap[theme].prompt} mr-2 select-none transition-colors duration-300`}
                >
                  (base) user@aboutfarid %
                </span>
                <span
                  ref={inputRef}
                  contentEditable
                  suppressContentEditableWarning
                  className={`outline-none whitespace-pre-wrap break-all inline transition-colors duration-300 ${colorMap[theme].input} ${
                    input === "" ? "relative -top-[3px]" : ""
                  }`}
                  onInput={(e) => setInput(e.currentTarget.textContent || "")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const currentText = e.currentTarget.textContent || "";
                      executeCommand(currentText);

                      e.currentTarget.textContent = "";
                      setInput("");
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertText", false, text);
                  }}
                />
              </div>
              <div ref={terminalEndRef} />
            </div>

            <div className="w-full p-4 md:p-5 bg-[#1D1D1D] flex flex-row items-center justify-between gap-3 text-sm font-['Poppins']">
              {/* Badge Status */}
              <div
                className={`
      flex items-center justify-center gap-3 px-6 py-2 md:py-2.5 rounded-full transition-all duration-500 
      ${
        isOnline
          ? "bg-gradient-to-r from-[#262F23] to-[#2E4A24]"
          : "bg-gradient-to-r from-[#4A2424] to-[#2F2323]"
      }
    `}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-evenly ${
                    isOnline ? "bg-[#E3F3AD]" : "bg-[#F3ADAD] text-[#4A2424]"
                  }`}
                >
                  {isOnline ? (
                    <Image
                      src="/checklist.svg"
                      alt="online"
                      width={10}
                      height={10}
                      className="w-2 h-auto"
                    />
                  ) : (
                    <span className="text-[10px] leading-none">✕</span>
                  )}
                </div>
                <span className="text-[10px] md:text-sm font-light text-white/90">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              {/* Tombol Github */}
              <a
                href="https://github.com/faridzk1129"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-white text-[#1D1D1D] px-6 py-2 md:py-2.5 rounded-full font-light text-[10px] md:text-sm  hover:bg-gray-200 transition active:scale-95 cursor-pointer z-10 w-[100%] "
                onClick={(e) => e.stopPropagation()}
              >
                Let's connect ....
                <Image src="/github.svg" alt="github" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
