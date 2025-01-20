# MEMO
## 　構成
- /server ... node.jsベースのAPIサーバー　DBにJSONを使用
- /node-todo ... react/viteベースのアプリケーション本体 


## 使い方
### /server 
`node server.js`でAPIサーバーを起動  

### /node-todo
`npm run dev`で開発サーバーを起動


## 展開
- [✅] Node.jsのフレームワーク「Express」を使用し、REST APIを作成してフロントエンドと通信、表示
- [✅] カテゴリ（優先度別）実装
- [✅] ReactでフロントのUX/UI改善→viteで導入　Babel、Webpack無し
- [ ] ドラックアンドドロップでタスク移動（トレロイメージ）（アイゼンハワー）
- [ ] 複雑なデータの保存、もしくはDB利用（Docker?）
- [ ] Electronでアプリケーション化