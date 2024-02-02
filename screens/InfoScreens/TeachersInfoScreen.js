import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native';

import { GROUPS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function TeachersInfoScreen({navigation, route}) {
    const teacher = route.params.teacherInfo;

    function toGroups(){
        const filterGroups = GROUPS.filter(
            group => group.teachers.includes(teacher.id)
        );

        navigation.navigate('Teachers',{
            filterGroups: filterGroups
        }); 
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.topInfoContainer}>
                <Text style={styles.textTeacherName}>{teacher.name}</Text>
                <Text style={styles.textTeacherUsername}>{teacher.username}</Text>
                <Text style={styles.textTeacherSubjects}>Subjects: {teacher.subjects.join(', ')}</Text>
                <Text style={styles.textTeacherDescription}>{teacher.description}</Text>
            </View>            
            <ButtonInfoInput 
                text='SHOW GROUPS'
                onPressGeneral={toGroups}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
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
    }
});