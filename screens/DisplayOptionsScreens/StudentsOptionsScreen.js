import { 
    FlatList,
    View,
    StyleSheet
} from 'react-native';

import { useState, useEffect } from 'react';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';

export default function StudentsOptionsScreen({navigation, route}) {
    const filterStudents = route.params.filterStudents;

    const [searchText, setSearchText] = useState('');
    const [foundStudents, setFoundStudents] = useState([]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchGroups = filterStudents.filter(
                student => student.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundStudents(searchGroups);
        } else {
            setFoundStudents(filterStudents);
        }

    }, [searchText]);

    function renderStudentItem(itemData) {    
        function pressHandler() {
            navigation.navigate('StudentsInfo', {
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
    
    return (
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <FlatList
                data={foundStudents}
                renderItem={renderStudentItem}
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