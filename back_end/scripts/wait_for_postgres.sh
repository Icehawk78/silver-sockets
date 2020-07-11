#!/bin/sh
# wait-for-postgres.sh

set -e

cmd="$@"

echo "Waiting for Postgres"
until psql $DATABASE_URL -c '\q' &> /dev/null; do
  sleep 1
done

>&2 echo "Postgres is available"
exec $cmd
