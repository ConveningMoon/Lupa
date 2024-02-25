import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function registerNewUser(newUserData, typeUser) {    
    await axios.post(
        `${BACKEND_URL}/users/${typeUser}.json`,
        newUserData
    );
}

export async function registerNewGroup(newGroupData) {
    await axios.post(
        `${BACKEND_URL}/groups.json`,
        newGroupData
    );
}

export async function fetchGroup(id) {
    const response = await axios.get(BACKEND_URL + '/groups.json');

    const groups = Object.values(response.data)
        .reduce((acc, item) => item.school === id ? [...acc, item.name] : acc, []);

    return groups;
} 

export async function fetchUser(id){
    const responseUsers = await axios.get(BACKEND_URL + '/users.json');

    function findUserById(id) {
        for (let type in responseUsers.data) {
          for (let user in responseUsers.data[type]) {
            if (responseUsers.data[type][user].id === id) {
                return { type: type, data: responseUsers.data[type][user] };
            }
          }
        }
        return null;
    }

    return findUserById(id);
}