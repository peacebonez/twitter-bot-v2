const config = require("./config");
const twit = require("twit");
const Twitter = new twit(config);
import { tweet } from "./tweet";
import { retweet } from "./retweet";

function selfAdvertise(query, result_type, count) {
  let params = {
    q: query,
    result_type,
    count,
  };

  //to keep from spamming the same exact tweet
  const quoteGen = () => {
    const text = [
      "Hi I made this bot to reach out for a web developer gig.  Here's my portfolio site shorturl.at/kDFTV",
      "Hey what's up, I made this bot to get broader reach to find a web developer gig. Here's my portfolio site shorturl.at/kDFTV",
      "Hey I'm Kevin and I made this bot to get broader reach to find a web developer gig. Here's my portfolio site shorturl.at/kDFTV",
      "When LinkedIn and Indeed aren't working, just make a bot!  I'm seeking a junior web developer job. Here's my portfolio site shorturl.at/kDFTV",
    ];
    return text[Math.floor(Math.random() * text.length)];
  };

  Twitter.get("search/tweets", params, (err, data, res) => {
    let tweets = data.statuses;
    // console.log("data:", data);
    if (!err) {
      for (let tweet of tweets) {
        let tweetId = tweet.id_str;
        console.log("tweet:", tweet);
        console.log("tweet.user.name:", tweet.user.name);

        Twitter.post(
          "statuses/update",
          {
            status: `@${tweet.user.screen_name} ${quoteGen()}`,
            in_reply_to_status_id: tweetId,
          },
          (err, res) => {
            if (res) console.log("Tweeted @ " + tweetId);
            if (err) console.log("Something went wrong while tweeting.");
          }
        );
      }
    }
  });
}

// if you call the function too quickly twitter may think you are abusing the API and can terminate your account

setInterval(
  () => selfAdvertise("entry level web developer", "recent", 5),
  86400
);
setInterval(() => selfAdvertise("react developer", 10, "recent"), 140400);
setInterval(() => selfAdvertise("web development", 10, "recent"), 94600);
setInterval(() => selfAdvertise("web dev jobs", 10, "recent"), 106400);

// setInterval(retweet, 15000);
// setInterval(tweet, 1000);
