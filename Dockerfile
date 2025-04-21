FROM node:22.14.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# ✅ Generate Prisma client
COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 5053

CMD ["npm", "run", "start:prod"]