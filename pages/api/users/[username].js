// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  let { username } = req.query;
  let options = {
    method: "get",
    url: `https://api.twitter.com/2/users/by/username/${username}`,
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    },
  };
  const response = await axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("bad request");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  res.status(200).json(response);
}
