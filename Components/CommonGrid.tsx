import React from "react";
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";

function CommonGrid(_prop: any) {
  return (
    <View>
      <View style={[style.gridItem, { backgroundColor: "lightpink" }]}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            style.button,
            pressed ? style.buttonPressed : null,
          ]}
        >
          <View style={style.innerContainer}>
            <Text style={style.title}>{_prop.title}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 50,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginTop: 30,
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
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
export default CommonGrid;
