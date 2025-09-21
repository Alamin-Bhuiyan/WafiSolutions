# Stage 1: build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (use package-lock.json if present)
COPY package*.json ./
RUN npm ci --silent

# Copy source and run build. Support both Create React App (build/) and Vite (dist/) outputs.
COPY . .
RUN npm run build && \
    # if Vite created dist/, move it to build/ so downstream stage always sees /app/build
    if [ -d "dist" ]; then mv dist build; fi


# Stage 2: serve with nginx
FROM nginx:alpine

# Copy custom nginx config to enable proxying /graphql to the backend service
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder. Support both build/ and dist/
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
