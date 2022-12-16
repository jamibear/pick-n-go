"use client";
import { useRouter } from "next/navigation";
import { supabase } from "utils/supabaseConfig";

const deleteUser = async (id, field, router) => {
  const { error } = await supabase.from(field).delete().eq("id", id);
  router.refresh();
};
export default function DeleteButton({ id, field }) {
  const router = useRouter();
  return (
    <button
      className="self-center mx-1 min-h-0 px-3 rounded-full bg-red-300 text-red-600"
      onClick={() => deleteUser(id, field, router)}
    >
      Delete
    </button>
  );
}
