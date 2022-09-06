// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  let { id } = req.query;
  let now = new Date().toISOString();
  let weekAgo = new Date();
  weekAgo = new Date(weekAgo.setDate(weekAgo.getUTCDate() - 7));
  let options = {
    method: "get",
    url: `https://api.twitter.com/2/users/${id}/tweets?max_results=50&start_time=${weekAgo.toISOString()}&end_time=${now}&tweet.fields=created_at,entities&exclude=replies`,
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    },
  };
  const response = await axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).json(response);
}
