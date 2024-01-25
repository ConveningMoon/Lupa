import { View, Text, StyleSheet, FlatList, Button, Pressable, Modal } from 'react-native';
import { useState } from 'react';

import { GROUPS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonInfoInput';

import Colors from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';

export default function TeachersInfoScreen({navigation, route}) { 
    const [resultsGroups, setResultsGroups] = useState([]);
    const [showGroups, setShowGroups] = useState(false);

    const teacher = route.params.teacherInfo;
    // const teacherName = route.params.teacherName;
    // const teacherUsername = route.params.teacherUsername;
    // const teacherDescription = route.params.teacherDescription;

    function closeShowGroups(){
        setShowGroups(!showGroups);
    }

    function searchGroups(){
        setShowGroups(!showGroups);
        const froundGroups = GROUPS.filter((group) =>
        group.teachers.includes(teacher.id));
        setResultsGroups(froundGroups);
    }

    function renderGroupItem(itemData) {
        function pressHandler() {
            setShowGroups(!showGroups);
            navigation.navigate('GroupsInfo', {
                groupName: itemData.item.name
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
                <Text style={styles.textTeacherName}>{teacher.name}</Text>
                <Text style={styles.textTeacherUsername}>{teacher.username}</Text>
                <Text style={styles.textTeacherSubjects}>Subjects: {teacher.subjects.join(', ')}</Text>
                <Text style={styles.textTeacherDescription}>{teacher.description}</Text>
            </View>            
            <View style={styles.buttonContainer}>
                <ButtonInfoInput 
                    text='SHOW GROUPS'
                    onPressGeneral={searchGroups}
                />
            </View>
            <Modal animationType='slide' visible={showGroups}>
                <Pressable style={styles.closeContainer} onPress={closeShowGroups}>
                    <Entypo name="arrow-long-left" size={30} color={Colors.color_lightGreen}/>
                    <Text style={styles.backText}>Back</Text>
                </Pressable>
                <View style={styles.itemsContainer}>
                    <FlatList
                        data={resultsGroups}
                        keyExtractor={(item) => item.id}
                        renderItem={renderGroupItem}
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
    nameUsernameContainer: {
        flex: 1
    },
    textTeacherName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    textTeacherUsername:{
        color: Colors.color_darkGreen,
        paddingHorizontal: 10
    },
    textTeacherSubjects: {
        color: Colors.color_darkBlue,
        padding:10
    },
    textTeacherDescription: {
        color: Colors.color_darkBlue,
        fontSize: 16,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    textStudentParents: {
        paddingTop: 10,
        paddingHorizontal: 10,
        color: Colors.color_darkBlue
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