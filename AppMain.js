import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getExpoHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost
  ];

  const hostValue = candidates.find(Boolean) ?? "";
  const host = hostValue.split(":")[0];
  return host || "localhost";
};

const getApiBaseUrl = (port) => {
  const host = getExpoHost();
  return `http://${host}:${port}`;
};

const API_BASE_URL = getApiBaseUrl(4101);

function MainApp() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => setError(`Failed to load products from ${API_BASE_URL}. Make sure node server.js is still running.`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>E-Commerce Store</Text>
        {loading ? <ActivityIndicator size="large" color="#0f766e" /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fdfa" },
  title: { fontSize: 28, fontWeight: "700", color: "#134e4a", padding: 20 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: "#ffffff", borderRadius: 18, padding: 14, marginBottom: 14 },
  image: { width: "100%", height: 180, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  price: { marginTop: 6, fontSize: 16, color: "#0f766e" },
  error: { color: "#b91c1c", paddingHorizontal: 20, marginBottom: 16 }
});

registerRootComponent(MainApp);

export default MainApp;
