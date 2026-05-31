"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Definisi Tipe untuk Histori Terminal
type TerminalHistory = {
  command: string;
  output: string;
};

export default function Portfolio() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  // PERBAIKAN: Menggunakan HTMLSpanElement karena kita beralih dari <input> ke <span>
  const inputRef = useRef<HTMLSpanElement>(null);

  // Perintah yang diizinkan
  const validCommands = ["projects", "education", "skill", "contact", "about", "help"];
  const loremIpsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation.";

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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

  // Logic: Handle Eksekusi Perintah
  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.toLowerCase().trim();
    if (cmd === "") return;

    let response = "";
    if (validCommands.includes(cmd)) {
      response = loremIpsum;
    } else {
      response =
        "Silakan masukkan perintah sesuai format sistem. Jika masih bingung, ketik “Help” untuk melihat panduan";
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
      }
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      {/* MAIN CONTAINER */}
      <div className="bg-[#F1F1F1] w-full max-w-7xl min-h-[600px] md:h-[90vh] rounded-[20px] shadow-sm relative flex flex-col md:flex-row overflow-hidden">
        {/* Traffic Light Buttons (Desktop) */}
        <div className="absolute top-6 left-6 z-20">
          <Image src="/traffic-light-buttons.svg" alt="controls" width={50} height={15} />
        </div>

        {/* --- SISI KIRI (Left Container) --- */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left relative">
          <div className="z-10 mt-12 md:mt-0">
            <h2 className="text-2xl md:text-4xl font-medium text-[#1D1D1D] mb-1">Lets explore</h2>
            <h1 className="text-4xl md:text-6xl font-bold text-[#1D1D1D] mb-6">Farid Portfolio</h1>

            {/* Arrow Right (Desktop Only) */}
            <div className="hidden md:block mb-6">
              <Image src="/arrow-right.svg" alt="arrow" width={250} height={20} />
            </div>

            <p className="text-lg md:text-xl text-[#1D1D1D] mb-8 font-medium">Use this terminal</p>
          </div>

          {/* Photo Me (Vector SVG) */}
          <div className="my-6 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-full flex justify-center">
            <Image
              src="/photo-me-1.svg"
              alt="Farid"
              width={400}
              height={400}
              className="w-64 md:w-[450px] object-contain"
            />
          </div>

          {/* Arrow Bottom (Mobile Only) */}
          <button className="md:hidden bg-[#1D1D1D] p-4 rounded-full mt-4 shadow-lg active:scale-95 transition">
            <Image src="/arrow-bottom.svg" alt="down" width={20} height={20} />
          </button>
        </div>

        {/* --- SISI KANAN (Right Container / Terminal) --- */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col h-[600px] md:h-full">
          <div
            className="bg-[#1D1D1D] w-full h-full rounded-[25px] shadow-2xl flex flex-col overflow-hidden text-white font-mono cursor-text"
            onClick={focusInput}
          >
            {/* Terminal Header / Navigation */}
            <div className="px-6 py-4 border-b border-white/10 flex flex-wrap gap-2 text-xs md:text-sm text-gray-400">
              {validCommands.map((item, idx) => (
                <React.Fragment key={item}>
                  <span className="hover:text-white cursor-default transition">{item}</span>
                  {idx !== validCommands.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Terminal Content Area */}
            <div className="flex-1 overflow-y-auto p-6 terminal-scrollbar text-sm md:text-base">
              {/* History */}
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="break-all leading-relaxed">
                    <span className="text-[#A6D189] mr-2">(base) user@aboutfarid %</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="mt-1 text-gray-300 leading-relaxed text-justify">
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Current Prompt (Input) */}
              <div className="break-all leading-relaxed w-full block">
                <span className="text-[#A6D189] mr-2 select-none">(base) user@aboutfarid %</span>
                <span
                  ref={inputRef}
                  contentEditable // Mengubah span menjadi area ketik
                  suppressContentEditableWarning
                  className={`outline-none text-white whitespace-pre-wrap break-all inline ${
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

            {/* Terminal Footer */}
            <div className="p-4 md:p-6 bg-[#1D1D1D] flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Online/Offline Badge */}
              <div
                className={`
                flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500
                ${
                  isOnline
                    ? "bg-gradient-to-r from-[#262F23] to-[#2E4A24]"
                    : "bg-gradient-to-r from-[#4A2424] to-[#2F2323]"
                }
              `}
              >
                <div
                  className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-[16px]
                  ${isOnline ? "bg-[#E3F3AD] text-[#262F23]" : "bg-[#F3ADAD] text-[#4A2424]"}
                `}
                >
                  {isOnline ? "✓" : "✕"}
                </div>
                <span className="text-xs font-medium text-white/90">
                  {isOnline ? "You’re Online" : "You’re Offline"}
                </span>
              </div>

              {/* Github Button */}
              <a
                href="https://github.com/faridzk1129"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white text-[#1D1D1D] px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition active:scale-95 cursor-pointer z-10"
                onClick={(e) => e.stopPropagation()} // Mencegah klik tombol memicu fokus terminal
              >
                Follow Me on Github
                <Image src="/github.svg" alt="github" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
