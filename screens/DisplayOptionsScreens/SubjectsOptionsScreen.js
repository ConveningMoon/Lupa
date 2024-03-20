import { 
    FlatList, 
    View,
    StyleSheet
} from 'react-native';

import { useState, useEffect, useContext } from 'react';

import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';
import SearchInputText from '../../components/SearchSystemComponent/SearchInputText';
import ButtonToAdd from '../../components/ButtonComponents/ButtonToAdd';
import NewSubjectInfo from '../../components/ModalComponents/NewSubjectInfo';

import { AuthContext } from '../../store/auth-context';

export default function SubjectsOptionsScreen({navigation, route}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [searchText, setSearchText] = useState('');
    const [foundSubjects, setFoundSubjects] = useState(user.subjects);
    const [addNewSubjectVisible, setAddNewSubjectVisible] = useState(false);


    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchSubjects = user.subjects.filter(
                subject => subject.data.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFoundSubjects(searchSubjects);
        } else {
            setFoundSubjects(user.subjects);
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
                text={itemData.item}
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


    return (  
        <View style={styles.globalContainer}>    
            <SearchInputText onChangeText={setSearchText} value={searchText}/>
            {route.params.fromSchool &&
                <ButtonToAdd text='Add New Subject' onPressGeneral={addNewSubject}/>
            }
            <NewSubjectInfo 
                visible={addNewSubjectVisible}
                onBack={onBackHandler}
            />
            <FlatList
                data={foundSubjects}
                renderItem={renderSubjectItem}
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