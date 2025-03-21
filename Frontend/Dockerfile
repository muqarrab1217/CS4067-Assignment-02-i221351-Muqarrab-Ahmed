# Use lightweight Node.js Alpine image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package files to improve caching
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Set environment variables for Vite to allow external access
ENV HOST=0.0.0.0

# Run the development server
CMD ["npm", "run", "dev"]
