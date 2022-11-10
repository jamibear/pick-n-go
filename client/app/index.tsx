import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Home from "../components/Home";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { SafeAreaView } from "react-native";

export default function App({ navigation }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? navigation.push("farmer") : <Auth />}
    </View>
  );
  // return <View>{session && session.user ? <Account /> : <Auth />}</View>;
}
