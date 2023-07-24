import { expect, test } from "@playwright/test";
import axios from "axios";

//playwright test
test("should create a bug report", async ({ request }) => {
  const loginResponse = await request.post(
    `http://localhost:8087/api/gateway/auth/signin`,
    {
      data: { userNameOrEmail: "admin", password: "123456" },
    }
  );

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseBody = await loginResponse.json();

  const getEpisodesResponse = await request.get(
    `http://localhost:8087/api/episodes`,
    {
      headers: {
        Authorization: `${loginResponseBody.tokenType} ${loginResponseBody.accessToken}`,
      },
    }
  );

  expect(getEpisodesResponse.ok()).toBeTruthy();

  const getEpisodesResponseBody = await getEpisodesResponse.json();

  expect(getEpisodesResponseBody).toEqual([]);
});

//axios test
test("should create a bug report with got", async () => {
  const loginResponse: any = await axios.post(
    `http://localhost:8087/api/gateway/auth/signin`,
    {
      data: { userNameOrEmail: "admin", password: "123456" },
    }
  );
  expect(loginResponse.status).toEqual(200);

  const getEpisodesResponse: any = await axios.get(
    `http://localhost:8087/api/episodes`,
    {
      headers: {
        Authorization: `${loginResponse.tokenType} ${loginResponse.accessToken}`,
      },
    }
  );

  expect(getEpisodesResponse.status).toEqual(200);
  expect(getEpisodesResponse.data).toEqual([]);
});
