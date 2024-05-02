#!/bin/bash

TZ='America/Sao_Paulo'
TIMESTAP=$(date +"%Y%m%d%H%M%S")
DEFAULT_FOLDER=./src/database/migrations

# Define usage function
usage() {
    echo "Usage: $0 <command>"
    echo "Available commands:"
    echo "  create <name>        - Create a new migration"
    exit 1
}

if [ "$#" -lt 1 ]; then
    usage
fi

case "$1" in
    create)
        if [ "$#" -ne 2 ]; then
            echo "Error: Name not provided."
            usage
        fi
    
        FILE=$DEFAULT_FOLDER/$TIMESTAP-$(echo "$2" | tr '[:upper:]' '[:lower:]').ts
        cat scripts/migrate/migrate.pg.tpl | sed -e "s/\${i}/$2/" > $FILE
	    echo "created migration: $FILE"
        ;;
    *)
        echo "Error: Invalid command '$1'"
        usage
        ;;
esac
