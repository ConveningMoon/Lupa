import { View, Text, StyleSheet, Modal } from 'react-native'

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import ButtonInfoInput from './ButtonInfoInput';
import MicroPressText from './MicroPressText';

export default function TypeUser(props) {
    const navigation = useNavigation();

    function toSchoolRegister(){
        navigation.navigate('NewRegisterSchool');
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <ButtonInfoInput text='Student'/>
                <ButtonInfoInput text='Teacher'/>
                <ButtonInfoInput text='School' onPressGeneral={toSchoolRegister}/>
                <ButtonInfoInput text='Parent'/>
                <View style={styles.backContainer}>
                    <MicroPressText text='Back' onNewPress={props.onBack}/>
                </View>                
            </View>            
        </Modal>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backContainer: {
        paddingTop: 50
    }
});