import { 
    FlatList, 
    View,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';

import { useState, useEffect, useContext, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import ButtonToAdd from '../../components/ButtonComponents/ButtonToAdd';
import NewGroupInfo from '../../components/ModalComponents/NewGroupInfo';
import LoadingOverlay from '../../components/LoadingOverlay';

import { fetchGroups } from '../../util/http';

import { AuthContext } from '../../store/auth-context';

export default function GroupsOptionsScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [filterGroups, setFilterGroups] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundGroups, setFoundGroups] = useState([]);
    const [addGroupVisible, setAddNewGroupVisible] = useState(false);

    const [groupsAreLoading, setGroupsAreLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    async function initialGroupsData() {
        setRefreshing(true);
        try{
            const groups = await fetchGroups(user.id);

            setFilterGroups(groups);
            setFoundGroups(groups);

            setRefreshing(false);
            setGroupsAreLoading(false);
        } catch {
            setRefreshing(false);
            setGroupsAreLoading(false);
        }
        
    }

    useEffect(() => {
        if (isFocused) {
            initialGroupsData();
        }
    }, [isFocused]);

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
        initialGroupsData();
    }, []);
    
    if (groupsAreLoading) {
        return <LoadingOverlay message="Loading your groups..." />;
    }

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