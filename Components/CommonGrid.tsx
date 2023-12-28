import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { MasterHistoryData } from "../Services/CommonService";
function CommonGrid(_prop: any) {
  //console.log("Data", _prop);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [historyId, sethistoryId] = useState("");
  const [timeStamp, settimeStamp] = useState("");
  const [correctionValue, setcorrectionValue] = useState("");
  const [status, setstatus] = useState("");
  const [value, setValue] = useState("");
  const [masterValue, setMasterValue] = useState([]);
  const showModal = (item) => {
    setSelectedItem(item);
    console.log("clickeddata", item);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const hideEidtModal = () => {
    setEditModalVisible(false);
  };
  const onClickEdit = (item) => {
    console.log("edit", item);
    setEditModalVisible(true);
    masterDatafetch();
    sethistoryId(item.historyId);
    settimeStamp(item.timeStamp);
    setstatus(item.statusTags);
    setcorrectionValue(item.correctedValue);
  };
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
  const masterDatafetch = () => {
    MasterHistoryData().then((result) => {
      setMasterValue(result.data.data);
    });
  };
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
  return (
    <View>
      <View style={[style.gridItem, { backgroundColor: "lightpink" }]}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            style.button,
            pressed ? style.buttonPressed : null,
          ]}
          onPress={() => showModal(_prop.title)}
        >
          <View style={style.innerContainer}>
            <Text style={style.title}>{_prop.title.historyId}</Text>
          </View>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideModal}
        >
          <View style={style.modalView}>
            {selectedItem && (
              <View style={{ backgroundColor: "White" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "darkblue",
                  }}
                >
                  {" "}
                  HistoryDataDetails
                </Text>
                <Text>MasterName : {selectedItem.historyId}</Text>
                <Text>TimeStamp : {selectedItem.timeStamp}</Text>
                <Text>Status : {selectedItem.statusTags}</Text>
                <Text>Value : {selectedItem.correctedValue}</Text>
                <View style={style.buttonContainer}>
                  <Pressable
                    style={[style.buttonClear, style.customButton]}
                    onPress={hideModal}
                  >
                    Close
                  </Pressable>
                  <TouchableOpacity
                    style={[style.buttonLogin, style.customButton]}
                    onPress={() => onClickEdit(selectedItem)}
                  >
                    Edit
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[style.buttonDelete, style.customButton]}
                    onPress={() => onClickEdit(selectedItem)}
                  >
                    Delete
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={hideModal}
        >
          <View style={style.modalView}>
            {selectedItem && (
              <View style={{ backgroundColor: "White" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "darkblue",
                  }}
                >
                  HistoryDataDetails
                </Text>
                <Text>MasterName :</Text>
                <Dropdown
                  // style={style.dropdown}
                  // placeholderStyle={style.placeholderStyle}
                  // selectedTextStyle={style.selectedTextStyle}
                  // inputSearchStyle={style.inputSearchStyle}
                  // iconStyle={style.iconStyle}
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
                <Text>TimeStamp : {selectedItem.timeStamp}</Text>

                <Text>Status : </Text>
                <TextInput
                  value={status}
                  onChangeText={onChangeStatus}
                ></TextInput>
                <Text>Value :</Text>
                <TextInput
                  keyboardType="numeric"
                  value={correctionValue}
                  onChangeText={onChangeValue}
                ></TextInput>
                <View style={style.buttonContainer}>
                  <Pressable
                    style={[style.buttonClear, style.customButton]}
                    onPress={hideEidtModal}
                  >
                    Close
                  </Pressable>
                  <Pressable style={[style.buttonLogin, style.customButton]}>
                    Edit
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 45,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginTop: 15,
    overflow: Platform.OS == "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 4,
    marginRight: 4,
    borderColor: "blue",
  },
  buttonLogin: {
    backgroundColor: "green",
    textAlign: "center",
    color: "white",
  },
  buttonDelete: {
    backgroundColor: "red",
    textAlign: "center",
    color: "white",
  },
  buttonClear: {
    backgroundColor: "#131413",
    textAlign: "center",
    color: "white",
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
    fontSize: 11,
  },
});
export default CommonGrid;
