import { useState, useRef } from "react";
import { X, ImagePlus, Wand2, Trash2, Search } from "lucide-react";

export function NodeEditor({ 
  treeId, 
  node, 
  edges, 
  onClose
}: { 
  treeId: string; 
  node: any; 
  edges: any[]; 
  onClose: () => void;
}) {
  const [firstName, setFirstName] = useState(node.data.firstName || "");
  const [lastName, setLastName] = useState(node.data.lastName || "");
  const [details, setDetails] = useState(node.data.details || "");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

  return (
    <div className="absolute top-4 left-4 z-10 w-80 rounded-2xl bg-[#0C0C0E] border border-[#242426] shadow-2xl overflow-y-auto max-h-[85vh]">
      <div className="flex items-center justify-between mb-5 p-5 pb-0 sticky top-0 bg-[#0C0C0E] z-20">
        <h3 className="font-serif text-[#C5A059] text-xl">Edit Record</h3>
        <button onClick={onClose} className="text-[#505055] hover:text-[#C5A059] transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-5 p-5 pt-2">
        {/* Photo Uploader */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#2D2D30] bg-[#141416] py-3 text-xs font-semibold uppercase tracking-widest text-[#808085] hover:border-[#C5A059] transition-colors">
            <ImagePlus className="h-4 w-4" />
            Upload Photo
          </button>
          
          {node.data.photoUrl && (
            <button 
              disabled={isEnhancing || node.data.isAIEnhanced}
              title="AI Restore Photo"
              className="px-4 rounded-xl border border-[#2D2D30] bg-[#141416] text-[#C5A059] hover:bg-[#C5A059] hover:text-black disabled:opacity-50 transition-colors"
            >
              <Wand2 className={`h-4 w-4 ${isEnhancing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-[#505055] mb-1.5 block">First Name</label>
          <input 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-[#2D2D30] bg-[#141416] px-4 py-2.5 text-sm text-[#E0E0E0] focus:border-[#C5A059] focus:outline-none transition-colors" 
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-[#505055] mb-1.5 block">Last Name</label>
          <input 
            value={lastName} 
            onChange={e => setLastName(e.target.value)}
            className="w-full rounded-lg border border-[#2D2D30] bg-[#141416] px-4 py-2.5 text-sm text-[#E0E0E0] focus:border-[#C5A059] focus:outline-none transition-colors" 
          />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold tracking-widest text-[#505055] mb-1.5 block">Biographical Details</label>
          <textarea 
            value={details} 
            onChange={e => setDetails(e.target.value)}
            rows={3}
            placeholder="Birth date, locations, occupation..."
            className="w-full rounded-lg border border-[#2D2D30] bg-[#141416] px-4 py-2.5 text-sm text-[#E0E0E0] focus:border-[#C5A059] focus:outline-none resize-none transition-colors" 
          />
        </div>

        <div className="pt-4 border-t border-[#242426] mt-2 space-y-3">
          <button 
            onClick={() => { setIsMatching(true); setTimeout(() => {setMatches([{title: "1910 US Census Records", summary: "High confidence match for Arthur M."}]); setIsMatching(false);}, 1500) }}
            disabled={isMatching || (!firstName || !lastName)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 text-xs font-semibold text-[#E0E0E0] hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <Search className={`h-4 w-4 ${isMatching ? 'animate-spin' : ''}`} />
            Scan Global Databases
          </button>

          {matches.length > 0 && (
            <div className="bg-[#141416] border border-[#2D2D30] rounded-xl p-4 space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">Potential Matches</h4>
              {matches.map((match, i) => (
                <div key={i} className="text-sm border-l-2 border-[#C5A059] pl-3 py-1">
                   <p className="font-serif text-[#E0E0E0] text-sm">{match.title}</p>
                   <p className="text-[#808085] text-xs mt-1">{match.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#242426] mt-2">
          <button 
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete Record
          </button>
        </div>
      </div>
    </div>
  );
}
