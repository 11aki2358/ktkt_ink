<!-- CSS : prism -->
<!-- genre : start -->

## VS Code
Visual Studio Codeを使うコツ。

##  Extensions
VS Codeの拡張機能。
一度にいろいろインストールしすぎたせいで、どれが何に効いているのか分らない。

* HTML Snippets
* HTML CSS Support
* IntelliSense for CSS class names in HTML
* CSS Peek
* <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server</a>  
  htmlの変更を、ローカルサーバーを通じてリアルタイムで確認できる。
  1.  作成中のサイトを、ディレクトリごと開く(Ctr-K Ctr-Oからルートディレクトリを選択)
  2.  プレビューしたいhtmlファイルをVS Code上で開く
  3.  VS Codeのウィンドウ右下(ステータスバー)にちっこく表示された「Go Live」をクリック
  4.  ブラウザが開く。VS CodeでhtmlやCSSに変更を加えて「上書き保存(Ctr-S)」する度に、リアルタイムで変更点が反映される。
  * サイト内外で貼られたリンクも自由に行き来できる。
  * 普通のブラウザで開きながら変更を確認するのもいいけれど、VS Code上で変更を保存する度にリロードしないと変更点を確認できないので面倒。
  * VS CodeのSettings.jsonで
    <pre><code class="language-json">
      "liveServer.settings.CustomBrowser": "chrome",
    </code></pre>
    と書き加えれば、htmlをChromeで確認できる。

##  Formatting

* html :   
  <a href="https://marketplace.visualstudio.com/items?itemName=adrianwilczynski.format-selection-as-html" target="_blank">Format Selection As HTML</a>が便利(Ctr-K Ctr-H)  
  故意に改行したOR改行しなかった、というのは反映してくれるので良い。
  次に述べる拡張機能は改行の仕方が厳密すぎて、かえってわかりづらくなってしまうから。  
  デフォルトではショートカットキーが設定されていない。 コマンドパレットを開き(Shift-Ctr-P)、Format Selection As
  HTMLの右側の歯車のアイコンをクリックすれば、ショートカットを登録できる。
  とりあえずCtr-K Ctr-Hにしてみたけれど、他のショートカットキーと被っていたらヤだな(デフォルトの設定では大丈夫そうだった)。
* CSSとJavaScript:  
  <a href="https://marketplace.visualstudio.com/items?itemName=lonefy.vscode-JS-CSS-HTML-formatter" target="_blank">JS-CSS-HTML Formatter</a>が便利(Alt-Shift-F)  
  デフォルトでは、「タブ1個=スペース4個」だが、jsonをいじれば、「タブ1個=スペース2個」にできる。  
  onSaveはfalseにすること。  
  htmlファイルの整形もできるが、改行とかインデントとかが厳密すぎて不便。

##  git関連

gitやgitHubと絡んだ操作。まだまだ模索中。

### 拡張機能 git history
Alt + Hで、gitへのプッシュの履歴を確認できる。
