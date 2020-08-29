const retweet = () => {
  let params = {
    q: "#tech",
    result_type: "recent",
    count: 1,
  };

  Twitter.get("search/tweets", params, (err, data, res) => {
    let tweets = data.statuses;
    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        // console.log("dat:", dat);

        Twitter.post("statuses/retweet/:id", { id: retweetId }, (err, res) => {
          if (res) console.log("Retweeted " + retweetId);
          if (err) console.log("Something went wrong while retweeting.");
        });
      }
    }
  });
};

module.exports = retweet;
