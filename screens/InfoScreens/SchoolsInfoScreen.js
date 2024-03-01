import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Entypo } from '@expo/vector-icons';

import { GROUPS } from '../../data/dummy-data';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function SchoolsInfoScreen({navigation, route}) {
    const school = route.params.school;

    function toGroups(){
        const filterGroups = GROUPS.filter(
            group => group.teachers.includes(teacher.id)
        );

        navigation.navigate('Teachers',{
            filterGroups: filterGroups
        }); 
    }

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.saveAreaContainer}>                   
                <View style={styles.generalContainer}>
                    <ScrollView> 
                        <View style={styles.topContainer}>
                            <View style={styles.topTextContainer}>
                                <Text style={styles.nameText}>{school.name}</Text>
                                <Text style={styles.usernameText}>{school.username}</Text>
                            </View>
                            <View style={styles.topRatingContainer}>
                                <Text style={styles.ratingText}>9.8</Text>
                                <Entypo name="star" size={24} color={Colors.color_lightGreen} />
                            </View>
                        </View> 
                        <View style={styles.contactContainer}>
                            <Text style={styles.contactText}>Contact: {school.emailContact}</Text>
                            <Text style={styles.contactText}>Adress: {school.adress}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>{school.description}</Text>
                        </View> 
                    </ScrollView>              
                </View>                                              
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    saveAreaContainer: {
        flex: 1,
        marginTop: Platform.OS === 'android'? 15 : 0
    },
    generalContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.color_lightGreen,
    },
    usernameText: {
        fontStyle: 'italic',
        color: Colors.color_darkGreen
    },
    topContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    topTextContainer: {
        flex: 1
    },
    topRatingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    ratingText: {
        fontSize: 30,
        paddingRight: 5

    },
    descriptionContainer: {
        paddingTop: 20,
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
    }
});