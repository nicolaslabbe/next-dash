# Install

```javascript
yarn
cp .env.dist .env
cp .ecosystem.config.js.dist .ecosystem.config.js
```

edit `.env`

```
cp .env.dist .env && vi .env
```

variables

```
PROTOCOL=http
DOMAIN=localhost
PORT=8000

SENTRY_BO_KEY=
SENTRY_BO_SECRET=
SENTRY_BO_PROJECT_ID=

SENTRY_FO_KEY=
SENTRY_FO_PROJECT_ID=

OPEN_WEATHER=
OPEN_WEATHER_CITY=

WEB_PUSH_PUBLIC_KEY=
WEB_PUSH_PRIVATE_KEY=

IMDB_API_KEY=

NEWS_TOKEN=

TRAIN_BEARER=
TRAIN_STOPS=[{"id": 87686006, "direction": ["Melun", "corbeil"]}, {"id": 87682153, "direction": ["Goussainville", "stade-france-st-denis", "gare-de-lyon-rer-d"]}]
```

edit `.ecosystem.config.js`

```
cp .ecosystem.config.js.dist .ecosystem.config.js && vi .ecosystem.config.js
```

start

```
NODE_ENV=production pm2 startOrRestart ecosystem.config.js
```

# RASPBERRY

Install

- wifi
- ssh
- git (sudo apt-get install git)
- node (curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt install nodejs)

```
git clone https://github.com/nicolaslabbe/next-dash.git
cd next-dash
npm i
```

# TODO

http2 https://blog.yld.io/2017/11/03/http-2-in-node-js-core/#.WgmEdLAtXMU
