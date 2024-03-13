import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function fetchParents(idStudent) {
    const response = await axios.get(`${BACKEND_URL}/users/Parent.json`);
    return Object.values(response.data).filter(parent => 
        parent.students.includes(idStudent)
    );
}