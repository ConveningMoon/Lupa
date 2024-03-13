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
import ButtonToAdd from '../../components/ButtonComponents/ButtonToAdd';
import NewSubjectInfo from '../../components/ModalComponents/NewSubjectInfo';
import LoadingOverlay from '../../components/LoadingOverlay';

import { fetchSubjects } from '../../util/subject-http';

import { AuthContext } from '../../store/auth-context';

export default function SubjectsOptionsScreen({navigation, route}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [filterSubjects, setFilterSubjects] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [foundSubjects, setFoundSubjects] = useState([]);
    const [addNewSubjectVisible, setAddNewSubjectVisible] = useState(false);

    const [subjectsAreLoading, setSubjectsAreLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    async function initialSubjectsData() {
        setRefreshing(true);
        try{
            const subjects = await fetchSubjects(user.id);

            setFilterSubjects(subjects);
            setFoundSubjects(subjects);

            setRefreshing(false);
            setSubjectsAreLoading(false);
        } catch {
            setRefreshing(false);
            setSubjectsAreLoading(false);
        }
        
    }

    useEffect(() => {
        if (isFocused) {
            initialSubjectsData();
        }
    }, [isFocused]);

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchSubjects = filterSubjects.filter(
                subject => subject.data.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundSubjects(searchSubjects);
        } else {
            setFoundSubjects(filterSubjects);
        }

    }, [searchText]);
    

    function renderSubjectItem(itemData) {
        function pressHandler() {
          navigation.navigate('SubjectsInfo', {
            subject: itemData.item
          });
        }
    
        return (
            <TableOptions
                text={itemData.item.data.name}
                onPressGeneral={pressHandler}
            />          
        );
    }

    function addNewSubject() {
        setAddNewSubjectVisible(true);
    }

    function onBackHandler(){
        setAddNewSubjectVisible(false);
    }

    const onRefresh = useCallback(() => {
        initialSubjectsData();
    }, []);
    
    if (subjectsAreLoading) {
        return <LoadingOverlay message="Loading subjects..." />;
    }

    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            {route.params.fromSchool &&
                <ButtonToAdd text='Add New Group' onPressGeneral={addNewSubject}/>
            }
            <NewSubjectInfo 
                visible={addNewSubjectVisible}
                onBack={onBackHandler}
                reloadData={initialSubjectsData}
            />
            <FlatList
                data={foundSubjects}
                renderItem={renderSubjectItem}
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