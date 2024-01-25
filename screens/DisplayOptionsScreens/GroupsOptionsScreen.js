import { 
    FlatList
} from 'react-native';

import { GROUPS } from '../../data/dummy-data';
import TableOptions from '../../components/TableOptions';

export default function GroupsOptionsScreen({navigation}) {
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
            data={GROUPS}
            keyExtractor={(item) => item.id}
            renderItem={renderGroupItem}
        />
    );
}