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
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
var generalText = "COVID-19 has significanlty impacted  the world. "
            + "Many countries accross the world have taken drastic measures to battle this virus such as closing down public attractions and mandating masks. "
            + "Together we can all do our part and help end this pandemic by following some recomended tips and guidlines recommended by the CDC.";

const ResourcesTips = ({navigation}) => {
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            <View style={styles.formContainer}>
                <Text style={styles.generalText}>{generalText}</Text>   
                <Unorderedlist>
                    <Text style={{padding: 10, color: 'black',}}>Be sure to get vaccinated</Text> 
                </Unorderedlist>
            </View>
        </View>
    );
}
export default ResourcesTips;
