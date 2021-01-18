const axios = require("axios");
/**
 * @param {string} api_key - A Riot Games API key
 * @param {string} region - A league of legends servers' region
 */
class WarwickJS {
  constructor(api_key, region) {
    this.api_key = api_key;
    this.base_uri = `https://${region}.api.riotgames.com/lol`;
  }

  /**
   * Call the API with a given url
   * @param {string} url - The url to request
   */
  callApi(url) {
    if (!this.api_key) return Promise.reject("No API key has been given");
    return new Promise((resolve, reject) => {
      if (!url) return reject("Bad request");
      axios
        .get(url, {
          params: {
            api_key: this.api_key,
          },
        })
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Get id by summoners name
   * @param {string} name - The name of a league of legends summoner
   */
  getSummonerIdByName(name) {
    if (!name) {
      return Promise.reject(new Error("No summoner has been specified"));
    } else {
      return new Promise((resolve, reject) => {
        let url = `${this.base_uri}/summoner/v4/summoners/by-name/${name}`;
        try {
          return resolve(this.callApi(url));
        } catch (error) {
          return reject(error);
        }
      });
    }
  }

  /**
   * Get current game played by summoner
   * @param {string} id - The id of a League of legends summoner
   */
  getActiveGame(id) {
    if (!id) {
      return Promise.reject(new Error("No summoner id has been specified"));
    } else {
      return new Promise((resolve, reject) => {
        let url = `${this.base_uri}/spectator/v4/active-games/by-summoner/${id}`;
        try {
          return resolve(this.callApi(url));
        } catch (error) {
          return reject(error);
        }
      });
    }
  }
  /**
   * Returns the current status of the league of legends servers
   */
  getStatus() {
    return new Promise((resolve, reject) => {
      let url = `${this.base_uri}/status/v4/platform-data`;
      try {
        return resolve(this.callApi(url));
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = WarwickJS;
