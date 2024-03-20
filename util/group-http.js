import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function registerNewGroup(newGroupData) {
    await axios.post(
        `${BACKEND_URL}/groups.json`,
        newGroupData
    );
}

export async function deleteGroup(idGroup) {
    await axios.delete(
        `${BACKEND_URL}/groups/${idGroup}.json`,
    );
}

export async function fetchGroups(id, fromSchool, idGroups, fromTeacher) {
    try {
        const response = await axios.get(BACKEND_URL + '/groups.json');
        
        const getGroups = (id, idGroups) => Object.entries(response.data)
        .filter(([key, group]) => (fromSchool && group.school === id) || (fromTeacher && idGroups.includes(key)))
        .map(([groupId, groupData]) => ({ id: groupId, data: groupData }));

        return getGroups(id, idGroups);
    } catch {}
} 

export async function fetchGroupInfo(idGroup) {
    const response = await axios.get(BACKEND_URL + '/groups.json');

    for(let key in response.data) {
        if(key === idGroup) {
            return {id: key, data: response.data[key]};
        }
    }
}