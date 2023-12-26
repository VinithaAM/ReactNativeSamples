import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Platform,
  Pressable,
} from "react-native";
import { ScreenType } from "./StackNavigation";
//import { register } from "../Services/CommonService";
// import { register } from "../Services/CommonService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { register } from "../Services/CommonService";

type typeprop = NativeStackScreenProps<ScreenType, "RegistrationPage">;
function RegistrationPage(prop: typeprop) {
  const { navigation } = prop;
  //const [date, setDate] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValid, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // const showDatePicker = () => {
  //   setDatePickerVisible(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisible(false);
  // };

  // const handleConfirm = (date: any) => {
  //   setSelectedDate(date);
  //   hideDatePicker();
  // };
  function handleChangefirstname(event: any) {
    const value = event;
    const sanitizedValue = value.replace(/[^a-zA-Z]/g, "");
    setfirstName(sanitizedValue);
  }
  function handleChangelastname(event: any) {
    const value = event;
    const sanitizedValue = value.replace(/[^a-zA-Z]/g, "");
    setlastName(sanitizedValue);
  }
  function handleChangeemail(event: any) {
    setEmail(event);
    validateEmail(email);
  }
  function handleChangedob(event: any) {
    setDOB(event.target.value);
  }
  function handleChangepassword(event: any) {
    setPassword(event);
    validatePassword(password);
    setPasswordsMatch(event === confirmPassword);
  }
  function handleChangeconfirmPassword(event: any) {
    setconfirmPassword(event);
    console.log(event);
    setPasswordsMatch(password === event);
  }
  function handleClear() {
    setfirstName("");
    setlastName("");
    setDOB("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  }
  function validateEmail(input: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(input);
    setIsValidEmail(isValidEmail);
  }
  const validatePassword = (input: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(input);
    setIsValidPassword(isValidPassword);
  };

  const changeDate = (e: any) => {
    console.log(e);
    setDate(e.target.value);
  };
  function fieldValidation() {
    var res: boolean = false;
    if (firstName === null || firstName === "") {
      res = true;
      // } else if (dob === null || dob === "") {
      //   res = true;
    } else if (email === null || email === "") {
      res = true;
    } else if (password === null || password === "") {
      res = true;
    } else {
      res = false;
    }
    return res;
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const oncancelhandle = () => {
    navigation.navigate("WelcomePage");
  };
  const onSaveClick = () => {
    let params = {
      id: 0,
      firstName: firstName,
      lastName: lastName,
      userName: email,
      password: password,
      dOB: dob ? dob : new Date(),
      status: true,
    };
    if (fieldValidation() != true) {
      try {
        console.log(params);
        register(params)
          .then((result: any) => {
            if (result.data != null) {
              // toast.success("Register Successfully...", {
              //   position: "top-right",
              //   autoClose: 3000,
              //   style: {
              //     backgroundColor: "lightgreen",
              //     color: "white",
              //   },
              // });
              navigation.navigate("LoginPage");
            }
          })
          .catch((error: any) => {
            console.log("Error occurred", error);
          });
      } catch (error) {
        console.log("Error occured", error);
      }
    } else {
      alert("Please Fill detail in the form....");
    }
  };
  const state = {
    showStart: false,
    showEnd: false,
    start: "",
    end: "",
  };
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onChange = ({ type }, selectedDate) => {
    console.log(type, selectedDate);
    if (type == "set") {
      const currentdate = selectedDate;
      setDate(currentdate);
      if (Platform.OS === "android") {
        setDOB(currentdate);
        console.log(currentdate);
        // console.log(date);
      }
      showDatePicker();
    } else {
      showDatePicker();
    }
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  return (
    <View style={style.container}>
      <Text style={style.textTitle}>Sign Up Form</Text>
      <Text style={style.inputTitle}>Firstname</Text>

      <TextInput
        placeholder="Enter the Firstame"
        style={style.textInput}
        value={firstName}
        onChangeText={handleChangefirstname}
      ></TextInput>
      <Text style={style.inputTitle}>Lastname</Text>
      <TextInput
        placeholder="Enter the Lastname"
        style={style.textInput}
        value={lastName}
        onChangeText={handleChangelastname}
      ></TextInput>
      <View style={style.insideContainer}>
        <Text style={style.inputTitle}>DOB</Text>
        <Pressable onPress={showDatePicker}>
          <Text style={style.Datepicker}>select DOB</Text>
        </Pressable>
        {isDatePickerVisible && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            //onChange={changeDate}
            maximumDate={new Date()}
          ></DateTimePicker>
        )}
        {/* {!isDatePickerVisible && (
          <Pressable onPress={showDatePicker}>
            <TextInput
              style={style.textInput}
              onChangeText={setDOB}
              editable={false}
              value={dob}
              onPressIn={showDatePicker}
            >
              DOB
            </TextInput>
          </Pressable>
        )} */}
      </View>
      <Text style={style.inputTitle}>Username</Text>
      <TextInput
        placeholder="Enter the Username"
        style={style.textInput}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={handleChangeemail}
      ></TextInput>
      <Text style={style.inputTitle}>Password</Text>
      <TextInput
        placeholder="Enter the Password"
        style={style.textInput}
        value={password}
        secureTextEntry={true}
        onChangeText={handleChangepassword}
      ></TextInput>
      <Text style={style.inputTitle}>Confirm PassWord</Text>
      <TextInput
        placeholder="Enter the confirmPassword"
        style={style.textInput}
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={handleChangeconfirmPassword}
      ></TextInput>
      <View style={style.styleView}>
        <TouchableOpacity
          style={[style.buttonLogin, style.customButton]}
          onPress={onSaveClick}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonClear, style.customButton]}
          onPress={handleClear}
        >
          <Text style={{ color: "#fff" }}> Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonCancel, style.customButton]}
          onPress={oncancelhandle}
        >
          <Text style={{ color: "#fff" }}> Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const width = Dimensions.get("window").width - 70;
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "aqua",
  },
  insideContainer: {
    flexDirection: "row",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    width,
    height: 40,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 20,
  },
  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
    color: "black",
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: 15,
    marginRight: 100,
  },
  styleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonCancel: {
    backgroundColor: "#147EFB",
    textAlign: "center",
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 4,
    marginRight: 4,
    borderColor: "blue",
  },
  buttonLogin: {
    backgroundColor: "#69f58e",
    textAlign: "center",
  },
  buttonClear: {
    backgroundColor: "#131413",
    textAlign: "center",
  },
  textTitle: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: 25,
    textAlign: "center",
  },
  Datepicker: {
    padding: 3,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "green",
    marginRight: 150,
    //marginLeft: 25,
  },
  datetime: {
    height: 120,
    marginTop: -10,
  },
  // height:120,
  // marginTop:-10
});
export default RegistrationPage;

{
  /* <View style={style.styleView}>
        <TouchableOpacity
          style={[style.buttonLogin, style.customButton]}
          onPress={onSaveClick}
        >
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.buttonCancel, style.customButton]}>
          <Text style={{ color: "#fff" }}> Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonClear, style.customButton]}
          onPress={handleClear}
        >
          <Text style={{ color: "#fff" }}> Clear</Text>
        </TouchableOpacity>
      </View> */
}
