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
  callApi(call) {
    if (!this.api_key) return Promise.reject("No API key has been given");
    return new Promise((resolve, reject) => {
      if (!call) return reject("Bad request");
      axios
        .get(this.base_uri + call, {
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
        let uri = `/summoner/v4/summoners/by-name/${name}`;
        try {
          return resolve(this.callApi(uri));
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
  getActiveGame(summonerId) {
    if (!summonerId) {
      return Promise.reject(new Error("No summoner id has been specified"));
    } else {
      return new Promise((resolve, reject) => {
        let uri = `/spectator/v4/active-games/by-summoner/${summonerId}`;
        try {
          return resolve(this.callApi(uri));
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
      let uri = `/status/v4/platform-data`;
      try {
        return resolve(this.callApi(uri));
      } catch (error) {
        return reject(error);
      }
    });
  }

  /**
   * Returns the champion id of the free rotations
   */
  getFreeChampion() {
    return new Promise((resolve, reject) => {
      let uri = `/platform/v3/champion-rotations`;
      try {
        return resolve(this.callApi(uri));
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * Returns the summoners masteries per champion
   * @param {string} summonerId - The id of a League of legends summoner
   */
  getChampionMastery(summonerId) {
    return new Promise((resolve, reject) => {
      let uri = `/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`;
      try {
        summonerId;
        return resolve(this.callApi(uri));
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = WarwickJS;
