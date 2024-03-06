import { 
    View, 
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Alert
} from 'react-native';

import { useContext, useEffect, useState, useCallback } from 'react';

import { AuthContext } from '../store/auth-context';

import { useIsFocused } from '@react-navigation/native';

import { changeStatusRequest, createNewNotification, deleteRequestNotification, fetchAllNotifications, fetchUser, linkStudentWithParent, linkStudentWithSchool, linkTeacherWithSchool } from '../util/http';

import LoadingOverlay from '../components/LoadingOverlay';
import NotificationsStructure from '../components/NotificationsComponents/NotificationsStructure';
import LinkStudentWithGroup from '../components/ModalComponents/LinkStudentWithGroup';
import LinkTeacherWithGroups from '../components/ModalComponents/LinkTeacherWithGroups';

export default function NotificationsScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const isFocused = useIsFocused();

    const [notificationData, setNotificationsData] = useState();
    const [notificationId, setNotificationId] = useState('');

    const [usernameStudentToLink, setUsernameStudentToLink] = useState('');
    const [idStudentToLink, setIdStudentToLink] = useState('');
    const [groupToLink, setGroupToLink] = useState();
    const [visibleLinkStudent, setVisibleLinkStudent] = useState(false);

    const [usernameTeacherToLink, setUsernameTeacherToLink] = useState('');
    const [idTeacherToLink, setIdTeacherToLink] = useState('');
    const [groupsToLink, setGroupsToLink] = useState();
    const [visibleLinkTeacher, setVisibleLinkTeacher] = useState(false);

    const [profileIsLoading, setProfileIsLoading] = useState(false);
    const [addingNewStudent, setAddingNewStudent] = useState(false);
    const [addingNewTeacher, setAddingNewTeacher] = useState(false);
    const [addingNewParent, setAddingNewParent] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function getNotifications(){
        setRefreshing(true);
        try {
            const response = await fetchAllNotifications(user.id);
            const filterResponse = [];
            for (let notification in response) {
                if(response[notification].data.status !== 2) {
                    filterResponse.push(response[notification]);
                }
            }
            setNotificationsData(filterResponse);
            setProfileIsLoading(false);
            setRefreshing(false);
        } catch {setRefreshing(false);}
    }

    useEffect(() => {
        getNotifications();
    },[isFocused])

    function renderNotificationItem(itemData) {
        // function pressHandler() {
        //  
        // }

        const seeInfo = {
            'Student': 'StudentsInfo',
            'School': 'SchoolsInfo',
            'Teacher': 'TeachersInfo'
        };

        async function goToUser() {
            setProfileIsLoading(true);
            const response = await fetchUser(itemData.item.data.fromId)
            navigation.navigate(seeInfo[response.type], {
                user: response.data
            })
            //setProfileIsLoading(false);
        }
        
        async function acceptRequestToJoin() {
            if (itemData.item.data.fromType === 'Student') {
                setUsernameStudentToLink(itemData.item.data.fromUsername);
                setIdStudentToLink(itemData.item.data.fromId);
                setNotificationId(itemData.item.id);
                setVisibleLinkStudent(true);
            }
            if (itemData.item.data.fromType === 'Teacher') {
                setUsernameTeacherToLink(itemData.item.data.fromUsername);
                setIdTeacherToLink(itemData.item.data.fromId);
                setNotificationId(itemData.item.id);
                setVisibleLinkTeacher(true);
            }
        }

        async function acceptRequestToAdd() {
            setAddingNewParent(true);
            await changeStatusRequest(itemData.item.id, 2);
            await linkStudentWithParent(itemData.item.data.toId, itemData.item.data.fromId);
            await createNewNotification({
                type: 'requestToAddAccepted',
                toId: itemData.item.data.fromId,
                fromId: itemData.item.data.toId,
                toUsername: itemData.item.data.fromUsername,
                fromUsername: itemData.item.data.toUsername,
                fromType: authCtx.infoUser.type,
                status: 1
            });
            getNotifications();
            setAddingNewParent(false);
            
        }

        async function rejectRequest() {
            await deleteRequestNotification(itemData.item.id);
            getNotifications();
        }

        return (
            <NotificationsStructure
                type={itemData.item.data.type}
                fromUsername={itemData.item.data.fromUsername}
                onPressToUser = {goToUser}
                onPressToReject = {rejectRequest}
                onPressToAcceptToJoin = {acceptRequestToJoin}
                onPressToAcceptToAdd = {acceptRequestToAdd}
            />        
        );
    }

    async function addStudentToGroup() {
        setAddingNewStudent(true);
        await changeStatusRequest(notificationId, 2);
        await linkStudentWithSchool(idStudentToLink, user.id, groupToLink.value);
        await createNewNotification({
            type: 'requestToJoinAccepted',
            toId: idStudentToLink,
            fromId: user.id,
            toUsername: usernameStudentToLink,
            fromUsername: user.username,
            fromType: authCtx.infoUser.type,
            status: 1
        });
        setVisibleLinkStudent(false);
        getNotifications();
        setAddingNewStudent(false);
    }

    async function addTeacherToGroups() {
        setAddingNewTeacher(true);
        await changeStatusRequest(notificationId, 2);
        await linkTeacherWithSchool(idTeacherToLink, user.id, groupsToLink.map(item => item.value));
        await createNewNotification({
            type: 'requestToJoinAccepted',
            toId: idTeacherToLink,
            fromId: user.id,
            toUsername: usernameTeacherToLink,
            fromUsername: user.username,
            fromType: authCtx.infoUser.type,
            status: 1
        });
        setVisibleLinkTeacher(false);
        getNotifications();
        setAddingNewTeacher(false);
    }

    function alertToLinkStudent() {
        Alert.alert('Add a new student?', `Are you sure to add ${usernameStudentToLink} in the group ${groupToLink.label} ?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => addStudentToGroup()
            }
        ]);
    }

    function alertToLinkTeacher() {
        Alert.alert('Add a new teacher?', `Are you sure to add ${usernameTeacherToLink} in the groups ${groupsToLink.map(item => item.label).join(', ')} ?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => addTeacherToGroups()
            }
        ]);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getNotifications();
        setRefreshing(false);
    }, []);
    
    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    if (addingNewStudent) {
        return <LoadingOverlay message="Adding a new student..." />;
    }

    if (addingNewTeacher) {
        return <LoadingOverlay message="Adding a new teacher..." />;
    }

    if (addingNewParent) {
        return <LoadingOverlay message="Adding a new parent..." />;
    }


    return (
        <View style={styles.globalContainer}>   
            <LinkStudentWithGroup
                visible={visibleLinkStudent}
                onBack={() => setVisibleLinkStudent(false)}
                onAdd={alertToLinkStudent}
                onSelectItem={setGroupToLink}
                idSchool={user.id}
            />
            <LinkTeacherWithGroups
                visible={visibleLinkTeacher}
                onBack={() => setVisibleLinkTeacher(false)}
                onAdd={alertToLinkTeacher}
                onSelectItem={setGroupsToLink}
                idSchool={user.id}
            /> 
            {/* Add new element LinkParentToStudent */}
            <FlatList
                data={notificationData}
                renderItem={renderNotificationItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>  
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1
    }
});