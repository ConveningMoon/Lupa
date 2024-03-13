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