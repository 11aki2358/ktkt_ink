<!-- CSS : prism -->
<!-- genre : design -->

##  Markdown to html

最小限のMarkdownを書くだけで、ヘッダーとかフッターとかCSS, javaScriptの読み込みまで全部込み込みのhtmlを作れるやつ。

スマホで使うのは非推奨。ページ全体のレイアウトは、私物PCで問題なく使えるか、というのが基準になっている(ページの拡大率は90%～100%)。
ほかのデバイスから見たら配置ひどいかも。

この機能専用の<a href="../css/md-to-html.css" target="_blank">CSS</a>と<a href="../js/md-to-html.js" target="_blank">javaScript</a>を使用。  
CSSもjsも、めっちゃ非効率な書き方をしている。
今のところは、とりあえずちゃんと動けば満足...

## MD -> HTML変換

<a href="https://github.com/markedjs/marked" target="_blank">marked.js</a>を使用。

使い方あれこれについては、
* オプション : <a href="https://marked.js.org/using_advanced#options" target="_blank">link</a>
* アレンジ : <a href="https://www.suzu6.net/posts/38/" target="_blank">link</a>
* アレンジ : <a href="https://qiita.com/tiwu_dev/items/4e56c833aff3dfb16231" target="_blank">link</a>
* 他のjsとの比較 : <a href="https://kannokanno.hatenablog.com/entry/2013/06/19/132042" target="_blank">link</a>

##  how to use

**markdown text**エリアに、Markdownを記入
(例 : <a href="./md-to-html.md" target="_blank">このページのMD</a> )。  
あるいは、**UPLOAD MD**ボタンを押して、マークダウンのファイルの内容を**markdown text**エリアに表示することもできる(参考... ファイルのアップロード機能 : <a href="https://www.sejuku.net/blog/32532" target="_blank">link</a>)


* 入力サポート用のボタン  
  codeを記入する際はマークダウン記法だけだと物足りないので、html形式で記入。
  カーソルの位置、選択範囲の両端にhtmlタグを挿入できる。
* CSS, javaScript追加ボタン  
  全ページ共通で必要となるCSS, javaScript以外に必要となるファイルを選択。
* genre選択ボタン  
  フッターに貼るリンクに関連。

プレビューは、**preview**タブ、**simple**タブ、**full**(ページ作成用)の3通り。

* preview  
  入力されたmarkdownをhtmlに変換したときの見栄え
* simple  
  入力されたmarkdownをそのままhtmlに変換したコード
* full  
  入力されたmarkdownをhtmlに変換し、それにヘッダ情報やCSS, javaScriptを仕込んだりしたコード。これをhtmlファイルにコピペすれば、そのまんまサイトに使える。

previewタブ、simpleタブの内容は、markdownでキーを叩くごとに更新される(<code class="language-js">function convert()</code>)。  
fullタブの内容は、"full"の字がクリックされるごとに更新される(<code class="language-js">function completeHTML()</code>)。

いい感じの記事が出来上がったら、必要に応じてCSSやjavaScriptファイルの追加を行う(**CSS AND JS**のボタン)。また、記事のジャンルを**GENRE**ボタンから選択する。  
**full**タブをクリックしてからテキストエリアに表示されるhtmlをコピー&エディタ(VS Codeとか)に貼り付けて保存するか、**DOWNLOAD FULL HTML**ボタンを押してhtmlファイルをダウンロードする。  
編集後のmarkdownは**DOWNLOAD MARKDOWN**ボタンからダウンロードできるので、記事を編集したくなった時のためにうまく活用するとよい。

### コードの記入

入力サポート用のボタンを上手く使って。  
ただし、htmlエスケープには注意が必要。  

marked.jsを使ってmarkdownをhtmlに変換する際、markdownに書かれていたhtmlエスケープは解除されてしまう。

markdown記法(<code class="language-html"><</code>) 
→ *marked.js* 
→ html(<code class="language-html"><</code>)

だから、このシステムを使ってコードを記載するならば、htmlエスケープを二重に行う必要がある。

html上で<code class="language-html"><</code>を記述するならば、markdownには<code class="language-html">&lt;</code>と書いておく(それからmarked.jsに通す)必要がある。

marked.jsを通すと、pre, codeタグ内以外にあるインデントはすべて消える。
previewタブ**full**からコピペしたhtmlをVS Codeで整形すると、preやcodeのタグ内に勝手にインデントや改行を入れられることがある(→html上での配置がガタガタになる...)。
このページのhtmlも例外ではないが、markdown使って楽して作ったhtmlファイルをわざわざ整形しようとかは考えない方がいい。

##  Coding

* markdown → htmlの変換(js)  
  (<code class="language-js">function convert()</code>, <code class="language-js">function completeHTML()</code>)
  marked.jsというjavaScriptを使用。CDN版をお借りしている。
* ページ全体の構成(css)  
  ボタン欄、markdown入力欄、プレビュー欄の3種類をflexにして設定。ウィンドウが800px以上ならば要素を横に、800px未満ならば要素を縦に並べる。  
  だが、previewの幅が安定しないことがあるので、gridレイアウトへの移行をしたい。
* プレビュータブ(css, js)  
  <code class="language-js">function tabSwitch()</code>  
  (<code class="language-css">#tab-wrap</code>の範囲内)  
  3種類のプレビューを、タブで切り替えられるようにしている。
  参考にしたリンクは<a href="https://hsmt-web.com/blog/tab-switching/" target="_blank">こちら</a>
* htmlタグの入力補助(js)  
  <code class="language-js">function helpBtn(text)</code> : 関数の引数(<code class="language-js">text</code>)は、ボタンのvalueの値(ボタンの内容を表す)。  
  <a href="https://blog.ver001.com/javascript-textarea-selectionstartend/" target="_blank">こちら</a>を参考にした。textarea上のカーソルや選択範囲の両端にhtmlタグを書き足す。

##  problems

* preタグで囲まれた範囲に、prism.cssでの背景色やシンタックス・ハイライトが反映されない

##  plans

* htmlエスケープ(marked.jsを使用する場合は、<code class="language-html"><</code>←<code class="language-html">&lt;</code>)
* コンテンツメニューの中身を自動で記入できるように(h2見出しへの内部リンクを自動作成)
* ファイルの読み込み・書き出し<a href="https://www.sejuku.net/blog/32532" target="_blank">link</a>
  * 出来上がったhtml(full)について  
    * Backyard Creatorの**full**タブからエディタにコピペする場合 : markdownにコードを入力する際は、二重にエスケープ<code class="language-html"><</code>←<code class="language-html">&lt;</code>
    * ダウンロードする場合 : エスケープは1回で十分? (よく分からんけれど、ダウンロード用のJavaScriptで調整しているから、とりあえずは<code class="language-html"><</code>←<code class="language-html">&lt;</code>のエスケープで行け)
    * fullタブは無くても良い気がするな... simpleタブはあった方がいいだろうけれど(ちゃんとmd→htmlになっているかの確認)
    * 最終更新日時をページ上部に入れられるようにしたい(参考... アップロードしたマークダウンファイルの最終更新日を取得する方法: <a href="https://gray-code.com/javascript/get-file-information-when-file-selected/" target="_blank">link</a>)