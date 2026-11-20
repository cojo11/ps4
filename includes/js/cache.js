// Handling cache
// Caching is now handled by cache.html + iframe_cache.js for firmware based caching
// This way we dont cache just everything for everyone. faster caching.

// The automatic trip to cache.html is switched off.
// On the PS4 applicationCache never reaches the "cached" state, so index.html
// kept sending the browser to cache.html and cache.html sent it straight back -
// a loop that never ended. The hub works without the AppCache, so it is only
// built when the user asks for it with the "Update cache" button.

// Used if terminating cache process early
function terminateCache() {
    if (window.applicationCache) {
        // Status 3 is 'downloading', Status 1 is 'checking'
        if (window.applicationCache.status === 3 || window.applicationCache.status === 1) {
            console.log("Terminating cache process to save memory...");
            window.applicationCache.abort();
            var appTitle = (typeof projectName !== 'undefined') ? projectName : "Playstation Hub";
            document.title = appTitle;
            window.applicationCache.removeEventListener("progress", null);
            window.applicationCache.oncached = null;
            window.applicationCache.onupdateready = null;
        }
    }
}