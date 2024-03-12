const axios = require("axios");
const { test, describe, expect } = require("@jest/globals");

describe("GET requests", () => {
  test("GET boolean if the account is registered /api/account/registered/508402815157403668", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/account/registered/508402815157403668"
    );

    expect(status).toBe(200);
    expect(data).toEqual(true);
  });

  test("GET all riot accounts from discord id /api/account/riot/get/508402815157403669", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/account/riot/get/508402815157403669"
    );

    expect(status).toBe(200);
    data.forEach((riotAccount) => {
      expect(typeof riotAccount).toBe("object");
      expect(Object.keys(riotAccount)).toContain("id");
      expect(Object.keys(riotAccount)).toContain("discord_id");
      expect(Object.keys(riotAccount)).toContain("riot_id");
      expect(Object.keys(riotAccount)).toContain("region");
      expect(Object.keys(riotAccount)).toContain("rank");
      expect(Object.keys(riotAccount)).toContain("active");
    });
  });

  test("GET all steam accounts from discord id api/account/steam/get/508402815157403669", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/account/steam/get/508402815157403669"
    );

    expect(status).toBe(200);
    data.forEach((steamAccount) => {
      expect(typeof steamAccount).toBe("object");
      expect(Object.keys(steamAccount)).toContain("id");
      expect(Object.keys(steamAccount)).toContain("discord_id");
      expect(Object.keys(steamAccount)).toContain("steam_id");
      expect(Object.keys(steamAccount)).toContain("account_name");
      expect(Object.keys(steamAccount)).toContain("friend_code");
      expect(Object.keys(steamAccount)).toContain("steam_profile_url");
      expect(Object.keys(steamAccount)).toContain("active");
    });
  });
});
