## TTC Next v2.0

TTC Next v2 is a web application that provides real-time information about the TTC (Toronto Transit Commission) subway system. It is a single-page application that uses [UMO open data API](https://retro.umoiq.com/service/publicJSONFeed) to display the current status of the buses/stree car lines, and estimated arrival time (ETA) for the next vehicle at a given stop number.

Check out the original one in [here](https://github.com/HoiPangCHEUNG/TTC-Next)

## What's new in v2.0

- Rebuilt with Next.js & Radix UI
- Redux + SWR integration
- Simplified click-and-search flow

## How to run the app

```
npm install
npm run dev
```

## How to use the app

- Enter the stop number in the search bar and click on the search button
- Bookmark the specific route inside this stop
- Check the ETA before you leave your home/office

Pro tip: If it’s practical, consider taking the car. 🚗

## Acknowledgements

SVG icons from [Delesign Graphics](https://iconscout.com/contributors/delesign) on Iconscout

## Development Decisions

I decided to switch from server actions to API routes for a smoother debugging experience. With API routes, I can easily track requests and responses through the browser’s network tab, making troubleshooting much more efficient.

Server actions, on the other hand, felt like a bit of a black box—when things went wrong, it was hard to trace the issue. Since this project only interacts with public external services, there’s no need to hide anything from the client side, making API routes the ideal choice here.

This switch results in faster debugging, clearer insights, and an overall better development flow.

P.S.1: I still use server actions for production-level projects—just not for this one.

## License

Under the MIT License
