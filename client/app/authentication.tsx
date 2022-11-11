import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Text, View } from "react-native";
import Onboarding from "../components/Onboarding";

export default function Authentication({ navigation }) {
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
    getData();
    getUser();
  }, []);

  return (
    <View>
      { user[0].username || user[0].user_role ? (
        navigation.push(user[0].user_role)
      ) : (
        <Onboarding />
      )}
    </View>
  );
}
