# Welcome to The Hall Of Fame (<= 90min)

Storyboard for a simple highscore application using the **API first (top-down)**-strategy.

## The API (<= 5min)
```
git clone git@github.com:sius/hall-of-fame.git
cd hall-of-fame
```

## Install Some Npm Tools Globally (<= 5min)
```
npm i -g swagger-nodegen-cli
npm i -g @angular/cli
```

## Highscore Server - Part 1 (<= 30min)
Generate nodejs-server and implement service

```
swagger-nodegen-cli generate \
  -i ./api/swagger.yaml \
  -o ./highscore-server \
  -l nodejs-server

cd highscore-server
npm install
npm install nedb
```

`Live Coding`

## Highscore Client - Part 1 (<= 5min)
Generate Angular Application
```
ng new highscore-client
npm install
ng serve
```

## Highscore Data Service Module (<= 5min)

```
mkdir config
touch config/typescript-angular.json

swagger-nodegen-cli config-help \
  -l typescript-angular

swagger-nodegen-cli generate \
  -i ./api/swagger.yaml \
  -o ./highscore-client/src/lib/highscore-data-service \
  -c ./config/typescript-angular.json \
  -l typescript-angular
```

## Highscore Client - Part 2 (<= 30 min)
Implement Angular Client using the data service module and the highscore-server

```
npm i rxjs-compat
```
`Live Coding`


## Highscore server - Part 2 (<= 5min)
Update with express middleware and restart server
```
cd ./highscore-server
npm i express cors helmet
```

`Live Coding`