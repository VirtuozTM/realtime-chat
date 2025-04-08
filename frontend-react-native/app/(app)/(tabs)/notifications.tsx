import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
