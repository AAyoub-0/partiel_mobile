import { View, Image, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function GameComponent({ game }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.deleteButton}>
                <FontAwesome name="trash" size={24} color="white" />
            </TouchableOpacity>
            <Text>{game.name}</Text>
            <Image source={{ uri: game.image }} style={{ width: 120, height: 150 }} />
            <Text>{game.price} #{game.catégorie}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 160,
        padding: 10,
        alignItems: 'center',
        rowGap: 10,
        marginHorizontal: 10,
        backgroundColor: '#cacaca90',
        borderRadius: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: -12,
        right: -10,
        backgroundColor: '#ff0000',
        borderRadius: 10,
        padding: 5,
    },
});