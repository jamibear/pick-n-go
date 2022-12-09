import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import tw from "twrnc";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLink } from "expo-router";
import { useEffect } from "react";

const initialValues = {
  first_name: "",
  last_name: "",
  user_type: "user",
};

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
});

export default function SignUp() {
  const link = useLink();

  // set user as the default user type
  useEffect(() => {
    AsyncStorage.setItem("signup_usertype", "user");
  });

  const enterFirstName = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    try {
      await AsyncStorage.setItem("signup_firstname", JSON.stringify(text));
    } catch (e) {
      console.log("Failed saving to storage");
    }
  };

  const enterLastName = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    try {
      await AsyncStorage.setItem("signup_lastname", JSON.stringify(text));
    } catch (e) {
      console.log("Failed saving to storage");
    }
  };

  const handleUserType = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    try {
      await AsyncStorage.setItem("signup_usertype", JSON.stringify(text));
    } catch (e) {
      console.log("Failed saving to storage");
    }
  };

  return (
    <View style={tw`m-6 my-21 flex-1`}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={() => link.push("onboarding/signupprofile")}
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
          <View>
            <Text style={tw`text-xl my-6`}>Create an account</Text>
            <View>
              <View style={tw`mb-2 `}>
                <Text>First Name</Text>
                <TextInput
                  style={tw`bg-gray-200 rounded-xl p-3 font-bold my-1`}
                  placeholder="First Name"
                  placeholderTextColor="#cacaca"
                  onChangeText={enterFirstName("first_name", setFieldValue)}
                  onBlur={handleBlur("first_name")}
                  value={values.first_name}
                />
                <Text style={tw`text-red-500`}>
                  {errors.first_name && touched.first_name && errors.first_name}
                </Text>
              </View>

              <View style={tw`mb-2 `}>
                <Text>Last Name</Text>
                <TextInput
                  style={tw`bg-gray-200 rounded-xl p-3 font-bold my-1`}
                  placeholder="Last Name"
                  placeholderTextColor="#cacaca"
                  onChangeText={enterLastName("last_name", setFieldValue)}
                  onBlur={handleBlur("last_name")}
                  value={values.last_name}
                />
                <Text style={tw`text-red-500`}>
                  {errors.last_name && touched.last_name && errors.last_name}
                </Text>
              </View>

              <View style={tw`mb-2 `}>
                <Text>I am...</Text>
                <Picker
                  style={tw`p-3 rounded-xl`}
                  selectedValue={values.user_type}
                  onValueChange={handleUserType("user_type", setFieldValue)}
                >
                  <Picker.Item label="shopping for products" value="user" />
                  <Picker.Item label="selling my products" value="farmer" />
                </Picker>
              </View>
            </View>

            <Text style={tw`my-6 text-green-600 text-lg text-center`}>
              1 / 3
            </Text>
            <TouchableOpacity
              style={tw`border-[1px] p-3 border-green-600 rounded-xl`}
              onPress={() => link.push('onboarding/profile')}
            >
              <Text style={tw`text-green-600 text-lg text-center`}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
