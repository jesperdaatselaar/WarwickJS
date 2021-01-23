const axios = require("axios");
/**
 * @param {string} api_key - A Riot Games API key
 * @param {string} region - A League of Legends servers' region
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
   * @param {string} name - The name of a league of Legends summoner
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
   * @param {string} id - The id of a League of Legends summoner
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
   * Returns the current status of the league of Legends servers
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
   * @param {string} summonerId - The id of a League of Legends summoner
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

  /**
   * Returns match list of summoner
   * @param {string} matchId - The id of a League of Legends match
   */
  getMatchHistory(accountId) {
    return new Promise((resolve, reject) => {
      let uri = `/match/v4/matchlists/by-account/${accountId}`;
      try {
        return resolve(this.callApi(uri));
      } catch (err) {
        return reject(err);
      }
    });
  }
  /**
   * Returns timeline of a match
   * @param {string} matchId - The id of a League of Legends match
   */
  getMatchTimeline(matchId) {
    return new Promise((resolve, reject) => {
      let uri = `/match/v4/timelines/by-match/${matchId}`;
      try {
        return resolve(this.callApi(uri));
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * Returns match data
   * @param {string} matchId - The id of a League of Legends match
   */
  getMatch(matchId) {
    return new Promise((resolve, reject) => {
      let uri = `/match/v4/matches/${matchId}`;
      try {
        return resolve(this.callApi(uri));
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = WarwickJS;
