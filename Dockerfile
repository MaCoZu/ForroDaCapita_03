# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the TinaCMS admin and the Astro site
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy only the built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Set environment variables for production
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 4321

# Command to run the app
CMD ["node", "./dist/server/entry.mjs"]
