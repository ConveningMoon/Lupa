import { 
    FlatList, 
    View,
    StyleSheet,
    RefreshControl
} from 'react-native';

import { useState, useEffect, useContext, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import LoadingOverlay from '../../components/LoadingOverlay';

import { fetchStudents } from '../../util/http';

import { AuthContext } from '../../store/auth-context';

export default function StudentsOptionsScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [filterStudents, setFilterStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundStudents, setFoundStudents] = useState([]);

    const [studentsAreLoading, setStudentsAreLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    async function initialStudentsData() {
        setRefreshing(true);
        try{
            const students = await fetchStudents(user.id, '');

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
    

    function renderStudentItem(itemData) {
        function pressHandler() {
          navigation.navigate('StudentsInfo', {
            group: itemData.item
          });
        }
    
        return (
            <TableOptions
                text={itemData.item.name}
                onPressGeneral={pressHandler}
            />          
        );
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