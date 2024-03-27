import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function createNewClass(classData) {
    await axios.post(
        `${BACKEND_URL}/classes.json`,
        classData
    );
}

export async function checkClass(idTeacher) {
    const response = await axios.get(BACKEND_URL + '/classes.json');

    function findClass () {
        for(let key in response.data) {
            if (response.data[key].teacherId === idTeacher) {
                return {id: key, data: response.data[key]};
            }
        }
    }

    const classExist = findClass();

    if (!!classExist) {
        return {existed: true, info: classExist};
    } else {
        return {existed: false};
    }
}

export async function startClassStatus(idClass, newStatus) {
    const response = await axios.get(`${BACKEND_URL}/classes.json`);

    function findClass () {
        for(let key in response.data) {
            if (key === idClass) {
                return key;
            }
        }
    }

    await axios.patch(
        `${BACKEND_URL}/classes/${findClass()}.json`, newStatus
    );

}

export async function deleteClass(idClass) {
    await axios.delete(
        `${BACKEND_URL}/classes/${idClass}.json`,
    );
}

