import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    Alert
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useContext, useState, useEffect} from 'react';

import { AuthContext } from '../../store/auth-context';

import Colors from '../../constants/colors';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay'; 

import { useIsFocused } from '@react-navigation/native';

import { fetchUser } from '../../util/user-http';

export default function SchoolHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [profileIsLoading, setProfileIsLoading] = useState(true);
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
        try {
            const response = await fetchUser(user.id); 
            
            for (let key in response.data) {
                if (key === 'subjects') {
                    if (JSON.stringify(response.data[key]) !== JSON.stringify(user[key])) {
                        Alert.alert('Something change!', 'Please login again to update your profile.');
                        authCtx.logout();
                        setProfileIsLoading(false);
                        return;
                    }
                } else {
                    if (response.data[key] !== user[key]) {
                        Alert.alert('Something change!', 'Please login again to update your profile.');
                        authCtx.logout();
                        setProfileIsLoading(false);
                        return;
                    }
                }
            }
            setProfileIsLoading(false);

        } catch (error){
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
                <View style={styles.generalContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.nameText}>{user.name}</Text>
                            <Text style={styles.usernameText}>{user.username}</Text>
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
                        <ButtonInfoInput 
                            text='SUBJECTS'
                            onPressGeneral={toSubjects}
                        />    
                        <ButtonInfoInput 
                            text='STUDENTS'
                            onPressGeneral={toStudents}
                        />
                        <ButtonInfoInput 
                            text='TEACHERS'
                            onPressGeneral={toTeachers}
                        />                    
                    </View>   
                </View>                                             
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    saveAreaContainer: {
        flex: 1
    },
    generalContainer: {
        flex: 1,
        padding: 10
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
        flexDirection: 'row'
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
        paddingVertical: 20,
    },
    descriptionText: {
        fontSize: 16
    },
    contactContainer: {
        flexDirection: 'row'
    },
    contactText: {
        paddingRight: 10,
        fontSize: 12
    },
    optionsContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center'
    }
});