import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import Profile from "../../components/Profile"

export default function Page() {
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
  }, [user]);

  return (
    <FlatList
      data={user}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Profile
          id={item.id}
          name={item.full_name}
          username={item.username}
          bio={item.bio}
          avatar={item.avatar_url}
        />
      )}
    />
  );
}
