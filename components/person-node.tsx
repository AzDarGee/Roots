import { Handle, Position, NodeProps } from "@xyflow/react";
import { User, Sparkles } from "lucide-react";

export function CustomPersonNode({ data, selected }: NodeProps) {
  return (
    <div className={`
      relative w-48 p-4 rounded-xl text-center shadow-2xl transition-all
      ${selected ? "bg-[#1A1A1C] border-2 border-[#C5A059] scale-110 z-10" : "bg-[#141416] border border-[#2D2D30] z-0"}
    `}>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !border-0 !bg-[#C5A059]" />
      
      {selected && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-[2px] bg-[#2D2D30]"></div>
      )}

      {data.photoUrl && (
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 border-2 flex items-center justify-center overflow-hidden relative ${selected ? 'border-[#C5A059]' : 'border-[#2D2D30]'}`}>
          <div 
            className={`w-full h-full rounded-full bg-cover bg-center ${data.isAIEnhanced ? 'contrast-125 saturate-110 sepia-[0.3]' : 'sepia-[0.5] contrast-125'}`}
            style={{ backgroundImage: `url('${data.photoUrl}')` }} 
          />
          {data.isAIEnhanced && (
            <div className="absolute bottom-0 right-1 bg-[#1A1A1C] rounded-full p-0.5 z-10 text-[#C5A059]">
              <Sparkles className="h-3 w-3" />
            </div>
          )}
        </div>
      )}
      
      {!data.photoUrl && (
        <div className={`w-12 h-12 rounded-full mx-auto mb-4 border-2 flex items-center justify-center bg-[#2D2D30] ${selected ? 'border-[#C5A059]' : 'border-[#2D2D30]'}`}>
          <User className="h-5 w-5 text-[#808085]" />
        </div>
      )}

      {selected && (
        <p className="text-[10px] uppercase text-[#C5A059] font-bold tracking-widest mb-1">Current Focus</p>
      )}

      <p className={`font-serif ${selected ? "text-white text-xl" : "text-[#C5A059] text-base"}`}>
        {data.firstName} {data.lastName}
      </p>
      
      {data.details && (
        <p className="text-[10px] text-[#808085] mt-1">{data.details}</p>
      )}

      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !border-0 !bg-[#C5A059]" />
    </div>
  );
}
