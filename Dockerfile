FROM node:stable as node-dev

WORKDIR /src

COPY package.json yarn.lock .npmrc ./

RUN  yarn install --developement

COPY . .

RUN yarn build

# Using nginx to serve front-end
FROM node:stable

EXPOSE 8080

WORKDIR /var/www/html
RUN apt-get update && apt-get install -y net-tools curl iputils-ping telnetd telnet nano vim dnsutils

USER root
RUN chmod -R g+w /var/cache/
RUN chmod -R g+w /var/run/

# Copy built artifacts
COPY --from=node-dev /src/build/ ./

# Copy nginx configuration folder
COPY ./nginx/conf.d/portal.conf /etc/nginx/conf.d/default.conf 