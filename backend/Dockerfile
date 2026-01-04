# ---------- build stage ----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  COPY . .
  RUN pnpm build
  
  # ---------- production stage ----------
  FROM node:20-alpine
  
  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  ENV NODE_ENV=production
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  COPY . .
  
  # Prisma Client 생성 (마지막!)
  RUN pnpm prisma generate
  
  EXPOSE 8000
  CMD ["node", "dist/main.js"]
  