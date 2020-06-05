import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import api from '../../services/api';

import styles from './styles';

interface Item {
  id: number;
  name: string;
  image_url: string;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    api.get('items')
      .then(response => {
        setItems(response.data);
      });
  }, []);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo,</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta!
        </Text>

        <View style={styles.mapContainer}>
          <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: -23.8323681,
              longitude: -46.812257,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <Marker 
              style={styles.mapMarker}
              onPress={() => navigation.navigate('Detail')}
              coordinate={{ 
                latitude: -23.8323681,
                longitude: -46.812257,
              }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image 
                  style={styles.mapMarkerImage} 
                  source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }} 
                />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
              
            </Marker>
          </MapView>
        </View>
        {/* <Text style={styles.description}>
          Selecione os itens de coleta
        </Text> */}
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity 
              key={String(item.id)} 
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]} 
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.5}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}  
        </ScrollView>
      </View>
    </>
  );
}

export default Points;