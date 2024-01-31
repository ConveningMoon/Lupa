import { View, Text, StyleSheet, FlatList, Button, Pressable, Modal } from 'react-native';
import { useState } from 'react';

import { STUDENTS, TEACHERS, PARENTS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonInfoInput';

import Colors from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';

export default function GroupsInfoScreen({navigation, route}) {
    const [resultsStudents, setResultsStudents] = useState([]);    
    const [resultsTeachers, setResultsTeachers] = useState([]);
    const [showStudents, setShowStudents] = useState(false);
    const [showTeachers, setShowTeachers] = useState(false);
    const groupName = route.params.groupName;

    function closeShowStudents(){
        setShowStudents(!showStudents);
    }

    function closeShowTeachers(){
        setShowTeachers(!showTeachers);
    }

    function searchStudents(){    
        setShowStudents(!showStudents);    
        const foundStudents = STUDENTS.filter((student) =>
            student.group.includes(groupName));
        setResultsStudents(foundStudents);
    }

    function searchTeachers(){
        setShowTeachers(!showTeachers);
        const foundTeachers = TEACHERS.filter((teacher) =>
        teacher.groups.includes(groupName));
        setResultsTeachers(foundTeachers);
    }

    function renderStudentItem(itemData) {
        function pressHandler() {
            setShowStudents(!showStudents);
            navigation.navigate('StudentsInfo', {
                user: itemData.item,
            });
        }
    
        return (  
            <Pressable 
                style={({pressed}) => pressed && styles.textInfoContainer}
                onPress={pressHandler} 
            >
                <Text style={styles.textInfo}>{itemData.item.name}</Text>
            </Pressable>
        );
    }

    function renderTeacherItem(itemData) {
        function pressHandler() {
            setShowTeachers(!showTeachers);
            navigation.navigate('TeachersInfo', {
                teacherInfo: itemData.item
            });
        }
    
        return (       
            <Pressable 
                style={({pressed}) => pressed && styles.textInfoContainer}  
                onPress={pressHandler}
            >
                <Text style={styles.textInfo}>{itemData.item.name}</Text>
            </Pressable>
        );
    }

    return (
        <View style={styles.globalContainer}>
            <Text style={styles.textGroupName}>{groupName}</Text>
            <View style={styles.showContainer}>
                <ButtonInfoInput 
                    text='SHOW STUDENTS'
                    onPressGeneral={searchStudents}
                />
            </View>            
            <Modal animationType='slide' visible={showStudents}>
                <Pressable style={styles.closeContainer} onPress={closeShowStudents}>
                    <Entypo name="arrow-long-left" size={30} color={Colors.color_lightGreen}/>
                    <Text style={styles.backText}>Back</Text>
                </Pressable>
                <View style={styles.itemsContainer}>
                    <FlatList
                        data={resultsStudents}
                        keyExtractor={(item) => item.id}
                        renderItem={renderStudentItem}
                    />
                </View>
            </Modal>
            <View style={styles.showContainer}>
                <ButtonInfoInput 
                    text='SHOW TEACHERS'
                    onPressGeneral={searchTeachers}
                />
            </View>
            <Modal animationType='slide' visible={showTeachers}>
                <Pressable style={styles.closeContainer} onPress={closeShowTeachers}>
                    <Entypo name="arrow-long-left" size={30} color={Colors.color_lightGreen}/>
                    <Text style={styles.backText}>Back</Text>
                </Pressable>
                <View style={styles.itemsContainer}>
                    <FlatList
                        data={resultsTeachers}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTeacherItem}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
    },
    textGroupName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        padding: 10
    },
    showContainer: {
        alignItems: 'center'        
    },
    itemsContainer: {
        padding: 20
    },
    textInfoContainer: {
        opacity: 0.5,
        backgroundColor: Colors.color_boneYellow,
        borderRadius: 20
    },
    textInfo: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    closeContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    backText: {
        fontSize: 25,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingLeft: 10
    }

});