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
    ScrollView
} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
var generalText = "COVID-19 has significanlty impacted  the world. "
            + "Many countries accross the world have taken drastic measures to battle this virus such as closing down public attractions and mandating masks. "
            + "Together we can all do our part and help end this pandemic by following some recomended tips and guidlines recommended by the CDC.";

var unorderedList1 = "Be sure to get vaccinated";
                   
var vanccinationText = "COVID-19 vaccines are the best way to combat the virus.";
var vanccinationText1 = "Once vaccinated you can begin to do the activities you stopped as a result of the pandemic";
var vanccinationText2 = "Check you local vaccination hub to see if you are elegible for a vacciantion";
var unorderedList2 = "Wear a mask when out in public";
var maskText = "Wear masks anytime when out in public";
var maskText1 = "Masks should be worn over the nose and mouth";
var maskText2 = "Make sure masks fit properly and snug around your face";
var unorderedList3 = "keep a social distance of at least 6ft";
var socialdistanceText = "Avoid being in close contact with those who are sick even in your own household";
var socialdistanceText1 = " when in public stay 6 feet apart from others even if they do not apear to be sick.";
var socialdistanceText2 = " People may be infected even if they are not currently experiencing symptoms";
var unorderedList4 = "Only go out if it is essential and practice tips mentioned above when doing so";
var goingoutText = "When out avoid large crowds";
var goingoutText1 = "Avoid poorly ventilated areas";
var disclaimerText = "The Resources and Tips is designed to give "
            + "advice to a user on how to keep themselves and others safe."
            + " Although following these tips is recommended it does not guarantee the user will not be infected."
            + " It is reccommended for a user to do more research or speak to a health care professional if they have"
            + " more concerns. More information about different tips and recommendations"
            +" or on COVID-19 can be found on the CDC's webiste at www.cdc.gov"; 


const ResourcesTips = ({navigation}) => {
    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.formContainer}>
                
                <View style={styles.textBox}>
                    <Text style={styles.generalText}>{generalText}</Text>  
                </View>  
                
                    <Text style={styles.unorderedText}>{unorderedList1}</Text>

                <Unorderedlist>
                <Text style={styles.unorderedText1}>{vanccinationText}</Text>
                </Unorderedlist>
                <Unorderedlist>
                <Text style={styles.unorderedText1}>{vanccinationText1}</Text>
                </Unorderedlist>
                <Unorderedlist>
                <Text style={styles.unorderedText1}>{vanccinationText2}</Text>
                </Unorderedlist>

                    <Text style={styles.unorderedText}>{unorderedList2}</Text>

                <Unorderedlist>
                <Text style={styles.unorderedText1}>{maskText}</Text>
                </Unorderedlist>
                <Unorderedlist>
                <Text style={styles.unorderedText1}>{maskText1}</Text>
                </Unorderedlist>
                <Unorderedlist>
                <Text style={styles.unorderedText1}>{maskText2}</Text>
                </Unorderedlist>

                    <Text style={styles.unorderedText}>{unorderedList3}</Text>

                <Unorderedlist>
                <Text style={styles.unorderedText1}>{socialdistanceText}</Text>
                </Unorderedlist>
                <Unorderedlist>
                <Text style={styles.unorderedText1}>{socialdistanceText1}</Text>
                </Unorderedlist>
                <Unorderedlist>
                <Text style={styles.unorderedText1}>{socialdistanceText2}</Text>
                </Unorderedlist>

                    <Text style={styles.unorderedText}>{unorderedList4}</Text>
                
                <Unorderedlist>
                    <Text style={styles.unorderedText1}>{goingoutText}</Text>
                </Unorderedlist>
                <Unorderedlist>
                    <Text style={styles.unorderedText1}>{goingoutText1}</Text>
                </Unorderedlist>
                    <View style={styles.disclaimerTextBox}>
                <Text style={styles.disclaimerTitleText}>
                    Disclaimer:
                </Text>
                <Text style={styles.disclaimerText}>{disclaimerText}
                </Text>
            </View>
           
            </View>
                
        </View>
        </ScrollView>
    );
}
export default ResourcesTips;
