"use client";

import { Activity, X, ShieldCheck } from "lucide-react";

export function PrivacyLog({ treeId, onClose }: { treeId: string; onClose: () => void }) {
  // Mock Data
  const logs = [
    { id: '1', action: 'Used AI to restore photo for Arthur Montgomery', timestamp: '2 mins ago' },
    { id: '2', action: 'Ran automated genealogy record matching', timestamp: '1 hour ago' },
    { id: '3', action: 'Added record for Sarah L. Vance', timestamp: 'Yesterday' }
  ];

  return (
    <div className="flex h-full flex-col font-sans">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#505055]">AI Image Restorer</h2>
          <span className="px-2 py-0.5 rounded bg-[#C5A05930] text-[#C5A059] text-[9px] font-bold">PRO</span>
        </div>
        
        <div className="relative aspect-[4/3] bg-[#141416] rounded-xl overflow-hidden border border-[#242426] mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300')" }}></div>
          <div className="relative z-10 text-center">
            <button className="bg-[#C5A059] text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#a38346] transition-colors">Restore Photo</button>
            <p className="text-[10px] text-[#505055] mt-2">Auto-enhance 19th Century tintypes</p>
          </div>
        </div>
        
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#505055] mb-4 mt-8 flex items-center justify-between">
          <span>Activity Log</span>
          <button onClick={onClose} className="p-1 rounded-md text-[#505055] hover:text-[#C5A059] sm:hidden">
            <X className="h-4 w-4" />
          </button>
        </h2>
        
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="p-3 bg-[#141416] rounded-xl border-l-2 border-[#3D3D42] hover:border-[#C5A059] transition-colors cursor-default">
              <p className="text-xs text-white font-medium">{log.action}</p>
              <p className="text-[10px] text-[#808085] mt-1">{log.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 border-t border-[#242426] bg-[#0C0C0E]">
        <div className="flex items-center mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <p className="text-[10px] text-[#808085] uppercase tracking-tighter">Privacy Shield Active</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-[10px] text-[#E0E0E0]">Secure Cloud Backup</p>
            <p className="text-[9px] text-[#505055]">Daily archive: 4:02 AM</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#141416] border border-[#242426] flex items-center justify-center text-[#505055]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
