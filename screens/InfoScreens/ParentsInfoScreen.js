import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    ScrollView,
} from 'react-native';

import { useEffect } from 'react';

import { useIsFocused } from '@react-navigation/native';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function ParentsInfoScreen({navigation, route}) {
    const user = route.params.user;
    
    // const [profileIsLoading, setProfileIsLoading] = useState(true);
    // const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {          
            // if (user.students.length !== 0) {
            //     setHaveStudent(true);
            //     checkRequestToAdd();
            // } else {
            //     checkRequestToAdd();
            // }
        };
    },[isFocused])

    function displayChildren() {
        navigation.navigate('Students', {
            id: user.id,
            fromSchool: false,
            fromGroup: false,
            fromParent: true,
            fromNewParent: false
        });
    }

    // if (profileIsLoading) {
    //     return <LoadingOverlay message="Loading information..." />;
    // }

    return (
        <SafeAreaView>
            <ScrollView 
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={refreshProfile} />
                // }
            >
                <View style={styles.globalContainer}>
                    <View style={styles.topInfoContainer}>
                        <View style={styles.nameUsernameContainer}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.usernameText}>{user.username}</Text>
                            <Text style={styles.emailText}>Contact: {user.emailContact}</Text>
                        </View>
                    </View>             
                    <View style={styles.allButtonsContainer}>
                        <ButtonInfoInput 
                            text='CHILDREN'
                            onPressGeneral={displayChildren}
                        />                
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10,
        //paddingBottom: 500
    },
    topInfoContainer: {
        flexDirection: 'row'
    },
    nameUsernameContainer: {
        flex: 1
    },
    userName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    usernameText: {
        fontStyle: 'italic',
        color: Colors.color_darkGreen,
        paddingHorizontal: 10
    },
    emailText: {
        marginLeft: 10,
        paddingTop: 10,
        fontSize: 12,
        paddingBottom: 10
    },
    schoolContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    schoolText: {
        textDecorationLine: 'underline',
        color: Colors.color_darkGreen,
        fontSize: 20,
        paddingLeft: 5
    },
    userGroup: {
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
        color: Colors.color_darkBlue,

    },
    userParents: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold'
    },
    joinSchoolContainer: {
        marginTop: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinSchoolPressableContainer: {
        flexDirection: 'row'
    },
    joinSchoolText: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 5
    },
    childrenContainer: {
        backgroundColor: Colors.bg_pink
    },
    allButtonsContainer: {
        paddingTop: 30,
        alignItems: 'center' 
    },
});