# Stage 1 - the build process
FROM node:alpine as build-deps

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app



COPY package.json package-lock.json  yarn.* ./
RUN yarn --quiet
COPY . ./
RUN  rm -rf build/ && yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
RUN mkdir -p /data/www

COPY --from=build-deps /usr/src/app/build /data/www

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

VOLUME ["/etc/nginx/conf.d", "/data/www"]

CMD ["nginx"]
EXPOSE 80
