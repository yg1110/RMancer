# ---------- build stage ----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  COPY . .
  
  # Next build
  RUN pnpm build
  
  # ---------- production stage ----------
  FROM node:20-alpine
  
  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  ENV NODE_ENV=production
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile --prod
  
  # build 결과물만 복사
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/next.config.ts ./next.config.ts
  
  EXPOSE 3000
  
  CMD ["pnpm", "start"]
  