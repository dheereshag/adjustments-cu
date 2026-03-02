import supabase from "@/lib/db";
import AdjustmentFinder from "@/components/adjustment-finder";
import type { Faculty } from "@/lib/types";

async function getFaculties() {
  const { data, error } = await supabase
    .from("faculties")
    .select("id, name")
    .order("name");

  if (error) {
    throw new Error(`Failed to fetch faculties: ${error.message}`);
  }

  return data as Faculty[];
}

export default async function Home() {
  const faculties = await getFaculties();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Adjustment Finder
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Select the requesting faculty and a date to find available faculties
            for adjustment.
          </p>
        </div>
        <AdjustmentFinder faculties={faculties} />
      </main>
    </div>
  );
}
