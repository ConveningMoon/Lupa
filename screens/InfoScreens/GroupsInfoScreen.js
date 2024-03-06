import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native';

import { STUDENTS, TEACHERS} from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function GroupsInfoScreen({navigation, route}) {  
    const group = route.params.group;

    function toStudents(){ 
        navigation.navigate('Students',{
            id: group.id,
            fromSchool: false,
            fromGroup: true,
            fromParent: false,
            fromNewParent: false
        }); 
        
    }

    function toTeachers(){
        navigation.navigate('Teachers',{
            id: group.id,
            fromSchool: false,
            fromGroup: true
        }); 
    }

    return (
        <View style={styles.globalContainer}>

            <Text style={styles.textGroupName}>{group.data.name}</Text>

            <ButtonInfoInput 
                text='SHOW STUDENTS'
                onPressGeneral={toStudents}
            />

            <ButtonInfoInput 
                text='SHOW TEACHERS'
                onPressGeneral={toTeachers}
            />

            <ButtonInfoInput 
                text='SHOW SUBJECTS'
                //onPressGeneral={toTeachers}
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