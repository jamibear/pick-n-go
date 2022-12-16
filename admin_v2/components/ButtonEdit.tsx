"use client";
import { useRouter } from "next/navigation";

const editUser = (id, router) => {
  console.log("edit");
};

export default function ButtonEdit({ id }) {
  const router = useRouter();
  return (
    <button
      className="self-center mx-1 px-3 rounded-full bg-green-300 text-green-600"
      onClick={() => editUser(id, router)}
    >
      Edit
    </button>
  );
}
