import { 
    FlatList,
    View,
    StyleSheet
} from 'react-native';

import { useState, useEffect } from 'react';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';

export default function TeachersOptionsScreen({navigation, route}) {
    const filterTeachers = route.params.filterTeachers;

    const [searchText, setSearchText] = useState('');
    const [foundTeachers, setFoundTeachers] = useState([]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchGroups = filterTeachers.filter(
                teacher => teacher.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundTeachers(searchGroups);
        } else {
            setFoundTeachers(filterTeachers);
        }

    }, [searchText]);

    function renderTeacherItem(itemData) {    
        function pressHandler() {
            navigation.navigate('TeachersInfo', {
                teacherInfo: itemData.item
            });
        }
    
        return (
            <TableOptions
                text={itemData.item.name}
                onPressGeneral={pressHandler}
            />          
        );
    }
    
    return (
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <FlatList
                data={foundTeachers}
                renderItem={renderTeacherItem}
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