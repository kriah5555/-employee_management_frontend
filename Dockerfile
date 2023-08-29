FROM node:18.17.1-slim

WORKDIR /app

COPY ./package.json ./

# RUN npm install

RUN npm install --legacy-peer-deps

COPY ./ ./

EXPOSE 3000

# CMD ["npm", "start"]

CMD ["npm", "run", "start"]
