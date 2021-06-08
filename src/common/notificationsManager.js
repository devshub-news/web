import NotificationsAPI from "./notificationsAPI";

if(navigator.serviceWorker)
    navigator.serviceWorker.register('./service-worker.js')

class NotificationsManager {

    static get subscription() {
        return new Promise(async (resolve) => {
            try {
                if (navigator.serviceWorker && navigator.serviceWorker.ready) {
                    let serviceWorkerRegistration = await navigator.serviceWorker.ready

                    let subscription = await serviceWorkerRegistration.pushManager.getSubscription()
                    if (subscription) {
                        let response = await NotificationsAPI.getSubscription(subscription.endpoint)
                        resolve(await response.json())
                    }
                    else {
                        resolve(undefined)
                    }
                }
                else {
                    console.log("a.no")
                    resolve(undefined)
                }
            }
            catch (error) {
                resolve(undefined)
            }
        })
    }


    static checkBrowserSupport() {
        if (!('Notification' in window)) {
            console.log("This browser does not support notifications.");
            return {
                message: "El navegador no soporta notificaciones",
                status: 0
            }
        }

        else if (!('serviceWorker' in navigator)) {
            console.log("This browser does not support serviceWorkers.");
            return {
                message: "El navegador no soporta serviceWorkers para las notificaciones",
                status: 0
            }
        }

        else if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Notifications aren\'t supported. on serviceWorkers');
            return {
                message: "El navegador no soporta serviceWorkers para las notificaciones",
                status: 0
            }
        }

        else if (!('PushManager' in window)) {
            console.warn('Push messaging isn\'t supported.');
            return {
                message: "El navegador no soporta notificaciones (WebPushNotifications)",
                status: 0
            }
        }

        return {
            message: "El navegador soporta las notificaciones",
            status: 1
        }
    }

    static async askNotificationPermission() {
        const browserSupport = NotificationsManager.checkBrowserSupport()
        if (browserSupport.status === 0) {
            return browserSupport
        }

        await Notification.requestPermission()

        if (Notification.permission === 'denied' || Notification.permission === 'default') {
            return {
                message: "No se ha brindado el permiso para enviar notificaciones",
                status: 0
            }
        }
        return {
            message: "Permiso para las notificaciones concedido",
            status: 1
        }

    }

    static async subscribe(categories) {

        const permisson = await NotificationsManager.askNotificationPermission()
        if (permisson.status === 0) {
            return permisson
        }

        const serviceWorkerRegistration = await navigator.serviceWorker.ready

        function urlBase64ToUint8Array(base64String) {
            var padding = '='.repeat((4 - base64String.length % 4) % 4);
            var base64 = (base64String + padding)
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            var rawData = window.atob(base64);
            var outputArray = new Uint8Array(rawData.length);

            for (var i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BM8NdnO8utf-55OjNDmQjJP5GifJVYGS2AdlJ3mmUUjidgICJR2iSWPQLrcksxHfrppV9FJ38f6qAz8Acu6LApo'
            )
        })

        let subscription = await serviceWorkerRegistration.pushManager.getSubscription()

        subscription = subscription.toJSON()
        subscription.categories = categories

        NotificationsAPI.sendSubscription(subscription)

        return {
            message: "Suscrito a notificaciones",
            status: 1
        }
    }

    static async unsubscribe() {
        if (await NotificationsManager.subscription === undefined) {
            return
        }
        const serviceWorkerRegistration = await navigator.serviceWorker.ready

        const subscription = await serviceWorkerRegistration.pushManager.getSubscription()

        NotificationsAPI.deleteSubscription(subscription.toJSON())

        subscription.unsubscribe()
    }
}

export default NotificationsManager
