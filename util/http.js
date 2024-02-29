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

export async function createNewNotification(newNotificationData) {
    await axios.post(
        `${BACKEND_URL}/notifications.json`,
        newNotificationData
    );
}

export async function fetchAllNotifications(idUser) {
    const response = await axios.get(BACKEND_URL + '/notifications.json');

    const getNotifications = (id) => Object.entries(response.data)
    .filter(([_, notification]) => notification.toId === id)
    .map(([notificationId, notificationData]) => ({ id: notificationId, data: notificationData }));

    return getNotifications(idUser);
}

export async function fetchRequestToJoin(idUser) {
    try {
        const response = await axios.get(`${BACKEND_URL}/notifications.json`);
        
        for(let key in response.data) {
            if (response.data[key].type === 'studentJoinSchool' && response.data[key].fromId === idUser) {
                return {id: key, data: response.data[key]};
            } 
        }
    } catch {
        return null;
    }
}

export async function changeStatusRequest(id, status) {
    await axios.patch(
        `${BACKEND_URL}/notifications/${id}.json`,
        {status: status}
    );

}

export async function linkStudentWithSchool(idStudent, idSchool, nameGroup) {
    const response = await axios.get(`${BACKEND_URL}/users/Student.json`);

    function findStudent () {
        for(let key in response.data) {
            if (response.data[key].id === idStudent) {
                return key;
            }
        }
    }

    await axios.patch(
        `${BACKEND_URL}/users/Student/${findStudent()}.json`, {
            school: idSchool,
            group: nameGroup        
        }
    );

}

export async function deleteRequestNotification(id) {
    await axios.delete(
        `${BACKEND_URL}/notifications/${id}.json`,
    );
}

export async function fetchSchools() {
    const { data } = await axios.get(`${BACKEND_URL}/users/School.json`);
    const schools = Object.values(data);

    return schools;
}

export async function fetchGroups(id) {
    const response = await axios.get(BACKEND_URL + '/groups.json');

    const getGroups = (id) => Object.entries(response.data)
    .filter(([_, group]) => group.school === id)
    .map(([groupId, groupData]) => ({ id: groupId, data: groupData }));

    return getGroups(id);
} 

// export async function fetchStudent(id) {
//     const response = await axios.get(BACKEND_URL + '/users/Student.json');

//     const groups = Object.values(response.data)
//         .reduce((acc, item) => item.school === id ? [...acc, item.name] : acc, []);

//     return groups;
// } 


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