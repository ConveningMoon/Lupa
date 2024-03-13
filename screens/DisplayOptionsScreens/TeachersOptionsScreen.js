import { 
    FlatList, 
    View,
    StyleSheet,
    RefreshControl
} from 'react-native';

import { useState, useEffect, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import LoadingOverlay from '../../components/LoadingOverlay';

import { fetchTeachers } from '../../util/teacher-http';

export default function TeachersOptionsScreen({navigation, route}) {
    const [filterTeachers, setFilterTeachers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundTeachers, setFoundTeachers] = useState([]);

    const [teachersAreLoading, setTeachersAreLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    async function initialTeachersData() {
        setRefreshing(true);
        try{
            const teachers = await fetchTeachers(route.params.id, route.params.fromSchool, route.params.fromGroup);

            setFilterTeachers(teachers);
            setFoundTeachers(teachers);

            setRefreshing(false);
            setTeachersAreLoading(false);
        } catch {
            setRefreshing(false);
            setTeachersAreLoading(false);
        }
        
    }

    useEffect(() => {
        if (isFocused) {
            initialTeachersData();
        }
    }, [isFocused]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchTeachers = filterTeachers.filter(
                teacher => teacher.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundTeachers(searchTeachers);
        } else {
            setFoundTeachers(filterTeachers);
        }

    }, [searchText]);
    

    function renderStudentItem(itemData) {
        function pressHandler() {
          navigation.navigate('TeachersInfo', {
            user: itemData.item
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
        initialTeachersData();
    }, []);
    
    if (teachersAreLoading) {
        return <LoadingOverlay message="Loading teachers..." />;
    }

    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <FlatList
                data={foundTeachers}
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