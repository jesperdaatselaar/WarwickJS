class WarwickJS {
  constructor(api_key, region) {
    this.api_key = api_key;
    this.base_uri = `https://${region}.api.riotgames.com/lol`;
  }

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
}

module.exports = WarwickJS;
