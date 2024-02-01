import { 
    FlatList
} from 'react-native';

import {STUDENTS} from '../../data/dummy-data';
import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';


export default function StudentsOptionsScreen({navigation, route}) {
    const from = route.params.from;
    const filterStudents = route.params.filterStudents;

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
        <FlatList
            data={from === 'School' ? STUDENTS : filterStudents}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentItem}
        />
    );
}