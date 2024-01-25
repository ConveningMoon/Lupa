import { View, Text, StyleSheet, FlatList, Button, Pressable, Modal } from 'react-native';
import { useState } from 'react';

import { TEACHERS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonInfoInput';

import Colors from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';

export default function StudentsInfoScreen({navigation, route}) { 
    const [resultsTeachers, setResultsTeachers] = useState([]);
    const [showTeachers, setShowTeachers] = useState(false);

    const student = route.params.studentInfo;
    const parents = route.params.studentParents;

    function closeShowTeachers(){
        setShowTeachers(!showTeachers);
    }


    function searchTeachers(){
        setShowTeachers(!showTeachers);
        const foundTeachers = TEACHERS.filter((teacher) =>
        teacher.groups.includes(student.group));
        setResultsTeachers(foundTeachers);
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
            <View style={styles.topInfoContainer}>
                <View style={styles.nameUsernameContainer}>
                    <Text style={styles.textStudentName}>{student.name}</Text>
                    <Text style={styles.textStudentUsername}>{student.username}</Text>
                </View>
                <Text style={styles.textStudentGroup}>{student.group}</Text>
            </View>
            <Text style={styles.textStudentParents}>Parents: {parents.join(', ')}</Text>
            
            <View style={styles.allButtonsContainer}>
                <View style={styles.buttonContainer}>
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

                <View style={styles.buttonContainer}>
                    <ButtonInfoInput 
                        text='GRADES'
                        //onPressGeneral={searchTeachers}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
    },
    topInfoContainer: {
        flexDirection: 'row'
    },
    nameUsernameContainer: {
        flex: 1
    },
    textStudentName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    textStudentUsername:{
        color: Colors.color_darkGreen,
        paddingHorizontal: 10
    },
    textStudentGroup: {
        color: Colors.color_darkBlue,
        fontSize: 20,
        fontWeight: '900',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    textStudentParents: {
        paddingTop: 10,
        paddingHorizontal: 10,
        color: Colors.color_darkBlue
    },
    allButtonsContainer: {
        paddingTop: 30
    },
    buttonContainer: {
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