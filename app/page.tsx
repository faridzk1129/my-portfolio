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
        "Please enter a command according to the system format. If you're not sure what to do, type \"Help\" to see the available commands.";
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

  // --- YANG DITAMBAHKAN: Fungsi untuk handle klik pada navigasi atas ---
  const handleNavClick = (cmd: string) => {
    // 1. Update state React
    setInput(cmd);

    // 2. Update teks secara fisik pada elemen contentEditable
    if (inputRef.current) {
      inputRef.current.textContent = cmd;
    }

    // 3. Fokuskan kursor kembali ke area input di ujung kanan teks
    focusInput();
  };
  // ---------------------------------------------------------------------

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 md:p-5">
      {/* MAIN CONTAINER */}
      <div className="bg-[#e4e4e4] w-full max-w-8xl min-h-[650px] md:h-[94vh] rounded-[20px] shadow-md relative flex flex-col md:flex-row overflow-hidden">
        {/* Traffic Light Buttons (Desktop) */}
        <div className="absolute top-6 left-6 z-20">
          <Image src="/traffic-light-buttons.svg" alt="controls" width={60} height={25} />
        </div>

        {/* --- SISI KIRI (Left Container) --- */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center items-center md:items-start text-center md:text-left relative ">
          <div className="z-10 mt-12 relative md:-top-42 ">
            <h2 className="text-2xl md:mb-4 md:text-4xl font-light tracking-wider  text-[#333333] mb-1">
              Lets explore
            </h2>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider  text-[#333333] mb-8">
              Farid Portfolio
            </h2>

            {/* Arrow Right (Desktop Only) */}
            <div className="hidden md:block my-6">
              <Image src="/arrow-right.svg" alt="arrow" width={450} height={40} />
            </div>

            <p className=" hidden md:block  text-lg md:text-xl text-[#333333] mb-8 font-light tracking-wider ">
              Use this terminal
            </p>
          </div>

          {/* Photo Me (Vector SVG) */}
          <div className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-full flex justify-center ">
            <Image
              src="/photo-me-1.svg"
              alt="Farid"
              width={400}
              height={400}
              className="w-64 md:w-[400px] object-contain"
            />
          </div>
          <p className="text-lg md:text-xl text-[#333333] mt-8 font-light tracking-wider md:hidden ">
            Use this terminal
          </p>

          {/* Arrow Bottom (Mobile Only) */}
          <button className="md:hidden bg-[#1D1D1D] p-4 rounded-full mt-8 shadow-lg active:scale-85 scale-90 transition">
            <Image src="/arrow-bottom.svg" alt="down" width={20} height={20} />
          </button>
        </div>

        {/* --- SISI KANAN (Right Container / Terminal) --- */}
        <div className="w-full md:w-1/2 p-2 md:p-4  flex flex-col h-[600px] md:h-full ">
          <div
            className="bg-[#1D1D1D] w-full h-full rounded-[25px] shadow-xl flex flex-col overflow-hidden text-white font-mono cursor-text"
            onClick={focusInput}
          >
            {/* Terminal Header / Navigation */}
            <div className="px-4 py-4 border-b border-white/80 flex flex-wrap text-[11px] lg:text-sm text-white justify-evenly">
              {validCommands.map((item, idx) => (
                <React.Fragment key={item}>
                  <span
                    className="hover:text-white cursor-pointer transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick(item);
                    }}
                  >
                    {item}
                  </span>
                  {idx !== validCommands.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Terminal Content Area */}
            <div className="flex-1 overflow-y-auto p-5 terminal-scrollbar text-xs md:text-sm font-ibm-plex">
              {/* History */}
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="break-all leading-relaxed">
                    <span className="text-[#ffffff] mr-2  ">(base) user@aboutfarid %</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="mt-1 text-gray-300 leading-relaxed text-justify">
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Current Prompt (Input) */}
              <div className="break-all leading-relaxed w-full block">
                <span className="text-[#ffffff] mr-2 select-none">(base) user@aboutfarid %</span>
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

            <div className=" w-full p-4 md:p-5 bg-[#1D1D1D] flex flex-row items-center justify-between gap-3 text-sm font-['Poppins']">
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
                    <Image src="/checklist.svg" alt="online" width={10} height={10} />
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
