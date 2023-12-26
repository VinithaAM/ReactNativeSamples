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
  const [columns, setColumns] = useState(2);
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
  function renderItem(e: any) {
    renderEach(e);
    return (
      <CommonGrid title={e.item.historyId} color={e.item.color}></CommonGrid>
    );
  }
  const keyExtractor = (item: { id: number }) => {
    return item.id.toString();
  };
  function handlePress() {
    navigation.navigate("AddNew");
  }
  const elementsRef = useRef(ListData?.map(() => createRef()));
  const onCardPress = (item, newRef) => {
    newRef?.current?.measureInWindow((fx, fy, width, height, px, py) => {
      console.log("Component width is: " + width);
      console.log("Component height is: " + height);
      console.log("X offset to frame: " + fx);
      console.log("Y offset to frame: " + fy);
      console.log("X offset to page: " + px);
      console.log("Y offset to page: " + py);

      setTop(fy);
    });
  };
  const [topH, setTop] = useState(0);
  const renderEach = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => onCardPress(item, elementsRef?.current[index])}
        style={style.eachCard}
      >
        {/* ref={elementsRef?.current[index]} */}
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const Popup = () => {
    if (topH === 0) {
      return null;
    }
    return (
      <View
        style={{
          backgroundColor: "yellow",
          position: "absolute",
          zIndex: 3,
          height: 60,
          width: 60,
          right: 30,
          top: topH,
        }}
      >
        <Text> popup </Text>
      </View>
    );
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
        renderItem={renderItem}
        numColumns={columns}
        key={columns}
      ></FlatList>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    // backgroundColor: "aqua",
  },
  List: {
    marginTop: 30,
  },
  newButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 10,
    alignSelf: "flex-end",
    margin: 15,
  },
  eachCard: {
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#850D5F",
  },
});
export default DataCorrectionListPage;
