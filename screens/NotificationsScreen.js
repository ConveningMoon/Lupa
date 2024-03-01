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

import { changeStatusRequest, createNewNotification, deleteRequestNotification, fetchAllNotifications, fetchUser, linkStudentWithSchool } from '../util/http';

import LoadingOverlay from '../components/LoadingOverlay';
import NotificationsStructure from '../components/NotificationsComponents/NotificationsStructure';
import LinkStudentWithGroup from '../components/ModalComponents/LinkStudentWithGroup';

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

    const [profileIsLoading, setProfileIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function getNotifications(){
        try {
            const response = await fetchAllNotifications(user.id);
            for (let notification in response) {
                if(response[notification].data.status === 2) {
                    response.splice(response.indexOf(notification));
                }
            }
            setNotificationsData(response);
            setProfileIsLoading(false);
        } catch {}
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
            'School': 'SchoolsInfo'
        };

        async function goToUser() {
            const response = await fetchUser(itemData.item.data.fromId)
            navigation.navigate(seeInfo[response.type], {
                student: response.data
            })
        }
        
        async function acceptRequest() {
            setUsernameStudentToLink(itemData.item.data.fromUsername);
            setIdStudentToLink(itemData.item.data.fromId);
            setNotificationId(itemData.item.id);
            setVisibleLinkStudent(true);
        }

        async function rejectRequest() {
            await deleteRequestNotification(itemData.item.id);
        }

        return (
            <NotificationsStructure
                type={itemData.item.data.type}
                fromUsername={itemData.item.data.fromUsername}
                onPressToUser = {goToUser}
                onPressToReject = {rejectRequest}
                onPressToAccept = {acceptRequest}
            />        
        );
    }

    async function addStudentToGroup() {
            await changeStatusRequest(notificationId, 2);
            await linkStudentWithSchool(idStudentToLink, user.id, groupToLink.value);
            await createNewNotification({
                type: 'requestToJoinAccepted',
                toId: idStudentToLink,
                fromId: user.id,
                toUsername: usernameStudentToLink,
                fromUsername: user.username,
                status: 1
            });
            setVisibleLinkStudent(false);
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getNotifications();
        setRefreshing(false);
    }, []);
    
    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
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