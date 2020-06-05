import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backgroundImg from '../../assets/home-background.png'
import logoImg from '../../assets/logo.png';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={backgroundImg} 
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={logoImg} />
        <Text style={styles.title}>
          Seu marketplace de coleta de resíduos
        </Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => navigation.navigate('Points')}>
          <View style={styles.buttonIcon}>
            <Feather name="arrow-right" color="#fff" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

export default Home;

