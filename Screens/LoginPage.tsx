import axios from "axios";
import React, { useState } from "react";
// import Toast from 'react-native-toast';
import {
  TextInput,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { ScreenType } from "./StackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//import { login } from "../Services/CommonService";
// import { login } from "../Services/CommonService";
import { NativeModules } from "react-native";
import { login } from "../Services/CommonService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Proptype = NativeStackScreenProps<ScreenType, "LoginPage">;
const { Networking } = NativeModules;
function LoginPage(prop: Proptype) {
  const { navigation } = prop;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onPressClear = () => {
    setUserName("");
    setPassword("");
  };

  const onChangeUsername = (e: any) => {
    setUserName(e);
  };
  const onChangePassword = (e: any) => {
    setPassword(e);
  };
  const oncancelhandle = () => {
    navigation.navigate("WelcomePage");
  };
  const loginfuntion = () => {
    var loginDetails = {
      userName: userName,
      password: password,
    };
    if (userName != undefined && userName != "") {
      if (password != undefined && password != "") {
        // const jsonString = JSON.stringify(loginDetails);
        // console.log(loginDetails);
        //console.log(jsonString);
        // fetchUser(jsonString).then((result) => {
        //   console.log(result);
        // });
        login(loginDetails)
          .then((result) => {
            // console.log(result);
            if (result.data.status === "Failed") {
              // Toast.show(result.data.message, Toast.SHORT);
              alert(result.data.message);
            } else if (result.data.status === "Success") {
              AsyncStorage.setItem(
                "LoginResponse",

                result.data.data.token
              );
              // localStorage.setItem(
              //   "LoginResponse",
              //   JSON.stringify(result.data.data)
              // );
              // sessionStorage.setItem(
              //   "Loginresponse",a
              //   JSON.stringify(result.data.data)
              // );
              navigation.navigate("FlatListPage");
            }
          })
          .catch((error: any) => {
            console.log("Error occurred", error);
            // Handle the error here (e.g., show error message, perform error-related actions)
          });
        // console.log(jsonString);
        // axios
        //   .post("https://10.6.12.2/api/Login", loginDetails)
        //   .then((response) => {
        //     console.log("data", response);
        //   })
        //   .catch((error) => {
        //     console.log("error", error);
        //   });
        // axios
        //   .post("https://10.6.12.2/api/Login", jsonString)

        //   .then((result) => {
        //     if (result.data.status === "Failed") {
        //       // Toast.show(result.data.message, Toast.SHORT);
        //       alert(result.data.message);
        //     } else if (result.data.status === "Success") {
        //       navigation.navigate("FlatListPage");
        //       console.log("lo", result.data.data);
        //       localStorage.setItem(
        //         "LoginResponse",
        //         JSON.stringify(result.data.data)
        //       );
        //     }
        //   })
        //   // (result={}) => ToastAndroid.show("Sucess", ToastAndroid.LONG))
        //   .catch((error) =>
        //     //ToastAndroid.show(error.message, ToastAndroid.LONG)
        //     console.log("err", error)
        //   );
        // fetch("http://localhost:7028/api/Login", {
        //   method: "POST",
        //   body: jsonString,
        //   headers: {
        //     "Content-type": "application/json",
        //     Accept: "application/json",
        //   },
        // })
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error("Network response was not OK");
        //     }

        //     return response.json();
        //   })
        //   .then((json) =>
        //     localStorage.setItem("LoginResponse", JSON.stringify(json.data))
        //   );

        //navigation.navigate("FlatListPage");
      } else {
        alert("Please Provide Valid Password .....");
      }
    } else {
      alert("Please Provide Valid UserName ....");
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.textTitle}>Sign In</Text>
      <Text style={style.inputTitle}>UserName</Text>
      <TextInput
        placeholder="Enter the Name"
        style={style.textInput}
        value={userName}
        onChangeText={onChangeUsername}
      ></TextInput>
      <Text style={style.inputTitle}>Password</Text>
      <TextInput
        placeholder="Enter the Password"
        style={style.textInput}
        value={password}
        onChangeText={onChangePassword}
      ></TextInput>
      <View style={style.styleView}>
        <TouchableOpacity
          style={[style.buttonLogin, style.customButton]}
          onPress={loginfuntion}
        >
          <Text style={{ color: "#fff" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonClear, style.customButton]}
          onPress={onPressClear}
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
//console.log(width);
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "aqua",
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
    fontFamily: "sans-serif",
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
    marginLeft: 1,
    marginRight: 8,
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
});
export default LoginPage;
