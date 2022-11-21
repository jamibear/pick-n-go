import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "../components/Auth";
import { Text, View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setLoading(false);
  }, [loading]);

  const Logo = () => {
    return (
      <View>
        <Text style={{ fontSize: 50 }}>pickngo</Text>
      </View>
    );
  };

  const UserSession = () => {
    if (session && session.user) {
      return <Redirect href="/authentication" />;
    }
    return <Auth />;
  };

  return <View>{loading ? <Logo /> : <UserSession />}</View>;
}
