import { 
    FlatList, 
    View,
    StyleSheet,
    RefreshControl,
    Alert
} from 'react-native';

import { useState, useEffect, useCallback, useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import LoadingOverlay from '../../components/LoadingOverlay';
import SendRequestOptions from '../../components/DisplayOptionsToPressComponents/SendRequestOptions';

import { createNewNotification, fetchStudents } from '../../util/http';
import { AuthContext } from '../../store/auth-context';

export default function StudentsOptionsScreen({navigation, route}) {
    const authCtx = useContext(AuthContext);

    const [filterStudents, setFilterStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundStudents, setFoundStudents] = useState([]);

    const [studentsAreLoading, setStudentsAreLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    async function initialStudentsData() {
        setRefreshing(true);
        try{
            const students = await fetchStudents(route.params.id, route.params.fromSchool, route.params.fromGroup, route.params.fromParent, route.params.fromNewParent);

            setFilterStudents(students);
            setFoundStudents(students);

            setRefreshing(false);
            setStudentsAreLoading(false);
        } catch {
            setRefreshing(false);
            setStudentsAreLoading(false);
        }
        
    }

    useEffect(() => {
        if (isFocused) {
            initialStudentsData();
        }
    }, [isFocused]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchStudents = filterStudents.filter(
                student => student.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundStudents(searchStudents);
        } else {
            setFoundStudents(filterStudents);
        }

    }, [searchText]);
    
    async function addNewStudentNotification(data) {
        await createNewNotification(data);
        navigation.goBack();

    }

    function renderStudentItem(itemData) {
        function normalHandler() {
          navigation.navigate('StudentsInfo', {
            user: itemData.item
          });
        }

        function requestHandler() {
            Alert.alert('Add a new kid?', `Are you sure to request ${itemData.item.name} as your child?`, [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => addNewStudentNotification({
                        type: 'addNewStudent',
                        toId: itemData.item.id,
                        fromId: authCtx.infoUser.data.id,
                        toUsername: itemData.item.username,
                        fromUsername: authCtx.infoUser.data.username,
                        fromType: authCtx.infoUser.type,
                        status: 1.
                    })
                }
            ]);
        }
        
        if (route.params.fromSchool || route.params.fromGroup) {
            return (
                <TableOptions
                    text={itemData.item.name}
                    onPressGeneral={normalHandler}
                />          
            );
        }

        if (route.params.fromParent) {
            return (
                <TableOptions
                    text={itemData.item.name}
                    onPressGeneral={normalHandler}
                />          
            );
        }

        if (route.params.fromNewParent) {
            return (
                <SendRequestOptions
                    name={itemData.item.name}
                    username={itemData.item.username}
                    onPress={requestHandler}
                />        
            );
        }
    }

    const onRefresh = useCallback(() => {
        initialStudentsData();
    }, []);
    
    if (studentsAreLoading) {
        return <LoadingOverlay message="Loading your students..." />;
    }

    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <FlatList
                data={foundStudents}
                renderItem={renderStudentItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>  
    );
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
    }
});