import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function addNewGrades(gradesData) {
    await axios.post(
        `${BACKEND_URL}/grades.json`,
        gradesData
    );
}