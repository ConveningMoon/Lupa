import axios from "axios";

const BACKEND_URL = 'https://lupa-6edbe-default-rtdb.asia-southeast1.firebasedatabase.app';

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

