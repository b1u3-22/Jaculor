FROM node AS builder

ARG REACT_APP_ENV
ENV REACT_APP_ENV=${REACT_APP_ENV}

WORKDIR /app
COPY . .
RUN npm install react-scripts -g
RUN npm install
RUN NODE_ENV=production REACT_APP_ENV=$REACT_APP_ENV npm run build

FROM node:alpine
RUN npm install serve -g --silent
WORKDIR /app
COPY --from=builder /app/build .
#COPY api /api

#WORKDIR /
#RUN apk add python3 py3-flask py3-pip py3-gunicorn
#RUN pip3 install flask-sqlalchemy

#COPY entrypoint.sh /
EXPOSE 5002
CMD ["serve", "-p", "5002", "-s", "."]
