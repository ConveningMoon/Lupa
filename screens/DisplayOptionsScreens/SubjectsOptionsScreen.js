import { 
    FlatList
} from 'react-native';

import { SUBJECTS } from '../../data/dummy-data';
import TableOptions from '../../components/TableOptions';

export default function SubjectsOptionsScreen({navigation}) {
    function renderSubjectItem(itemData) {
        // function pressHandler() {
        //   navigation.navigate('GroupsInfo', {
        //     groupName: itemData.item.name
        //   });
        // }
    
        return (
            <TableOptions
                text={itemData.item.name}
                //onPressGeneral={pressHandler}
            />          
        );
    }
    
    return (
        <FlatList
            data={SUBJECTS}
            keyExtractor={(item) => item.id}
            renderItem={renderSubjectItem}
        />
    );
}