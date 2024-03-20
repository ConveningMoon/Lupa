import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchSubjects(idSchool) {
    const response = await axios.get(BACKEND_URL + '/subjects.json');

    const getSubjects = (idSchool) => Object.entries(response.data)
    .filter(([_, subject]) => (subject.school === idSchool))
    .map(([subjectId, subjectData]) => ({ id: subjectId, data: subjectData }));

    return getSubjects(idSchool);
} 

export async function deleteSubject(idSubject) {
    await axios.delete(
        `${BACKEND_URL}/subjects/${idSubject}.json`,
    );
}

export async function findSubjects(idSubjects) {
    const response = await axios.get(BACKEND_URL + '/subjects.json');

    const getSubjects = (idSubjects) => Object.entries(response.data)
    .filter(([key, _]) => (idSubjects.includes(key)))
    .map(([subjectId, subjectData]) => ({ id: subjectId, data: subjectData }));

    return getSubjects(idSubjects);
} 