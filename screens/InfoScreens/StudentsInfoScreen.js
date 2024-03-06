import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Pressable
} from 'react-native';

import { TEACHERS, PARENTS, GROUPS } from '../../data/dummy-data';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import Colors from '../../constants/colors';

import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { fetchGroupInfo, fetchUser } from '../../util/http';

export default function StudentsInfoScreen({navigation, route}) { 
    const student = route.params.user;

    const [studentSchoolInfo, setStudentSchoolInfo] = useState({name: 'No School'});
    const [studentGroupInfo, setStudentGroupInfo] = useState({data: {name: 'No Group'}});

    const [profileIsLoading, setProfileIsLoading] = useState(false);
    const isFocused = useIsFocused();

    async function findSchool(idSchool) {  
        const response = await fetchUser(idSchool);

        setStudentSchoolInfo(response.data);
        setProfileIsLoading(false);
    }

    async function findGroup(idGroup) {
        setProfileIsLoading(true);
        const response = await fetchGroupInfo(idGroup);
        
        setStudentGroupInfo(response);
    }

    useEffect(() => {
        if(isFocused) {
            if(student.school !== '') {
                findGroup(student.group);
                findSchool(student.school);
            } else {
                setProfileIsLoading(false);
            } 
        }
    }, [isFocused])

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

            <View style={styles.allButtonsContainer}>     
                <ButtonInfoInput 
                    text='GRADES'
                    //onPressGeneral={searchTeachers}
                />
                <ButtonInfoInput
                    text='SHEDULE'
                    //onPressGeneral={searchTeachers}

                />
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
        paddingTop: 30
    }
});