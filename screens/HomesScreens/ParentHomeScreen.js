import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,    
    Pressable,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';

import { useState, useEffect, useContext, useCallback } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { AuthContext } from '../../store/auth-context';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import Colors from '../../constants/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {PARENTS, TEACHERS, GROUPS} from '../../data/dummy-data';

import { deleteRequestNotification, fetchGroupInfo, fetchRequestToAddStudent, fetchRequestToJoin, fetchUser } from '../../util/http';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';

export default function ParentHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;
    
    const [haveStudent, setHaveStudent] = useState(false);
    const [disabledRequest, setDisabledRequest] = useState(false);
    const [requestMessage, setRequestMessage] = useState('ADD NEW STUDENT');

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function checkRequestToAdd() {
            try {
                const response = await fetchRequestToAddStudent(user.id);

                if (response.data.status === 2) {
                    setHaveStudent(true);
                    await deleteRequestNotification(response.id);
                } else if(response.data.status === 1){
                    setHaveStudent(false);
                    setRequestMessage('YOUR REQUEST IS IN PROCESS...');
                    setDisabledRequest(true);
                } else {
                    await deleteRequestNotification(response.id);
                    setHaveStudent(false);
                    setDisabledRequest(false);
                    setRequestMessage('ADD NEW STUDENT')
                }

                setProfileIsLoading(false);

            } catch {
                setProfileIsLoading(false);
            }

        }

        if (isFocused) {        
            refreshProfile();    
            if (user.students.length !== 0) {
                setHaveStudent(true);
                checkRequestToAdd();
            } else {
                checkRequestToAdd();
            }
        };
    },[isFocused])

    function studentsOptions() {
        navigation.navigate('Students', {
            id: user.id,
            fromSchool: false,
            fromGroup: false,
            fromParent: false,
            fromNewParent: true
        });
    }

    function displayMyKids() {
        navigation.navigate('Students', {
            id: user.id,
            fromSchool: false,
            fromGroup: false,
            fromParent: true,
            fromNewParent: false
        });
    }

    async function refreshProfile() {
        setRefreshing(true);
        try {
            const response = await fetchUser(user.id); 
            
            for (let key in response.data) {
                if(key === 'students') {
                    if (JSON.stringify(response.data[key]) !== JSON.stringify(user[key])) {
                        Alert.alert('Something change!', 'Please login again to update your profile.');
                        authCtx.logout();
                        setRefreshing(false);
                        return;
                    }
                } else {
                    if (response.data[key] !== user[key]) {
                        Alert.alert('Something change!', 'Please login again to update your profile.');
                        authCtx.logout();
                        setRefreshing(false);
                        return;
                    }
                }
            }

            setRefreshing(false);

        } catch (error){
            setRefreshing(false);
            console.log(error);
        }                  
    }

    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (
        <SafeAreaView>
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshProfile} />
                }
            >
                <View style={styles.globalContainer}>
                    <View style={styles.topInfoContainer}>
                        <View style={styles.nameUsernameContainer}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.usernameText}>{user.username}</Text>
                            <Text style={styles.emailText}>Contact: {user.emailContact}</Text>
                        </View>
                    </View>
                    {!haveStudent &&
                        <View style={styles.joinSchoolContainer}>
                            <Pressable
                                style={styles.joinSchoolPressableContainer}
                                onPress={studentsOptions}
                                disabled={disabledRequest}
                            >
                                <MaterialCommunityIcons name="human-male-child" size={24} color={Colors.color_lightGreen}/>
                                <Text style={styles.joinSchoolText}>
                                    {requestMessage}
                                </Text>
                            </Pressable>
                        </View>
                    }                    
                    {haveStudent &&
                        <View style={styles.allButtonsContainer}>
                            <Pressable
                                style={styles.addNewChildrenPressableContainer}
                                onPress={studentsOptions}
                            >
                                <MaterialCommunityIcons name="account-plus" size={24} color={Colors.color_lightGreen}/>
                                <Text style={styles.addNewChildText}>ADD NEW CHILD</Text>
                            </Pressable>
                            <ButtonInfoInput 
                                text='MY KIDS'
                                onPressGeneral={displayMyKids}
                            />                
                        </View>
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10,
        paddingBottom: 500
    },
    topInfoContainer: {
        flexDirection: 'row',
    },
    nameUsernameContainer: {
        flex: 1
    },
    userName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    usernameText: {
        fontStyle: 'italic',
        color: Colors.color_darkGreen,
        paddingHorizontal: 10
    },
    emailText: {
        marginLeft: 10,
        paddingTop: 10,
        fontSize: 12,
        paddingBottom: 10
    },
    schoolContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    schoolText: {
        textDecorationLine: 'underline',
        color: Colors.color_darkGreen,
        fontSize: 20,
        paddingLeft: 5
    },
    userGroup: {
        color: Colors.color_darkBlue,
        fontSize: 20,
        fontWeight: '900',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    parentsContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    parentsText: {
        color: Colors.color_darkBlue,

    },
    userParents: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold'
    },
    joinSchoolContainer: {
        marginTop: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinSchoolPressableContainer: {
        flexDirection: 'row'
    },
    joinSchoolText: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 5
    },
    addNewChildrenPressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
        marginLeft: 10,
        alignSelf: 'flex-start'
    },
    addNewChildText: {
        color: Colors.color_lightGreen
    },
    allButtonsContainer: {
        alignItems: 'center' 
    },
});