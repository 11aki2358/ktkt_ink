<!-- CSS : prism -->
<!-- genre : design -->

## memo

こういうことやってみたいなぁというアイデア、便利なリンクなどをメモ。

##  Useful Links

* コードをhtmlに変換してくれる便利サイト
    <a href="https://www.webdesignleaves.com/pr/plugins/html_entity_convertor.html" target="_blank">link</a>  
* サンプル画像の生成 : <a href="http://placehold.jp/" target="_blank">link</a>
* Netlify FormでWeb拍手を作る : <a href="https://blog.comilab.net/post/2020-05-26/" target="_blank">link</a>

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