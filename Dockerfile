# Use a smaller node image
FROM node:22.14.0-slim

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install Prisma client
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 5053

# Command to run the application (includes migration)
CMD ["sh", "-c", "npm run prisma:migrate && node dist/main"]
