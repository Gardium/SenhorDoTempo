import React, { useState } from "react";
import {
  View,
  Keyboard,
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
  FlatList,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import api, { key } from "../../services/api";
import Header from "../../components/Header";
import Forecast from "../../components/Forecast";
import Conditions from "../../components/Conditions";
import { condition } from "../../utils/conditions";

export default function Search() {
  const navigation = useNavigation();

  const [input, setInput] = useState("");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState({ name: "cloud", color: "#fff" });
  const [modalVisible, setModalVisible] = useState(false);
  const [background, setBackground] = useState(["#1ED6FF", "#97C1FF"]);

  async function handleSearch() {
    const response = await api.get(`/weather?key=${key}&city_name=${input}`);
    if (response.data.by == "default") {
      setError("humm, cidade não encontrada");
      setInput("");
      setCity(null);
      Keyboard.dismiss();
      return;
    }
    setCity(response.data);
    response.data.results.currently == "noite" &&
      setBackground(["#0c3741", "#0f2f61"]);
    setIcon(condition(response.data.results.condition_slug));
    setInput("");
    Keyboard.dismiss();
  }

  if (city) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={32} color="#000" />
          <Text style={{ fontSize: 22 }}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            value={input}
            onChangeText={(valor) => {
              setInput(valor);
            }}
            placeholder="Ex: Rio de Janeiro, RJ"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.icon}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <LinearGradient
              colors={["#1ed6ff", "#97c1ff"]}
              style={styles.modalView}
            >
              <Header background={background} weather={city} icon={icon} />
              <View style={styles.infos}>
                <Conditions weather={city} />

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  contentContainerStyle={{ paddingBottom: "5%" }}
                  style={styles.list}
                  data={city.results.forecast}
                  keyExtractor={(item) => item.date}
                  renderItem={({ item }) => <Forecast data={item} />}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons name="close-outline" color="#ddd" size={36} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <LinearGradient style={styles.header} colors={["#1ed6ff", "#97c1ff"]}>
            <Text style={styles.date}>{city.results.date}</Text>
            <Text style={styles.city}>{city.results.city_name}</Text>
            <Ionicons name={icon.name} color="#fff" size={80} />
            <View>
              <Text style={styles.temp}>{city.results.temp}º</Text>
            </View>
            <Conditions weather={city} />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      >
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={{ fontSize: 22 }}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          value={input}
          onChangeText={(valor) => {
            setInput(valor);
          }}
          placeholder="Ex: Rio de Janeiro, RJ"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.icon}>
          <Feather name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      {error && <Text style={{ marginTop: 25, fontSize: 18 }}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: "#e8f0ff",
  },
  backButton: {
    flexDirection: "row",
    marginLeft: 15,
    alignSelf: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDD",
    width: "90%",
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },
  icon: {
    width: "15%",
    backgroundColor: "#1ed6ff",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  header: {
    marginTop: "5%",
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  date: {
    color: "#fff",
    fontSize: 16,
  },
  city: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    width: "90%",
    height: "85%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  infos: {
    width: 300,
    height: 270,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});
