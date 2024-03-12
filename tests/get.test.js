const axios = require("axios");
const { test, describe, expect } = require("@jest/globals");

describe("GET requests", () => {
  // account routes
  test("GET all accounts from 508402815157403668 discord id", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/account/508402815157403668"
    );

    expect(status).toBe(200);
    data.riotAccountList.forEach((riotAccount) => {
      expect(typeof riotAccount).toBe("object");
      expect(Object.keys(riotAccount)).toContain("id");
      expect(Object.keys(riotAccount)).toContain("discord_id");
      expect(Object.keys(riotAccount)).toContain("riot_id");
      expect(Object.keys(riotAccount)).toContain("region");
      expect(Object.keys(riotAccount)).toContain("rank");
      expect(Object.keys(riotAccount)).toContain("active");
    });

    data.steamAccountList.forEach((steamAccount) => {
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

  test("GET true if 508402815157403668 is registered", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/account/registered/508402815157403668"
    );

    expect(status).toBe(200);
    expect(data).toEqual(true);
  });

  test("GET false if a user is not registered", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/account/registered/123456789012345678"
    );

    expect(status).toBe(200);
    expect(data).toEqual(false);
  });

  test("GET all riot accounts from 508402815157403669 discord id", async () => {
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

  test("GET all steam accounts from 508402815157403669 discord id", async () => {
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

  // valorant routes
  test("GET active valorant accounts from 508402815157403669 discord id", async () => {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/valorant/active/get/508402815157403669"
    );

    expect(status).toBe(200);
    data.forEach((valorantAccount) => {
      expect(typeof valorantAccount).toBe("object");
      expect(Object.keys(valorantAccount)).toContain("id");
      expect(Object.keys(valorantAccount)).toContain("discord_id");
      expect(Object.keys(valorantAccount)).toContain("riot_id");
      expect(Object.keys(valorantAccount)).toContain("region");
      expect(Object.keys(valorantAccount)).toContain("rank");
      expect(Object.keys(valorantAccount)).toContain("active");
    });
  });
});
