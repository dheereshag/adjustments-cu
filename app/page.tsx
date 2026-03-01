import supabase from "@/lib/db";
import FacultySelect from "@/components/faculty-select";
import DatePicker from "@/components/date-picker";

type Faculty = {
  id: number;
  name: string;
};

const fallbackFaculties: Faculty[] = [
  { id: 19078, name: "Anchita Panjeta" },
  { id: 19842, name: "Dheeresh Agarwal" },
];

async function getFaculties() {
  const { data, error } = await supabase
    .from("faculties")
    .select("id, name")
    .order("name");

  if (error || !data) {
    return fallbackFaculties;
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
            Select the faculty member who is requesting an adjustment.
          </p>
        </div>
        <FacultySelect faculties={faculties} />
        <DatePicker />
      </main>
    </div>
  );
}
