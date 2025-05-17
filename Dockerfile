# Stage 1: Build the Angular application
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --omit=dev

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/carecentral/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
