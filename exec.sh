#!/usr/bin/env bash
docker build -t you-play-ui .
docker run --init -p 3000:3000 -p 3001:3001 --env-file .env.local -it you-play-ui
