import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Input } from "@rneui/base";
import { supabase } from "../lib/supabase";
import  ProfileEditView from "../components/ProfileEditView"

export default function editProfile() {
  const [user, setUser] = useState([
    {
      full_name: "",
      avatar_url: "",
      id: "",
      username: "",
      bio: "",
      website: "",
      user_role: "",
      updated_at: "",
    },
  ]);

  // get the userId from supabse session
  const getData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  };

  // get the user account info by id
  const getUser = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", await getData());
    setUser(data!);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <FlatList
      data={user}
      renderItem={({ item }) => (
        <ProfileEditView
          id={item.id}
          avatar={item.avatar_url}
          fullname={item.full_name}
          username={item.username}
          bio={item.bio}
        />
      )}
    />
  );
}
