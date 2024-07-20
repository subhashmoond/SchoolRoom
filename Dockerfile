FROM node:21-alpine3.18 as angular
WORKDIR /ng-app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=angular /ng-app/dist/graviton-new-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 8080