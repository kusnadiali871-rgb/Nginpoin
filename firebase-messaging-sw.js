// firebase-messaging-sw.js
// File ini HARUS diletakkan di root directory website Anda

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ===== KONFIGURASI FIREBASE =====
const firebaseConfig = {
    apiKey: "AIzaSyCAPKtg6FB6noA1M8TdFh-CUVjGM0dsDDU",
    authDomain: "nginpoin-f87ee.firebaseapp.com",
    projectId: "nginpoin-f87ee",
    storageBucket: "nginpoin-f87ee.firebasestorage.app",
    messagingSenderId: "136519463359",
    appId: "1:136519463359:web:3927578bffe9945f78b10a",
    measurementId: "G-P0JCXFBJ31"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/icon.png',
        badge: '/badge.png',
        data: payload.data,
        requireInteraction: false,
        vibrate: [200, 100, 200]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    
    event.notification.close();

    // Buka URL tertentu saat notifikasi diklik
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Cek apakah ada tab yang sudah terbuka
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Jika tidak ada, buka tab baru
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});