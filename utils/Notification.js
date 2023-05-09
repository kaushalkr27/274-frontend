import { NotificationManager } from 'react-notifications';

export const successNotification = (message) => {
    NotificationManager.success(message, "", 2000)
}

export const errorNotification = (message) => {
    NotificationManager.error(message, "", 2000)
}