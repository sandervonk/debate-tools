const staticLinks = "sv-debate-tools-v1";
const assets = [
    "/index.html",
    "css/index.css",
    "css/theme/light.css",
    "js/index.js",
    "js/rounds.json",
    "js/src/jquery-3.6.0.min.js",
    "img/icon/profile.svg",
    "img/icon/profile.png",
    "img/icon/segments/judges.svg",
    "img/icon/segments/judges.png",
    "img/icon/segments/notes.svg",
    "img/icon/segments/notes.png",
    "img/icon/segments/timers.svg",
    "img/icon/segments/timers.png",
    "img/icon/primary-button/primary-judges-add.svg",
    "img/icon/primary-button/primary-judges-add.png",
    "img/icon/primary-button/primary-notes-add.svg",
    "img/icon/primary-button/primary-notes-add.png",
    "img/icon/primary-button/primary-notes-reload.svg",
    "img/icon/primary-button/primary-notes-reload.png",
    "img/icon/primary-button/primary-timer-add.svg",
    "img/icon/primary-button/primary-timer-add.png",
    "img/icon/primary-button/primary-timer-next.svg",
    "img/icon/primary-button/primary-timer-next.png",
    "img/icon/primary-button/primary-timer-resume.svg",
    "img/icon/primary-button/primary-timer-resume.png",
    "img/icon/primary-button/primary-timer-stop.svg",
    "img/icon/primary-button/primary-timer-stop.png",
    "img/icon/note-action/add.svg",
    "img/icon/note-action/add.png",
    "img/icon/note-action/delete-alt.svg",
    "img/icon/note-action/delete-alt.png",
    "img/icon/note-action/delete.svg",
    "img/icon/note-action/delete.png",
    "img/icon/note-action/duplicate.svg",
    "img/icon/note-action/duplicate.png",
    "img/icon/note-action/edit.svg",
    "img/icon/note-action/edit.png",
    "img/icon/note-action/hide.svg",
    "img/icon/note-action/hide.png",
    "img/icon/note-action/save.svg",
    "img/icon/note-action/save.png",
];

self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(staticLinks).then((cache) => {
            cache.addAll(assets);
        })
    );
});
self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request);
        })
    );
});