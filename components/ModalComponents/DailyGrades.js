import { 
    View, 
    Text,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    Pressable,
    Alert
} from 'react-native';

import { useEffect, useState } from 'react';

import Colors from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import BadgeDropDown from '../DropDownSystemComponents/BadgeDropDown';
import ButtonToAdd from '../ButtonComponents/ButtonToAdd';

import { fetchGroups } from '../../util/group-http';
import { fetchStudents } from '../../util/student-http';
import { addNewGrades } from '../../util/grades-http';

export default function DailyGrades(props) {
    const [showStudents, setShowStudents] = useState(false);
    const [listStudents, setListStudents] = useState([]);

    const [showGroups, setShowGroups] = useState(false);
    const [optionsGroups, setOptionsGroups] = useState([]);
    const [group, setGroup] = useState('Select group');

    const [infoIsLoading, setInfoIsLoading] = useState(true);

    useEffect(() => {
        setInfoIsLoading(true);
        setShowGroups(false);
        setShowStudents(false);
        async function getGroups() {
            const response = await fetchGroups('', false, props.groupsIds, true);

            const foundGroups = []
            for (let key in response) {
                foundGroups.push({label: response[key].data.name, value: response[key].id});
            }

            setOptionsGroups(foundGroups);

            setInfoIsLoading(false);
            setShowGroups(true);
        }

        getGroups();
    }, []);

    async function onSelectGroup(item) {
        setShowGroups(false);
        setGroup(item.label);

        try{
            setInfoIsLoading(true);
            const response = await fetchStudents(item.value, false, true);                
            setListStudents(response);           
            setShowStudents(true);
            setInfoIsLoading(false);
        } catch {}
    }

    function renderElementItem(itemData) {
        const onTextChanged = (value) => {
            const newListStudents = [...listStudents]
            newListStudents[itemData.index].grade = value;
            setListStudents(newListStudents);
        }

        return (
            <View style={styles.gradeContainer}>
                <Text style={styles.studentText}>{itemData.item.name}</Text>
                <TextInput
                    style={styles.gradeInput}
                    placeholder='0.00'
                    placeholderTextColor='white'
                    keyboardType='decimal-pad'
                    onChangeText={(grade) => onTextChanged(grade)}
                />
            </View>            
        );
    }

    async function uploadHandler() {
        let check = false;
        for (let key in listStudents) {
            if (!!listStudents[key].grade) {
                const value = listStudents[key].grade.toString().replaceAll(',', '.');
                const parseValue = Number.parseFloat(value);
                if(value.split('.').length - 1 <= 1 && !Number.isNaN(parseValue)) {
                    if(parseValue <= 10.0 && parseValue >= 0) { //change if the grades system changes
                        listStudents[key].grade = parseValue;
                        check = true;
                    }  else {
                        check = false;
                        Alert.alert('Oops!', 'Some number has invalid value.');
                        break;
                    }
                } else {
                    check = false;
                    Alert.alert('Oops!', 'The format of some number is incorrect.');
                    break;
                }               
            } else {
                Alert.alert('Incomplete!', 'Please type a grade for all of the students.');
                break;
            }
        }

        if (check) {
            const finalGrades = [];

            for (let key in  listStudents) {
                finalGrades.push({
                    'studentId': listStudents[key].id,
                    'grade': listStudents[key].grade,
                    'subject': props.subject
                })
            }

            try {
                addNewGrades({'datetime' : new Date().toISOString(), 'grades': finalGrades});
            } catch {}
        }
        
        props.onUpload();
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                {infoIsLoading &&
                    <View style={styles.loadingInfoContainer}>
                        <Text style={styles.loadingText}>LOADING...</Text>
                    </View>                    
                }
                {showStudents &&
                    <View style={styles.studentsContainer}>
                        <Pressable 
                            onPress={() => {setShowGroups(true); setShowStudents(false);}}
                            style={styles.backContainer}
                        >
                            <Ionicons name="caret-back" size={30} color={Colors.color_lightGreen}/>
                            <Text style={styles.backGroupLabel}>{group}</Text>
                        </Pressable>                            
                        <FlatList
                            style={styles.listContainer}
                            data={listStudents}
                            renderItem={renderElementItem}
                        />
                        <ButtonToAdd
                            text='UPLOAD'
                            onPressGeneral={uploadHandler}
                        />
                    </View>                                    
                }
                {showGroups && 
                    <View style={styles.groupsContainer}>
                        <Text style={styles.groupsLabel}>SELECT GROUP</Text>
                        <BadgeDropDown
                            elements={optionsGroups}
                            placeholder='Select the group'
                            onSelectItem={onSelectGroup}
                        />
                    </View>                    
                }
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    loadingInfoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 25,
        color: Colors.color_lightGreen,
        fontWeight: 'bold'
    },
    globalContainer: {
        flex: 1,
        margin: 20
    },
    groupsContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    groupsLabel: {
        color: Colors.color_lightGreen,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    studentsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        width: '100%',
        flex: 1
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    backGroupLabel: {
        color: Colors.color_lightGreen,
        fontSize: 25
    },
    gradeContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    studentText: {
        flex: 1,
        fontSize: 20,
        color: Colors.color_darkGreen,
        fontWeight: 'bold',
    },
    gradeInput: {
        padding: 5,
        paddingHorizontal: 20,
        backgroundColor: Colors.color_darkBlue,
        color: 'white',
        borderRadius: 10
    }
});