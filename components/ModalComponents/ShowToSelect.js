import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Modal
} from 'react-native';

import { useEffect, useState } from 'react';

import TableOptions from '../DisplayOptionsToPressComponents/TableOptions';
import MicroPressText from '../PressableTextComponents/MicroPressText';
import SearchInputText from '../SearchSystemComponent/SearchInputText';

export default function ShowToSelect(props) {
    const [searchText, setSearchText] = useState('');
    const [filterElements, setFilterElements] = useState(props.elements);

    function renderElementItem(itemData) {
        function pressHandler() {
            props.onSelect(itemData.item);
            props.onBack();
        }

        return (
            <TableOptions
                text={itemData.item}
                onPressGeneral={pressHandler}
            /> 
        );
    }

    useEffect(() => {
        if (searchText.trim() !== '') {
            const searchGroups = filterElements.filter(
                element => element.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilterElements(searchGroups);
        } else {
            setFilterElements(props.elements);
        }

    }, [searchText]);

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <SearchInputText onChangeText={setSearchText} value={searchText}/>
                <FlatList
                    data={filterElements}
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
        flex: 1,
        margin: 10
    },
    buttonsContainer: {
        alignItems: 'center',
        marginVertical: 30
    }
});