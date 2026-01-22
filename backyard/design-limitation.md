<!-- CSS : prism -->
<!-- genre : design -->

## Access Limitation

Netlifyでデプロイする静的サイトでは、Basic認証や.htaccessによる制限ができない。  
それでもなんとかして夢腐血薬イラストに閲覧制限をかける方法を模索している記録。  
どっかに「html, CSS, javaScriptだけで実装! 個人サイト閲覧制限入門書」的な専門書ないかなぁ。
頑張ってみているけれど、車輪の再発明にすぎないんだろうな...

##  Abstract

幾重にもゴテゴテと張り巡らせる検索除け&閲覧制限の網...

* パスワード認証が出来る。複数の秘密ページで同じパスワードを使いまわせる。
* ソースコードを見ただけでは、秘密ページのurlが分らない。
* 11aki2358以外のページ(ブクマや閲覧履歴など)から秘密ページのurlにアクセスすると、別ページに飛ばされる(未実装)。  
  javaScriptを無効にしているブラウザだったら、普通に内容が表示される。今日日、javaScript無効化している人はレアだろうけれど。
* 秘密ページは閲覧履歴に残らない。

(DEMO-0の仕組みは、この全体像に当てはまらない)

### 「ソースコードを見ただけでは、秘密ページのurlが分らない」

秘密ページのurlは秘密にする、ということ。
パスワードが分らなくてもとりあえず秘密ページのURLにはアクセスできるという状態だと...  
デベロッパーツールや「Ctr-U(ページのソースを表示)」を使って本文や画像を覗き見できる。
「パスワードがわかる人でなければ、秘密ページのURLが分らない」というのが必要。

### works.html

健全イラストが並んだページworks.htmlに、こっそりパスワード入力ページへのリンクを貼る。  

### Password Page

パスワード入力ページ。urlは任意。  
秘密ページと一対一対応。
パスワードが正しければ、秘密ページに飛ぶ。

### Secret Page

秘密ページ。ヤバいイラスト。秘密ページ毎のidがurlに使われている。idがバレたらurlがバレる。  
<a href="https://okwave.jp/qa/q4880306.html" target="_blank">こちら</a>の  
『「main.html」に以下のJavaScriptを記載します』  
以降の部分を使い **このページに至るパスワード入力ページ** 以外からのアクセスを弾く。  

また、「メインページに戻る」ボタンを付けて、
<a href="https://atmarkit.itmedia.co.jp/ait/articles/1604/20/news030.html" target="_blank">ブラウザの履歴に残さない</a>
設定を付けることで、閲覧者の閲覧履歴に残らないようにする(このボタンを押すかは閲覧者の任意だけれど)

##  DEMO-0

**prompt関数を使ってパスワードを入力**  
prompt関数でパスワード入力ページを表示し、正しいパスワードだったらページの内容を表示する(パスワード入力ページ = 秘密ページ)

[秘密ページ](design-limitation-pass0.html)

きちんと機能しているときには、真っ白な背景にパスワード入力枠だけが表示されるし、この状態でデベロッパーツールを起動しても何も表示されない。

### 難点

でも! **Ctr-U**(ソースの表示)を押すと、htmlが表示される。パスワードが分らなくても本文を読めてしまう(だから、秘密ページのURLを秘密にする必要がある)。  
あと、パスワード入力枠の背景にページ本文が透けて見えてしまうことがたまにある。
とてもマズい。  

##  DEMO-1

**パスワード入力ページと秘密ページは別**

パスワードページのjavaScriptに秘密ページのURLが書いてあるので、Demo-0とどっこいどっこい。

[パスワード入力ページ](design-limitation-pass1.html)

* パスワード入力ページ : dsign-limitation-pass1.html
* 秘密ページ : design-limitation-secret.html(idがdesign-limitation-secret)  
  ただし、「11aki2358以外からのアクセスを弾く」は実装していない。

なお、別の場合で「秘密ページのidが3776」ならば、「秘密ページのURLは3776.html」「パスワードページのURLは、3776と全然関係ない文字列」である。*秘密ページにidを割り当てるのは必須ではない*が、URLと紐づけた方が管理しやすいべ...(URL=idにする場合、idもバレちゃダメ!)    

「このページ(design-limitation.html) → design-limitation-pass1.html → design-limitation-secret.html →
このページ」と一周回ってきたが、閲覧履歴にはこのページしか残っていなかった。ばっちしOK!

### 難点

パスワード入力ページの下部に書かれたjavaScriptを見れば、秘密ページのurlが分かってしまう。
パスワード入力ページのurl欄を秘密ページのurlに書きかえれば、「パスワード入力ページ以外からのアクセスを弾く」を実装しても秘密ページを閲覧されてしまう。

##  DEMO-2

**パスワード入力ページでAES暗号を使用**

パスワード入力ページのソースコードを見ても、秘密ページのURLは分らない。

[パスワード入力ページ(改)](design-limitation-pass2.html)

* パスワード入力ページ : design-limitation-pass2.html
* 秘密ページ : design-limitation-secret.html(idがdesign-limitation-secret)  
  ただし、「11aki2358以外からのアクセスを弾く」は実装していない。

<a href="https://chakkari.org/blog/2020/05/03/aes-encrypt-with-javascript/" target="_blank">AES暗号</a>
と
<a href="http://www.imymode.com/exp/js02.htm" target="_blank">javaScriptの小細工</a>を使う
(AES暗号用のjavaScriptをパスワード入力ページに読みこむ必要がある)。  

*準備*
* 秘密ページのidを、[コレ](design-limitation-coding.html) で暗号化。  
  今回は、design-limitation-secret.htmlのid「design-limitation-secret」を、パスワード「key」で暗号化。
* 暗号文U2Fsd...3cFk+(長ったらしい)を得た。
* パスワード入力ページ(改)(design-limitation-pass2.html)に、この暗号文を仕込む。

*パスワードの認証*
* パスワード入力ページ(改)に入力されたパスワードを使って、この長ったらしい暗号文を復号。
* 復号した値を、変数txt_decryptedに格納
* txt_decrypted + ".html"にアクセス(閲覧履歴に残らないようにリンクする!)

この場合も、パスワード入力ページと秘密ページは閲覧履歴に残らなかった。

### 難点1

デモ1とデモ2では、「パスワード入力ページ以外のリンクからの訪問は弾く」を実装していなかった。  
以下の状況から訪問した場合だと、リンク元を参照できないことがあるらしい(リンク元urlが空になる)

* ローカル環境(テスト環境だし、まぁいいかぁ) :
  <a href="https://freemas.org/making/jquery/document-referrer-null" target="_blank">link</a>
* ブクマ、閲覧履歴、urlベタ打ち(本望。万歳) :
  <a href="https://support.karte.io/post/2DEyT4M90B4QsIgOA9tfNR" target="_blank">link</a>
* *(Windows IEの場合)javaScriptのwindowオブジェクトを使ってページを訪れた*(パスワードページ2の原理だよ...) :
  <a href="http://www9.plala.or.jp/oyoyon/html/script/referrer.html" target="_blank">link</a>

「IEからは見ないで!」ていうのもアリかな。

### 難点2

間違えたパスワードを入力した場合、存在しないurlに飛ばされる。
エラー404ページまで飛ばされた後、パスワード再入力まで行くのが面倒。

####  対策

パスワードの正誤を確認するためのハッシュ化を行う

*準備*
* 'abc'(適当な文字列)にパスワード'key'をつなげた文字列'abckey'をハッシュ化。このハッシュ値を、定数hash1に格納
* id(秘密ページのURL)を、パスワード'key'を使って暗号化。暗号化した値を、定数encryptedに格納
* 文字列'abc'とhash1, encryptedをパスワード認証ページに仕込む。

*認証*
* パスワード認証ページに入力された値を、文字列'abc'につなげてハッシュ化。ハッシュ値をhash2に格納
* hash1とhash2が一致 = 入力されたパスワードは正しい
  * 入力されたパスワードを使ってencryptedを復号。
  * この復号後を、変数txt_dexryptedに格納
  * txt_dexrypted + ".html"にアクセス
* hash1とhash2が一致しなかった
  * 入力フォームをクリア(パスワード再入力を促す)

##  ハッシュ関数のみを使用

パスワードがkey, 秘密ページのidが3776だった場合...(idはバレてOK, URLはバレちゃダメ)

1.  "key3776"をハッシュ化した値をあらかじめ求めておいて、コレを秘密ページのURLに使う。
2.  パスワードの入力を促す。
3.  入力されたパスワードの末尾にidを付けて(key3776とか、pass3776とかになる)ハッシュ化する。
    これで得られたハッシュ値に".html"を付けて、秘密ページにアクセス。

良い点
* 秘密ページのURLがめっちゃ長くなる(ハッシュ値がURLになるから)。
* 似たようなidとパスワードを使っても、秘密ページのURLは全然違うものになる。
* 秘密ページのid管理が楽。秘密ページ(idが3776)に至るパスワードページを3776.htmlにしておく、とか。

秘密ページのURLを特定のものにしたい! というこだわりがあるならばAES暗号を使った形式、
idの管理を楽にしたい! というこだわりがあるならばハッシュ関数を使った形式。

##  もっと強固な方法

.htaccessによる制御や、BASICによる閲覧制限。  
おそらくNetlifyでは使えない。  
Vercel(GitHub連携可)ではBasic認証が使える??? :
<a href="https://blog.kimizuka.org/entry/2021/06/09/231526" target="_blank">link</a>

### セッション認証(フォーム認証)

Netlifyでは使えない(php)

* phpことはじめ :
  <a href="https://programmer-life.work/php/visual-studio-code-php" target="_blank">link</a>  
  <a href="https://github.com/juicyfx/vercel-php#-vercel-dev" target="_blank">link</a>
* フォーム認証(セッション認証)  
  データベースを用意する必要はない(ユーザ名やパスワード、ハッシュ化あれこれもphpに記されている)。
  リダイレクトあれこれも、全てphpで行う(リダイレクトにvercel.json不要) :
  <a href="https://qiita.com/mpyw/items/bb8305ba196f5105be15" target="_blank">link</a>
* 上記資料では、login.phpで認証成功後ははindex.phpにしか飛べない。たぶん。  
  work04.php→ログインのためにlogin.phpにリダイレクト→login.phpで認証→work04.phpに戻る、的な機能は「php ページ間 データ 受け渡し」とかでググればたぶん実装できる。
* 詳細  :  
  Vercelでphpを使うためには、vercel.jsonの設定が必要。  
  phpファイルは、ルートディレクトリ直下のディレクトリapiの中に入れる。
  * 詳細 :
    <a href="https://github.com/juicyfx/vercel-php" target="_blank">link</a>  
    How to develop locally?  
    I think the best way at this moment is use PHP Development Server.  
    <pre><code class="language-powershell">
      php -S localhost:8000 api/index.php
    </code></pre>

    phpインストールは必須かなぁ
  * ▲Vercel で PHP を使う。 :
    <a href="https://balloon.asia/2020/12/vercel-%E3%81%A7-php-%E3%82%92%E4%BD%BF%E3%81%86/" target="_blank">link</a>