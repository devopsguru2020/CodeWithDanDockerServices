#/bin/bash

docker rm nginx node-worldoflinux cadvisor mongo redis 

docker image rm --force worldoflinux/nginx worldoflinux/node-worldoflinux worldoflinux/mongo worldoflinux/redis

docker system prune --force 


