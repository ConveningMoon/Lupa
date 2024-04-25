import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchStudentReport(valueDate, valueStudentId, valueSubject, forDay) {
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
            let currentReport = 0;
            for (let key in filterReports[element].emotions) {
                listEmotionsNames.push(filterReports[element].emotions[key].emotion);
                currentReport += 1
                // if(currentReport === 3) {
                //     break;
                // }
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
        let aValue = Object.values(a)[0];
        let bValue = Object.values(b)[0];
        
        return bValue - aValue; // Sorting in descending order
    });

    finalReport.choosenReport = subjectEmotions;

    return finalReport;
}

export async function fetchGeneralReport(valueDate, valueGroupId, valueSubject, forDay, fromSubject, valueStudentId, fromStudent) {
    const responseGrades = await axios.get(`${BACKEND_URL}/grades.json`);
    const responseReports = await axios.get(`${BACKEND_URL}/reports.json`);
    const responseStudents = await axios.get(`${BACKEND_URL}/users/Student.json`);
    const responseGroups = await axios.get(`${BACKEND_URL}/groups.json`);

    const valueDay = new Date(valueDate).getUTCDate();
    const valueMonth = new Date(valueDate).getUTCMonth();

    const listGroups = Object.entries(responseGroups.data)
    .filter(([_, group]) => (group.subjects.includes(valueSubject)))
    .map(([groupId, _]) => (groupId ));

    const listStudents = fromSubject ? Object.values(responseStudents.data).filter(student => 
        (listGroups.includes(student.group))
    ).map(student => student.id) : fromStudent ? Object.values(responseStudents.data).filter(student => 
        (student.id === valueStudentId)
    ).map(student => student.id) : Object.values(responseStudents.data).filter(student => 
        (student.group === valueGroupId)
    ).map(student => student.id);
  
    const finalReport = {};

    //STARTING GRADES CALCULATION
    const filterGrades = forDay ? Object.values(responseGrades.data).filter(grade => 
        (   
            new Date(grade.datetime).getUTCDate() === valueDay && 
            new Date(grade.datetime).getUTCMonth() === valueMonth &&
            grade.grades[0].subject === valueSubject
        )
    ) : Object.values(responseGrades.data).filter(grade => 
        (    
            new Date(grade.datetime).getUTCMonth() === valueMonth &&
            grade.grades[0].subject === valueSubject
        )
    );

    const gradesInMonths = {};
    const listDaysInMonthGrades = [];
    for (let key in filterGrades) {
        if (!listDaysInMonthGrades.includes(new Date(filterGrades[key].datetime).getUTCDate())) {
            listDaysInMonthGrades.push(new Date(filterGrades[key].datetime).getUTCDate());
        }
    }

    for (let key in listDaysInMonthGrades) {
        gradesInMonths[listDaysInMonthGrades[key]] = [];
    }

    for (let element  in filterGrades) {
        for (let key in filterGrades[element].grades) {
            if (listStudents.includes(filterGrades[element].grades[key].studentId)) {
                gradesInMonths[new Date(filterGrades[element].datetime).getUTCDate()].push(filterGrades[element].grades[key].grade);
            }
        }
    }

    for (let key in gradesInMonths) {
        const averageGrades = calculateMean(gradesInMonths[key]);
        gradesInMonths[key] = averageGrades;
    }

    //const averageChoosenGrade = sumChoosenGrades / lengthChoosenGrades;
    finalReport.choosenGradeAverage = calculateMean(Object.values(gradesInMonths));

    //STARTING EMOTION ANALYSIS\
    const emotionsValues = {
        "HAPPY": 6, "SMILING": 5, "NEUTRAL": 4, "SURPRISED": 3, "ANGRY": 2, "SAD": 1
    }
    const filterReports = forDay ? Object.values(responseReports.data).filter(report => 
        (   
            new Date(report.datetime).getUTCDate() === valueDay && 
            new Date(report.datetime).getUTCMonth() === valueMonth &&
            report.subject === valueSubject
        )
    ) : Object.values(responseReports.data).filter(report => 
        (    
            new Date(report.datetime).getUTCMonth() === valueMonth &&
            report.subject === valueSubject
        )
    );

    const emotionsInMonths = {};
    const listDaysInMonthReports = [];
    for (let key in filterReports) {
        if (!listDaysInMonthReports.includes(new Date(filterReports[key].datetime).getUTCDate())) {
            listDaysInMonthReports.push(new Date(filterReports[key].datetime).getUTCDate());
        }
    }

    for (let key in listDaysInMonthReports) {
        emotionsInMonths[listDaysInMonthReports[key]] = [];
    }

    for (let element in filterReports) {
        if (listStudents.includes(filterReports[element].studentId)) {
            let currentSum = 0;
            let currentLength = 0;
            for (let key in filterReports[element].emotions) {
                currentSum += emotionsValues[filterReports[element].emotions[key].emotion];
                currentLength += 1
            }
            emotionsInMonths[new Date(filterReports[element].datetime).getUTCDate()].push(currentSum/currentLength);
        }
    }
    
    for (let key in emotionsInMonths) {
        const averageEmotions = calculateMean(emotionsInMonths[key]);
        emotionsInMonths[key] = averageEmotions;
    }
    finalReport.choosenReportAverage = calculateMean(Object.values(emotionsInMonths));
    
    //CHECKING NORMAL DISTRIBUTION
    function calculateMean(data) {
        return data.reduce((acc, val) => acc + val, 0) / data.length;
    }
    
    function calculateStandardDeviation(data, mean) {
        const squareDiffs = data.map(value => Math.pow(value - mean, 2));
        const avgSquareDiff = calculateMean(squareDiffs);
        return Math.sqrt(avgSquareDiff);
    }
    
    function skewness(data) {
        let mean = calculateMean(data);
        let stdDev = calculateStandardDeviation(data, mean);
        let n = data.length;
        let skewness = data.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / n;
        return skewness / Math.pow(stdDev, 3);
    }
    
    function kurtosis(data) {
        let mean = calculateMean(data);
        let stdDev = calculateStandardDeviation(data, mean);
        let n = data.length;
        let kurtosis = data.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0) / n;
        return (kurtosis / Math.pow(stdDev, 4)) - 3;
    }
    
    function checkNormality(data) {
        let dataSkewness = skewness(data);
        let dataKurtosis = kurtosis(data);
        if(Math.abs(dataSkewness) > 2 || Math.abs(dataKurtosis) > 2) {
            return false;
        } else {
            return true;
        }
    }
    
    finalReport.normalDistribution = checkNormality(Object.values(emotionsInMonths));

    const finalListEmotions = [];
    const finalListGrades = [];
    for (let key in emotionsInMonths) {
        finalListEmotions.push(emotionsInMonths[key]);
        finalListGrades.push(gradesInMonths[key]);
    } 

    function pearsonCorrelation(arr1, arr2) {
        let n = arr1.length;
        let sum1 = arr1.reduce((acc, val) => acc + val, 0);
        let sum2 = arr2.reduce((acc, val) => acc + val, 0);
        let sum1Sq = arr1.reduce((acc, val) => acc + val * val, 0);
        let sum2Sq = arr2.reduce((acc, val) => acc + val * val, 0);
        let pSum = arr1.map((val, i) => val * arr2[i]).reduce((acc, val) => acc + val, 0);
        
        let num = pSum - (sum1 * sum2 / n);
        let den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));
        
        if(den == 0) return 0;
        
        return num / den;
    }
    
    finalReport.correlation = pearsonCorrelation(finalListEmotions, finalListGrades);

    return finalReport;

    //console.log(finalReport);

}