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

import { changeStatusRequest, fetchAllNotifications, linkStudentWithSchool } from '../util/http';

import LoadingOverlay from '../components/LoadingOverlay';
import NotificationsStructure from '../components/NotificationsComponents/NotificationsStructure';
import LinkStudentWithGroup from '../components/ModalComponents/LinkStudentWithGroup';

export default function NotificationsScreen() {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const isFocused = useIsFocused();

    const [notificationData, setNotificationsData] = useState();
    const [notificationId, setNotificationId] = useState('');

    const [usernameStudentToLink, setUsernameStudentToLink] = useState('');
    const [idStudentToLink, setIdStudentToLink] = useState('');
    const [nameGroupToLink, setNameGroupToLink] = useState('');
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

        function goToUser() {
            console.log(itemData.item.data.fromId);
        }
        
        async function acceptRequest() {
            setUsernameStudentToLink(itemData.item.data.fromUsername);
            setIdStudentToLink(itemData.item.data.fromId);
            setNotificationId(itemData.item.id);
            setVisibleLinkStudent(true);
        }

        async function rejectRequest() {
            await changeStatusRequest(itemData.item.id, 0);
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
            await linkStudentWithSchool(idStudentToLink, user.id, nameGroupToLink);
            setVisibleLinkStudent(false);
    }

    function alertToLinkStudent() {
        Alert.alert('Add a new student?', `Are you sure to add ${usernameStudentToLink} in the group ${nameGroupToLink} ?`, [
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
                onChangeText={setNameGroupToLink}
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