import axios from "axios";

export function registerNewUser(newUserData) {
    axios.post(
        'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app/user.json',
        newUserData
    );
}