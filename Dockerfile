# Use Node.js 18 Alpine image (lightweight)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy Prisma schema before building
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the app source code
COPY . .

# Build the Next.js production app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
