import { 
    View, 
    Text, 
    StyleSheet, 
    Pressable,
    Alert
} from 'react-native';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import Colors from '../../constants/colors';

import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { fetchGroupInfo } from '../../util/group-http';
import { fetchUser } from '../../util/user-http';
import { unlinkStudentWithParent, unlinkStudentWithSchool } from '../../util/request-http';

import { AuthContext } from '../../store/auth-context';

export default function StudentsInfoScreen({navigation, route}) { 
    const authCtx = useContext(AuthContext);

    const student = route.params.user;

    const [studentSchoolInfo, setStudentSchoolInfo] = useState({name: 'No School'});
    const [studentGroupInfo, setStudentGroupInfo] = useState({data: {name: 'No Group'}});

    const [checkParentUser, setCheckParentUser] = useState(false);

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const isFocused = useIsFocused();

    useLayoutEffect (() => {
        navigation.setOptions({
            title: `Information of ${student.name}`
        });

    },[]);

    useEffect(() => {
        async function initialData () {
            if(isFocused) {
                if(student.school !== '') {
                    try {
                        const responseSchool = await fetchUser(student.school);
                        const responseGroup = await fetchGroupInfo(student.group);

                        setStudentSchoolInfo(responseSchool.data);
                        setStudentGroupInfo(responseGroup);

                        setProfileIsLoading(false);
                    } catch {
                        setProfileIsLoading(false);
                    }
                }
                if(authCtx.infoUser.type === 'Parent' && authCtx.infoUser.data.students.includes(student.id)) {
                    setCheckParentUser(true);
                }
            }    
        }    
        initialData();
    }, [isFocused])


    async function unlinkChildFromParent() {
        Alert.alert('Remove this child?', `Are you sure to unlink ${student.name} from your kids?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {
                    await unlinkStudentWithParent(student.id, authCtx.infoUser.data.id);
                    
                    Alert.alert('Remove child', 'Please, login again to save the changes.');
                    navigation.navigate("Login");
                }

            }
        ]);
    }

    function unlinkStudentFromSchool() {
        Alert.alert('Remove this student?', `Are you sure to delete the student ${student.name} from your school?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {
                    await unlinkStudentWithSchool(student.id);

                    Alert.alert('Remove student', 'Please, login again to save the changes.');
                    navigation.navigate("Login");
                }

            }
        ]);
    }

    function toGroup(){
        navigation.navigate('GroupsInfo', {
            group: studentGroupInfo
        });
    }

    function toSchool() {
        
    }

    function displayParents() {
        navigation.navigate('Parents', {
            id: student.id
        });
    }

    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.topInfoContainer}>
                <View style={styles.nameUsernameContainer}>
                    <Text style={styles.userName}>{student.name}</Text>
                    <Text style={styles.usernameText}>{student.username}</Text>
                    <Text style={styles.emailText}>Contact: {student.emailContact}</Text>
                    <View style={styles.schoolContainer}>
                        <Text 
                            style={{
                                fontSize: 20,
                                color: Colors.color_darkGreen
                            }}
                        >
                            School: 
                        </Text>
                        <Pressable onPress={toSchool} disabled={!student.school}>
                            <Text style={styles.schoolText}>{studentSchoolInfo.name}</Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable onPress={toGroup} disabled={!student.group}>
                    <Text style={styles.userGroup}>{studentGroupInfo.data.name}</Text>
                </Pressable>
            </View>
            {checkParentUser &&
                <Pressable
                    style={styles.deleteStudentPressableContainer}
                    onPress={unlinkChildFromParent}
                >
                    <MaterialCommunityIcons name="account-minus" size={24} color={Colors.error_red}/>
                    <Text style={styles.deleteStudentText}>  Unlink from my kids</Text>
                </Pressable>
            }
            {authCtx.infoUser.type === 'School' &&
                <Pressable
                    style={styles.deleteStudentPressableContainer}
                    onPress={unlinkStudentFromSchool}
                >
                    <MaterialCommunityIcons name="account-minus" size={24} color={Colors.error_red}/>
                    <Text style={styles.deleteStudentText}>  Unlink from the school</Text>
                </Pressable>
            }
            <View style={styles.allButtonsContainer}> 
                <ButtonInfoInput 
                    text='REPORTS'
                    //onPressGeneral={searchTeachers}
                />
                {/* <ButtonInfoInput
                    text='SHEDULE'
                    //onPressGeneral={searchTeachers}
                /> */}
                <ButtonInfoInput 
                    text='PARENTS'
                    onPressGeneral={displayParents}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
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
        color: Colors.color_darkBlue
    },
    textStudentParents: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold'
    },
    allButtonsContainer: {
        paddingTop: 30,
    },
    deleteStudentPressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
        alignSelf: 'flex-start'
    },
    deleteStudentText: {
        color: Colors.error_red
    },
});