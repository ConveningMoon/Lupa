import { 
    FlatList, 
    View,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';

import { useState, useEffect, useContext, useCallback } from 'react';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import ButtonToAdd from '../../components/ButtonComponents/ButtonToAdd';
import NewGroupInfo from '../../components/ModalComponents/NewGroupInfo';

import { fetchGroups } from '../../util/http';

import { AuthContext } from '../../store/auth-context';

export default function GroupsOptionsScreen({navigation}) {
    const authCtx = useContext(AuthContext);

    const [filterGroups, setFilterGroups] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundGroups, setFoundGroups] = useState([]);
    const [addGroupVisible, setAddNewGroupVisible] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    async function initialGroupsData() {
        try{
            const groups = await fetchGroups(authCtx.infoUser.data.id);

            setFilterGroups(groups);
            setFoundGroups(groups);
        } catch(error) {}
        
    }

    useEffect(() => {
        initialGroupsData();
    }, []);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchGroups = filterGroups.filter(
                group => group.data.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundGroups(searchGroups);
        } else {
            setFoundGroups(filterGroups);
        }

    }, [searchText]);
    

    function renderGroupItem(itemData) {
        function pressHandler() {
          navigation.navigate('GroupsInfo', {
            group: itemData.item
          });
        }
    
        return (
            <TableOptions
                text={itemData.item.data.name}
                onPressGeneral={pressHandler}
            />          
        );
    }

    function addNewGroup() {
        setAddNewGroupVisible(true);
    }

    function onBackHandler(){
        setAddNewGroupVisible(false);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        initialGroupsData();
        setRefreshing(false);
    }, []);
    
    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <ButtonToAdd text='Add New Group' onPressGeneral={addNewGroup}/>
            <NewGroupInfo 
                visible={addGroupVisible}
                onBack={onBackHandler}
            />
            <FlatList
                data={foundGroups}
                renderItem={renderGroupItem}
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