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

import { fetchParents } from '../../util/parent-http';


export default function ParentsOptionsScreen({navigation, route}) {
    const [filterParents, setFilterParents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundParents, setFoundParents] = useState([]);

    const [parentsAreLoading, setParentsAreLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    async function initialParentsData() {
        setRefreshing(true);
        try{
            const parents = await fetchParents(route.params.id);

            setFilterParents(parents);
            setFoundParents(parents);

            setRefreshing(false);
            setParentsAreLoading(false);
        } catch {
            setRefreshing(false);
            setParentsAreLoading(false);
        }
        
    }

    useEffect(() => {
        if (isFocused) {
            initialParentsData();
        }
    }, [isFocused]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchParents = filterParents.filter(
                parent => parent.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundParents(searchParents);
        } else {
            setFoundParents(filterParents);
        }

    }, [searchText]);
    

    function renderParentItem(itemData) {
        function pressHandler() {
          navigation.navigate('ParentsInfo', {
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
        initialParentsData();
    }, []);
    
    if (parentsAreLoading) {
        return <LoadingOverlay message="Loading your parents..." />;
    }

    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <FlatList
                data={foundParents}
                renderItem={renderParentItem}
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