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
        'requestToJoinAccepted' : ['Request to join accepted!', ' accepted your request to join this school'],
        'addNewStudent' : ['New request!',' requested to be your parent'],
        'requestToAddAccepted' : ['Request accepted!', ' accepted you as a parent'],
    };

    function alertToRejectToJoin() {
        Alert.alert('Reject a new user?', `Are you sure you want to reject the request from ${props.fromUsername} to join to your school?`, [
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

    function alertToAcceptToJoin() {
        Alert.alert('Accept a new user?', `Are you sure you want to accept ${props.fromUsername} as member from your school?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', 
                onPress: props.onPressToAcceptToJoin
            }
        ]);
    }

    function alertToRejectToAdd() {
        Alert.alert('Reject?', `Are you sure you want to reject the request from ${props.fromUsername} to be your parent?`, [
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

    function alertToAcceptToAdd() {
        Alert.alert('Accept?', `Are you sure you want to accept ${props.fromUsername} to be your parent?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', 
                onPress: props.onPressToAcceptToAdd
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
                            onPress={alertToRejectToJoin}
                        >
                            <AntDesign name="closesquare" size={40} color="red" />
                        </Pressable>
                        <Pressable
                            onPress={alertToAcceptToJoin}
                        >
                             <AntDesign name="checksquare" size={40} color="green" />
                        </Pressable>
                    </View>
                }
                { props.type === 'addNewStudent' &&
                    <View style={styles.buttonsContainer}>
                        <Pressable
                            onPress={alertToRejectToAdd}
                        >
                            <AntDesign name="closesquare" size={40} color="red" />
                        </Pressable>
                        <Pressable
                            onPress={alertToAcceptToAdd}
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