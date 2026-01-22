<!-- CSS : prism -->
<!-- genre : design -->

## memo

こういうことやってみたいなぁというアイデア、便利なリンクなどをメモ。

##  Useful Links

* コードをhtmlに変換してくれる便利サイト :
  * <a href="https://www.bugbugnow.net/2020/02/HTML-special-character-converter.html" target="_blank">link</a>
  (1だけ変に変換される)
  * こちらも :
    <a href="https://www.webdesignleaves.com/pr/plugins/html_entity_convertor.html" target="_blank">link</a>  
* サンプル画像の生成 : <a href="http://placehold.jp/" target="_blank">link</a>
* Netlify FormでWeb拍手を作る : <a href="https://blog.comilab.net/post/2020-05-26/" target="_blank">link</a>

##  Idea

### headerのデザイン

現在は、コンテンツメニューを開くための「OPEN」ボタンはCSSで作図している。

難点
* OPENボタンだけのためにWebフォントを読みこむのは面倒・データの無駄遣い
* headerのデザインをrem単位でちまちま調節するのが面倒

対応策
* OPEN, BACKボタンはSVGで作図

### htmlエスケープのプログラム

参考
* コードをhtmlに変換してくれる便利サイト :
  <a href="https://www.bugbugnow.net/2020/02/HTML-special-character-converter.html" target="_blank">link</a>
  (1だけ変に変換される)  
* こちらも :
  <a href="https://www.webdesignleaves.com/pr/plugins/html_entity_convertor.html" target="_blank">link</a>
* 細かい計画は[こちら](./md-to-html.html)にも

### 自作の静的サイトジェネレーター

簡易的に、javaScript版は作ってみたけれど... : [markdown to html](md-to-html-backyard.html)  
このサイトを育てるためだけに、デスクトップ用の静的サイトジェネレーターを自作する...?  
JavaでGUIアプリ作るか、VS Codeの拡張機能を自作する...?

##  memo

### コードの折り返し

preタグでくくったコード(ブロック要素)が横長になった場合には、スクロールを付ける。  
本文中のコード(インライン要素)が長くなった場合は、適当なところで改行したい。

* prism.cssの編集
  <pre data-label="prism.css"><code class="language-css">
    code[class*="language-"],
    pre[class*="language-"] {
      (中略)
      /* white-space: pre; */
    }
  </code></pre>
* style.cssの編集
  <pre data-label="style.css"><code class="language-css">
    code{
      white-space: pre-wrap;
    }

    pre code{
      white-space: pre;
    }
  </code></pre>

##  trouble

解決に手間取ったトラブルは記録しておきたい...

* チェックボックスの操作  
  (兄弟関係でない要素とチェックボックスとの間の関係... javaScriptいじらないとムリだよ)