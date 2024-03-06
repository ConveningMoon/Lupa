import { 
    FlatList, 
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Alert
} from 'react-native';

import { useState, useEffect, useContext, useCallback } from 'react';

import SendRequestOptions from '../../components/DisplayOptionsToPressComponents/SendRequestOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import LoadingOverlay from '../../components/LoadingOverlay';

import { createNewNotification, fetchSchools } from '../../util/http';

import { AuthContext } from '../../store/auth-context';

export default function SchoolsOptionsScreen({navigation}) {
    const authCtx = useContext(AuthContext);

    const [filterSchools, setFilterSchools] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundSchools, setFoundSchools] = useState([]);

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function initialSchoolsData() {
        setProfileIsLoading(true);
        try{
            const schools = await fetchSchools();

            setFilterSchools(schools);
            setFoundSchools(schools);

            setProfileIsLoading(false);
        } catch(error) {setProfileIsLoading(true);}        
    }

    useEffect(() => {
        initialSchoolsData();
    }, []);

    useEffect(() => {
        if (searchText.trim() !== '') {
            console.log(filterSchools);
            const searchSchools = filterSchools.filter(
                school => school.username.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundSchools(searchSchools);
        } else {
            setFoundSchools(filterSchools);
        }

    }, [searchText]);
    
    async function joinToSchool(data) {
        await createNewNotification(data);
        navigation.goBack();

    }

    function renderSchoolItem(itemData) {
        function pressHandler() {
            Alert.alert('Joined to new school?', `Are you sure to join into ${itemData.item.name} school as your school?`, [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => joinToSchool({
                        type: 'studentJoinSchool',
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
        return (
            <SendRequestOptions
                name={itemData.item.name}
                username={itemData.item.username}
                onPress={pressHandler}
            />        
        );
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        initialSchoolsData();
        setRefreshing(false);
    }, []);
    
    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            <FlatList
                data={foundSchools}
                renderItem={renderSchoolItem}
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