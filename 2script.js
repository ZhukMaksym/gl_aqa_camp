/*  Where contents of data.csv is:
username,password
admin,123
test_user,1234
*/
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the csv) will be executed per each VU which also means that there will be a complete copy
// per each VU
//
const csvData = new SharedArray('another data name', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./admins.csv'), { header: true }).data;
});

export default function () {
  // Now you can use the CSV data in your test logic below.
  // Below are some examples of how you can access the CSV data.

  // Loop through all username/password pairs
  // for (const userPwdPair of csvData) {
  //   console.log(JSON.stringify(userPwdPair));
  // }

  // Pick a random username/password pair
  const randomUser = csvData[Math.floor(Math.random() * csvData.length)];
  console.log('Random user: ', JSON.stringify(randomUser));


  const params1 = {
    response_type: "token",
    redirect_uri: "https://app.test.alwaysreach.net/admin",
    client_id: "14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care",
    username: randomUser.username
  };

  const loginRes = http.post('https://app.test.alwaysreach.net/authentication/login', params1);
  check(loginRes, {
    'login succeeded': (r) => r.status === 200,
  });

  console.log(loginRes.body);

  // const params = {
  //   username: randomUser.username,
  //   password: randomUser.password,
  //   response_type: "token",
  //   redirect_uri: "https://app.test.alwaysreach.net/admin",
  //   'gorilla.csrf.Token': "addTokenHere"
  // };

  // console.log('Random user: ', JSON.stringify(params));

  // const authorizeRes = http.post('https://app.test.alwaysreach.net/authentication/authorize', params);
  // check(authorizeRes, {
  //   'authorize succeeded': (r) => r.status === 200,
  // });

  sleep(1);
}
