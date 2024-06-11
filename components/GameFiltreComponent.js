import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function GameFiltreComponent({ selectedValue, setSelectedValue, isCheckedTop, setCheckedTop, isCheckedBot, setCheckedBot}) {
    return (
        <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{flex:1}}>
                <Text>Catégorie</Text>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue, itemIndex)
                    } style={{width: '100%'}}>
                    <Picker.Item label="Toutes" value="toutes" />
                    <Picker.Item label="Combat" value="Combat" />
                    <Picker.Item label="Course" value="Voiture" />
                    <Picker.Item label="Aventure" value="Aventure" />
                    <Picker.Item label="Sport" value="Sport" />
                    <Picker.Item label="Action" value="Action" />
                    <Picker.Item label="FPS" value="FPS" />
                    <Picker.Item label="Survival" value="Surival" />
                </Picker>
            </View>
            
            <View>
                <Text>décroissant</Text><Checkbox
                    style={styles.checkbox}
                    value={isCheckedTop}
                    onValueChange={setCheckedTop}
                    color={isCheckedTop ? '#4630EB' : undefined}
                    />
                <Text>croissant</Text><Checkbox
                    style={styles.checkbox}
                    value={isCheckedBot}
                    onValueChange={setCheckedBot}
                    color={isCheckedBot ? '#4630EB' : undefined}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: 'center',
    },
});