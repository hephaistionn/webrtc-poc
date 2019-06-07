# POC WebRTC

WebRTC + VueJS + VueX + Webpack + Redis

![alt tag](https://raw.githubusercontent.com/hephaistionn/webrtc-poc/master/client/assets/diagram.png)

## Installation

Webpack => client packager
Redis => scalability, communication between node instances
Node => server script 
pm2 => Load-Balancing, cluser (Production Only)

## Start project

```sh
$ npm install
$ npm start
```

Click on start to enter in waiting room.
When room have 4 users, the roulette starts.


