import http from 'k6/http'
import b64encode from 'k6/encoding'
import { check } from 'k6'

const config = JSON.parse(open('./config.json'))
const token = b64encode.b64encode(config.credentials.username + ':' + config.credentials.password)

const params = {
    headers: {
        'Authorization': 'Basic ' + token
    }
}

export const options = {
  vus: 1,
  duration: '5s'
    }


export default function () {
  const response = http.get('http://192.168.0.20/status/', params);
  check(response, {'status was 200': (resp) => resp.status == 200})
}