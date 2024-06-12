import { 
    View, 
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Alert
} from 'react-native'

import Colors from '../../constants/colors';

import DateTimePicker from '@react-native-community/datetimepicker';

import { AntDesign } from '@expo/vector-icons';

import ButtonReport from '../../components/ButtonComponents/ButtonReport';
import ShowToSelect from '../../components/ModalComponents/ShowToSelect';
import LoadingOverlay from '../../components/LoadingOverlay';

import { useEffect, useLayoutEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { fetchGroupInfo } from '../../util/group-http';
import { fetchGeneralReport, fetchStudentReport } from '../../util/report-http';

export default function StudentReportScreen({route}) {
    const student = route.params.student

    const [showCalendar, setShowCalendar] = useState(false);
    const [showSubjects, setShowSubjects] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [labelDate, setLabelDate] = useState('SELECT MONTH');

    const [labelSubject, setLabelSubject] = useState('SELECT SUBJECT');
    const [originalSubjects, setOriginalSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('No subject');
    const [selectedSubjectGrade, setSelectedSubjectGrade] = useState(0);

    const [percentageComparation, setPercentageComparation] = useState(0);

    const [switchedToDay, setSwitchedToDay] = useState(true);

    const [bestSubject, setBestSubject] = useState('No subject');
    const [bestGrade, setBestGrade] = useState(0);

    const [worstSubject, setWorstSubject] = useState('No subject');
    const [worstGrade, setWorstGrade] = useState(0);

    const [firstEmoji, setFirstEmoji] = useState('🤑');
    const [firstEmotion, setFirstEmotion] = useState('First emotion');
    const [firstPercentage, setFirstPercentage] = useState(0);

    const [secondEmoji, setSecondEmoji] = useState('🤑');
    const [secondEmotion, setSecondEmotion] = useState('Second emotion');
    const [secondPercentage, setSecondPercentage] = useState(0);

    const [thirdEmoji, setThirdEmoji] = useState('🤑');
    const [thirdEmotion, setThirdEmotion] = useState('Third emotion');
    const [thirdPercentage, setThirdPercentage] = useState(0);

    const [averageEmotion, setAverageEmotion] = useState(0);
    const [averageTotal, setAverageTotal] = useState();
    const [normalDistribution, setNormalDistribution] = useState('NONE');
    const [correlation, setCorrelation] = useState('NONE');
    const [result, setResult] = useState('No results');

    const [checkNoData, setCheckNoData] = useState(false);
    const [infoIsLoading, setInfoIsLoading] = useState(true);
    const [updateInfo, setUpdateInfo] = useState(false);
    const isFocused = useIsFocused();

    const monthNames = {
        "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
        "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
    };

    const emojisEmotions = {
        "HAPPY": '😄', "SMILING": '🙂', "NEUTRAL": '😐', "SURPRISED": '😮', "ANGRY": '😠', "SAD": '😢'
    };

    useEffect(() => {
        setInfoIsLoading(true);
        async function getInfo() {
            try{
                const responseGroup = await fetchGroupInfo(student.group);
                setOriginalSubjects(responseGroup.data.subjects);      
                
                setInfoIsLoading(false); 
            } catch (error){
                console.log(error)
            }
        }       
        
        getInfo();
    }, [isFocused]);

    function onSelectDate(event, valueDate){
        setShowCalendar(false);
        setLabelDate(`${Object.keys(monthNames)[valueDate.getUTCMonth()].toString().toUpperCase()} ${valueDate.getUTCDate()}`);       
        setSelectedDate(valueDate);
        setShowContent(false);
    }

    function onSelectSubject(valueSubject) {
        setShowContent(false);
        setLabelSubject(valueSubject.toUpperCase());
        setSelectedSubject(valueSubject);
        setShowSubjects(false);
    }

    function checkCorrelation(value) {
        let r = value;
        r < -1 ? r = -1 : r > 1 ? r = 1 : r = value;
        if (r >= -1 && r <= -0.7) {
            return 'INVERSELY';
        } else if (r > -0.7 && r < 0.7) {
            return 'NO CORRELATION';
        } else if (r >= 0.7 && r <= 1) {
            return 'DIRECTLY';
        }
    }
    function checkSurveyValues(values) {
        let review = ""
        if (values['MATERIAL'] <= 5) {
            review += "- Improve the material used or use extra support material.\n";
        }
        if (values['SPACE'] <= 5) {
            review += "- Improve the space where the student is, a more comfortable space or with fewer interruptions.\n";
        }
        if (values['TEACHER'] <= 5) {
            review += "- Consider acquiring a private tutor or changing instructors.\n";
        } 
        return review;
    }
    async function showHandler(modeDay) {
        setShowContent(true);
        setUpdateInfo(true);
        setSwitchedToDay(modeDay);
        try {
            const responseStudent = await fetchStudentReport(selectedDate, student.id, selectedSubject, modeDay);

            if (isNaN(responseStudent.choosenGradeAverage) || isNaN(responseStudent.choosenReportAverage)){
                setCheckNoData(true);
                setUpdateInfo(false);                
            } else { 
                setCheckNoData(false); 
            };
            //BEST SUBJECT
            setBestSubject(responseStudent.bestGrade.subject);
            setBestGrade(parseFloat(responseStudent.bestGrade.grade).toFixed(2));
            //WORST SUBJECT
            setWorstSubject(responseStudent.worstGrade.subject);
            setWorstGrade(parseFloat(responseStudent.worstGrade.grade).toFixed(2));
            //CURRENT SUBJECT
            setSelectedSubject(selectedSubject);
            setSelectedSubjectGrade(parseFloat(responseStudent.choosenGradeAverage).toFixed(2));
            // PREVIOUS MONTH
            if(!isNaN(responseStudent.choosenPreviousAverage)) {
                setPercentageComparation((((responseStudent.choosenGradeAverage - responseStudent.choosenPreviousAverage)/responseStudent.choosenPreviousAverage)*100).toFixed(3));
            }
            //3 EMOTIONS
            setFirstEmotion(Object.keys(responseStudent.choosenReport[0])[0]);
            setFirstEmoji(emojisEmotions[Object.keys(responseStudent.choosenReport[0])[0]]);
            setFirstPercentage(parseFloat(Object.values(responseStudent.choosenReport[0])[0]).toFixed(3));

            setSecondEmotion(Object.keys(responseStudent.choosenReport[1])[0]);
            setSecondEmoji(emojisEmotions[Object.keys(responseStudent.choosenReport[1])[0]]);
            setSecondPercentage(parseFloat(Object.values(responseStudent.choosenReport[1])[0]).toFixed(3));

            setThirdEmotion(Object.keys(responseStudent.choosenReport[2])[0]);
            setThirdEmoji(emojisEmotions[Object.keys(responseStudent.choosenReport[2])[0]]);
            setThirdPercentage(parseFloat(Object.values(responseStudent.choosenReport[2])[0]).toFixed(3));
            //AVERAGE EMOTIONS
            setAverageEmotion(responseStudent.choosenReportAverage);
            //NORMAL DISTRIBUTION
            responseStudent.normalDistribution ? setNormalDistribution('YES') : setNormalDistribution('NO');
            //PEARSON CORRELATION
            setCorrelation(checkCorrelation(responseStudent.correlation));
            //SURVEYS AVERAGE VALUES
            setAverageTotal(responseStudent.surveyAverage);
            //FINAL RESULT
            if(responseStudent.choosenReportAverage >= 3) {
                let distributionText = "";
                if(!responseStudent.normalDistribution) {
                    distributionText = "- Emotional instability.\n\n";
                } else {
                    distributionText = "- Normal change of emotions.\n\n";
                }
                const correlationValue = checkCorrelation(responseStudent.correlation);
                const surveyValues = checkSurveyValues(responseStudent.surveyAverage);
                if (correlationValue === 'INVERSELY') {
                    setResult(distributionText + '- Consider eliminating possible distractions such as cell phones, video games, etc.\n\n' + surveyValues);
                } else if (correlationValue === 'NO CORRELATION') {
                    setResult(distributionText + '- No evidence of emotional interference or relationship.\n\n' + surveyValues);
                } else if (correlationValue === 'DIRECTLY') {
                    setResult(distributionText + '- Excellent.\n\n' + surveyValues);
                }
            } else {
                let distributionText = "";
                if(!responseStudent.normalDistribution) {
                    distributionText = "- Emotional instability.\n\n";
                } else {
                    distributionText = "- Normal change of emotions.\n\n";
                }
                const correlationValue = checkCorrelation(responseStudent.correlation);
                const surveyValues = checkSurveyValues(responseStudent.surveyAverage);
                if (correlationValue === 'INVERSELY') {
                    setResult(distributionText + '- Consider eliminating possible distractions such as cell phones, video games, etc.\n\n' + surveyValues);
                } else if (correlationValue === 'NO CORRELATION') {
                    setResult(distributionText + '- No evidence of emotional interference pr relationship.\n\n' + surveyValues);
                } else if (correlationValue === 'DIRECTLY') {
                    setResult(distributionText + '- Improve the students mood, recommend a psychological specialist.\n\n' + surveyValues);
                }                
            }
                           

            setUpdateInfo(false);
        } catch {}
    }

    function onShowHandler () {
        setLabelDate('CHANGE MONTH');
        setLabelSubject('CHANGE SUBJECT');
        showHandler(true);
    }
    function switchToDayHandler() {
        showHandler(true);
    }
    function switchToMonthHandler() {
        showHandler(false);
    }

    function onInfoAverageSurvey() {
        Alert.alert('What it means?', 'Score from 1 to 7, where 1 is the worst and 7 the best');
    }
    function onInfoAverageEmotion() {
        Alert.alert('What it means?', 'Emotions values: \n \n \
        HAPPY: 6         SMILING: 5 \n \
        NEUTRAL: 4    SURPRISED: 3 \n \
        ANGRY: 2        SAD: 1');
    }
    function onInfoNormalDistribution() {
        Alert.alert('What it means?', '\
        YES:\n \
            Most students share the same emotions.\n \
        NO:\n \
            Emotions between students look noticeably different.');
    }
    function onInfoCorrelation() {  
        Alert.alert('What it means?', '\
        DIRECTLY:\n \
            The better the emotions have been, the better the grades have been.\n \
        INVERSALY:\n \
            The better the emotions have been, the worse the grades have been.\n \
        NO CORRELATION\n \
            Grades are not affected by emotions of the students.');
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
                            text={labelDate}
                            onPressGeneral={() => setShowCalendar(true)}
                        />
                        <ButtonReport
                            text={labelSubject}
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
                        onSelect={onSelectSubject}
                        onBack={() => setShowSubjects(false)}
                    />
                </View>     
                {showCalendar && 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode='date'
                        onChange={onSelectDate}
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
                                Day: {selectedDate.getUTCDate().toString()}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={switchToMonthHandler}
                            style={{flex: 1}}
                        >
                            <Text style={!switchedToDay ? styles.monthOnButtonText : styles.monthOffButtonText}>
                                Month: {Object.keys(monthNames)[selectedDate.getUTCMonth()].toString()}
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
                                {checkNoData && 
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataText}>NO DATA FOUND OR SOMETHING IS MISSING</Text>
                                    </View>
                                }
                                {!checkNoData &&
                                    <View style={styles.infoContainer}>
                                        <View style={styles.compareContainer}>
                                            <Text style={styles.titleText}>With previous month: </Text>
                                            <Text style={styles.titleComparation}> {percentageComparation}%</Text>
                                        </View>
                                        <Text style={styles.titleText}>Average grade and emotions:</Text>
                                        <View style={styles.subjectContainer}>                        
                                            <Text style={styles.gradeText}>{selectedSubjectGrade}</Text>
                                            <Text style={styles.subjectNameText}>{selectedSubject}</Text>
                                        </View>
                                        <View style={styles.firstEmotionContainer}>
                                            <Text style={styles.emotionEmojiText}>{firstEmoji}</Text>
                                            <Text style={styles.emotionNameText}>{firstEmotion}</Text> 
                                            <Text style={styles.emotionPercentageText}>{firstPercentage}%</Text>
                                        </View>
                                        <View style={styles.secondEmotionContainer}>
                                            <Text style={styles.emotionEmojiText}>{secondEmoji}</Text>
                                            <Text style={styles.emotionNameText}>{secondEmotion}</Text>
                                            <Text style={styles.emotionPercentageText}>{secondPercentage}%</Text>
                                        </View>
                                        <View style={styles.thirdEmotionContainer}>
                                            <Text style={styles.emotionEmojiText}>{thirdEmoji}</Text>
                                            <Text style={styles.emotionNameText}>{thirdEmotion}</Text>
                                            <Text style={styles.emotionPercentageText}>{thirdPercentage}%</Text>
                                        </View>
                                        <Text style={styles.titleText}>Survey:</Text>
                                        <View style={styles.infoContainer}>
                                            <View style={styles.averageContainer}>
                                                <Text style={styles.averageLabel}>Material: </Text>
                                                <Text style={styles.averageResultText}>{parseFloat(averageTotal['MATERIAL']).toFixed(2)}</Text>
                                                <Pressable onPress={onInfoAverageSurvey}>
                                                    <AntDesign name="questioncircleo" size={20} color={Colors.color_darkGreen}/>
                                                </Pressable>
                                            </View>
                                            <View style={styles.averageContainer}>
                                                <Text style={styles.averageLabel}>Teacher: </Text>
                                                <Text style={styles.averageResultText}>{parseFloat(averageTotal['TEACHER']).toFixed(2)}</Text>
                                                <Pressable onPress={onInfoAverageSurvey}>
                                                    <AntDesign name="questioncircleo" size={20} color={Colors.color_darkGreen}/>
                                                </Pressable>
                                            </View>
                                            <View style={styles.averageContainer}>
                                                <Text style={styles.averageLabel}>Space: </Text>
                                                <Text style={styles.averageResultText}>{parseFloat(averageTotal['SPACE']).toFixed(2)}</Text>
                                                <Pressable onPress={onInfoAverageSurvey}>
                                                    <AntDesign name="questioncircleo" size={20} color={Colors.color_darkGreen}/>
                                                </Pressable>
                                            </View>
                                        </View>
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
                                        {!switchedToDay &&
                                            <View>
                                                <Text style={styles.titleText}>Stats:</Text>
                                                <View style={styles.infoContainer}>
                                                    <View style={styles.averageContainer}>
                                                        <Text style={styles.averageLabel}>Average emotion: </Text>
                                                        <Text style={styles.averageResultText}>{averageEmotion}</Text>
                                                        <Pressable onPress={onInfoAverageEmotion}>
                                                            <AntDesign name="questioncircleo" size={20} color={Colors.color_darkGreen}/>
                                                        </Pressable>
                                                    </View>
                                                    <View style={styles.averageContainer}>
                                                        <Text style={styles.averageLabel}>Normal distribution: </Text>
                                                        <Text style={styles.averageResultText}>{normalDistribution}</Text>
                                                        <Pressable onPress={onInfoNormalDistribution}>
                                                            <AntDesign name="questioncircleo" size={20} color={Colors.color_darkGreen}/>
                                                        </Pressable>
                                                    </View>
                                                    <View style={styles.averageContainer}>
                                                        <Text style={styles.averageLabel}>Correlation: </Text>
                                                        <Text style={styles.averageResultText}>{correlation}</Text>
                                                        <Pressable onPress={onInfoCorrelation}>
                                                            <AntDesign name="questioncircleo" size={20} color={Colors.color_darkGreen}/>
                                                        </Pressable>                                            
                                                    </View>
                                                    <Text style={styles.resultLabel}>Result: </Text>
                                                    <Text style={styles.resultContentText}>{result}</Text>
                                                </View>
                                            </View>
                                        }                                      
                                    </View>
                                }
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
    compareContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleComparation: {
        color: Colors.color_black,
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 10
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
        marginBottom: 20
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
    },
    infoContainer: {
        paddingHorizontal: 20,
        //backgroundColor: Colors.bg_blue,
        width: '100%'
    },
    noDataContainer: {
        marginVertical: 200,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    noDataText: {
        color: Colors.gray_placeholder,
        fontSize: 25,
        fontWeight: 'bold'
    },
    averageContainer: {
        flexDirection: 'row' ,
        //backgroundColor: Colors.bg_pink,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15 
    },
    averageLabel: {
        fontWeight: 'bold',
        fontSize: 16, 
        color: Colors.color_darkGreen,
        flex: 1
    },
    averageResultText: {
        backgroundColor: Colors.color_lightGreen,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 10,
        marginRight: 10
    },
    resultLabel: {
        fontWeight: 'bold',
        color: Colors.color_lightGreen,
        marginBottom: 10,
        fontSize: 25,
        marginTop: 10,
    },
    resultContentText: {
        color: Colors.color_darkGreen,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 50
    }
});