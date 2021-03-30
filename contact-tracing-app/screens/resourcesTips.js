import * as React from 'react';
import styles from './styles/resourcesTips.style.js';
import {
    Text,
    View,
    Stylesheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
var generalText = "COVID-19 has significanlty impacted  the world. "
            + "Many countries accross the world have taken drastic measures to battle this virus such as closing down public attractions and mandating masks. "
            + "Together we can all do our part and help end this pandemic by following some recomended tips and guidlines recommended by the CDC.";

const ResourcesTips = ({navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.formContainer}>
            <Text style={styles.generalText}>{generalText}</Text>   
                <Text style={styles.tips}>Getting Vaccinated</Text>
                </View>
        </View>
    );
}
export default ResourcesTips;