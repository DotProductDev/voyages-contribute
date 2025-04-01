# Build stage
FROM node:23-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Run your build-server script
RUN npm run build-server

# Production stage
FROM node:23-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy build artifacts from the build stage
# Update this path to match your build output location
COPY --from=build /usr/src/app/output/server ./

# Expose the port your app runs on
EXPOSE 3000

# Use non-root user for better security
USER node

# Volume for SQLite database persistence
VOLUME /etc/data

# Set the command to run your application
CMD ["node", "server.js"]