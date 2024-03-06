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

export async function fetchRequestToAddStudent(idUser) {
    try {
        const response = await axios.get(`${BACKEND_URL}/notifications.json`);
        
        for(let key in response.data) {
            if (response.data[key].type === 'addNewStudent' && response.data[key].fromId === idUser) {
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

export async function linkTeacherWithSchool(idTeacher, idSchool, listGroups) {
    const response = await axios.get(`${BACKEND_URL}/users/Teacher.json`);

    function findTeacher () {
        for(let key in response.data) {
            if (response.data[key].id === idTeacher) {
                return key;
            }
        }
    }

    await axios.patch(
        `${BACKEND_URL}/users/Teacher/${findTeacher()}.json`, {
            school: idSchool,
            groups: listGroups        
        }
    );

}

export async function linkStudentWithParent(idStudent, idParent) {
    const responseStudent = await axios.get(`${BACKEND_URL}/users/Student.json`);
    const responseParent = await axios.get(`${BACKEND_URL}/users/Parent.json`);

    function findStudent () {
        for(let key in responseStudent.data) {
            if (responseStudent.data[key].id === idStudent) {
                return {key: key, data: responseStudent.data[key]};
            }
        }
    }

    function findParent () {
        for(let key in responseParent.data) {
            if (responseParent.data[key].id === idParent) {
                return {key: key, data: responseParent.data[key]};
            }
        }
    }

    const student = findStudent();
    const parent = findParent();

    await axios.patch(
        `${BACKEND_URL}/users/Student/${student.key}.json`, {
            parents: [parent.data.id],       
        }
    );

    await axios.patch(
        `${BACKEND_URL}/users/Parent/${parent.key}.json`, {
            students: [student.data.id],       
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

export async function fetchStudents(id, fromSchool, fromGroup, fromParent, fromNewParent) {
    const response = await axios.get(`${BACKEND_URL}/users/Student.json`);
    
    return Object.values(response.data).filter(student => 
        (fromSchool && student.school === id) || 
        (fromGroup && student.group === id) ||
        (fromParent && student.parents.includes(id)) ||
        (fromNewParent)
    );
}

export async function fetchTeachers(id, fromSchool, fromGroup) {
    const response = await axios.get(`${BACKEND_URL}/users/Teacher.json`);
    return Object.values(response.data).filter(teacher => 
        (fromSchool && teacher.school === id) || 
        (fromGroup && teacher.groups.includes(id))
    );
}

export async function fetchParents(idStudent) {
    const response = await axios.get(`${BACKEND_URL}/users/Parent.json`);
    return Object.values(response.data).filter(parent => 
        parent.students.includes(idStudent)
    );
}

export async function fetchGroups(id, fromSchool, idGroups, fromTeacher) {
    const response = await axios.get(BACKEND_URL + '/groups.json');

    const getGroups = (id, idGroups) => Object.entries(response.data)
    .filter(([key, group]) => (fromSchool && group.school === id) || (fromTeacher && idGroups.includes(key)))
    .map(([groupId, groupData]) => ({ id: groupId, data: groupData }));

    return getGroups(id, idGroups);
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

export async function fetchGroupInfo(idGroup) {
    const response = await axios.get(BACKEND_URL + '/groups.json');

    for(let key in response.data) {
        if(key === idGroup) {
            return {id: key, data: response.data[key]};
        }
    }
}

export async function fetchSchoolInfo(idSchool) {
    const response = await axios.get(BACKEND_URL + '/users/School.json');

    for(let key in response.data) {
        if(response.data[key].id === idSchool) {
            return response.data[key];
        }
    }

}