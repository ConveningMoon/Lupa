import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchTeachers(id, fromSchool, fromGroup) {
    const response = await axios.get(`${BACKEND_URL}/users/Teacher.json`);
    return Object.values(response.data).filter(teacher => 
        (fromSchool && teacher.school === id) || 
        (fromGroup && teacher.groups.includes(id))
    );
}