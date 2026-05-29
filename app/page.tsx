"use client";

import { useAuth } from "@/hooks/use-auth";
import { TreeList } from "@/components/tree-list";
import { LogIn, Network } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const { user, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#080809]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2D2D30] border-t-[#C5A059]" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-[#080809]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md space-y-6 bg-[#0A0A0B] border-2 border-[#1A1A1C] p-10 rounded-2xl shadow-2xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A059] text-black">
            <Network className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-4xl text-[#C5A059]">Roots</h1>
            <p className="text-[#808085] text-sm uppercase tracking-widest">Collaborative family tree builder.</p>
          </div>
          <button
            onClick={login}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3.5 text-sm font-semibold text-[#E0E0E0] transition-colors hover:bg-white/10"
          >
            <LogIn className="h-4 w-4" />
            Continue with Google
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl p-6 md:p-12 mb-auto h-full overflow-auto bg-[#080809]">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C5A059] text-black">
            <Network className="h-5 w-5" />
          </div>
          <h1 className="font-serif text-2xl text-[#C5A059]">Roots</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#505055]">{user.email}</span>
        </div>
      </div>
      <TreeList />
    </main>
  );
}
