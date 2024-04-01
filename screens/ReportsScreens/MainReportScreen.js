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
import LoadingOverlay from '../../components/LoadingOverlay';

import { useEffect, useLayoutEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { fetchGroupInfo } from '../../util/group-http';
import { fetchReport } from '../../util/report-http';

export default function MainReportScreen({route}) {
    const student = route.params.student

    const [showCalendar, setShowCalendar] = useState(false);
    const [showSubjects, setShowSubjects] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [originalSubjects, setOriginalSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('No subject');
    const [selectedSubjectGrade, setSelectedSubjectGrade] = useState(0);

    const [switchedToDay, setSwitchedToDay] = useState(true);

    const [bestSubject, setBestSubject] = useState('No subject');
    const [bestGrade, setBestGrade] = useState(0);

    const [worstSubject, setWorstSubject] = useState('No subject');
    const [worstGrade, setWorstGrade] = useState(0);

    const [firstEmotion, setFirstEmotion] = useState('First emotion');
    const [firstPercentage, setFirstPercentage] = useState(0);

    const [secondEmotion, setSecondEmotion] = useState('Second emotion');
    const [secondPercentage, setSecondPercentage] = useState(0);

    const [thirdEmotion, setThirdEmotion] = useState('Third emotion');
    const [thirdPercentage, setThirdPercentage] = useState(0);


    const [infoIsLoading, setInfoIsLoading] = useState(true);
    const [updateInfo, setUpdateInfo] = useState(false);
    const isFocused = useIsFocused();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        setInfoIsLoading(true);
        async function getInfo() {
            try{
                const responseGroup = await fetchGroupInfo(student.data.group);
                setOriginalSubjects(responseGroup.data.subjects);      
                
                setInfoIsLoading(false); 
            } catch (error){
                console.log(error)
            }
        }       
        
        getInfo();
    }, [isFocused]);

    function onSelectData(event, valueDate){
        setShowCalendar(false);        
        setSelectedDate(valueDate);
    }

    async function showHandler(modeDay) {
        setUpdateInfo(true);
        setSwitchedToDay(modeDay);
        try {
            const response = await fetchReport(selectedDate, student.data.id, selectedSubject, modeDay);
            
            setBestSubject(response.bestGrade.subject);
            setBestGrade(parseFloat(response.bestGrade.grade).toFixed(2));

            setWorstSubject(response.worstGrade.subject);
            setWorstGrade(parseFloat(response.worstGrade.grade).toFixed(2));

            setSelectedSubject(response.choosenGrade.subject);
            setSelectedSubjectGrade(parseFloat(response.choosenGrade.grade).toFixed(2));

            setFirstEmotion(Object.keys(response.choosenReport[0])[0]);
            setFirstPercentage(parseFloat(Object.values(response.choosenReport[0])[0]).toFixed(3));

            setSecondEmotion(Object.keys(response.choosenReport[1])[0]);
            setSecondPercentage(parseFloat(Object.values(response.choosenReport[1])[0]).toFixed(3));

            setThirdEmotion(Object.keys(response.choosenReport[2])[0]);
            setThirdPercentage(parseFloat(Object.values(response.choosenReport[2])[0]).toFixed(3));

            setShowContent(true);
            setUpdateInfo(false);
        } catch {}
    }

    function onShowHandler () {
        showHandler(true);
    }
    function switchToDayHandler() {
        showHandler(true);
    }
    function switchToMonthHandler() {
        showHandler(false);
    }

    if (infoIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (
        <ScrollView style={showContent ? {backgroundColor: 'white'} : {backgroundColor: Colors.color_darkBlue}}>
            <View style={styles.globalContainer}>
                <View style={styles.buttonContainer}>
                    <View style={styles.chooseButtonsContainer}>
                        <ButtonReport
                            text='CHANGE DATE'
                            onPressGeneral={() => setShowCalendar(true)}
                        />
                        <ButtonReport
                            text='CHANGE SUBJECT'
                            onPressGeneral={() => setShowSubjects(true)}
                        />
                    </View>
                    <View style={styles.showButton}>
                        <ButtonReport
                            text='SHOW REPORT'
                            onPressGeneral={onShowHandler}
                        />
                    </View>
                    <ShowToSelect
                        visible={showSubjects}
                        elements={originalSubjects}
                        onSelect={setSelectedSubject}
                        onBack={() => setShowSubjects(false)}
                    />
                </View>            
                {showCalendar && 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode='date'
                        onChange={onSelectData}
                        maximumDate={new Date()} 
                    />
                }
                {showContent && 
                    <View style={styles.datesButtonsContainer}>
                        <Pressable
                            onPress={switchToDayHandler}
                            style={{flex: 1}}
                        >
                            <Text style={switchedToDay ? styles.dayOnButtonText : styles.dayOffButtonText}>
                                Day: {selectedDate.getUTCDate().toString()}.{(selectedDate.getUTCMonth() + 1).toString()}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={switchToMonthHandler}
                            style={{flex: 1}}
                        >
                            <Text style={!switchedToDay ? styles.monthOnButtonText : styles.monthOffButtonText}>
                                Month: {monthNames[selectedDate.getUTCMonth()].toString()}
                            </Text>
                        </Pressable>
                    </View>
                }
                {showContent &&
                    <View>
                        {updateInfo &&
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>LOADING REPORT...</Text>
                            </View>
                        }
                        {!updateInfo && 
                            <View style={styles.contentContainer}>
                                <Text style={styles.titleText}>Best subject</Text>
                                <View style={styles.subjectContainer}>
                                    <Text style={styles.gradeText}>{bestGrade}</Text>
                                    <Text style={styles.subjectNameText}>{bestSubject}</Text>
                                </View>
                                <Text style={styles.titleText}>Worst subject</Text>
                                <View style={styles.subjectContainer}>                        
                                    <Text style={styles.gradeText}>{worstGrade}</Text>
                                    <Text style={styles.subjectNameText}>{worstSubject}</Text>
                                </View>
                                <Text style={styles.titleText}>Emotions and grade of:</Text>
                                <View style={styles.subjectContainer}>                        
                                    <Text style={styles.gradeText}>{selectedSubjectGrade}</Text>
                                    <Text style={styles.subjectNameText}>{selectedSubject}</Text>
                                </View>
                                <View style={styles.firstEmotionContainer}>
                                    <Text style={styles.emotionEmojiText}>&#x1F620;</Text>
                                    {/* <Text style={styles.emotionNameText}>{firstEmotion}</Text>  */}
                                    <Text style={styles.emotionNameText}>ANGRY</Text> 
                                    <Text style={styles.emotionPercentageText}>{firstPercentage}%</Text>
                                </View>
                                <View style={styles.secondEmotionContainer}>
                                    <Text style={styles.emotionEmojiText}>&#x1F614;</Text>
                                    <Text style={styles.emotionNameText}>{secondEmotion}</Text>
                                    <Text style={styles.emotionPercentageText}>{secondPercentage}%</Text>
                                </View>
                                <View style={styles.thirdEmotionContainer}>
                                    <Text style={styles.emotionEmojiText}>&#x1F604;</Text>
                                    {/* <Text style={styles.emotionNameText}>{thirdEmotion}</Text> */}
                                    <Text style={styles.emotionNameText}>HAPPY</Text>
                                    <Text style={styles.emotionPercentageText}>{thirdPercentage}%</Text>
                                </View>
                            </View>
                        }   
                    </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        //backgroundColor: Colors.bg_pink
    },
    buttonContainer: {
        backgroundColor: Colors.color_darkBlue,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    chooseButtonsContainer: {
        //backgroundColor: Colors.bg_blue,
        flexDirection: 'row',
        justifyContent: 'space-between'
        //paddingRight: '40%'
    },
    showButton: {
        marginVertical: 10
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
        alignItems: 'center',
        marginTop: 10
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
    },
    datesButtonsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.color_darkBlue
    },
    dayOnButtonText: {
        color: Colors.color_darkBlue,
        backgroundColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
    }, 
    dayOffButtonText: {
        color: 'white',
        backgroundColor: Colors.color_darkBlue,
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 20
    },
    monthOnButtonText: {
        color: Colors.color_darkBlue,
        backgroundColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    }, 
    monthOffButtonText: {
        color: 'white',
        backgroundColor: Colors.color_darkBlue,
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    loadingContainer: {
        marginTop: 200,
        alignItems: 'center'
    },
    loadingText: {
        color: Colors.color_lightGreen,
        fontSize: 25,
        fontWeight: 'bold'
    }
});