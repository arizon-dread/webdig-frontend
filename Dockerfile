FROM node:18.15-alpine3.17 AS build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
ARG configuration=production
RUN npm run ng build -- --configuration $configuration webdig-frontend

#FROM registry.access.redhat.com/ubi8/nginx-120
FROM docker.io/regionorebrolan/openshift-nginx:v1.25.3
#RUN mkdir -p /opt/app-root/src/ && chgrp -R 0 /opt/app-root/src/ && chmod g=u -R /opt/app-root/src/
#COPY --from=build /app/dist/ /opt/app-root/src/
COPY --from=build /app/dist/webdig-frontend /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]
