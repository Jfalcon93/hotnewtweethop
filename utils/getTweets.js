// get a user's tweets over a given period of time (currently set to a week not dynamic)

export async function getTweets(id) {
  const res = await fetch(`/api/tweets/${id}`);
  const tweets = await res.json();
  if (tweets.meta.result_count === 0) {
    let emptyArr = {};
    emptyArr[""] = new Array();
    emptyArr[""].push({
      url: "#",
      text: "No Tweets to show",
      created_at: "never :(",
    });
    return emptyArr;
  }
  const filteredTweets = tweets.data
    .filter((tweet) => {
      if (tweet.text.includes("https://")) {
        if (
          tweet.entities.urls[0].expanded_url.includes("https://music.apple") ||
          tweet.entities.urls[0].expanded_url.includes(
            "https://open.spotify"
          ) ||
          tweet.entities.urls[0].expanded_url.includes("youtu") ||
          tweet.entities.urls[0].expanded_url.includes("soundcloud")
        ) {
          return true;
        }
        return false;
      }
    })
    .map((tweet) => {
      return {
        text: tweet.text,
        created_at: tweet.created_at,
        entities: tweet.entities,
      };
    });
  const urls = filteredTweets.map((tweet) => {
    let tweetWordArr = tweet.text.split(/[\n\s]+/);
    let url = tweetWordArr.find((word) => {
      if (word.includes("https://")) {
        return word;
      }
    });
    tweetWordArr.pop();
    let rejoinArr = tweetWordArr.join(" ");
    let formattedDate = new Date(tweet.created_at).toLocaleDateString();
    return {
      text: tweet.entities.urls[0].title,
      tweetDescription: rejoinArr,
      url: tweet.entities.urls[0].expanded_url,
      created_at: formattedDate,
    };
  });
  let tweetMap = {};
  urls.forEach((tweet) => {
    if (!tweetMap[tweet.created_at]) {
      tweetMap[tweet.created_at] = new Array();
    }
    tweetMap[tweet.created_at].push(tweet);
  });
  // In case we ever want ordered by Date
  // const orderedTweetMap = Object.keys(tweetMap)
  //   .sort()
  //   .reduce((obj, key) => {
  //     obj[key] = tweetMap[key];
  //     return obj;
  //   }, {});
  return tweetMap;
}
