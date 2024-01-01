FROM node:latest
WORKDIR /usr/src/crud-todo-react
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR /usr/src/crud-todo-react/build
EXPOSE 3000
CMD [ "npm", "start" ]