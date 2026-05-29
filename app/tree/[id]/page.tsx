"use client";

import { useAuth } from "@/hooks/use-auth";
import { TreeCanvas } from "@/components/tree-canvas";
import { PrivacyLog } from "@/components/privacy-log";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronLeft, ArrowDownToLine, Network, ActivitySquare, LayoutDashboard, Settings, Layers } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getMockTrees } from "@/lib/tree-operations";

export default function TreePage() {
  const { id } = useParams() as { id: string };
  const { user } = useAuth();
  const router = useRouter();
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    // mock finding tree
    setTreeData(getMockTrees()[0]);
  }, []);

  const handleExport = async () => {
    const rfElement = document.querySelector(".react-flow") as HTMLElement;
    if (!rfElement) return;

    try {
      const canvas = await html2canvas(rfElement, {
        backgroundColor: "#080809",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${treeData?.name || "family-tree"}.pdf`);
    } catch (e) {
      console.error("Failed to export PDF", e);
    }
  };

  if (!treeData) return null;

  return (
    <div className="flex h-full w-full bg-[#080809] text-[#E0E0E0] overflow-hidden border-8 border-[#1A1A1C]">
      {/* Left Sidebar */}
      <aside className="w-20 border-r border-[#242426] flex flex-col items-center py-8 space-y-8 bg-[#0C0C0E] shrink-0">
        <Link href="/" className="w-10 h-10 rounded-full bg-[#C5A059] flex items-center justify-center mb-4 transition-transform hover:scale-105">
           <Network className="w-6 h-6 text-black" />
        </Link>
        <nav className="flex flex-col space-y-6 flex-1">
          <div className="p-3 rounded-xl bg-[#C5A05915] text-[#C5A059] cursor-pointer">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div className="p-3 text-[#505055] hover:text-[#C5A059] transition-colors cursor-pointer">
            <Layers className="w-6 h-6" />
          </div>
          <div className="p-3 text-[#505055] hover:text-[#C5A059] transition-colors cursor-pointer">
            <Settings className="w-6 h-6" />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-[#242426] flex items-center justify-between px-10 bg-[#0A0A0B] shrink-0">
          <div>
            <h1 className="text-2xl font-serif text-[#C5A059] tracking-tight">{treeData.name}</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#505055]">672 Family Members &bull; Last synced: 2m ago</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0B] bg-[#2D2D30] flex items-center justify-center text-[10px]">JD</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0B] bg-[#C5A059] text-black flex items-center justify-center text-[10px] font-bold">AM</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0B] bg-[#4A6D55] flex items-center justify-center text-[10px]">+3</div>
            </div>
            <button 
              onClick={handleExport}
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold text-[#E0E0E0] hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <ArrowDownToLine className="w-4 h-4" />
              Export
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 bg-[#080809] relative overflow-hidden">
          {/* subtle radial grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2D30 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 z-10 w-full h-full">
            <TreeCanvas treeId={id} />
          </div>
        </div>
      </main>

      {/* Right Sidebar (Privacy Log / Editor) */}
      <aside className="w-80 border-l border-[#242426] bg-[#0A0A0B] flex flex-col shrink-0">
        <PrivacyLog treeId={id} onClose={() => {}} />
      </aside>
    </div>
  );
}
