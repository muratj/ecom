#!/bin/bash

docker compose --env-file .env up -d

npm run start:dev
