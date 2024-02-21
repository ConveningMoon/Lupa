import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function registerNewUser(newUserData, typeUser) {    
    await axios.post(
        `${BACKEND_URL}/users/${typeUser}.json`,
        newUserData
    );
}

export async function fetchUser(id){
    const responseSchool = await axios.get(BACKEND_URL + '/users/School.json');
    // const responseStudent = await axios.get(BACKEND_URL + '/users/Student.json');

    const schoolUser = Object.values(responseSchool.data).find(user => user.id === id);
    if (schoolUser) return { type: 'School', data: schoolUser };

    // const studentUser = Object.values(responseStudent.data).find(user => user.id === id);
    // if (studentUser) return { type: 'Student', data: studentUser };
}