#!/usr/bin/env bash
set -euo pipefail

npx prisma generate

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Running prisma migrate deploy..."
  attempts=3
  delay=4
  migrated=0
  for i in $(seq 1 "$attempts"); do
    if npx prisma migrate deploy; then
      migrated=1
      break
    fi
    echo "WARNING: prisma migrate deploy failed (attempt ${i}/${attempts})."
    if [ "$i" -lt "$attempts" ]; then
      echo "Retrying in ${delay}s..."
      sleep "$delay"
      delay=$((delay * 2))
    fi
  done
  if [ "$migrated" -ne 1 ]; then
    echo "ERROR: prisma migrate deploy failed after ${attempts} attempts."
    exit 1
  fi
else
  echo "WARNING: DATABASE_URL is not set — skipping migrations."
fi

npx next build
