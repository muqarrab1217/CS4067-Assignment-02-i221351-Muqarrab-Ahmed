# Use lightweight Node.js Alpine image
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
EXPOSE 5173
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev"]
