import { 
    FlatList
} from 'react-native';

import { GROUPS } from '../../data/dummy-data';
import TableOptions from '../../components/DisplayOptionsToPressComponents/TableOptions';

export default function GroupsOptionsScreen({navigation, route}) {
    const from = route.params.from;
    const filterGroups = route.params.filterGroups;

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
            data={from === 'School'? GROUPS : filterGroups}
            renderItem={renderGroupItem}
        />
    );
}