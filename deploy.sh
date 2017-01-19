#!/bin/bash


gcloud config set project qa-wtc
export DATABASE_NAME=qawtc
cd frontend
npm install
npm run build-qa
cd ..
cp -Rf ./frontend/public/* ./backend/public/
cd backend
pip install -r ./requirements-vendor.txt -t ./lib/ --upgrade
python manage.py migrate
rm app.yaml
ln -s ./development-app.yaml app.yaml
gcloud app --project=qa-wtc deploy
rm app.yaml
