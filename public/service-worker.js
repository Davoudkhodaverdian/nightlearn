console.log("serviceWorker", self); // self is serviceWorker

const CASHNAME = "static-v";
const VERSION = "1.0.1";
const CURRENT_CASH = CASHNAME + VERSION;

self.addEventListener('install', (event) => {
    console.log("install", event);
    const cache = async () => {
        const cache = await caches.open(CURRENT_CASH);
        cache.addAll([
            "/",
        ]);
    };
    event.waitUntil(cache());
})
self.addEventListener('activate', (event) => {

    console.log("activate", event);
    const cacheAllowlist = [CURRENT_CASH];

    const cache = async () => {
        let cacheNames = await caches.keys();
        // console.log({ cacheNames });
        cacheNames.forEach((cacheName) => {
            // console.log(cacheName);
            if (!cacheAllowlist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    };
    event.waitUntil(cache());
})
self.addEventListener('fetch', (event) => {
    const preNetwork = async () => {


        const cache = await caches.open(CURRENT_CASH);
        try {
            // Try to get the response from network.

            // get responses
            const result = await fetch(event?.request);
            if (result) {
                // event.waitUntil(cache.add(event.request)); // update the entry in the cache in the background.
                // console.log("use the network " + event.request?.url);
                return result;
            }

        } catch (error) {
            // If we didn't find a match in the network, use the cache.
            const cachedResponse = await cache.match(event?.request);
            if (cachedResponse) {
                console.log(`${event?.request.url} use in the cache`);
                return cachedResponse; //  return the cache
            }
            else {
                // console.log(`${event.request.url} is not find in the cache`);
                // if we can't find data in the cash, we send offline.html data
                // if (event.request.url === '/about') return cache.match("/offline.html");
            }
        }


    }
    event.respondWith(preNetwork());
});

self.addEventListener('sync', (event) => {
    console.log(`background sync:`, event);
    if (event.tag === 'task-1') {
        const doSomething = () => {
            console.log(`Do Something`);


        }
        event.waitUntil(doSomething())
    }

})
self.addEventListener('notificationclick', (event) => {

    event.waitUntil((() => {
        console.log(`notificationClick:`, event);
       // clients.openWindow('/about');
    })())
})

self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json()?.notification : {};
    const title = data.title || 'Notification';
    const options = {
        body: data.body || 'Default message',
        icon: data.icon || '/next.svg',
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});