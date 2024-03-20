import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchSchools() {
    const { data } = await axios.get(`${BACKEND_URL}/users/School.json`);
    const schools = Object.values(data);

    return schools;
}

export async function fetchSchoolInfo(idSchool) {
    const response = await axios.get(BACKEND_URL + '/users/School.json');

    for(let key in response.data) {
        if(response.data[key].id === idSchool) {
            return response.data[key];
        }
    }

}

export async function addSubjectToSchool(idSchool, newSubject) {
    const response = await axios.get(`${BACKEND_URL}/users/School.json`);

    function findSchool () {
        for(let key in response.data) {
            if (response.data[key].id === idSchool) {
                return {key: key, data: response.data[key]};
            }
        }
    }

    const school = findSchool();

    const listSubjectsToAdd = () => {
        if (school.data.subjects.length === 0) { 
            return [newSubject];
        } else {
            school.data.subjects.push(newSubject);
            return school.data.subjects;
        }
    };

    await axios.patch(
        `${BACKEND_URL}/users/School/${school.key}.json`, {
            subjects: listSubjectsToAdd(),       
        }
    );

}

export async function removeSubjectToSchool(idSchool, subjectName) {
    const response = await axios.get(`${BACKEND_URL}/users/School.json`);

    function findSchool () {
        for(let key in response.data) {
            if (response.data[key].id === idSchool) {
                return {key: key, data: response.data[key]};
            }
        }
    }

    const school = findSchool();

    const listSubjectsToPreserve = () => {
        const filter = school.data.subjects.filter(subject => subject !== subjectName);

        if (filter.length === 0) {
            return '';
        } else {
            return filter;
        } 
    };

    await axios.patch(
        `${BACKEND_URL}/users/School/${school.key}.json`, {
            subjects: listSubjectsToPreserve(),       
        }
    );

}