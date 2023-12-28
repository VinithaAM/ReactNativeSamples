import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from "react-native";
import { IHistoryDataCorrection } from "../Components/HistoryDataCorrectionModel";
import CommonGrid from "../Components/CommonGrid";
import { HistoryData } from "../Components/dummyData";
import { ScreenType } from "./StackNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import {
  MasterHistoryData,
  getHistoryCorrection,
} from "../Services/CommonService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
//import { getHistoryCorrection } from "../Services/CommonService";

type Proptype = NativeStackScreenProps<ScreenType, "FlatListPage">;
function DataCorrectionListPage(prop: Proptype) {
  const { navigation } = prop;
  const [CorrectionData, setCorrectionData] = useState();
  const [columns, setColumns] = useState(1);
  const [ListData, setListData] = useState([]);
  const getHistoryData = () => {
    getHistoryCorrection().then((result) => {
      //console.log(result);
      setListData(result.data.data);
    });
  };
  const fetchUser = async () => {
    const configurationObject = {
      method: "get",
      url: "https://jsonplaceholder.typicode.com/comments?postId=1",
    };
    const response = await axios(configurationObject);

    setListData(response.data);
  };

  useEffect(() => {
    setTimeout(() => {
      handletoken();
    }, 5000);
  }, []);
  useFocusEffect(
    useCallback(() => {
      console.log("Screen is focused");
      getHistoryData();
    }, [])
  );
  const handletoken = async () => {
    getHistoryData();
  };
  function renderItems(e: any) {
    return (
      <>
        <CommonGrid title={e.item}></CommonGrid>

        {/* <TouchableOpacity onPress={() => showModal(e)}>
          <View style={style.items}>
            <Text>{e.item.historyId}</Text>
          </View>
        </TouchableOpacity> */}
      </>
    );
  }
  const keyExtractor = (item: { id: number }) => {
    return item.id.toString();
  };
  function handlePress() {
    navigation.navigate("AddNew");
  }
  const elementsRef = useRef(ListData?.map(() => createRef()));
  // const [topH, setTop] = useState(0);
  // const renderEach = ({ item, index }) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => onCardPress(item, elementsRef?.current[index])}
  //       style={style.eachCard}
  //     >
  //       {/* ref={elementsRef?.current[index]} */}
  //       <Text>{item}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View style={style.item}>
        <Text>{item.title}</Text>
        <Button title="View Details" onPress={() => showModal(item)} />
      </View>
    );
  };

  const showModal = (item) => {
    setSelectedItem(item.item);
    console.log("data", item);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={style.container}>
      <Pressable style={style.newButton} onPress={handlePress}>
        <Text>Add New</Text>
      </Pressable>
      <FlatList
        style={style.List}
        data={ListData}
        keyExtractor={keyExtractor}
        renderItem={renderItems}
        numColumns={columns}
        key={columns}
      ></FlatList>
    </View>
  );
}
const width = Dimensions.get("window").width - 70;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    // backgroundColor: "aqua",
  },
  List: {
    marginTop: 10,
  },
  newButton: {
    padding: 8,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "flex-end",
    margin: 15,
  },
  eachCard: {
    height: 100,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#850D5F",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  items: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default DataCorrectionListPage;
