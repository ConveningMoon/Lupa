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

import { fetchGeneralReport, fetchReport } from '../../util/report-http';

export default function GroupReportScreen({route}) {
    const group = route.params.group

    const [labelSubject, setLabelSubject] = useState('SELECT SUBJECT');
    const [labelDate, setLabelDate] = useState('SELECT MONTH');

    const [showCalendar, setShowCalendar] = useState(false);
    const [showSubjects, setShowSubjects] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [selectedDate, setSelectedDate] = useState();
    const [selectedSubject, setSelectedSubject] = useState('No subject');

    const [averageGrade, setAverageGrade] = useState(0);
    const [averageEmotion, setAverageEmotion] = useState(0);
    const [normalDistribution, setNormalDistribution] = useState('NONE');
    const [correlation, setCorrelation] = useState('NONE');
    const [result, setResult] = useState('No results');

    const [switchedToDay, setSwitchedToDay] = useState(true);

    const [checkNoData, setCheckNoData] = useState(false);
    const [infoIsLoading, setInfoIsLoading] = useState(true);
    const [updateInfo, setUpdateInfo] = useState(false);
    const isFocused = useIsFocused();

    const monthNames = {
        "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
        "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
    };

    useEffect(() => {
        setInfoIsLoading(true);
        async function getInfo() {
            try{                 
                setInfoIsLoading(false); 
            } catch (error){
                console.log(error)
            }
        }       
        
        getInfo();
    }, [isFocused]);

    function onSelectDate(valueDate){
        const currentYear = new Date().getFullYear();

        setLabelDate(valueDate.toUpperCase());
        setShowCalendar(false);       
        setSelectedDate(new Date(`${currentYear}-${monthNames[valueDate]}-01`));
    }

    function onSelectSubject(valueSubject) {
        setLabelSubject(valueSubject.toUpperCase());
        setSelectedSubject(valueSubject);
        setShowSubjects(false);
    }

    function checkCorrelation(value) {
        let r = value;
        r < -1 ? r = -1 : r > 1 ? r = 1 : r = value;
        if (r >= -1 && r <= -0.2) {
            return 'INVERSELY';
        } else if (r > -0.2 && r <= 0.2) {
            return 'NO CORRELATION';
        } else if (r > 0.2 && r <= 1) {
            return 'DIRECTLY';
        }
    }
    async function showHandler(modeDay) {
        setInfoIsLoading(true);
        setSwitchedToDay(modeDay);
        try {
            const response = await fetchGeneralReport(selectedDate, group.id, selectedSubject, modeDay, false, '', false);
            
            isNaN(response.choosenGradeAverage) ? setCheckNoData(true) : setCheckNoData(false);

            setAverageGrade(response.choosenGradeAverage.toFixed(2));

            setAverageEmotion(response.choosenReportAverage.toFixed(2));

            response.normalDistribution ? setNormalDistribution('YES') : setNormalDistribution('NO');

            setCorrelation(checkCorrelation(response.correlation));

            if (response.choosenGradeAverage <= 10 && response.choosenGradeAverage >= 7) {
                response.normalDistribution ? setResult('EXCELLENT') : setResult('GOOD')
            } else if (response.choosenGradeAverage < 7 && response.choosenGradeAverage >= 5) {
                response.normalDistribution ? setResult('THE MATERIAL SHOULD BE IMPROVED') : setResult("THE STUDENT'S EMOTIONAL ENVIRONMENT SHOULD BE IMPROVED")
            } else if (response.choosenGradeAverage < 5 && response.choosenGradeAverage >= 0) {
                response.normalDistribution ? setResult('THE MATERIAL IS NOT WORKING') : setResult("THE STUDENT'S EMOTIONS HAVE PROBLEMS")
            }                       

            setShowContent(true);
            setInfoIsLoading(false);
        } catch {}
    }

    function onShowHandler () {
        setLabelDate('CHANGE MONTH');
        setLabelSubject('CHANGE SUBJECT');
        showHandler(false);
    }
    // function switchToDayHandler() {
    //     showHandler(true);
    // }
    // function switchToMonthHandler() {
    //     showHandler(false);
    // }
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
                        elements={group.data.subjects}
                        onSelect={onSelectSubject}
                        onBack={() => setShowSubjects(false)}
                    />
                    <ShowToSelect
                        visible={showCalendar}
                        elements={Object.keys(monthNames)}
                        onSelect={onSelectDate}
                        onBack={() => setShowCalendar(false)}
                    />
                </View>                      
                {showContent && 
                    <View style={styles.datesButtonsContainer}>
                        {/* <Pressable
                            onPress={switchToDayHandler}
                            style={{flex: 1}}
                        >
                            <Text style={switchedToDay ? styles.dayOnButtonText : styles.dayOffButtonText}>
                                Day: {selectedDate.getUTCDate().toString()}.{(selectedDate.getUTCMonth() + 1).toString()}
                            </Text>
                        </Pressable> */}
                        <Pressable
                            //onPress={switchToMonthHandler}
                            style={{flex: 1}}
                        >
                            <Text style={!switchedToDay ? styles.monthOnButtonText : styles.monthOffButtonText}>
                                Month: {selectedDate.toLocaleString('default', { month: 'long' })}      Subject: {selectedSubject}
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
                                        <Text style={styles.noDataText}>NO DATA FOUND</Text>
                                    </View>
                                }
                                {!checkNoData && 
                                    <View style={styles.infoContainer}>
                                        <View style={styles.averageContainer}>
                                            <Text style={styles.averageLabel}>Average grade: </Text>
                                            <Text style={styles.averageResultText}>{averageGrade}</Text>
                                        </View>
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
    noDataContainer: {
        marginTop: 200,
        alignItems: 'center'
    },
    noDataText: {
        color: Colors.color_darkBlue,
        fontSize: 25,
        fontWeight: 'bold'
    },
    infoContainer: {
        paddingHorizontal: 20,
        //backgroundColor: Colors.bg_blue,
        width: '100%'
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
        marginTop: 10
    }
});