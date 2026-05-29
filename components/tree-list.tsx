"use client";

import { useState } from "react";
import { PlusIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { getMockTrees } from "@/lib/tree-operations";

export function TreeList() {
  const [trees] = useState<any[]>(getMockTrees());
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl tracking-tight text-[#C5A059]">Your Lineages</h2>
        <button
          disabled={isCreating}
          className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm font-semibold text-[#E0E0E0] transition-colors hover:bg-white/10 disabled:opacity-50"
        >
          <PlusIcon className="h-4 w-4" />
          Create Tree
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trees.map((tree) => (
          <Link
            key={tree.id}
            href={`/tree/${tree.id}`}
            className="group relative flex flex-col gap-4 rounded-xl border border-[#2D2D30] bg-[#141416] p-6 shadow-2xl transition-all hover:border-[#C5A059] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[#E0E0E0]">{tree.name}</h3>
              <Users2 className="h-5 w-5 text-[#505055] group-hover:text-[#C5A059] transition-colors" />
            </div>
            <div className="text-xs text-[#808085] uppercase tracking-widest">
              Last updated {tree.updatedAt ? format(tree.updatedAt.toDate(), "MMM d, yyyy") : "recently"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
