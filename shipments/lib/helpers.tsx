import { supabase } from "./supabase";

export const GetUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id;
};

export const GetProductInfo = async (id: string) => {
  const { data } = await supabase.from("products").select("*").eq("id", id);
  return data
};
