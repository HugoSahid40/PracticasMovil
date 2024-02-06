import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here
    // Example:
    if (username === 'usuario' && password === 'contraseña') {
      console.log('Login successful');
    } else {
      console.log('Incorrect credentials');
    }
  };

  const handleForgotPassword = () => {
    // Implement your logic for forgot password here
    console.log('Forgot Password clicked');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo2_bbva.jpg')} // Replace with BBVA logo image
        style={styles.logo}
      />
      <Text style={styles.title}>Hola</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="white" // Set the color of the placeholder text to white
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0D47A1', // BBVA blue background color
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    backgroundColor: '#0D47A1',
    color: 'white',
  },
  button: {
    backgroundColor: '#1565C0', // Lighter blue color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white', // BBVA blue color
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPassword: {
    color: 'white',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
