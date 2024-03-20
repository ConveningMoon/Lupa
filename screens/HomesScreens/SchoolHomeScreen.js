import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform,
    RefreshControl,
    Alert
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useContext, useState, useEffect} from 'react';

import { AuthContext } from '../../store/auth-context';

import { Entypo } from '@expo/vector-icons';

import Colors from '../../constants/colors';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay'; 

import { useIsFocused } from '@react-navigation/native';

import { fetchUser } from '../../util/user-http';

export default function SchoolHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    // useLayoutEffect (() => {
        // navigation.setOptions({
        //     title: 'Users name'
        // });

    // },[]);

    useEffect(() => {
        if(isFocused) {
            refreshProfile();
        }
    }, [isFocused])

    function toGroups(){
        navigation.navigate('Groups', {
            fromSchool: true,
            fromTeacher: false,
            idGroups: []
        });
    }

    function toStudents(){
        navigation.navigate('Students', {
            id: user.id,
            fromSchool: true,
            fromGroup: false,
            fromParent: false,
            fromNewParent: false,
        });
    }

    function toTeachers(){
        navigation.navigate('Teachers', {
            id: user.id,
            fromSchool: true,
            fromGroup: false
        });
    }

    function toSubjects(){
        navigation.navigate('Subjects', {
            fromSchool: true
        });
    }

    async function refreshProfile() {
        setRefreshing(true);
        try {
            const response = await fetchUser(user.id); 
            
            for (let key in response.data) {
                if (key === 'subjects') {
                    if (JSON.stringify(response.data[key]) !== JSON.stringify(user[key])) {
                        Alert.alert('Something change!', 'Please login again to update your profile.');
                        authCtx.logout();
                        setRefreshing(false);
                        setProfileIsLoading(false);
                        return;
                    }
                } else {
                    if (response.data[key] !== user[key]) {
                        Alert.alert('Something change!', 'Please login again to update your profile.');
                        authCtx.logout();
                        setRefreshing(false);
                        setProfileIsLoading(false);
                        return;
                    }
                }
            }

            setRefreshing(false);
            setProfileIsLoading(false);

        } catch (error){
            setRefreshing(false);
            console.log(error);
        }                  
    }

    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.saveAreaContainer}>       
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshProfile} />
                    }                   
                >             
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
                    </View>    
                </ScrollView>                                           
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