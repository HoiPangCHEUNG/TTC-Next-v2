## TTC Next v2.0

TTC Next v2 is a web application that provides real-time information about the TTC (Toronto Transit Commission) subway system. It is a single-page application that uses [UMO open data API](https://retro.umoiq.com/service/publicJSONFeed) to display the current status of the buses/stree car lines, and estimated arrival time (ETA) for the next vehicle at a given stop number.

Check out the original one in [here](https://github.com/HoiPangCHEUNG/TTC-Next)

## What's new in v2.0

- Built on top of NextJs 14
- Radix UI components
- Simplified click and search flow
- Simplified Redux store + Redux Persist

## Why Next.js 14?

Server Actions & RSC (React Server Components) are the main features of Next.js 14.

Currently, this web app uses server action to fetch data from the UMO API.

In the future, if we migrate from Redux Persist to an actual database, we could fetch the bookmarked ETA data and render the server components on the server side to improve performance.

## How to run the app

```
npm install
npm run dev
```

## How to use the app

- Enter the stop number in the search bar and click on the search button
- Bookmark the specific route inside this stop
- Check the ETA before you leave your home/office

and say farewell to the hassle of searching for your ETA on different maps, or Transit App.

## Acknowledgements

SVG icons from [Delesign Graphics](https://iconscout.com/contributors/delesign) on Iconscout

## License

Under the MIT License
