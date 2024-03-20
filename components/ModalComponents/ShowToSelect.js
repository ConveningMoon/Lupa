import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Modal
} from 'react-native';

import TableOptions from '../DisplayOptionsToPressComponents/TableOptions';
import MicroPressText from '../PressableTextComponents/MicroPressText';

export default function ShowToSelect(props) {
    //const 

    function renderElementItem(itemData) {
        function pressHandler() {
            props.onSelect(itemData.item.data.name);
            props.onBack();
        }

        return (
            <TableOptions
                text={itemData.item.data.name}
                onPressGeneral={pressHandler}
            /> 
        );
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <FlatList
                    data={props.elements}
                    renderItem={renderElementItem}
                />
            </View>
            <View style={styles.buttonsContainer}>
                    <MicroPressText text='CANCEL' onNewPress={props.onBack}/>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1
    },
    buttonsContainer: {
        alignItems: 'center',
        marginVertical: 30
    }
});