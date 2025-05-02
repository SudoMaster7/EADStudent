#!/bin/bash

echo "Executando migrações..."
python manage.py migrate

echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

exec "$@"
# Entrypoint script for Docker container