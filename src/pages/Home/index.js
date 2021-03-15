import React, { useState, useEffect } from "react";

import { SafeAreaView, Text, StyleSheet, FlatList, Alert } from "react-native";
import * as Location from "expo-location";
import AnimatedEllipsis from "react-native-animated-ellipsis";

import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Conditions from "../../components/Conditions";
import Forecast from "../../components/Forecast";
import api, { key } from "../../services/api";
import { condition } from "./../../utils/conditions";

export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: "cloud", color: "#fff" });
  const [background, setBackground] = useState(["#1ED6FF", "#97C1FF"]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status != "granted") {
        setErrorMsg("Permissão negada para acessar a localização");
        alert("Não foi possivel acessar a localização");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = location.coords;

      api
        .get(`weather?key=${key}&lat=${latitude}&lon=${longitude}`)
        .then((response) => {
          setWeather(response.data);
          response.data.results.currently == "noite" &&
            setBackground(["#0c3741", "#0f2f61"]);

          setIcon(condition(response.data.results.condition_slug));
          setLoading(!loading);
        })
        .catch((error) => {
          alert(error.message);
        });
    })();
  }, []);

  return loading == true ? (
    <SafeAreaView style={styles.container}>
      <AnimatedEllipsis
        useNativeDriver={false}
        numberOfDots={4}
        animationDelay={150}
        style={{
          color: "#0f2f61",
          fontSize: 72,
        }}
      />
      <Text style={{ fontSize: 17 }}>Buscando dados da localização.</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header background={background} weather={weather} icon={icon} />
      <Conditions weather={weather} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingBottom: "5%" }}
        style={styles.list}
        data={weather.results.forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f0ff",
    paddingTop: "5%",
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
