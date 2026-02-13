<!--  CSS : prism-->
<!-- genre : design -->

## Images

Lightboxの使い方や、サムネについて

##  thumbnails

準備中

##  Lightbox

> 2026.02追記  
>
> 現在、サイト内でLIGHTBOXは使用していない。  
> 記録として、メモだけは残しておく

画像がフワッと浮かび上がる。
使用例は<a href="https://lokeshdhakar.com/projects/lightbox2/" target="_blank">ここ</a>。  
<b>jQuery必須</b>

### lightboxの導入

lightboxを使うには、

* jQuery(適当なところからダウンロード)
* <a href="https://github.com/lokesh/lightbox2" target="_blank">この</a>CSSとjavaScript

が必要。
lightboxのzipファイルをダウンロードする沢山ファイルが入っているけれど、

* dist/images中の画像
* dist/jsのlightbox.js
* dist/cssのlightbox.css

しか使わない。

lightbox.css(&amp;lt;header>の中)

<pre data-label=".html"><code class="language-html">
&amp;lt;link rel="stylesheet" href="css/lightbox.css" type="text/css">
</code></pre>

jQuery(&amp;lt;/body>の直前)

<pre data-label=".html"><code class="language-html">
&amp;lt;script src="js/jquery-3.6.0.min.js">&amp;lt;/script>
</code></pre>

lightbox.js(&amp;lt;/body>の直前)

<pre data-label=".html"><code class="language-html">
&amp;lt;script src="js/lightbox.js">&amp;lt;/script>
</code></pre>

### lightboxのアレンジ

キャプションのアレンジなど。

* <a href="https://oku-log.com/blog/lightbox/" target="_blank">これ</a>をみると、タイトル内でpなども指定できる。  
  オプションdata-titleを使えば、タイトルを書ける。   
  タイトルは **"** でくくること。  
  **"** の中で、a hrefを使ってリンクを貼ることもできる(この時、リンクは **"** ではなく **'** でくくること)。
* <a href="https://www.web-myoko.net/blog/web-production/how-to-make-new-line-jquery-lightbox-caption/"
  target="_blank">これ</a>上手く使ってjavaScriptを書きかえれば、キャプションで改行できる。
* <a href="https://qiita.com/YuuTee/items/1860b988485d0504b831" target="_blank">これ</a>でjavaScriptいじるのも。

##  Spotlight

lightboxと似ているツールで、Spotlightというのもある。  
lightboxと比較して

* 導入方法はほぼ同じ(jQueryと、Spotlight用のCSS、javaScript、imagesを使う)
* モーダルウィンドウの内容が充実    
  「全画面表示」ボタンなどがある。  
  タイトルやキャプションが充実している(ボタン付けたりできる)。  
  でも、タイトルなどで画像が覆われてしまうことも...
* レスポンシブ対応のやり方がよく分からなかった...?   
  上手く設定できなかった。Spotlightのデモページはちゃんとレスポンシブ対応していたけれど、自分でコードを組むと上手くいかない。lightboxは、特に何も考えなくてもレスポンシブしてくれる。