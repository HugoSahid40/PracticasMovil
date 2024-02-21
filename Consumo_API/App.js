import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import md5 from 'md5';

const API_PUBLIC_KEY = '580c099727c9d8e88f8b9d68723fc35a';
const API_PRIVATE_KEY = 'da60ce26850341558309a3cfd787b32da12c7686';
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';

export default function App() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime().toString();
        const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY.replace('https://', ''));

        const comicsResponse = await fetch(
          `${API_BASE_URL}comics?apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}`
        );
        const comicsData = await comicsResponse.json();
        setComics(comicsData.data.results);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSection = (sectionTitle, sectionData) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <FlatList
        data={sectionData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comicContainer}>
            <Image
              style={styles.comicImage}
              source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
            />
            <Text style={styles.sectionItem}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Comics</Text>
      {loading ? (
        <Text>Cargando datos de la API de Marvel...</Text>
      ) : (
        <View>
          {renderSection('Comics', comics)}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD3D3',
    alignItems: 'center',  // Centra los elementos horizontalmente
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  comicContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  comicImage: {
    width: 150,
    height: 225,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
