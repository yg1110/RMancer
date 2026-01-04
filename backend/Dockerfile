# ---------- build stage ----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  COPY prisma ./prisma
  RUN pnpm prisma generate
  
  COPY . .
  RUN pnpm build
  
  
  # ---------- production stage ----------
  FROM node:20-alpine
  
  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  ENV NODE_ENV=production
  
  # 🔑 builder에서 검증된 node_modules 그대로 복사
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/dist ./dist
  COPY package.json ./
  
  EXPOSE 8000
  CMD ["node", "dist/main.js"]
  