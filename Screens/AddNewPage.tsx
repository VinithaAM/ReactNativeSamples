import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenType } from "./StackNavigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddNewItem, MasterHistoryData } from "../Services/CommonService";

type typeprop = NativeStackScreenProps<ScreenType, "AddNew">;
function AddNewPage(prop: typeprop) {
  const { navigation } = prop;
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const renderItem = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={style.textItem}>{item.historyId}</Text>
        {item.value === value && (
          <AntDesign style={style.icon} color="black" name="Safety" size={20} />
        )}
      </View>
    );
  };
  const oncancelhandle = () => {
    navigation.navigate("FlatListPage");
  };
  const [historyId, sethistoryId] = useState("");
  const [timeStamp, settimeStamp] = useState("");
  const [correctionValue, setcorrectionValue] = useState("");
  const [status, setstatus] = useState("");
  const [value, setValue] = useState("");
  const [masterValue, setMasterValue] = useState([]);
  function handleClear() {
    sethistoryId("");
    settimeStamp("");
    setcorrectionValue("");
    setstatus("");
  }
  function onChangeStatus(e: any) {
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(e) || e === "") {
      setstatus(e);
    }
  }
  function onChangeValue(e: any) {
    setcorrectionValue(e);
  }
  function onChangetime(e: any) {
    settimeStamp(e);
  }
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onChange = ({ type }, selectedDate) => {
    console.log(type, selectedDate);
    if (type == "set") {
      const currentdate = selectedDate;
      settimeStamp(currentdate);
      if (Platform.OS === "android") {
        settimeStamp(currentdate);
        console.log(timeStamp);
      }
      showDatePicker();
    } else {
      showDatePicker();
    }
  };
  const onSaveFunction = () => {
    let params = {
      id: 0,
      historyId: historyId,
      timeStamp: timeStamp,
      value: correctionValue,
      statusTags: status,
      correctedValue: correctionValue,
      createdBy: 1,
    };
    try {
      AddNewItem(params)
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
            navigation.navigate("FlatListPage");
          }
        })
        .catch((error: any) => {
          console.log("Error occurred", error);
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      masterDatafetch();
    }, 5000);
  }, []);
  const masterDatafetch = () => {
    MasterHistoryData().then((result) => {
      setMasterValue(result.data.data);
    });
  };

  return (
    <View style={style.container}>
      <Text style={style.textTitle}>Add New Details</Text>
      <View style={style.insideContainer}>
        <Text style={style.inputTitle}>HistoryName:</Text>
        <Dropdown
          style={style.dropdown}
          placeholderStyle={style.placeholderStyle}
          selectedTextStyle={style.selectedTextStyle}
          inputSearchStyle={style.inputSearchStyle}
          iconStyle={style.iconStyle}
          data={masterValue}
          search
          maxHeight={300}
          labelField="historyId"
          valueField="historyId"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={historyId}
          onChange={(item) => {
            sethistoryId(item.historyId);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={style.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
        ></Dropdown>
      </View>
      <View style={style.insideContainer}>
        <Text style={style.inputTitle}>TimeStamp: </Text>
        <Pressable onPress={showDatePicker}>
          <Text style={style.Datepicker}>Select TimeStamp</Text>
        </Pressable>
        {isDatePickerVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            // maximumDate={new Date()}
          ></DateTimePicker>
        )}
        {/* <TextInput
          placeholder="Choose the Date"
          style={style.textInput}
          value={timeStamp}
          onChangeText={onChangetime}
        ></TextInput> */}
      </View>
      <View style={style.insideContainer}>
        <Text style={style.inputTitle}>StatusTag : </Text>
        <TextInput
          placeholder="Enter the Status"
          style={style.textInput}
          value={status}
          onChangeText={onChangeStatus}
        ></TextInput>
      </View>
      <View style={style.insideContainer}>
        <Text style={style.inputTitle}>Correction Value : </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter the Correction Value"
          style={style.textInput}
          value={correctionValue}
          onChangeText={onChangeValue}
        ></TextInput>
      </View>
      <View style={style.styleView}>
        <TouchableOpacity
          style={[style.buttonLogin, style.customButton]}
          onPress={onSaveFunction}
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
    width: 200,
    height: 40,
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 20,
    // marginLeft: 30,
    marginRight: 70,
  },
  inputTitle: {
    // alignSelf: "",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
    color: "black",
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: 15,
    marginRight: 25,
    justifyContent: "flex-start",
  },
  styleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputarea: {
    flexDirection: "column",
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
  insideContainer: {
    flexDirection: "row",
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
  dropdown: {
    margin: 16,
    height: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: 150,
    // marginLeft: 70,
    marginRight: 100,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  Datepicker: {
    padding: 3,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "green",
    marginRight: 100,
    //marginLeft: 25,
  },
});
export default AddNewPage;
