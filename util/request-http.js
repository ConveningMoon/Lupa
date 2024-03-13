import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

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

export async function linkTeacherWithSchool(idTeacher, idSchool, listGroups, subject) {
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
            groups: listGroups,
            subject: subject     
        }
    );

}

export async function unlinkTeacherWithSchool(idTeacher) {
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
            school: '',   
            groups: '',
            subject: ''    
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

    const listStudentsToAdd = () => {
        if (parent.data.students.length === 0) { 
            return [student.data.id];
        } else {
            parent.data.students.push(student.data.id);
            return parent.data.students;
        }
    };
    const listParentsToAdd = () => {
        if (student.data.parents.length === 0) { 
            return [parent.data.id];
        } else {
            student.data.parents.push(parent.data.id);
            return student.data.parents;
        }
    };

    await axios.patch(
        `${BACKEND_URL}/users/Student/${student.key}.json`, {
            parents: listParentsToAdd(),       
        }
    );

    await axios.patch(
        `${BACKEND_URL}/users/Parent/${parent.key}.json`, {
            students: listStudentsToAdd(),       
        }
    );

}

export async function unlinkStudentWithParent(idStudent, idParent) {
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

    const listStudentsToPreserve = () => {
        const filter = parent.data.students.filter(kid => kid !== student.data.id);

        if (filter.length === 0) {
            return '';
        } else {
            return filter;
        }        
    };
    const listParentsToPreserve = () => {
        const filter = student.data.parents.filter(user => user !== parent.data.id);
        
        if (filter.length === 0) {
            return '';
        } else {
            return filter;
        }
    };

    await axios.patch(
        `${BACKEND_URL}/users/Student/${student.key}.json`, {
            parents: listParentsToPreserve(),       
        }
    );

    await axios.patch(
        `${BACKEND_URL}/users/Parent/${parent.key}.json`, {
            students: listStudentsToPreserve(),       
        }
    );

}

export async function unlinkStudentWithSchool(idStudent) {
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
            school: '',
            group: ''        
        }
    );

}

export async function deleteRequestNotification(id) {
    await axios.delete(
        `${BACKEND_URL}/notifications/${id}.json`,
    );
}

