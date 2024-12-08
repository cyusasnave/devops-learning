# Stage: Build stage
FROM node:20-alpine3.20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine3.20
RUN addgroup -S app && adduser -S -G app app
WORKDIR /app
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
USER app
EXPOSE 3001
CMD [ "node", "dist/main.js" ]
