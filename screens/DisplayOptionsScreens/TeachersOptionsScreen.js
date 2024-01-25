import { 
    FlatList,
    Text,
    View
} from 'react-native';

import {TEACHERS} from '../../data/dummy-data';
import TableOptions from '../../components/TableOptions';

export default function TeachersOptionsScreen({navigation}) {
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
            data={TEACHERS}
            keyExtractor={(item) => item.id}
            renderItem={renderTeacherItem}
        />
    );
}