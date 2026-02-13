<!-- CSS : prism -->
<!-- genre : design -->

## Access Limitation

Netlifyでデプロイする静的サイトでは、Basic認証や.htaccessによる制限ができない。  
それでもなんとかして「ヤバいイラスト」に閲覧制限をかける方法を模索している記録。  

頑張ってみているけれど、車輪の再発明にすぎないんだろうなぁ...

##  Abstract

実装したい機能

* パスワード認証が出来る。複数の秘密ページで、同じパスワードを使いまわせる。
* パスワードを入力しなければ、デベロッパツール等を使用しても秘密ページの中身を見ることは出来ない。
* パスワードを入力しなければ、秘密ページのURLを知ることは出来ない。
* パスワードが間違っていた場合でも、おかしな挙動をしない

(DEMO-0の仕組みは、この全体像に当てはまらない)

### 「パスワードを入力しなければ、秘密ページのURLを知ることは出来ない」

秘密ページのurlは秘密にする、ということ。
パスワードが分らなくてもとりあえず秘密ページのURLにはアクセスできる、という状態だと...  
デベロッパーツールや「Ctr-U(ページのソースを表示)」を使って本文や画像を覗き見できる。
「パスワードがわかる人でなければ、秘密ページのURLが分らない」というのが必要。

### Password Page

パスワード入力ページ。urlは任意。  
秘密ページと一対一対応。
パスワードが正しければ、秘密ページに飛ぶ。

### Secret Page

秘密ページ。ヤバいイラスト。秘密ページ毎のidがurlに使われている。idがバレたらurlがバレる。  
<a href="https://okwave.jp/qa/q4880306.html" target="_blank">こちら</a>の  
『「main.html」に以下のJavaScriptを記載します』  
以降の部分を使い **このページに至るパスワード入力ページ** 以外からのアクセスを弾く。  

##  DEMO-0

**prompt関数を使ってパスワードを入力**  
prompt関数でパスワード入力ページを表示し、正しいパスワードだったらページの内容を表示する(パスワード入力ページ = 秘密ページ)

[秘密ページ](design-limitation-pass0.html)

きちんと機能しているときには、真っ白な背景にパスワード入力枠だけが表示される。  
この状態でデベロッパーツールを起動しても、何も表示されない。

### 難点

**Ctr-U**(ソースの表示)を押すと、htmlが表示される。パスワードが分らなくても本文を読めてしまう(だから、秘密ページのURLを秘密にする必要がある)。  
あと、パスワード入力枠の背景にページ本文が透けて見えてしまうことがたまにある。
とてもマズい。  

##  DEMO-1

**パスワード入力ページと秘密ページは別**

[パスワード入力ページ](design-limitation-pass1.html)

* パスワード入力ページ : dsign-limitation-pass1.html
* 秘密ページ : design-limitation-secret.html(idがdesign-limitation-secret)  
  ただし、「パスワード入力ページ以外からのアクセスを弾く」は実装していない。

### 難点

パスワード入力ページの下部に書かれたjavaScriptを見れば、パスワードも、秘密ページのurlも分かってしまう。

##  DEMO-2

**パスワード入力ページでAES暗号を使用**

パスワード入力ページのソースコードを見ても、秘密ページのURLは分らない(当然、パスワードも分からない)。

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
* txt_decrypted + ".html"にアクセス

### 難点

間違えたパスワードを入力した場合、存在しないurlに飛ばされる(AES暗号の復号に失敗するので)。   
エラー404ページまで飛ばされた後、パスワード再入力まで行くのが面倒。

##  DEMO-3

パスワードの正誤を確認するためのハッシュ化を行う

*準備*
* パスワード'key'を事前にハッシュ化しておく。このハッシュ値を、定数`test_hash`に格納
* id(秘密ページのURL)を、パスワード'key'を使ってAES暗号化。暗号化した値を、定数`encrypted`に格納
* 文字列`test_hash`, `encrypted`をパスワード認証ページに仕込む。
* ハッシュ化と暗号化のための仕掛け : [リンク](../works/work-encode.html)
* ログインページ : [リンク](../works/work-20260208.html)  
  詳しくは、上記リンク先に書かれたメモと、ページに仕込まれたjavascriptを参照。

*認証*
* パスワード認証ページに入力された値をハッシュ化する。ハッシュ値を`pass_hash`に格納
* `test_hash`と`pass_hash`が一致 = 入力されたパスワードは正しい
  * 入力されたパスワードを使って`encrypted`を復号する。
  * この復号語を、変数`txt_dexrypted`に格納
  * `txt_dexrypted` + ".html"にアクセス
* `test_hash`と`pass_hash`が一致しなかった = パスワード間違えてる
  * 入力フォームをクリア(パスワード再入力を促す)


##  もっと強固な方法

.htaccessによる制御や、BASICによる閲覧制限。  
おそらくNetlifyでは使えない。  
Vercel(GitHub連携可)ではBasic認証が使える??? :
<a href="https://blog.kimizuka.org/entry/2021/06/09/231526" target="_blank">link</a>

javascriptによる閲覧制限は、しょせんはお遊びのようなものなので...  
絶対に見られたらマズい諸々は、サーバ/ホスティングサービスの機能に合わせて閲覧制限しておくこと。

以下、未実装

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