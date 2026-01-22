# Hosting

Vercelを使う

* 無料・クレジットカード不要
* Basic認証を使える
* phpも使える
* gitHubと連携可能
* データベース使える
* [Next.jsとVercel](https://tomosta.jp/article/nextjs-basic/)
* とりあえずは、html, CSS, javaScriptのみで「ザ・静的サイト」を作る(認証のみ、phpかbasicを使用)
* 慣れてきたら、Next.js触ってみたり、データベースいじってみたりする

# 全体構成
```
[temp]
    ├ [css]     CSSディレクトリ
    │   ├ style.css     全体のデザインのCSS
    │   ├ novel.css     小説ページのデザインのCSS
    │
    ├ [js]      JavaScriptディレクトリ
    │   ├ general.js      全ページ共通の動作
    │       （スクロール、表示/非表示切り替えなど）
    │
    ├ [img]     全ページ共通の画像
    │   ├ banner.jpg      バナー画像
    │
    ├ readme.txt      説明
    │
    ├ index.html      indexページ
    │
    ├ [novel]     小説ディレクトリ
    │   ├ novel-index.html
    │   ├ novel1.html
    │   ├ novel2.html
    │   ├ novel3.html
    │
    ├ [illust]     イラストのディレクトリ
    │   ├ illust-index.html        
    │   ├ illust1.png
    │   ├ illust2.png
    │   ├ illust3.png
    │
    ├ [news]     更新履歴
    │   ├ news-index.html
    │     (詳細な説明が必要な内容にのみ、個別ページを与える)
    │   ├ news1.html
    │   ├ news2.html
    │   ├ news3.html


```    

# 色味について
Led Zeppelin I をイメージ
##  ホワイトモード
  * 背景 : 白
  * 文字 : 黒
  * 見出し
    * 枠がコバルトか黒、文字は白
    * コバルトの文字
##  ダークモード
  * 背景 : 黒
  * 文字 : 白
  * 見出し
    * 枠がオレンジか白、文字は黒
    * オレンジの文字