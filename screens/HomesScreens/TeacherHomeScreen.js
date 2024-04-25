import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,    
    Pressable,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    Alert,
    Button
} from 'react-native';

import moment from 'moment-timezone';

import { useState, useEffect, useContext } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { AuthContext } from '../../store/auth-context';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';
import ButtonToClass from '../../components/ButtonComponents/ButtonToClass';
import DailyGrades from '../../components/ModalComponents/DailyGrades';

import Colors from '../../constants/colors';

import { MaterialIcons } from '@expo/vector-icons';

import { deleteRequestNotification, fetchRequestToJoin } from '../../util/request-http';
import { fetchUser } from '../../util/user-http';
import { checkClass, createNewClass, deleteClass, startClassStatus } from '../../util/class-http';

export default function StudentHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [teacherSchoolInfo, setTeacherSchoolInfo] = useState({name: 'MySchool'});
    
    const [joinedSchool, setJoinedSchool] = useState(false);
    const [disabledRequest, setDisabledRequest] = useState(false);
    const [requestMessage, setRequestMessage] = useState('JOIN TO YOUR SCHOOL');

    const [classData, setClassData] = useState();
    const [classCreated, setClassCreated] = useState(false);
    const [classStarted, setClassStarted] = useState(false);

    const [visibleGrades, setVisibleGrades] = useState(false);

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function checkRquestToJoin() {
            try {
                const response = await fetchRequestToJoin(user.id);

                if (response.data.status === 2) {
                    if(user.school !== '') {
                        setJoinedSchool(true);
                        await deleteRequestNotification(response.id);
                    }
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

            setTeacherSchoolInfo(response.data);
        }

        if (isFocused) {        
            refreshProfile();    
            if (user.school !== '') {
                setJoinedSchool(true);
                findSchool(user.school);
                checkRquestToJoin();
                checkClassStatus();
            } else {
                checkRquestToJoin();
            }
        };
    },[isFocused])

    async function checkClassStatus() {
        setProfileIsLoading(true);
        const response = await checkClass(user.id);

        if (response.existed) {
            setClassData(response.info);
            setClassCreated(true);      
            response.info.data.started ? setClassStarted(true) : setClassStarted(false);
            setProfileIsLoading(false);
        } else {
            setClassCreated(false);
            setProfileIsLoading(false);
        }                       
    }

    function schoolOptions() {
        navigation.navigate('Schools');
    }

    function toGroups() {
        navigation.navigate('Groups', {
            fromSchool: false,
            fromTeacher: true,
            idGroups: user.groups
        });
    }

    function toSchool() {
        navigation.navigate('SchoolsInfo', {
            user: teacherSchoolInfo
        });
    }

    async function refreshProfile() {
        setRefreshing(true);
        try {
            const response = await fetchUser(user.id); 
            
            for (let key in response.data) {
                if(key === 'groups') {
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

    function createClassHandler() {
        setProfileIsLoading(true);

        const code = Math.random().toString(36).substring(2, 8);

        async function confirmNewClass() {
            const timeZone = moment.tz.guess(); 
            const currentTime = moment().tz(timeZone);
            const hours = currentTime.format('HH'); // Extracts hours in 24-hour format
            const minutes = currentTime.format('mm'); // Extracts minutes
            await createNewClass({code: code, teacherId: user.id, subject: user.subject, started: false, startedTime: {hour: hours, minutes: minutes}});
            setClassCreated(true);             
            checkClassStatus();
        }

        Alert.alert('CREATE NEW CLASS?', `Are you sure you want to create a new class?`, [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => setProfileIsLoading(false)
            },
            {
                text: 'Yes', onPress: confirmNewClass
            }
        ]);       
    }

    function startClassChandler() {
        setProfileIsLoading(true);

        async function confirmStartClass() {
            await startClassStatus(classData.id, {started: true});
            setClassStarted(true); 
            setProfileIsLoading(false);
        }

        Alert.alert('START THE CLASS?', `Are you sure you want to start the class?`, [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => setProfileIsLoading(false)
            },
            {
                text: 'Yes', onPress: confirmStartClass
            }
        ]);  

    }

    function finishClassHandler() {
        setProfileIsLoading(true);

        async function confirmFinishClass () {
            await deleteClass(classData.id);
            checkClassStatus();
            setClassStarted(false);
            setClassCreated(false);
            setProfileIsLoading(false);

            setVisibleGrades(true);
        }

        Alert.alert('FINISH THE CLASS?', `Are you sure you want to finish the class?`, [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => setProfileIsLoading(false)
            },
            {
                text: 'Yes', onPress: confirmFinishClass
            }
        ]); 

    }

    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (
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
                            <Text style={styles.schoolText}>{teacherSchoolInfo.name}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <DailyGrades
                visible={visibleGrades}
                groupsIds={user.groups}
                subject={user.subject}
                onUpload={() => setVisibleGrades(false)}
            />
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
                        text='GROUPS'
                        onPressGeneral={toGroups}
                    />                                                      
                </View>
            }
            {joinedSchool && !classCreated &&
                <ButtonToClass
                    text='CREATE A CLASS'
                    onPressGeneral={createClassHandler}
                    colors={[Colors.color_lightGreen, Colors.color_darkBlue]}
                    start={{x: 0, y: 0}}
                />
            }
            {joinedSchool && classCreated && !classStarted &&
                <ButtonToClass
                    text='START THE CLASS'
                    onPressGeneral={startClassChandler}
                    colors={[Colors.color_darkGreen, Colors.color_darkBlue]}
                    start={{x: 1, y: 1}}
                />
            }
            {joinedSchool && classCreated && classStarted &&
                <ButtonToClass
                    text='FINISH THE CLASS'
                    onPressGeneral={finishClassHandler}
                    colors={[Colors.bg_red, Colors.error_red]}
                    start={{x: 1, y: 1}}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10,
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
    allButtonsContainer: {
        paddingTop: 30,
        flex: 1,
        alignItems: 'center'
    },
});