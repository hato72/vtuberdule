This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### Getting Started
```bash
npm run dev
# or
yarn dev
```

#### 補足
(https://holodex.net/)でAPIを取得し、.env.localファイルに記述する

NEXT_PUBLIC_HOLODEX_API_KEYのように、prefixでNEXT_PUBLICを指定しなければenvからAPIを取得できなかった


#### デプロイ先(vercel)
https://vtuberdule-pink.vercel.app/


#### 参考
https://github.com/eternaleight/custom-holo-app

https://docs.holodex.net/


#### 主な機能
Vtuber名検索、タイトル検索機能

事務所別Vtuber配信状況表示機能

・現在は大手事務所である、ホロライブ(ホロスターズ)、にじさんじ、あおぎり高校、ぶいすぽっ！、ななしいんく、ネオポルテに対応している

#### 開発メモ
配信をスケジュールしているアイコン(青丸で囲ったアイコン)が右側に来てしまう =>
sort = start_actualにするとできそう?

ひらがなとカタカナ両対応での検索ができていない