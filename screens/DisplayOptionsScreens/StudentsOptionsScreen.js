import { 
    FlatList
} from 'react-native';

import {STUDENTS, PARENTS} from '../../data/dummy-data';
import TableOptions from '../../components/TableOptions';

export default function GroupsOptionsScreen({navigation}) {
    function renderStudentItem(itemData) {    
        function pressHandler() {
            const parents = PARENTS.filter(parent => 
                itemData.item.parents.includes(parent.id)).map(parent => 
                    parent.name);
            navigation.navigate('StudentsInfo', {
                studentInfo: itemData.item,
                studentParents: parents
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
            data={STUDENTS}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentItem}
        />
    );
}