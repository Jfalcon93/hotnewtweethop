import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from "../utils/getUser";
import { getTweets } from "../utils/getTweets";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState("");
  const [dateRange, setDateRange] = useState("");

  const submitUsername = async (username) => {
    setUser(username);
    const userId = await getUser(username);
    if (userId === undefined) {
      let emptyArr = {};
      emptyArr[""] = new Array();
      emptyArr[""].push({
        url: "#",
        text: "User Does Not Exist",
        created_at: "never :(",
      });
      setUser("User Does not Exist");
      setTweets(emptyArr);
      return;
    }
    const tweets = await getTweets(userId);
    setTweets(tweets);
  };

  useEffect(() => {
    let now = new Date();
    let weekAgo = new Date();
    weekAgo = new Date(weekAgo.setDate(weekAgo.getUTCDate() - 7));
    let dateRange = `${weekAgo.toLocaleDateString()} to ${now.toLocaleDateString()}`;
    setDateRange(dateRange);
  }, []);

  return (
    <div className="m-4 md:m-8">
      <div className="flex flex-row justify-between items-baseline">
        <h3 className="text-xl mb-4">
          <a href="#">hotnewtweethop.com</a>
        </h3>
        <div>
          <a
            className="no-underline text-blue-500 hover:underline"
            href="https://www.jordanfalcon.dev/"
          >
            jordanfalcon
          </a>
        </div>
      </div>
      <form className="flex mb-4 w-full md:w-96" onSubmit={submitUsername}>
        <input
          className="border rounded-lg md:w-64 text-center bg-grey border-gray-300 transition duration-300 md:text-xl focus:ring-0 focus:outline-none focus:border-blue-500 focus:border block w-full p-1.5"
          type="text"
          placeholder="enter username"
          id="username"
          name="username"
        />
        <button
          className="p-1.5 border w-32 rounded-lg ml-4 border-gray-300 transition duration-300 hover:text-blue-500 hover:border-blue-500"
          type="submit"
        >
          search
        </button>
      </form>
      <div className="text-xl mb-4">{dateRange}</div>
      {Object.keys(tweets).map((tweet, i) => {
        return (
          <div key={i}>
            <h3 className="font-bold my-2">{tweet}</h3>
            {tweets[tweet].map((tweet, i) => {
              return (
                <div className="my-0.5" key={i}>
                  <a
                    className="no-underline text-blue-500 hover:underline"
                    href={tweet.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tweet.text}{" "}
                    {tweet.tweetDescription ? (
                      <span>- ({tweet.tweetDescription})</span>
                    ) : (
                      ""
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
