let counter = 0;

function j() {
    counter++;
    return counter + "";
}

var _gInitialized:boolean=false;
export function gInit(cb) {
    if (!_gInitialized) {
        _gInitialized=true;
        cb();
    }
}
// App
export const GET_TITLE = j();
export const SET_APP_TITLE = j();
export const SET_SITE_LIST = j();
export const SET_APP_ICON=j();



//sites

//site detail
export const SET_DETAIL_LIST = j();

let memFetch = {};

export function cachedFetch(url, options) {
    // Use the URL as the cache key to sessionStorage
    let cacheKey = url + JSON.stringify(options || "");
    if (memFetch[cacheKey]) {
        return Promise.resolve(memFetch[cacheKey]);
    }
    memFetch[cacheKey]=fetch(url, options).then(response => {
        // let's only store in cache if the content-type is
        // JSON or something non-binary
        let ct = response.headers.get('Content-Type');
        if (ct && (ct.match(/application\/json/i))) {
            return response.json();
        }
        return response
    });
    return memFetch[cacheKey];
}


export function setSiteList(list) {
    return {type: SET_SITE_LIST, list};
}

export function setAppTitle(text) {
    return {type: SET_APP_TITLE, text};
}

export function setSiteDetailList(list) {
    return {type: SET_DETAIL_LIST, list};
}
export function setAppIcon(info) {
    return {type: SET_APP_ICON, info};
}