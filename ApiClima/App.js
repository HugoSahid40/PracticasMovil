import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';

const Clima = () => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch('https://api.weatherapi.com/v1/forecast.json?key=5a492ff34efa492b91a172441211110&q=huejutla&days=5&aqi=no&alerts=no&lang=es')
      .then(res => res.json())
      .then(obj => {
        setData(obj);
        setLoad(true);
      });
  }, []);

  const UScreen = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.loadingText}>Cargando datos...</Text>
    </View>
  );

  const Card = ({ fecha, icono, min, max }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardDate}>{fecha}</Text>
      <Image style={styles.weatherIcon} source={{ uri: 'https:' + icono }} />
      <Text style={styles.temperatureText}>{min}°C / {max}°C</Text>
    </View>
  );

  const LScreen = () => (
    <View style={styles.container}>
      <Text style={styles.locationText}>{data.location.name}</Text>
      <Text style={styles.currentTemperature}>{data.current.temp_c}°C</Text>
      <Text style={styles.weatherConditionText}>
        {data.current.condition.text} * {data.forecast.forecastday[0].day.maxtemp_c}°C / {data.forecast.forecastday[0].day.mintemp_c}°C
      </Text>

      <FlatList
        data={data.forecast.forecastday}
        renderItem={({ item }) => <Card max={item.day.maxtemp_c} fecha={item.date} min={item.day.mintemp_c} icono={item.day.condition.icon} />}
        horizontal
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Clima</Text>
      {load ? <LScreen /> : <UScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#3498db',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3498db',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currentTemperature: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  weatherConditionText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 16,
  },
  cardContainer: {
    marginRight: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  weatherIcon: {
    height: 50,
    width: 50,
    marginBottom: 8,
  },
  temperatureText: {
    fontSize: 14,
    color: '#3498db',
  },
  flatListContainer: {
    marginTop: 16,
  },
});

export default Clima;
