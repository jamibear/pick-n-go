import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLink } from "expo-router";
import { useEffect } from "react";

const initialValues = {
  email: "",
  username: "",
  password: "",
  confirm_password: "",
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username too short")
    .max(20, "username too long")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or more")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const handleUsername = (fieldName, setFieldValue) => async (text) => {
  setFieldValue(fieldName, text);
  await AsyncStorage.setItem("signup_username", text);
};

const handleEmail = (fieldName, setFieldValue) => async (text) => {
  setFieldValue(fieldName, text);
  await AsyncStorage.setItem("signup_email", text);
};

const handlePassword = (fieldName, setFieldValue) => async (text) => {
  setFieldValue(fieldName, text);
  await AsyncStorage.setItem("signup_password", text);
};

export default function Profile() {
  const link = useLink();
  return (
    <View style={tw`m-6 my-12 flex-1`}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={() => link.push("onboarding/address")}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <View style={tw`flex-1 justify-between `}>
            <Text style={tw`text-xl my-3`}>Create an account</Text>
            <View>
              <View style={tw`mb-3`}>
                <Text>Username</Text>
                <TextInput
                  style={tw`bg-gray-200 rounded-xl p-3 font-bold my-1`}
                  placeholder="Username"
                  placeholderTextColor="#cacaca"
                  onChangeText={handleUsername("username", setFieldValue)}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                <Text style={tw`text-red-500`}>
                  {errors.username && touched.username && errors.username}
                </Text>
              </View>

              <View style={tw`mb-3 `}>
                <Text>Email</Text>
                <TextInput
                  style={tw`bg-gray-200 rounded-xl p-3 font-bold my-1`}
                  placeholder="Email"
                  placeholderTextColor="#cacaca"
                  onChangeText={handleEmail("email", setFieldValue)}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <Text style={tw`text-red-500`}>
                  {errors.email && touched.email && errors.email}
                </Text>
              </View>

              <View style={tw`mb-3 `}>
                <Text>Password</Text>
                <TextInput
                  style={tw`bg-gray-200 rounded-xl p-3 font-bold my-1`}
                  placeholder="Password"
                  placeholderTextColor="#cacaca"
                  onChangeText={handlePassword("password", setFieldValue)}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                <Text style={tw`text-red-500`}>
                  {errors.password && touched.password && errors.password}
                </Text>
              </View>

              <View>
                <Text>Confirm Password</Text>
                <TextInput
                  style={tw`bg-gray-200 rounded-xl p-3 font-bold my-1`}
                  placeholder="Confirm Password"
                  placeholderTextColor="#cacaca"
                  onChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                  value={values.confirm_password}
                  secureTextEntry
                />
                <Text style={tw`text-red-500`}>
                  {errors.confirm_password &&
                    touched.confirm_password &&
                    errors.confirm_password}
                </Text>
              </View>
            </View>

            <View>
              <Text style={tw`mb-6 text-green-600 text-lg text-center`}>
                2 / 3
              </Text>
              <TouchableOpacity
                style={tw`border-[1px] p-3 border-green-600 rounded-xl`}
                onPress={handleSubmit}
              >
                <Text style={tw`text-green-600 text-lg text-center`}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
