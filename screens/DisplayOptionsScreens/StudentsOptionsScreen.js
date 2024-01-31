import { 
    FlatList
} from 'react-native';

import {STUDENTS, PARENTS} from '../../data/dummy-data';
import TableOptions from '../../components/TableOptions';

export default function StudentsOptionsScreen({navigation, route}) {
    const typeUser = route.params.typeUser;
    const userId = route.params.userId;

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
            data={typeUser === 'School'? STUDENTS : STUDENTS.filter(student => student.parents.includes(userId))}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentItem}
        />
    );
}