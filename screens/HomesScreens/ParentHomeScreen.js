import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useContext} from 'react';

import { AuthContext } from '../../store/auth-context';

import { STUDENTS} from '../../data/dummy-data';

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';


export default function ParentHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    function toStudents(){
        const filterStudents = STUDENTS.filter(
            student => student.parents.includes(user.id)
        );

        navigation.navigate('Students', {
            filterStudents: filterStudents
        });
    }

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.generalContainer}>
                <View style={styles.generalContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.nameText}>{user.name}</Text>
                        </View>
                    </View> 

                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}>Contact: {user.email}</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        <ButtonInfoInput 
                            text='MY CHILDREN' 
                            onPressGeneral={toStudents}
                        />
                    </View>                      
                </View>                    
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.color_lightGreen,
    },
    topContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    topTextContainer: {
        flex: 1
    },
    contactContainer: {
        flexDirection: 'row'
    },
    contactText: {
        paddingHorizontal: 10,
        fontSize: 12
    },
    optionsContainer: {
        padding: 10,
        alignItems: 'center'
    }
});