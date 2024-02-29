import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useContext, useState, useLayoutEffect, useEffect} from 'react';

import { AuthContext } from '../../store/auth-context';

import { Entypo } from '@expo/vector-icons';

import Colors from '../../constants/colors';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay'; 

import { GROUPS, STUDENTS, TEACHERS } from '../../data/dummy-data';

import { useIsFocused } from '@react-navigation/native';
import { fetchAllNotifications } from '../../util/http';

export default function SchoolHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    // const [profileIsLoading, setProfileIsLoading] = useState(true);
    const isFocused = useIsFocused();

    // useLayoutEffect (() => {
        // navigation.setOptions({
        //     title: 'Users name'
        // });

    // },[]);

    // useEffect(() => {
        
    // },[isFocused])

    function toGroups(){
        navigation.navigate('Groups');
    }

    function toStudents(){
        const filterStudents = STUDENTS.filter(
            student => student.school === user.id
        );

        navigation.navigate('Students', {
            filterStudents: filterStudents
        });
    }

    function toTeachers(){
        const filterTeachers = TEACHERS.filter(
            teacher => teacher.school.includes(user.id)
        );    

        navigation.navigate('Teachers',{
            filterTeachers: filterTeachers
        });
    }

    function toSubjects(){
        navigation.navigate('Subjects');
    }

    // if (profileIsLoading) {
    //     return <LoadingOverlay message="Loading information..." />;
    // }

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.saveAreaContainer}>                   
                <View style={styles.generalContainer}>
                    <ScrollView> 
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
                            <Text style={styles.contactText}>Contact: {user.emailContact}</Text>
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
                    </ScrollView>              
                </View>                                              
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    saveAreaContainer: {
        flex: 1,
        marginTop: Platform.OS === 'android'? 15 : 0
    },
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