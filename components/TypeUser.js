import { View, Text, StyleSheet, Modal } from 'react-native'

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import ButtonInfoInput from './ButtonInfoInput';
import MicroPressText from './MicroPressText';

export default function TypeUser(props) {
    const navigation = useNavigation();

    function schoolRegister(){
        props.onSelect(false);
        props.value('School');
    }

    function teacherRegister(){
        props.onSelect(false);
        props.value('Teacher');
    }

    function parentRegister(){
        props.onSelect(false);
        props.value('Parent');
    }

    function studentRegister(){
        props.onSelect(false);
        props.value('Student');
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <ButtonInfoInput 
                    text='Student'
                    onPressGeneral={studentRegister}
                />

                <ButtonInfoInput 
                    text='Teacher'
                    onPressGeneral={teacherRegister}
                />

                <ButtonInfoInput 
                    text='School' 
                    onPressGeneral={schoolRegister}
                />
                <ButtonInfoInput 
                    text='Parent'
                    onPressGeneral={parentRegister}
                />

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