import { sleep, group } from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
  // stages: [
  //   { target: 1, duration: "1m" },
  //   { target: 1, duration: "3m30s" },
  //   { target: 0, duration: "1m" },
  // ],
  thresholds: {},
};

export default function main() {
  let response;

  const vars = {};

  group("page_1 - https://app.test.alwaysreach.net/admin/", function () {
    response = http.get("https://app.test.alwaysreach.net/admin/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
        "cache-control": "max-age=0",
        "sec-ch-ua":
          '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    });
    sleep(22.7);
  });

  group(
    "page_2 - https://app.test.alwaysreach.net/authentication/landing?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin&notification_types=email&error=&username=",
    function () {
      response = http.get(
        "https://app.test.alwaysreach.net/authentication/landing?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin&notification_types=email&error=&username=",
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "upgrade-insecure-requests": "1",
          },
        }
      );

      vars["client_id1"] = response
        .html()
        .find("input[name=client_id]")
        .first()
        .attr("value");

      vars["response_type1"] = response
        .html()
        .find("input[name=response_type]")
        .first()
        .attr("value");

      sleep(4);

      response = http.post(
        "https://app.test.alwaysreach.net/authentication/landing?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin&notification_types=email&error=&username=",
        {
          username: "alexadmin",
          client_id: `${vars["client_id1"]}`,
          response_type: `${vars["response_type1"]}`,
          redirect_uri: "https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin",
          "gorilla.csrf.Token":
            "PZVx5b8R03EQd%2FoINAvscYYRbpr3fnsB1AFcbQYVFbq17Cjtan0GsqQj1iH6jivA7SGJ1t8Fa15nyQHPqETYCw%3D%3D",
        },
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            origin: "https://app.test.alwaysreach.net",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
          },
        }
      );
      sleep(4.2);
    }
  );

  group(
    "page_3 - https://app.test.alwaysreach.net/authentication/authorize",
    function () {
      response = http.post(
        "https://app.test.alwaysreach.net/authentication/authorize",
        {
          username: "alexadmin",
          password: "Testing1%23",
          client_id: `${vars["client_id1"]}`,
          response_type: `${vars["response_type1"]}`,
          redirect_uri: "https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin",
          "gorilla.csrf.Token":
            "AFVqNUsDrxOT0BLR03pu0P65eL%2Bv8mPrLKm0ecYknt80cmUUMI5FEDT7UFpwvsg%2B%2FMRpmWkjqhZPwk8FNS15CA%3D%3D",
        },
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            origin: "https://app.test.alwaysreach.net",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
          },
        }
      );
      sleep(1.2);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/my-info",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: "Bearer 22uiJJakQ7egvpwRBmC11Q",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/my-info",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: "Bearer 22uiJJakQ7egvpwRBmC11Q",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      vars["access_token1"] = jsonpath.query(
        response.json(),
        "$.user.access_token"
      )[0];

      response = http.post(
        "https://app.test.alwaysreach.net/authentication/api/v1/application-access",
        {
          access_granted: "true",
          client_application: "ADMIN_WEB",
        },
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: "Bearer 22uiJJakQ7egvpwRBmC11Q",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            origin: "https://app.test.alwaysreach.net",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(3.4);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/users?page=1&page_size=15&recursive=true&sort=first_name&stata=%27ACTIVE%27",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: "Bearer 22uiJJakQ7egvpwRBmC11Q",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/user-types",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/organizations?recursive=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(4.9);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/organizations?recursive=true&sort%5B%5D=name",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations?reload=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/user-types?sort%5B%5D=name",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(15.7);

      response = http.post(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/users",
        {
          "%7B%22user%22%3A%7B%22email%22%3Anull%2C%22username%22%3Anull%2C%22password%22%3A%22default%22%2C%22organization_id%22%3A265007%2C%22created_at%22%3Anull%2C%22enrolled_at%22%3A%222021-11-23T13%3A13%3A57.045Z%22%2C%22disenrolled_at%22%3A%223016-03-25T00%3A00%3A00.000Z%22%2C%22current_status%22%3Anull%2C%22locale%22%3A%22en%22%2C%22time_zone%22%3A%22America%2FNew_York%22%2C%22sign_in_count%22%3Anull%2C%22organization_name%22%3Anull%2C%22password_temporary%22%3Atrue%2C%22extended_properties%22%3A%7B%7D%2C%22person%22%3A%7B%22first_name%22%3A%22New%22%2C%22middle_name%22%3Anull%2C%22last_name%22%3A%22User%22%2C%22gender%22%3A%22Unspecified%22%2C%22country%22%3Anull%2C%22needs_onboarding%22%3Atrue%2C%22birthday%22%3Anull%2C%22phone_numbers%22%3A%5B%5D%7D%2C%22user_type_id%22%3A%22843705%22%2C%22user_statuses%22%3A%5B%5D%2C%22extensions%22%3A%5B%5D%7D%2C%22meta%22%3A%7B%22invitation_scheduled_at%22%3A%222021-11-23T13%3A14%3A08.522Z%22%2C%22additional_recipients%22%3A%5B%5D%7D%7D":
            "",
        },
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            origin: "https://app.test.alwaysreach.net",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(5.7);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/users?page=1&page_size=15&recursive=true&sort=first_name&stata=%27ACTIVE%27",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/user-types",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/organizations?recursive=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(7.1);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/users?page=1&page_size=15&recursive=true&sort=first_name&stata=%27ACTIVE%27",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/user-types",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/organizations?recursive=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(3.4);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/users/search?page=1&page_size=15&q=new%20user&recursive=true&sort=first_name",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/user-types",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007/organizations?recursive=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/organizations/265007",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(4.8);

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/users/2259084/notifications",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/users/2259084?include_deleted=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/care-teams/consumer/2259084",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/user-types/843705",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(7);

      // response = http.del(
      //   "https://app.test.alwaysreach.net/api/admin/v1/user-profiles/2259084",
      //   null,
      //   {
      //     headers: {
      //       accept: "application/json, text/javascript, */*; q=0.01",
      //       "accept-encoding": "gzip, deflate, br",
      //       "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
      //       authorization: `Bearer ${vars["access_token1"]}`,
      //       "content-type": "application/json",
      //       origin: "https://app.test.alwaysreach.net",
      //       "sec-ch-ua":
      //         '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
      //       "sec-ch-ua-mobile": "?0",
      //       "sec-ch-ua-platform": '"Linux"',
      //       "sec-fetch-dest": "empty",
      //       "sec-fetch-mode": "cors",
      //       "sec-fetch-site": "same-origin",
      //       "x-requested-with": "XMLHttpRequest",
      //     },
      //   }
      // );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/users/2259084/notifications",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/users/2259084?include_deleted=true",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/care-teams/consumer/2259084",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      response = http.get(
        "https://app.test.alwaysreach.net/api/admin/v1/user-types/843705",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
      sleep(4.9);

      response = http.get(
        "https://app.test.alwaysreach.net/authentication/logout",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            authorization: `Bearer ${vars["access_token1"]}`,
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );
    }
  );

  group("page_4 - https://app.test.alwaysreach.net/admin/", function () {
    response = http.get("https://app.test.alwaysreach.net/admin/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
        "sec-ch-ua":
          '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    });
    sleep(0.8);
  });

  group(
    "page_5 - https://app.test.alwaysreach.net/authentication/landing?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin&notification_types=email&error=&username=",
    function () {
      response = http.get(
        "https://app.test.alwaysreach.net/authentication/landing?response_type=token&client_id=14e4009f-f761-4d44-9ee3-5caacada6dc6.vela.care&redirect_uri=https%3A%2F%2Fapp.test.alwaysreach.net%2Fadmin&notification_types=email&error=&username=",
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,uk;q=0.7",
            "sec-ch-ua":
              '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Linux"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "upgrade-insecure-requests": "1",
          },
        }
      );
    }
  );
}
