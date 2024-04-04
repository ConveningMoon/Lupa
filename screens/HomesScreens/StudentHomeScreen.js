import { 
    View, 
    Text, 
    StyleSheet,    
    Pressable,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';

import { useState, useEffect, useContext } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { AuthContext } from '../../store/auth-context';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import Colors from '../../constants/colors';

import { MaterialIcons } from '@expo/vector-icons';

import { deleteRequestNotification, fetchRequestToJoin } from '../../util/request-http';
import { fetchGroupInfo } from '../../util/group-http';
import { fetchUser } from '../../util/user-http';

export default function StudentHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [studentSchoolInfo, setStudentSchoolInfo] = useState({name: 'MySchool'});
    const [studentGroupInfo, setStudentGroupInfo] = useState({data: {name: 'MyGroup'}});
    
    const [joinedSchool, setJoinedSchool] = useState(false);
    const [disabledRequest, setDisabledRequest] = useState(false);
    const [requestMessage, setRequestMessage] = useState('JOIN TO YOUR SCHOOL');

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function checkRquestToJoin() {
            try {
                const response = await fetchRequestToJoin(user.id);

                if (response.data.status === 2) {
                    setJoinedSchool(true);
                    await deleteRequestNotification(response.id);
                } else if(response.data.status === 1){
                    setJoinedSchool(false);
                    setRequestMessage('YOUR REQUEST IS IN PROCESS...');
                    setDisabledRequest(true);
                } else {
                    await deleteRequestNotification(response.id);
                    setJoinedSchool(false);
                    setDisabledRequest(false);
                    setRequestMessage('JOIN TO YOUR SCHOOL')
                }

                setProfileIsLoading(false);

            } catch {
                setProfileIsLoading(false);
            }

        }

        async function findSchool(idSchool) {
            const response = await fetchUser(idSchool);

            setStudentSchoolInfo(response.data);
        }

        async function findGroup(idGroup) {
            const response = await fetchGroupInfo(idGroup);
            
            setStudentGroupInfo(response);
        }

        if (isFocused) {        
            refreshProfile();    
            if (user.school !== '') {
                setJoinedSchool(true);
                findSchool(user.school);
                findGroup(user.group);
                checkRquestToJoin();
            } else {
                checkRquestToJoin();
            }
        };
    },[isFocused])

    function schoolOptions() {
        navigation.navigate('Schools');
    }

    function displayMyParents() {
        navigation.navigate('Parents' ,{
            id: user.id
        });
    }

    function toSchool() {
        navigation.navigate('SchoolsInfo', {
            user: studentSchoolInfo
        });
    }

    function toGroup(){
        navigation.navigate('GroupsInfo', {
            group: studentGroupInfo
        });
    }

    function toReports() {  
        navigation.navigate('StudentReport', {
            student: authCtx.infoUser
        });

    }

    async function refreshProfile() {
        setRefreshing(true);
        try {
            const response = await fetchUser(user.id); 
            
            for (let key in response.data) {
                if(key === 'parents') {
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
                            <View style={styles.schoolContainer}>
                                <Text 
                                    style={{
                                        fontSize: 20,
                                        color: Colors.color_darkGreen
                                    }}
                                >
                                    School: 
                                </Text>
                                <Pressable onPress={toSchool} disabled={!joinedSchool}> 
                                    <Text style={styles.schoolText}>{studentSchoolInfo.name}</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Pressable onPress={toGroup} disabled={!joinedSchool}>
                            <Text style={styles.userGroup}>{studentGroupInfo.data.name}</Text>
                        </Pressable>
                    </View>
                    
                    {!joinedSchool &&
                        <View style={styles.joinSchoolContainer}>
                            <Pressable
                                style={styles.joinSchoolPressableContainer}
                                onPress={schoolOptions}
                                disabled={disabledRequest}
                            >
                                <MaterialIcons name="school" size={24} color={Colors.color_lightGreen} />
                                <Text style={styles.joinSchoolText}>
                                    {requestMessage}
                                </Text>
                            </Pressable>
                        </View>
                    }
                    {joinedSchool &&
                        <View style={styles.allButtonsContainer}>
                            <ButtonInfoInput 
                                text='REPORTS'
                                onPressGeneral={toReports}
                            />
                            {/* <ButtonInfoInput
                                text='SCHEDULE'
                                //onPressGeneral={searchTeachers}
                            />                   */}
                        </View>
                    }
                    { user.parents.length !== 0 &&
                        <View style={styles.parentsContainer}>
                            <ButtonInfoInput 
                                text='MY PARENTS'
                                onPressGeneral={displayMyParents}
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
        flexDirection: 'row'
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
    allButtonsContainer: {
        paddingTop: 30,
        alignItems: 'center' 
    },
});