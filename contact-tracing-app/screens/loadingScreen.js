import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#f2f2f2'}}>
            <Image source={require("../assets/images/covid.png")} />
            <Text>Loading...</Text>
        </View>
    );
}

export default LoadingScreen;