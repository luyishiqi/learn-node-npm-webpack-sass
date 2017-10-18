const BaseUrl = "http://www.baidu.com/api"
const get = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `${BaseUrl}${url}`);
    return new Promise((resolve, reject) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.responseText);
        }
        xhr.send();
    })
}


export const getShopDetail = id => get(`/shopDetail?id=${id}`);
export const getShopList = suteid => get(`/shopList?suteid=${suteid}`);