import { 
    FlatList
} from 'react-native';

import { GROUPS } from '../../data/dummy-data';
import TableOptions from '../../components/TableOptions';

export default function GroupsOptionsScreen({navigation, route}) {
    const typeUser = route.params.typeUser;
    const userId = route.params.userId;

    function renderGroupItem(itemData) {
        function pressHandler() {
          navigation.navigate('GroupsInfo', {
            groupName: itemData.item.name
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
            data={typeUser === 'School'? GROUPS : GROUPS.filter(group => group.teachers.includes(userId))}
            keyExtractor={(item) => item.id}
            renderItem={renderGroupItem}
        />
    );
}