import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function registerNewUser(newUserData, typeUser) {    
    await axios.post(
        `${BACKEND_URL}/users/${typeUser}.json`,
        newUserData
    );
}

export async function existUsername(username) {
    const response = await axios.get(BACKEND_URL + '/users.json');

    function findUsername(username) {
        for (let type in response.data) {
          for (let user in response.data[type]) {
            if (response.data[type][user].username === username) {
                return true;
            }
          }
        }
        return false;
    }

    return findUsername(username);
}

export async function fetchAllUsersFromSomeType(type) {
    const { data } = await axios.get(`${BACKEND_URL}/users/${type}.json`);
    const users = Object.values(data);

    return users;
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

export async function changeUserInfo(idUser, typeUser, newInfo) {
    const response = await axios.get(`${BACKEND_URL}/users/${typeUser}.json`);

    function findUser () {
        for(let key in response.data) {
            if (response.data[key].id === idUser) {
                return key;
            }
        }
    }

    await axios.patch(
        `${BACKEND_URL}/users/${typeUser}/${findUser()}.json`, newInfo
    );

}