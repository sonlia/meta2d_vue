git fetch --all
git reset --hard origin/main
cd back
yarn
cd  ../front
yarn
yarn build
echo "启动服务"
cd ..
nohup node ./back/server.js &
echo "完毕 。。大爷"
