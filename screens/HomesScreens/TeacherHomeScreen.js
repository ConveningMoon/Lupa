import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useContext} from 'react';

import { AuthContext } from '../../store/auth-context';

import { GROUPS} from '../../data/dummy-data';

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

export default function TeacherHomeScreen({navigation}) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    function toGroups(){
        const filterGroups = GROUPS.filter(
            group => group.teachers.includes(user.id)
        );

        navigation.navigate('Groups', {
            filterGroups: filterGroups
        });
    }

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.generalContainer}>
                <View style={styles.generalContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.nameText}>{user.name}</Text>                        </View>
                    </View> 

                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}>Contact: {user.emailContact}</Text>
                    </View>
                        
                    {/* <View style={styles.subjectsContainer}>
                        <Text style={styles.subjectsText}>Subjects: {user.subjects.join(', ')}</Text>
                    </View> */}

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{user.description}</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        <ButtonInfoInput 
                            text='GROUPS' 
                            onPressGeneral={toGroups}
                        />
                        <ButtonInfoInput text='POST'/>
                        <ButtonInfoInput text='GRADES'/>
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
    subjectsContainer: {
        padding: 10,
    },
    subjectsText: {

    },
    descriptionContainer: {
        paddingTop: 15,
        padding: 10
    },
    descriptionText: {
        fontSize: 16
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