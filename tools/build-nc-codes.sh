#!/bin/bash

yaml2ts() {
  if [[ -f "$1" ]]
  then
    echo "found $1, removing"
    rm "$1"
  fi

  echo "generating $1"

  echo -n "export const =" > $1
  ./bin/yaml2json ${1/ts/yml} >> $1

  # echo "export const G_CODES=" > $1
}

yaml2ts "./src/NcCodes/gcodes.ts"
yaml2ts "./src/NcCodes/mcodes.ts"
