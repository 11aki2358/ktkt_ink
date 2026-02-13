<!-- CSS : prism -->
<!-- genre : design -->

## Header

headerタグの中身についてのメモ。  
headerタグの中では、

* サイトのタイトル   
  ページ上部で固定している。h1見出しで、aリンク。

* コンテンツメニューのボタン  
  ページ右上で固定しているOPEN/BACKボタン
    
* コンテンツメニュー  
  OPENボタンを押すと出てくる。

を使用して、ハンバーガーメニューを実装。  
主にheader.css, headline.cssが関与。  

特に

* <a href="../css/style.css" target="_blank" class="code-file">style.css</a> : header.cssと、ページ内リンクの飛び先について
* <a href="../css/decoration.css" target="_blank" class="code-file">decoration.css</a> : (h1見出しについてのみ)
* <a href="../js/general.js" target="_blank" class="code-file">general.js</a>

が関与。

主に参考にした資料:

* 【コピペで簡単】ハンバーガーメニューをCSSだけで作る方法
  <a href="https://rui-log.com/css-hamburger-menu/" target="_blank">link</a>
* JavaScript不要！CSSだけでハンバーガーメニューを実装する方法 : 
  <a href="https://www.asobou.co.jp/blog/web/css-menu" target="_blank">link</a>

##  logo area

ページ上部で固定している部分(h1見出しとopenボタン)。

* header.css : タイトル部分の範囲の指定など
* design.css : h1見出しとh2見出しのフォントサイズなど

htmlファイルの中身では

* サイトのタイトル(h1見出し)  

  <pre data-label=".html"><code class="language-html">
  &amp;lt;div class="header-logo-menu">
  </code></pre>

* OPEN/BACKボタン
 
  <pre data-label=".html"><code class="language-html">
  &amp;lt;label id="nav-open" for="nav-input">&amp;lt;span>&amp;lt;/span>&amp;lt;/label>
  </code></pre>

ヘッダーのh1やh2の配置は、 使っているフォントに合わせて微調整している。
下手にいじるとガッタガタな配置になるので注意。

##  Contents menu

OPENボタンを押すと飛び出す、レコードジャケットのような部分。ページ内リンクが貼ってある。ハンバーガーぽく見えないけれど、ハンバーガーメニューの機能がコレ。

### 仕組み(ざっくり)

<code class="language-html">#nav-input</code>というタグがついたチェックボックスを用意しておく。このチェックボックス(<code class="language-html">#nav-input</code>)の値が..

* false(チェックされていない) : コンテンツメニューは表示しない
* true(チェックされている) : コンテンツメニューを表示する

というようにして、コンテンツメニューの表示・非表示を切り替える。  
このチェックボックスを定義しているのが

<pre data-label=".html"><code class="language-html">
&amp;lt;input id="nav-input" type="checkbox" class="nav-unshown">
</code></pre>
        
の部分。  
ページにチェックボックスが表示されていたらヘンなので、<code class="language-html">class="nav-unshown"</code>を付けて非表示にしている。    
このチェックボックス(<code class="language-html">#nav-input</code>)の値(true/false)を操作できる要素は3種類ある。

* OPEN/BACKの範囲(<code class="language-html">#nav-open</code>)
* コンテンツメニューの背景のモヤッとした部分(<code class="language-html">#nav-close</code>)
* コンテンツメニューに貼られたリンク(<code class="language-html">class="nav-link"</code>)

この3つのうち、2番目と3番目のは「チェックを外す(コンテンツメニューを閉じる)」用途にしか使えない。

### チェックボックス(<code class="language-html">#nav-input</code>)にチェックする

OPENと書かれた範囲をクリックすれば、チェックボックス(<code class="language-html">#nav-input</code>)の値をtrueにする、という形式。    
OPENの範囲は、

<pre><code class="language-powershell">
&amp;lt;label id="nav-open" for="nav-input">&amp;lt;span>&amp;lt;/span>&amp;lt;/label>
</code></pre>

で定義されている。  
<code class="language-html">&amp;lt;span>&amp;lt;/span></code>の部分(CSSの<code class="language-css">#nav-open span::after</code>も)でOPENの描画をしている。  
コレをくくっている<code class="language-html">&amp;lt;label id="nav-open" for="nav-input">&amp;lt;/label></code>の部分が、「この範囲が、チェックボックス(<code class="language-css">#nav-open</code>)の操作をするよ。ちなみにこの部分のidは<code class="language-css">#nav-open</code>だよ」と宣言している。    

OPENの範囲がクリックされた、つまりチェックボックス(<code class="language-css">#nav-input</code>)の値がtrueになった状況というのは、CSSで<code class="language-css">#nav-input:checked</code>で表される。
コレを使って、

* OPENがクリックされたら、<code class="language-css">#nav-close</code>の要素(コンテンツメニューのモヤッとした背景)を表示
  <pre data-label="header.css"><code class="language-css">
  #nav-input:checked~#nav-close {...略...}
  </code></pre>

* コンテンツメニューを表示
  <pre data-label="header.css"><code class="language-css">
  #nav-input:checked~#nav-content-record,
  #nav-input:checked~#nav-content-jacket {...略...}
  </code></pre>

* OPENの文字をBACKに変える

  <pre data-label="header.css"><code class="language-css">
  #nav-input:checked~#nav-open span::after {...略...}
  </code></pre>

コンテンツメニューその他もろもろの表示や変更をできました。

### チェックボックス(<code class="language-css">#nav-input</code>)からチェックを外す

チェックボックス(<code class="language-css">#nav-input</code>)にチェックをつける(コンテンツメニューを表示する)ための操作は、「OPENの範囲をクリックする」のみだった。
でも、このチェックを外す(コンテンツメニューを非表示にする)方法は3通りある。

####  #nav-open

今はBACKと表示されている部分。
チェックボックス(<code class="language-css">#nav-input</code>)にチェックするときと同じ要領で、このチェックボックスの値をtrue→falseに切り替える。

####  #nav-close

コンテンツメニューの背景のモヤッとした部分。
ここをクリックすると、チェックボックス(<code class="language-css">#nav-input</code>)の値をtrue→falseに切り替える。

####  .nav-link

コンテンツメニューに貼られたリンク。ちょっとややこしい。  
<code class="language-css">#nav-open</code>, <code class="language-css">#nav-close</code>のラベルがついた要素は、チェックボックス(<code class="language-css">#nav-input</code>)と兄弟関係だったから、ひねったことをしなくても<code class="language-css">~checked</code>を使えばCSSで操作できた。  
だが、<code class="language-html">class="nav-link"</code>がついたこのリンクは、チェックボックスと兄弟関係でない。
だから、javaScriptを使ってチェックボックスのtrue→falseを実装しなければならない。  
<a href="https://rui-log.com/css-hamburger-menu/#postscript01" target="_blank">こちら</a>のリンクで、javaScriptの書き方を説明している。でも、こちらのコードはjQueryを使用しているという条件のもと書かれている。  
純粋なjavaScriptだけでチェックボックスの操作をしたい... 初めて自力でjavaScriptを書くよ、参考資料は

* クリックイベント :
  <a href="http://clue-design.com/javascript/id-class-click" target="_blank">link</a>
* チェックボックスを外す :
  <a href="https://1-notes.com/javascript-change-the-checkbox-check/" target="_blank">link</a>

<pre data-label="general.js"><code class="language-js">
function navLinkClicked() {
  let lnk = document.getElementsByClassName("nav-link"); //  class="nav-link"な要素について
  for (i = 0; i < lnk.length; i++) { //  全部確認する
    lnk[i].addEventListener("click", () => { //  どれかの要素でクリックされたら
      document.querySelector(`input[type='checkbox'][id='nav-input'][class='nav-unshown']`).checked = false;  // チェックボックス(#nav-input)をfalseに
    }, false);
  }
}
var navLinkChecked = navLinkClicked();
</code></pre>


### 微調整

* OPEN/BACKボタンは、コンテンツメニューが開いても表示し続けたいので、
  
  <pre data-label="header.css"><code class="language-css">
  position: relative;
  z-index: 100;
  </code></pre>

  を指定。
* 頭文字を大文字にする :
  <a href="https://developer.mozilla.org/ja/docs/Web/CSS/text-transform" target="_blank">link</a>