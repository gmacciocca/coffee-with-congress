#!/bin/bash

cd frontend
npm install
npm run build
cd ..
cp -Rf ./frontend/public/* ./backend/public/
cd backend
pip install -r ./requirements-vendor.txt -t ./lib/ --upgrade
gcloud app deploy
