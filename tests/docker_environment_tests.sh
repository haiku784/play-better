#!/bin/bash
set -e
docker-compose up -d
# Ensure all services are running
if [[ $(docker ps -q | wc -l) -gt 0 ]]; then echo 'Docker services running'; else echo 'Docker services not running'; exit 1; fi