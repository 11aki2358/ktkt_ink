<!-- CSS : prism -->
<!-- genre : design -->

## Design

サイト全体の構成やhtml, CSS, javaScriptに関する備忘録的な制作メモ。

##  header

headerタグの中身についてのメモ。
headerタグの中では、
* サイトのタイトル<br>
    ページ上部で固定している。h1見出しで、aリンク。
* コンテンツメニューのボタン<br>
    ページ右上で固定しているOPEN/BACKボタン
* コンテンツメニュー<br>
    OPENボタンを押すと出てくる。

を使用して、ハンバーガーメニューを実装。<br>
主にheader.css, headline.cssが関与。<br>
詳細はここ: <a href="./design-header.html">link</a>

##  headline

見出しについて...

* ページ内リンクでの移動先を変える(style.css):
  <a href="https://www.softel.co.jp/blogs/tech/archives/6083" target="_blank">link</a><br>
  方法(2)を使う。<code class="language-css">padding-top</code>と<code class="language-css">padding-bottom</code>の値は、headerで設定した値に依存する。
* h1リンクの大きさは、headerで設定した値に依存する。
* h2の点線: <a href="https://saruwakakun.com/html-css/reference/h-design" target="_blank">link</a>

<a href="https://cookbook.xrea.jp/js-cookbook/heading/table-of-contents.php" target="_blank">見出しを自動で作る</a> : コンテンツメニューに実装したい

##  Images

lightboxやサムネについて。<br>
<a href="https://www.iconfinder.com/iconsets/zoo-line-welcome-to-zootopia" target="_blank">かわいいSVG</a><br>

詳細はここ : <a href="./design-images.html">link</a>

##  Decolation

インライン要素の装飾についてはここ : <a href="./design-inlineDeco.html">link</a>

### ボタン

* フラットなボタン :
  <a href="https://jajaaan.co.jp/css/button/#furattonabotan" target="_blank">link</a>
* 線を利用したボタン :
  <a href="https://jajaaan.co.jp/css/button/#zhuni_xianwo_shi_yongshitadezainnobotan" target="_blank">link</a>

ファイトクラブの石鹼みたいなボタン、作ってみたい

### 背景

<a href="https://freefrontend.com/" target="_blank">良いサンプル</a>

* ドット : <a href="https://codepen.io/thebabydino/pen/dyoPdqj" target="_blank">link</a>
* やばい ; <a href="https://codepen.io/eZ_UI/pen/vYBbvxZ" target="_blank">link</a>

### 箇条書き

* 箇条書きのまるぽちや数字の位置<br>
  本文と比べて、インデントが広すぎる...<br>
  これを修正するには、(decoration.cssで)<br>
  <pre data-label="decoration.css"><code class="language-css">padding-left: 1.2rem;</code></pre>
  なお、これの値を1remにすると、まるぽちの位置が、親要素の縁とちょうど重なる。
* 中央寄せの番号付き箇条書き(decoration.css) : <br>
  spanで囲われた範囲に、数字を付けて箇条書きにする、疑似的な箇条書き :
  <a href="https://qiita.com/suin/items/209a1211892c142da882" target="_blank">link</a><br>
  コンテンツメニューの、中心寄せの箇条書きに...
<!-- 
##  Access limitation
未実装。<br>
Netlifyでデプロイする静的サイトでは、Basic認証や.htaccessによる制限ができない。<br>
それでもなんとかして夢腐血薬イラストに閲覧制限をかける方法を模索...<br>
詳細はここ : <a href="./design-limitation.html">link</a> -->

##  Footer
短い記事のページでもフッターがページ最下部に固定するように : <a href="https://www.nxworld.net/css-sticky-footer.html" target="_blank">link</a>