import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native';

import { STUDENTS, TEACHERS} from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function GroupsInfoScreen({navigation, route}) {  
    const groupName = route.params.groupName;

    function toStudents(){    
        const filterStudents = STUDENTS.filter(
            student => student.group.includes(groupName)
        );
 
        navigation.navigate('Students',{
            from: 'Group',
            filterStudents: filterStudents
        }); 
        
    }

    function toTeachers(){
        const filterTeachers = TEACHERS.filter(
            teacher => teacher.groups.includes(groupName)
        );

        navigation.navigate('Teachers',{
            from: 'Group',
            filterTeachers: filterTeachers
        }); 
    }

    return (
        <View style={styles.globalContainer}>

            <Text style={styles.textGroupName}>{groupName}</Text>

            <ButtonInfoInput 
                text='SHOW STUDENTS'
                onPressGeneral={toStudents}
            />

            <ButtonInfoInput 
                text='SHOW TEACHERS'
                onPressGeneral={toTeachers}
            />
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
    }
});