import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchReport(valueDate, valueStudentId, valueSubject, forDay) {
    const responseGrades = await axios.get(`${BACKEND_URL}/grades.json`);
    const responseReports = await axios.get(`${BACKEND_URL}/reports.json`);

    const valueDay = new Date(valueDate).getUTCDate();
    const valueMonth = new Date(valueDate).getUTCMonth();

    //STARTING GRADES ANALYSIS
    const finalReport = {};

    const filterGrades = forDay ? Object.values(responseGrades.data).filter(grade => 
        (   
            new Date(grade.datetime).getUTCDate() === valueDay && 
            new Date(grade.datetime).getUTCMonth() === valueMonth
        )
    ) : Object.values(responseGrades.data).filter(grade => 
        (    
            new Date(grade.datetime).getUTCMonth() === valueMonth
        )
    );

    let sumChoosenGrades = 0;
    let lengthChoosenGrades = 0;
    for (let element  in filterGrades) {
        for (let key in filterGrades[element].grades) {
            if (filterGrades[element].grades[key].studentId == valueStudentId && filterGrades[element].grades[key].subject === valueSubject) {
                sumChoosenGrades += filterGrades[element].grades[key].grade;
                lengthChoosenGrades += 1;
            }
        }
    }
    const averageChoosenGrade = sumChoosenGrades / lengthChoosenGrades;
    finalReport.choosenGrade = {'subject': valueSubject, 'grade': averageChoosenGrade};

    const listSubjectsNames = [];
    for (let element in filterGrades) {
        for (let key in filterGrades[element].grades) {
            if (filterGrades[element].grades[key].studentId == valueStudentId) {
                listSubjectsNames.push(filterGrades[element].grades[key].subject);
            }
        }
    }
    const subjectsGrades = {};
    for (let option in listSubjectsNames) {
        let currentSum = 0;
        let currentLength = 0;
        for (let element in filterGrades) {
            for (let key in filterGrades[element].grades) {
                if(filterGrades[element].grades[key].subject === listSubjectsNames[option] && filterGrades[element].grades[key].studentId === valueStudentId) {
                    currentSum += filterGrades[element].grades[key].grade;
                    currentLength += 1;
                }
            }             
        }
        subjectsGrades[listSubjectsNames[option]] = currentSum / currentLength;
    }

    let bestGrade = 0;
    let worstGrade = 10; //Change if the grades system change
    for (let key in subjectsGrades) {
        if (subjectsGrades[key] > bestGrade) {
            bestGrade = subjectsGrades[key];
        }
        if (subjectsGrades[key] < worstGrade) {
            worstGrade = subjectsGrades[key];
        }
    }

    for (let key in subjectsGrades) {
        if (subjectsGrades[key] == bestGrade) {
            finalReport.bestGrade = {'subject': key, 'grade': subjectsGrades[key]};
        }
        if (subjectsGrades[key] == worstGrade) {
            finalReport.worstGrade = {'subject': key, 'grade': subjectsGrades[key]};
        }
    }
    
    //STARTING EMOTION ANALYSIS
    const filterReports = forDay ? Object.values(responseReports.data).filter(report => 
        (   
            new Date(report.datetime).getUTCDate() === valueDay && 
            new Date(report.datetime).getUTCMonth() === valueMonth
        )
    ) : Object.values(responseReports.data).filter(report => 
        (    
            new Date(report.datetime).getUTCMonth() === valueMonth
        )
    );
    
    const listEmotionsNames = [];
    for (let element in filterReports) {
        if (filterReports[element].studentId === valueStudentId && filterReports[element].subject === valueSubject) {
            for (let key in filterReports[element].emotions) {
                listEmotionsNames.push(filterReports[element].emotions[key].emotion);
            }
        }
    }

    const subjectEmotions = [];
    for (let option in listEmotionsNames) {
        let currentEmotion = {};
        let currentSum = 0;
        let currentLength = 0; 
        for (let element in filterReports) {
            if (filterReports[element].studentId === valueStudentId && filterReports[element].subject === valueSubject) {
                for (let key in filterReports[element].emotions) {
                    if (filterReports[element].emotions[key].emotion === listEmotionsNames[option]) {
                        currentSum += filterReports[element].emotions[key].percentage;
                        currentLength += 1;
                    }
                }
            }
        }
        currentEmotion[listEmotionsNames[option]] = currentSum/currentLength;
        subjectEmotions.push(currentEmotion)
    }
    subjectEmotions.sort((a, b) => {
        // Extract values of the first entry of each dictionary
        let aValue = Object.values(a)[0];
        let bValue = Object.values(b)[0];
        
        // Compare the values
        return aValue + bValue;
    });

    finalReport.choosenReport = subjectEmotions;
    
    return finalReport;
}