#!/bin/bash

read -r -p "Deploying to production! Are you sure? [Y/n]" response
 response=${response,,} # tolower
 if [[ $response =~ ^(yes|y| ) ]] | [ -z $response ]; then
   export DATABASE_NAME=cwc
   gcloud config set project causal-port-151005
   cd frontend
   npm install
   npm run build
   cd ..
   cp -Rf ./frontend/public/* ./backend/public/
   cd backend
   pip install -r ./requirements-vendor.txt -t ./lib/ --upgrade
   rm app.yaml
   ln -s ./production-app.yaml app.yaml
   python manage.py migrate
   gcloud app --project=causal-port-151005 deploy
   rm app.yaml
 fi
