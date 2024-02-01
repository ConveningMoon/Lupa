import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,    
    Pressable
} from 'react-native';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';
import {PARENTS} from '../../data/dummy-data';

export default function StudentHomeScreen({navigation, route}) {
 const student = route.params.user;
    
    const parents = PARENTS.filter(parent => 
        student.parents.includes(parent.id));

    function renderParentsItem(itemData){    
        function pressHandler(){
            navigation.navigate('ParentsInfo',{
                user: itemData.item
            });
        }

        return (
            <Pressable onPress={pressHandler}>
                <Text style={styles.textStudentParents}>{itemData.item.name}      </Text>
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

            <View style={styles.parentsContainer}>
                <Text style={styles.parentsText}>Parents:   </Text>
                <FlatList
                    data={parents}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={renderParentsItem}
                />
            </View>

            <View style={styles.allButtonsContainer}>
                <View style={styles.buttonContainer}>
                    <ButtonInfoInput 
                        text='GRADES'
                        //onPressGeneral={searchTeachers}
                    />
                    <ButtonInfoInput 
                        text='SUBJECTS'
                        //onPressGeneral={searchTeachers}
                    />
                    <ButtonInfoInput
                        text='SHEDULE'
                        //onPressGeneral={searchTeachers}
                    />
                    <ButtonInfoInput
                        text='FEEDBACK'
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
    parentsContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    parentsText: {
        color: Colors.color_darkBlue
    },
    textStudentParents: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold'
    },
    allButtonsContainer: {
        paddingTop: 30
    },
    buttonContainer: {
        alignItems: 'center'        
    }
});