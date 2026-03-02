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
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-4xl px-8 py-14">
        <div className="flex flex-col gap-2 mb-10">
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
