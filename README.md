# GPX Tracker

Static marketing site for the iOS app. Privacy stays at `/privacy` and support at `/support`.

## Local

```
npm run dev
```

Opens a local server on port 4177.

## Publish

The old Next.js app is gone. Push `main` to GitHub, then deploy the repo on [Vercel](https://vercel.com) as a static site (Framework: Other). If a Vercel project is already linked to this repo, open its settings and switch the framework off Next.js so it serves the HTML at the root.
