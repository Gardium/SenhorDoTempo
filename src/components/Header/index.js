import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ background, weather, icon }) {
  console.log(icon.name);
  return (
    <LinearGradient style={styles.header} colors={background}>
      <Text style={styles.date}>{weather.results.date}</Text>
      <Text style={styles.city}>{weather.results.city}</Text>
      <Ionicons name={icon.name} color={"#fff"} size={150} />

      <Text style={styles.temp}> {weather.results.temp} °</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "95%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  date: {
    fontSize: 17,
    color: "#fff",
  },
  city: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  temp: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 80,
  },
});
