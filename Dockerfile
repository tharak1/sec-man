# Stage 1: Build Stage
FROM node:20 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including devDependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if applicable, e.g., for React or Next.js)
# Uncomment the line below if your project requires building:
RUN npm run build

# Stage 2: Production Stage
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the built application (if applicable) or all files
COPY --from=builder /app .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
