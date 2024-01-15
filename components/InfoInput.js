import {
    View, 
    StyleSheet, 
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useState, useEffect } from 'react';

import Colors from '../constants/colors';

function InfoInput(props){
    const [inputText, setInputText] = useState('');

    function inputHandler(inputEnteredText){
        setInputText(inputEnteredText);
        props.onSaveInfo(inputText);        
    }

    // useEffect(() => {
    //     console.log(inputText);
    // }, [inputText]);

    return(
        <View style={styles.infoContainer}>    
            <View style={styles.logoIco}>
                <Ionicons
                    name={props.name}
                    size={30}
                    color={Colors.color_lightGreen}
                />     
            </View>               
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={props.color}
                style={styles.infoInput}
                value={inputText}
                onChangeText={inputHandler}                
            />
        </View>
    );
}


export default InfoInput;

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },    
    logoIco: {
        paddingRight: 10
    },
    infoInput: {
        width: '90%',
        borderWidth: 2,
        borderColor: Colors.color_lightGreen,
        paddingLeft: 10,
        height: 30
    }
});