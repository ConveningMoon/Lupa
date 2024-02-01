import { 
    FlatList,
} from 'react-native';

import {TEACHERS} from '../../data/dummy-data';
import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';

export default function TeachersOptionsScreen({navigation, route}) {
    const from = route.params.from;
    const filterTeachers = route.params.filterTeachers;

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
        <FlatList
            data={from === 'School' ? TEACHERS : filterTeachers}
            keyExtractor={(item) => item.id}
            renderItem={renderTeacherItem}
        />
    );
}