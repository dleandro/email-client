# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY wait-for-it.sh ./

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

RUN npm install --production

EXPOSE 5173

RUN echo '#!/bin/sh' > /init.sh && \
    echo 'set -e' >> /init.sh && \
    echo 'npx prisma generate' >> /init.sh && \
    echo 'npx prisma migrate deploy' >> /init.sh && \
    echo 'npm start' >> /init.sh && \
    chmod +x /init.sh

EXPOSE 5173
ENTRYPOINT ["/init.sh"]