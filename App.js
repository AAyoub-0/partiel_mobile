import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Modal, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import GameListComponent from './components/GameListComponent';
import GameFiltreComponent from './components/GameFiltreComponent';

import Games from './datas/Games'; 

export default function App() {
  const newJeu = {
    name: '',
    price: '',
    catégorie: '',
    id: Math.random(),
    image: ''
  };
  const [showModal, setShowModal] = useState(false);
  const [games, setGames] = useState(Games);
  const [jeu, setJeu] = useState(newJeu);
  const [image, setImage] = useState(null);

  const [selectedValue, setSelectedValue] = useState("Combat");
  const [isCheckedTop, setCheckedTop] = useState(false);
  const [isCheckedBot, setCheckedBot] = useState(false);

  const addJeu = () => {
    setGames([...games, jeu]);
    setJeu(newJeu);
    setShowModal(false);
  };

  const jeuChanged = (key, value) => {
    setJeu({ ...jeu, [key]: value });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      jeuChanged('image', result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.App}>
      <View style={styles.AppBar}>
        <Image source={require('./assets/logo.png')} style={{ width: 50, height: 50, borderRadius: 50 }} />
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>Xxx_AyoubLeBoss_xxX</Text>
      </View>

      <View style={styles.container}>
        <Text style={{ marginTop: 10, fontSize: 26 }}> Ajouter vos jeux préférer !</Text>

        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.button}>
          <Text style={{ color: 'white' }}>Ajouter un jeu</Text>
        </TouchableOpacity>

        <GameFiltreComponent selectedValue={selectedValue} setSelectedValue={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          if(itemValue === 'toutes') return setGames(Games);
          setGames([...Games].filter(game => game.catégorie.toLowerCase().includes(itemValue.toLowerCase())));
        }}
            isCheckedTop={isCheckedTop} setCheckedTop={_ => {
              setCheckedTop(!isCheckedTop);
              if(isCheckedBot) setCheckedBot(false);
              setGames([...games].sort((a, b) => isCheckedTop ? a.price - b.price : b.price - a.price));
            }}
            isCheckedBot={isCheckedBot} setCheckedBot={_ => {
              setCheckedBot(!isCheckedBot);
              if(isCheckedTop) setCheckedTop(false);
              setGames([...games].sort((a, b) => isCheckedBot ? b.price - a.price : a.price - b.price));
          
            }} />

        <GameListComponent games={games} gameDelete={(id) => {
          setGames([...games].filter(game => game.id !== id));
        }} />
      </View>
      
      <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Nom du jeu"
              value={jeu.name}
              onChangeText={(text) => jeuChanged('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Prix du jeu"
              value={jeu.price}
              onChangeText={(text) => jeuChanged('price', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Catégorie du jeu"
              value={jeu.catégorie}
              onChangeText={(text) => jeuChanged('catégorie', text)}
            />
            <Button title="Choisissez une image dans votre galerie" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{width: 50, height: 50}} />}
            <TouchableOpacity style={styles.button} onPress={() =>{
              addJeu();
              console.log('Nouveau jeu:', jeu);
              }} >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>Ajouter   
                </Text>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
            <Button title="Annuler" onPress={() => {
              setShowModal(false)
              setJeu(newJeu);
              }} />
          </View>
        </View>
      </Modal>

      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  App: {
    zIndex: 0,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'start'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  AppBar: {
    backgroundColor: '#1F82AB',
    height: 120,
    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    padding: 10,
    backgroundColor: '#0066FF99',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
  },
});
