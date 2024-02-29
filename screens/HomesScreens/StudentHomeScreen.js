import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,    
    Pressable
} from 'react-native';

import { useContext, useEffect, useState} from 'react';

import { useIsFocused } from '@react-navigation/native';

import { AuthContext } from '../../store/auth-context';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import Colors from '../../constants/colors';

import { MaterialIcons } from '@expo/vector-icons';

import {PARENTS, TEACHERS, GROUPS} from '../../data/dummy-data';

import { deleteRequestNotification, fetchRequestToJoin, fetchUser } from '../../util/http';

export default function StudentHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [userSchoolName, setUserSchoolName] = useState('');
    
    const [joinedSchool, setJoinedSchool] = useState(false);
    const [disabledRequest, setDisabledRequest] = useState(false);
    const [requestMessage, setRequestMessage] = useState('JOIN TO YOUR SCHOOL');

    const [profileIsLoading, setProfileIsLoading] = useState(true);
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

            setUserSchoolName(response.data.name);
        }

        if (isFocused) {            
            if (user.school !== '') {
                setJoinedSchool(true);
                findSchool(user.school);
                setProfileIsLoading(false);
            } else {
                checkRquestToJoin();
            }
        };
    },[isFocused])

    // const parents = PARENTS.filter(parent => 
    //     user.parents.includes(parent.id));

    function toShool() {
        navigation.navigate('Schools');
    }

    function toTeachers(){
        const filterTeachers = TEACHERS.filter(
            teacher => teacher.groups.includes(user.group)
        );

        navigation.navigate('Teachers',{
            filterTeachers: filterTeachers
        }); 
    }

    function toGroup(){
        const findGroup = GROUPS.find(group => group.name === user.group);
        
        navigation.navigate('GroupsInfo', {
            groupId: findGroup.id
        });
    }

    function renderParentsItem(itemData){    
        function pressHandler(){
            navigation.navigate('ParentsInfo',{
                user: itemData.item
            });
        }

        return (
            <Pressable onPress={pressHandler}>
                <Text style={styles.userParents}>{itemData.item.name}      </Text>
            </Pressable>
        );
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
                    <Text style={styles.usernameText}>{userSchoolName}</Text>

                </View>
                {/* <Pressable onPress={toGroup}>
                    <Text style={styles.userGroup}>{user.group}</Text>
                </Pressable> */}
            </View>

            {/* <View style={styles.parentsContainer}>
                <Text style={styles.parentsText}>Parents:   </Text>
                <FlatList
                    data={parents}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={renderParentsItem}
                />
            </View> */}
            {!joinedSchool &&
                <View style={styles.joinSchoolContainer}>
                    <Pressable
                        style={styles.joinSchoolPressableContainer}
                        onPress={toShool}
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
                        text='MY TEACHERS'
                        onPressGeneral={toTeachers}
                    /> 
                    <ButtonInfoInput 
                        text='GRADES'
                        //onPressGeneral={searchTeachers}
                    />
                    <ButtonInfoInput 
                        text='SUBJECTS'
                        //onPressGeneral={searchTeachers}
                    />
                    <ButtonInfoInput
                        text='SHEDULE'
                        //onPressGeneral={searchTeachers}
                    />
                    <ButtonInfoInput
                        text='FEEDBACK'
                        //onPressGeneral={searchTeachers}
                    />
                    
                </View>
            }
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: Colors.gray_placeholder
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