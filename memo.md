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
- [ ] ドラックアンドドロップでタスク移動（トレロイメージ）（アイゼンハワー）react-beautiful-dndは18に未対応、dnd-kitで実装

- [ ] 複雑なデータの保存、もしくはDB利用（Docker?）
- [ ] Electronでアプリケーション化

## dnd-kitメモ
[ストーリーブック](https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/)  
[公式サイト](https://docs.dndkit.com/)  
-  droppable/-multiple-droppableが理想？  