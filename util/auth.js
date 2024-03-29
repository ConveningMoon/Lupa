import axios from 'axios';

const API_KEY = 'AIzaSyAAAnTrhhpHdsgz6dD6t017dFh1pddjsW0';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  // .catch(error => {
  //   if (error.response) {
  //     console.log(error.response.data);
  //   } else if (error.request) {
  //     console.log(error.request);
  //   } else {
  //     console.log("Error with login: ", error.message);
  //   }

  // });

  return response.data;
}

export async function deleteAccount (id) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`;

  await axios.post(url, {
    idToken: id,
  });
}

export async function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export async function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

export async function changeEmail(idToken, newEmail) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  await axios.post(url, {
    idToken: idToken,
    email: newEmail,
    returnSecureToken: true
  });
}

export async function changePassword(idToken, newPassword) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  await axios.post(url, {
    idToken: idToken,
    password: newPassword,
    returnSecureToken: true
  });
}