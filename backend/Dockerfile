# Base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install
COPY tsconfig.json .

# Copy source code (this is used for the initial build; in dev, it will be overridden by a volume)
# COPY . .
# Copy source files into application directory
COPY --chown=app:app . /src

# Expose API port
EXPOSE 5000

# Default command (overridden by docker-compose for dev)
CMD ["npm", "run", "start"]

