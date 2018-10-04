import React from "react";
import { Drawer, Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const DrawerItems = () => {
  return (
    <Drawer.Section>
      <View style={styles.User}>
        <View style={styles.ProfilePic} />
        <Text style={styles.Username}>USER NAME</Text>
      </View>
      <Drawer.Item label="Menu Item 1" />
      <Drawer.Item label="Menu Item 2" />
      <Drawer.Item label="Menu Item 3" />
      <Drawer.Item label="Menu Item 4" />
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  User: {
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1271E0"
  },
  ProfilePic: {
    margin: 10,
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 50
  },
  Username: {
    margin: 10,
    color: "white"
  }
});

export default DrawerItems;
