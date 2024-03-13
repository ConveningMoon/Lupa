import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchStudents(id, fromSchool, fromGroup, fromParent, fromNewParent) {
    const response = await axios.get(`${BACKEND_URL}/users/Student.json`);
    
    return Object.values(response.data).filter(student => 
        (fromSchool && student.school === id) || 
        (fromGroup && student.group === id) ||
        (fromParent && student.parents.includes(id)) ||
        (fromNewParent && !student.parents.includes(id))
    );
}