import { 
    View, 
    Text,
    Pressable,
    StyleSheet,
    Alert
} from 'react-native';

import { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/colors';

export default function NotificationsStructure(props) {
    //Add more possible options for types notifications
    const notificationMessage = {
        'studentJoinSchool' : ['New join request!', ' wants to join to your school'],
    };

    function alertToReject() {
        Alert.alert('Reject an student?', `Are you sure you want to reject the request from ${props.fromUsername} to join to your school?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', 
                onPress: props.onPressToReject
            }
        ]);
    }

    function alertToAccept() {
        Alert.alert('Accept an student?', `Are you sure you want to accept ${props.fromUsername} as student from your school?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', 
                onPress: props.onPressToAccept
            }
        ]);
    }

    return (
        <View style={styles.globalContainer}>
            <Pressable
                style={styles.pressableContainer}
                disabled={props.type === 'studentJoinSchool'? true : false}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.textType}>
                        {notificationMessage[props.type][0]}
                    </Text>
                    <View style={styles.contentContainer}>
                        <Pressable
                            onPress={props.onPressToUser}
                        >
                            <Text style={styles.textStudentUsername}>
                                {props.fromUsername}
                            </Text>
                        </Pressable>
                        <Text style={styles.textContent}>
                            {notificationMessage[props.type][1]}
                        </Text>
                    </View>
                </View>
                {props.type === 'studentJoinSchool' &&
                    <View style={styles.buttonsContainer}>
                        <Pressable
                            onPress={alertToReject}
                        >
                            <AntDesign name="closesquare" size={40} color="red" />
                        </Pressable>
                        <Pressable
                            onPress={alertToAccept}
                        >
                             <AntDesign name="checksquare" size={40} color="green" />
                        </Pressable>
                    </View>
                }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
    },
    pressableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1
    },
    textType: {
        fontWeight: 'bold',
        fontSize: 20
    },
    contentContainer: {
        flexDirection: 'row'
    },
    textStudentUsername: {
        color: 'blue'
    },
    textContent: {
        fontSize: 15    
    },
    buttonsContainer: {
        flexDirection: 'row'
    }
});