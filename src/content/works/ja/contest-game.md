---
lang: ja
key: contest-game
title: "Entrust(X)"
summary: "ステガノグラフィを用いた写真共有型の謎解きゲーム"
award: |
  🏆IVRC 2026 メタバース部門 最優秀賞
  🏆長谷川晶一賞
  デモ展示 ＠第31回日本バーチャルリアリティ学会大会
description: |
  VRChat上で遊べる、写真の共有を軸にした謎解きゲームです。ゲーム内で撮影した写真に [#EntrustX](https://x.com/search?q=%23EntrustX&src=typed_query) を付けてXに投稿すると、後日、ワールド内の撮影された場所にその写真が現れます。

  これは、写真そのものに情報を隠して埋め込むステガノグラフィによって実現しています。シェーダーでカメラ座標などを画像に書き込み、サーバーとクライアントで復号する仕組みです。

  記念写真をXに投稿するという既存のVRChat文化をそのまま利用し、時間やインスタンスを越えたコミュニケーションを可能にする作品です。

  5人チームで開発を行い、主に企画とステガノグラフィ機能の開発を担当しました。ステガノグラフィ機能では、写真に情報を埋め込む処理と、それを復号する処理を開発しました。また、人間の目の特性を考慮して視認しにくい埋め込み方法を開発し、写真の見た目と復号精度の両立を実現しました。

  IVRC 2026 メタバース部門で最優秀賞と長谷川晶一賞（特別審査員賞）を受賞しました。

  解説記事：[note](https://note.com/hadnf/n/n0c41e3211e3d)
  起動リンク：[VRChatでワールドを開く](https://vrchat.com/home/launch?worldId=wrld_8bb0c0d8-5cc6-4050-9fc6-420caf14f154)
category: Game Development
period: 2026年5月 – 現在
role: "企画・ステガノグラフィ機能開発"
tech:
  - VRChat
  - Unity
  - C#
  - UdonSharp
  - HLSL
  - Python
  - JavaScript
  - Render
  - Google Apps Script
  - Git
youtube: "https://youtu.be/_8B_9jyyw9g?si=Lr5RnjBYghxm7h6h"
order: 10
draft: false
---
