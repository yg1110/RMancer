# ---------- build stage ----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  # Prisma (있다면)
  COPY prisma ./prisma
  RUN pnpm prisma generate
  
  COPY . .
  RUN pnpm build
  
  
  # ---------- production stage ----------
  FROM node:20-alpine
  
  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  ENV NODE_ENV=production
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile --prod
  
  # 🔑 builder 결과물 복사
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/next.config.ts ./next.config.ts
  
  EXPOSE 3000
  CMD ["pnpm", "start"]
  