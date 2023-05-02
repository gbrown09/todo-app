# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18.16-slim as build

# Set the working directory
WORKDIR /usr/local/app

COPY package*.json ./

# Install all the dependencies
RUN npm install

# Add the source code to app
COPY ./ /usr/local/app/

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/todo-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80