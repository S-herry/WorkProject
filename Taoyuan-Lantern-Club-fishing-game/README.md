# Taoyuan-Lantern-Club-fishing-game

桃園燈會釣魚小遊戲

使用 react-unity-webgl -- 9.6.0
串接 React 交互
css Framework 使用 bootstrap

Unity 主要執行文件 src/content/GetFishUnity
動畫狀態管理 src/store/Admin
常用狀態 src/store/ConnState

UnityContext 內有 GoOnline 並需要是 false
並且打開 79 行內容 才可執行本地端開啟遊戲

2025/2/07 線上網址
https://lanterngo.com/web/1

啟動專案
npm install
解開 static 裡面的 Build.zip 檔案並放置在 static 裡面 static/build/
npm start
