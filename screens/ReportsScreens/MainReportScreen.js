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

import { findSubjects } from '../../util/subject-http';
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
                const responseSubjects = await findSubjects(responseGroup.data.subjects);
                setOriginalSubjects(responseSubjects);
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
    }
});