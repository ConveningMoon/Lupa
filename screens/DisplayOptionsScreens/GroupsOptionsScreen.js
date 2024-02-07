import { 
    FlatList, 
    View,
    StyleSheet
} from 'react-native';

import { useState, useEffect } from 'react';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';

import { GROUPS, STUDENTS, TEACHERS } from '../../data/dummy-data';

export default function GroupsOptionsScreen({navigation, route}) {
    const filterGroups = route.params.filterGroups;

    const [searchText, setSearchText] = useState('');
    const [foundGroups, setFoundGroups] = useState([]);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('tabPress', () => {
    //         const filterGroups = GROUPS.filter(
    //             group => group.school === user.id
    //         );
    //         console.log(filterGroups);
    //       navigation.navigate('Groups', { filterGroups: filterGroups });
    //     });
    
    //     return unsubscribe;
    // }, [navigation]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchGroups = filterGroups.filter(
                group => group.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundGroups(searchGroups);
        } else {
            setFoundGroups(filterGroups);
        }

    }, [searchText]);

    function renderGroupItem(itemData) {
        function pressHandler() {
          navigation.navigate('GroupsInfo', {
            groupId: itemData.item.id
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
                data={foundGroups}
                renderItem={renderGroupItem}
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