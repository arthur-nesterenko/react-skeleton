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

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html



# CMD ["nginx", "-g", "daemon off;"]