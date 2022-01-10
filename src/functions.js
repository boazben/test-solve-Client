import axios from "axios";

export async function serverReq(method, urlRel, body, params) {
    const res = await axios({
        method: method,
        url: `http://localhost:4000${urlRel}`, // To localhost
        // url: `https://testudy.herokuapp.com${urlRel}`, // To server
        data: body,
        params: params,
        headers: {authorization: localStorage.token || sessionStorage.token || ''}
        })
    if(!res.data) throw "The res didn't secses"
    return res.data
}

