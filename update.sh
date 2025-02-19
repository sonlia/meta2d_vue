git fetch --all
git reset --hard origin/main
cd back
yarn
cd  ../front
yarn
yarn build
echo "完毕 。。大爷"
