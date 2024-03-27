import { 
    View, 
    Text,
    StyleSheet,
    Pressable,
    ScrollView
} from 'react-native'

import Colors from '../../constants/colors';

import DateTimePicker from '@react-native-community/datetimepicker';

import ButtonReport from '../../components/ButtonComponents/ButtonReport';
import ShowToSelect from '../../components/ModalComponents/ShowToSelect';

import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { fetchGroupInfo } from '../../util/group-http';

export default function MainReportScreen({route}) {
    const student = route.params.student

    const [showCalendar, setShowCalendar] = useState(false);
    const [showSubjects, setShowSubjects] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const [month, setMonth] = useState('No month');
    const [originalSubjects, setOriginalSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('No subject');

    const isFocused = useIsFocused();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        async function getSubjects() {
            try{
                const responseGroup = await fetchGroupInfo(student.data.group);
                setOriginalSubjects(responseGroup.data.subjects);
            } catch{}
        }       
        
        getSubjects();
    }, [isFocused]);

    function onSelectData(event, selectedDate){
        setShowCalendar(false);
        setMonth(monthNames[selectedDate.getMonth()]);
    }

    return (
        <ScrollView>
            <View style={styles.globalContainer}>
                <View style={styles.buttonContainer}>
                    <View style={styles.chooseButtonsContainer}>
                        <ButtonReport
                            text='CHOOSE MONTH'
                            onPressGeneral={() => setShowCalendar(true)}
                        />
                        <ButtonReport
                            text='CHOOSE SUBJECT'
                            onPressGeneral={() => setShowSubjects(true)}
                        />
                    </View>
                    <View style={styles.showContainer}>
                        <View style={styles.showButton}>
                            <ButtonReport
                                text='SHOW REPORT'
                                onPressGeneral={() => setShowReport(true)}
                            />
                        </View>
                        <View style={styles.selectionsContainer}>
                            <Text style={styles.monthText}>Month: {month}</Text>
                            <Text style={styles.subjectText}>Subject: {selectedSubject}</Text>
                        </View>
                    </View>
                    <ShowToSelect
                        visible={showSubjects}
                        elements={originalSubjects}
                        onSelect={setSelectedSubject}
                        onBack={() => setShowSubjects(false)}
                    />
                </View>
            
                {showCalendar && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode='date'
                        onChange={onSelectData}
                        maximumDate={new Date()} 
                    />
                )}
                <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>Best subject</Text>
                    <View style={styles.subjectContainer}>
                        <Text style={styles.gradeText}>10.0</Text>
                        <Text style={styles.subjectNameText}>Maths</Text>
                    </View>
                    <Text style={styles.titleText}>Worst subject</Text>
                    <View style={styles.subjectContainer}>                        
                        <Text style={styles.gradeText}>5.0</Text>
                        <Text style={styles.subjectNameText}>Physics</Text>
                    </View>
                    <Text style={styles.titleText}>Emotion report</Text>
                    <Text style={styles.subjectTitleText}>{selectedSubject}</Text>
                    <View style={styles.firstEmotionContainer}>
                        <Text style={styles.emotionEmojiText}>&#x1F625;</Text>
                        <Text style={styles.emotionNameText}>Sad</Text>
                        <Text style={styles.emotionPercentageText}>47%</Text>
                    </View>
                    <View style={styles.secondEmotionContainer}>
                        <Text style={styles.emotionEmojiText}>&#x1F620;</Text>
                        <Text style={styles.emotionNameText}>Angry</Text>
                        <Text style={styles.emotionPercentageText}>20%</Text>
                    </View>
                    <View style={styles.thirdEmotionContainer}>
                        <Text style={styles.emotionEmojiText}>&#x1F634;</Text>
                        <Text style={styles.emotionNameText}>Tired or bored</Text>
                        <Text style={styles.emotionPercentageText}>5%</Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        //backgroundColor: Colors.bg_pink
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
    },
    chooseButtonsContainer: {
        flex: 1
        //paddingRight: '40%'
    },
    showContainer: {
        flex: 1,
    },
    showButton: {
        paddingHorizontal: 25
    },
    selectionsContainer: {
        alignItems: 'center'
    },
    monthText: {
        color: Colors.color_darkBlue,
        fontWeight: 'bold'
    },
    subjectText: {
        color: Colors.color_darkBlue,
        fontWeight: 'bold'
    },
    contentContainer: {
        //backgroundColor: Colors.bg_pink,
        alignItems: 'center',
        marginVertical: 30
    },
    subjectContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginBottom: 30
        //backgroundColor: Colors.bg_blue,
    },
    titleText: {
        color: Colors.gray_placeholder,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10
    },
    subjectTitleText: {
        fontSize: 25,
        color: Colors.color_darkGreen,
        fontWeight: 'bold',
        marginBottom: 10
    },
    gradeText: {
        flex: 1,
        //backgroundColor: Colors.bg_red,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
    subjectNameText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.color_darkGreen
    },
    firstEmotionContainer: {
        flexDirection: 'row',
        backgroundColor: '#a4bbbf',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    secondEmotionContainer: {
        flexDirection: 'row',
        backgroundColor: '#bbcccf',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    thirdEmotionContainer: {
        flexDirection: 'row',
        backgroundColor: '#d2dddf',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    emotionEmojiText: {
        fontSize: 25
    },
    emotionNameText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    emotionPercentageText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});