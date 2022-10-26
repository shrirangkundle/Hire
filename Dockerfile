FROM node:12 AS build

RUN mkdir -p /app

RUN pwd
RUN ls

COPY . /app

WORKDIR /app

RUN pwd
RUN ls

#COPY ./package.json /app

#RUN npm install --legacy-peer-deps
RUN npm install --legacy-peer-deps
#RUN react-scripts build

#RUN ng build

RUN npm run build

#RUN pwd

RUN ls -lrt

#RUN ls -lrt /app/build

#FROM nginx:latest

#RUN ls -lrt /app/dist/blitzigo-sample-ui

#COPY --from=build /app/dist/blitzigo-sample-ui /usr/share/nginx/html

#RUN npm run build --prod

#ENV PORT=80

#EXPOSE 80

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80