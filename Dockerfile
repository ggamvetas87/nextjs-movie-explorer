# Dockerfile

FROM node:22.21.1-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY .env.production .env.production
ENV NODE_ENV=production

# Copy everything else
COPY . .

RUN yarn build

# Debug: check that .next exists
RUN ls -l .next
RUN ls -l .next/static
RUN ls -l .next/server
RUN ls -l public

# Production image, copy prod files and run next
FROM base AS runner
WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# standalone server
COPY --from=builder /usr/src/app/.next/standalone ./

# static assets
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

# Copy only the necessary files for running the application (no standalone output)
# COPY --from=builder /usr/src/app/.next ./.next/
# COPY --from=builder /usr/src/app/public ./public/
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./package.json
# COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts
# COPY --from=builder /usr/src/app/.env.production ./.env.production

EXPOSE 3000

# Start the application using the standalone server
CMD ["node", "server.js"]

# Start the application using the Next.js CLI (if not using standalone output)
# CMD ["./node_modules/.bin/next", "start"]
# CMD ["sh", "-c", "NODE_ENV=production ./node_modules/.bin/next start"]
