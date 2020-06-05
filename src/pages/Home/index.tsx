import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backgroundImg from '../../assets/home-background.png'
import logoImg from '../../assets/logo.png';

import styles from './styles';

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground 
        source={backgroundImg} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={logoImg} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput 
            style={styles.input} 
            placeholder="Digite a UF" 
            value={uf}
            onChangeText={text => setUf(text)}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TextInput 
            style={styles.input} 
            placeholder="Digite a cidade" 
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
          />

          <RectButton 
            style={styles.button} 
            onPress={() => navigation.navigate('Points', { uf, city })}
          >
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default Home;

