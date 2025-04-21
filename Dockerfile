# Use a Node.js base image
FROM node:22.14.0-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy Prisma schema to build the client before app build
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (5053 in your case)
EXPOSE 5053

RUN echo $DATABASE_URL

# Run the Prisma migrations and then start the application at runtime
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
