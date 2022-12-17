import axios from "axios";
import { getCookie } from "./function";
var main_url = "http://52.74.166.134:3000/api";

const fetchApi = async (path, method, token, raw) => {
    var data = JSON.stringify(raw ? raw : {});
    if (token) {
        var tokene = getCookie("token")
        var header = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${tokene}`
        }
    }
    else {
        var header = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        }
    }
    var config = {
        method: method.toLowerCase(),
        url: `${main_url}/${path}`,
        headers: header,
        data: data
    };

    var balikan = await axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
    return balikan
}

export {
    fetchApi
}