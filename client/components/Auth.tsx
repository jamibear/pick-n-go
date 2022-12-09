import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useLink } from "expo-router";
import tw from "twrnc";
import { Formik } from "formik";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(values) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const link = useLink();

  async function signUpWithEmail() {
    link.push("onboarding/signup");
  }

  return (
    <View style={tw`mx-6 my-12`}>
      <View
        style={tw`p-px px-1 rounded-md border-green-500 border-[2.5px] self-start`}
      >
        <Text style={tw`leading-none text-green-500 font-bold text-lg`}>
          pickngo
        </Text>
      </View>
      <Text style={tw`text-lg my-6`}>Log in account</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => signInWithEmail(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={tw`h-12 focus:border-sky-500  bg-gray-200 rounded-xl p-3 mb-3 font-bold`}
              placeholder="Email address"
              placeholderTextColor="#acacac"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <TextInput
              style={tw.style(
                "bg-gray-200",
                "rounded-xl",
                "p-3",
                "mb-3",
                "font-bold",
                "h-12"
              )}
              placeholder="Password"
              placeholderTextColor="#acacac"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`my-6 h-12 rounded-xl bg-green-500 p-3 mb-3 text-center active:bg-green-700`}
            >
              <Text style={tw`text-white text-center`}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Text style={tw`mt-6 text-gray-400 `}>Don't have an account?</Text>
      <TouchableOpacity
        style={tw`h-30 self-start`}
        onPress={() => link.push("onboarding/signup")}
        disabled={loading}
      >
        <Text style={tw` text-green-600 underline`}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
