import CryptoJS from "crypto-js";
import { fetchApi } from "./api";

var secreetKey = "mymasjidSecreet"

const decript = (data) => {
  var replace = data.replace(/Por21Ld/g, "/")
  var bytes = CryptoJS.AES.decrypt(replace, secreetKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
const encript = (data) => {
  var id =  CryptoJS.AES.encrypt(data, secreetKey).toString()
  var replace = id.replace(/\//g, "Por21Ld")
  return replace
}
const isLike = (dataLike, iddata) => {
  var cekLike = dataLike.filter(e => e.user_id == iddata)
  if (cekLike.length > 0) {
    return true
  }
  else {
    return false
  }
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
const getBase64 = file => {
  return new Promise(resolve => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

const getProvinsi = async (data) => {
  var res = await fetchApi("provinsi","GET")
  return res
}
async function getKota(id) {
  var res = await fetchApi("kota?id=" + id, "GET")
  return res
}
async function getKecamatan(id) {
  var res = await fetchApi("kecamatan?id=" + id, "GET")
  return res
}
async function getKelurahan(id) {
  var res = await fetchApi("kelurahan?id=" + id, 'GET')
  return res
}
const getTimeFormat = (waktu) => {
  var sumber = new Date(waktu)
  var jam = sumber.getHours()
  var menit = sumber.getMinutes()

  var hasilJam = parseInt(jam) < 10 ? `0${jam}` : jam
  var hasilMenit = parseInt(menit) < 10 ? `0${menit}` : menit
  return `${hasilJam}:${hasilMenit}`
}
export {
  encript,
  decript,
  isLike,
  getCookie,
  getBase64,
  getProvinsi,
  getKota,
  getKecamatan,
  getKelurahan,
  getTimeFormat
}