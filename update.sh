git fetch --all
git reset --hard origin/main
cd  front
yarn
yarn build


cd ../back
yarn
echo "启动服务"
nohup node ./server.js &
echo "完毕 。。大爷"
