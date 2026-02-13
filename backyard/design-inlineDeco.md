<!-- CSS : prism -->
<!-- genre : design -->

## Inline decorations

インライン要素のうち、文や単語の装飾に関するものを集めた。
具体例はここ : <a href="./example.html">link</a>

## a

本サイト上のリンクはオレンジ色。それ以外のサイトへのリンクはtarget="_blank"を指定して、新しいタブで開くようにしている。
その際、target="_blank"なリンクのみのスタイルを変える方法は、

<pre data-label="inline-deco.css"><code class="language-css">
a[target="_blank"] {
  color: var(--type1-link-color2);  //  実際の設定とは違うよ
}
</code></pre>

javaScriptで、「外部リンクを貼る場合は、<code class="language-html">rel="noreferrer noopener"</code>を追加」する(属性の追加)には...

<a href="https://into-the-program.com/javascript-a-tag-target-blank-rel-noopener/" target="_blank">link</a>

<pre data-label="general.js"><code class="language-js">
function aTargetBlankRel() {
  //ドキュメント内のa要素を取得
  const elements = document.getElementsByTagName('a');

  for (let element of elements) {
    //a要素のhref（リンク）を取得
    let target = element.getAttribute('target');

    //target属性が_blankであれば
    if (target === '_blank') {
      //rel属性を付与
      element.setAttribute('rel', 'noreferrer noopener');
    }
  }
}
var aBlankRel = aTargetBlankRel();
</code></pre>

## Code

<a href="https://prismjs.com/" target="_blank">これ</a>のCSSとjavaScriptを使うとオシャレにできる。jQuery不要。
現在ダウンロードしたのは

* Minified version
* Solarized Light
* Markup + HTML + XML + SVG + MathML + SSML + Atom + RSS
* CSS
* C-like
* JavaScript
* Makefile
* Markup templating
* php
* Powershell
* JSON + Web App Manifest
* Show Language
* Normalize Whitespace
* Toolbar
<!-- * Copy to Clipboard Button -->

<pre data-label=".html"><code class="language-html">
&amp;lt;pre data-label="test.css">
  &amp;lt;code class="lang-css">
    ここにコード
  &amp;lt;/code>
&amp;lt;/pre>
</code></pre>

preあるある :
htmlファイルのインデントがそのまま反映されるから、ブラウザで見るとコード左側に余白があきすぎる
...  
Normalize Whitespaceが全部解決してくれる! (使えばわかる!)

<a href="https://saruwakakun.com/tools/html-escape/" target="_blank">こちら</a>のリンクで特殊記号のエスケープができる。


## .font-thin

HeaderのRyko: Rykoやh2見出しなどのフォント。
太くするときも、細くするときも、x, y方向の倍率を示して
<code class="language-css">transform: scale(x, y)</code>

これをspanで指定(細いのはclass="font-thin")すると、あちこちで使いまわせる(decoration.css)。
<a href="https://webparts.cman.jp/string/scale/" target="_blank">これ</a>を参考にした。
だが、inline-blockに指定されたspanは、そのままだとコンテンツメニューよりも上に表示されてしまう。だから、

<pre data-label="inline-deco.css"><code class="language-css">
position: relative;
z-index: -10;
</code></pre>

を追記。