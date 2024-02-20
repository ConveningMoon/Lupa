import axios from "axios";

export function registerNewUser(newUserData, typeUser) {
    axios.post(
        'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',
        newUserData
    );
}