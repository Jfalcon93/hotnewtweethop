## hotnewtweethop

Design inspired by 2007 hotnewhiphop (and laziness)

![hotnewhiphop 2007](https://user-images.githubusercontent.com/14024082/188717069-6cb99651-1f32-4609-a0da-c07500cd87de.png)

What an abomination of a website lol. Simplicity at it's finest 🤌. It's so beautiful 🥲🥹.

Search for twitter users and get a list of all music links shared within the past week.

Currently capping the tweet api call at 50 tweets because you know what, I don't get unlimited twitter resources.

## Getting Started

You'll need a twitter account and developer access. Then you'll need to generate an OAuth Access Token. It's the only token needed for both api calls.

Locally create your .env.local file and populate it with the token and you should be GOOD TO GO.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Go to https://localhost:3000 to view your beautiful local instance.

You can change the number of tweets you receive on each call in the api call itself. Lot of flexbility obviously but you developers are smarter than me. Might be able to make this entire operation better.

## Future Fixes

- Please... somebody teach me some caching. Only wanna know cause if this were to ever blow up I'd like to have a way to limit api calls.
- Add cool logos to links to allow user's to know what site the music is being hosted.
- Better error handling from the api calls
- Possssssibly finding a way to store all links for a user in a database for future reference
- Allow date range to change
