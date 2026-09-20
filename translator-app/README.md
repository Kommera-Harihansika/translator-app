# Text Translator (React + Tailwind + RapidAPI)

1. Subscribe to a translation API on RapidAPI (this project is set up for "Google Translate", host `google-translate1.p.rapidapi.com`) and copy your key.
2. `cp .env.example .env` and paste your key.
3. `npm install`
4. `npm run dev`

If you use a different RapidAPI translation API, only `src/services/translateApi.js` needs to change (URL, headers, body, response path).

Note: `VITE_` variables are bundled into the browser code. That is fine for learning, but for a deployed app call RapidAPI from a small backend so the key stays private.
