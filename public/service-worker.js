//service-worker.js
const CACHE_NAME = "boundary-cache";

const FILES_TO_CACHE = ["/"];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
	);
});
