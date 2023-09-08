# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose a port (if your Node.js app listens on a specific port)
EXPOSE 7850

# Define the command to run your application
CMD [ "node", "index.js" ]
