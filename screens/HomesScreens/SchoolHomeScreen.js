import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';

import { Entypo } from '@expo/vector-icons';

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonInfoInput';

import {SCHOOLS} from '../../data/dummy-data';

export default function SchoolHomeScreen({navigation, route}) {
    const user = route.params.user;
    //const name = route.params.name;

    // useLayoutEffect (() => {
        // navigation.setOptions({
        //     title: 'Users name'
        // });

    // },[]);

    function toGroups(){
        navigation.navigate('Groups');
    }

    function toStudents(){
        navigation.navigate('Students')
    }

    function toTeachers(){
        navigation.navigate('Teachers');
    }

    function toSubjects(){
        navigation.navigate('Subjects');
    }

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.generalContainer}>
                <View style={styles.generalContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.nameText}>{user.name}</Text>
                            <Text style={styles.usernameText}>{user.username}</Text>
                        </View>
                        <View style={styles.topRatingContainer}>
                            <Text style={styles.ratingText}>9.8</Text>
                            <Entypo name="star" size={24} color={Colors.color_lightGreen} />
                        </View>
                    </View> 
                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}>Contact: {user.email}</Text>
                        <Text style={styles.contactText}>Adress: {user.adress}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{user.description}</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        <ButtonInfoInput 
                            text='GROUPS' 
                            onPressGeneral={toGroups}
                        />
                        <ButtonInfoInput text='POST'/>
                        <ButtonInfoInput 
                            text='STUDENTS'
                            onPressGeneral={toStudents}
                        />
                        <ButtonInfoInput 
                            text='TEACHERS'
                            onPressGeneral={toTeachers}
                        />
                        <ButtonInfoInput 
                            text='SUBJECTS'
                            onPressGeneral={toSubjects}
                        />
                        <ButtonInfoInput text='FEEDBACKS'/>
                    </View>                      
                </View>                    
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.color_lightGreen,
    },
    usernameText: {
        fontStyle: 'italic',
        color: Colors.color_darkGreen
    },
    topContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    topTextContainer: {
        flex: 1
    },
    topRatingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    ratingText: {
        fontSize: 30,
        paddingRight: 5

    },
    descriptionContainer: {
        paddingTop: 20,
        padding: 10
    },
    descriptionText: {
        fontSize: 16
    },
    contactContainer: {
        flexDirection: 'row'
    },
    contactText: {
        paddingHorizontal: 10,
        fontSize: 12
    },
    optionsContainer: {
        padding: 10,
        alignItems: 'center'
    }
});