FROM node:20-bookworm-slim
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install
EXPOSE 4000
CMD ["pnpm", "--filter", "api", "dev"]
