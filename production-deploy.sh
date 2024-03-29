#!/bin/bash
echo "CAREFUL!"
echo "Running these versions of software:"
which npm
which python
read -r -p "Deploying to production! Are you sure? [y/n]" -n 1 REPLY
 if echo "$REPLY" | grep -iq "^y" ; then
   export DATABASE_NAME=cwc
   gcloud config set project causal-port-151005
   cd frontend
   npm install
   npm run build
   cd ..
   cp -R ./frontend/public/* ./backend/public/
   cd backend
   pip install -r ./requirements-vendor.txt -t ./lib/ --upgrade
   rm app.yaml
   ln -s ./production-app.yaml app.yaml
   python manage.py migrate
   gcloud app --project=causal-port-151005 deploy
   rm app.yaml
 else
   echo "Press Y - for yes, everything else is interpreted as no!"
 fi
