import { View, Text, StyleSheet, FlatList, Button, Pressable, Modal } from 'react-native';
import { useState } from 'react';

import { STUDENTS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonInfoInput';

import Colors from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';

export default function ParentsInfoScreen({navigation, route}) { 
    const [resultsStudents, setResultsStudents] = useState([]);
    const [showStudents, setShowStudents] = useState(false);

    const user = route.params.user;

    function closeShowStudents(){
        setShowStudents(!showStudents);
    }


    function searchStudents(){
        setShowStudents(!showStudents);
        const foundStudents = STUDENTS.filter(student => 
            student.parents.includes(user.id));
        setResultsStudents(foundStudents);
    }

    function renderStudentsItem(itemData){    
        function pressHandler(){
            navigation.navigate('StudentsInfo',{
                user: itemData.item
            });
        }

        return (
            <Pressable onPress={pressHandler}>
                <Text style={styles.textStudentParents}>{itemData.item.name}</Text>
            </Pressable>
        );
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.topInfoContainer}>
                <View style={styles.nameUsernameContainer}>
                    <Text style={styles.textParentName}>{user.name}</Text>
                    <Text style={styles.textParentUsername}>{user.username}</Text>
                </View>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.contactText}>Contact: {user.email}</Text>
            </View>

            <View style={styles.allButtonsContainer}>
                <View style={styles.buttonContainer}>
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
                            renderItem={renderStudentsItem}
                        />
                    </View>
                </Modal>
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
    textParentName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    textParentUsername:{
        color: Colors.color_darkGreen,
        paddingHorizontal: 10
    },
    contactContainer: {
        flexDirection: 'row'
    },
    contactText: {
        paddingHorizontal: 10,
        fontSize: 12
    },
    textStudentParents: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
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