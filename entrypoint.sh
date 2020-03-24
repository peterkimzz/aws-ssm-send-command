#!/bin/sh -l

echo "Instance Id $1"
echo "Run-Command $2"

instance-id=$1
time=$(date)
echo "::set-output name=time::$time"
