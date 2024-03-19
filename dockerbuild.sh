#!/bin/bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose build

# The two environment variables `COMPOSE_DOCKER_CLI_BUILD=1` and `DOCKER_BUILDKIT=1` are used to enable specific features in Docker.

# 1. `COMPOSE_DOCKER_CLI_BUILD=1`: This environment variable is used to enable the use of the Docker CLI instead of Docker Compose for building images. This is a newer feature that can provide better performance and support for newer Docker features.

# 2. `DOCKER_BUILDKIT=1`: This environment variable enables the use of BuildKit for building Docker images. BuildKit is a new, improved builder for Docker which provides advanced features like efficient layer caching, parallel build steps, and build secrets, among others. It can provide faster and more reliable builds.

# The `docker compose build` command following these environment variables builds your Docker images. The environment variables are set just for this command and won't affect other commands in the script or your shell session.