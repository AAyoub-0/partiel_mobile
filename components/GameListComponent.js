import { ScrollView, StyleSheet, View } from "react-native";
import GameComponent from "./GameComponent";

export default function GameListComponent({ games }) {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ height: 20 }}></View>
            <View style={styles.container}>
                {games.map((game) => (
                    <GameComponent key={game.id} game={game} />
                ))}
            </View>
            <View style={{ height: 50 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 15,
        width: '100%',
        padding: 10,
    }
});