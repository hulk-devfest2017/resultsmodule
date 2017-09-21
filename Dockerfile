FROM hypriot/rpi-node

LABEL Description="Devfest 2017 results module image" Vendor="SQLI" Version="1.0"

ADD application /application

WORKDIR /application/client

RUN yarn install
RUN yarn build

WORKDIR /application/server

RUN yarn install

CMD node app.js
