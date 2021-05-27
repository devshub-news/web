import { API_URL } from "../env"
import APIUtils from "./APIUtils"


class NotificationsAPI {

    static module = "notifications"

    static sendSubscription(subscription) {
        console.log(subscription)
        APIUtils.POST(`${API_URL}/subscription/`, subscription)
    }

    static deleteSubscription(subscription) {
        console.log(subscription)
    }

    static getSubscription(endpoint) {
        endpoint = endpoint.replace('https://fcm.googleapis.com/fcm/send/', '')

        return APIUtils.GET(`${API_URL}/subscription/${endpoint}`)
    }
}

export default NotificationsAPI