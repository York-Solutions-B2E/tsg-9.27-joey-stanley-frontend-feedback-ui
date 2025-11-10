# Step 1: Build the app
FROM node:22 AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build


# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
