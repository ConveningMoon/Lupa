import { 
    View, 
    Text, 
    StyleSheet
} from 'react-native';

import { STUDENTS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function ParentsInfoScreen({navigation, route}) {
    const user = route.params.user;

    function toStudents(){
        const filterStudents = STUDENTS.filter(
            student => student.parents.includes(user.id)
        );

        navigation.navigate('Students',{
            filterStudents: filterStudents
        }); 
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
                <ButtonInfoInput 
                    text='SHOW STUDENTS'
                    onPressGeneral={toStudents}
                />
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
    allButtonsContainer: {
        paddingTop: 30
    }
});