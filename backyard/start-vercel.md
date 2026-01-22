<!-- CSS : prism -->
<!-- genre : start -->

最終更新 : 2022年


##  Start Vercel

静的サイト(html, CSS, javaScriptだけでできたサイト)も、動的サイトやWebアプリもホスティングできる。無料。gitにプッシュ→Vercelにデプロイ、という流れが楽&初期設定がめっちゃシンプル。  
絶対に静的サイトしか使わん、というならばNetlifyも楽だけれど、Basic認証付けたくなるかも、php使いたくなるかも、という人はVercelが良いと思う。

##  Initial settings

gitHubのアカウントを持っていれば、楽々登録できる。  
(注意 : 無暗にアカウントは消さないこと!
アカウントを消したら、過去のメールアドレスで再度Vercelに登録することはできない。gitHubからVercelのアカウントを作った場合でも、gitHubに登録されているメアドはVercelに登録される。) 

### アカウント作成

[Vercelのログイン画面](https://vercel.com/login)から、**Continue with GitHub**を選択。
登録方法の詳細は覚えていない... でも、どの設定も登録後に変更できるはずだから、成り行きに合わせて登録していけばOKだと思う。

### ページの公開

1. Vercelのdashboardを開く。右上の **+ New Project** ボタンをクリック
2. **Import Git Repository**の下に、自分のgitHubアカウントのidが書かれていることを確認
3. たぶん、そこにgitHubに公開中のレポジトリの一覧が表示されている。
    デプロイ(公開)したいサイトと紐づいたレポジトリを選択。  
    ! 目当てのgitレポジトリが見つからなかったら... :   
    **Adjust GitHub App Permissions**をクリック。
    別ウィンドウが開く。  
    そこにある**Repository access**という項目で、**All repositories**ではなく**Only select repositories**にチェックを入れる。  
    **Select repositories**ボタンが表示されるので、クリック。
    そこから、たぶん非公開レポジトリも選択できると思うので、それをクリックして**Save**ボタン。
4. お目当てのレポジトリと対応したレポジトリを選択し、**import**ボタンをクリック    
5. **Configure Project**という設定画面が開かれる。  
    PROJECT NAMEには、好きな名前を記入。
    コレが、デプロイされるサイトのURLになる。
    FRAMEWORK PRESETは、Otherに設定。  
    その他の設定は、とりあえず放置していてOK。  
    **Deploy**ボタンを押す。
6. **Congratulatons!**と表示される。デプロイ完了。
7. このページの**Go to Dashboard**ボタンをクリック。
8. **Visit**ボタンを押せば、デプロイされたサイトを見れる。万歳!        

### サイトの初期設定

####  index.htmlの置き場所
Vercelで静的サイトを公開する際には、indexページをどこに置くか、というのに制限がある。
認められているのは、以下の2か所

1.  .\index.html
2.  .\public\index.html
  
のどちらか。  
当サイトは、今のところ.\index.htmlの方を採用している。  
index.html以外のページは、ルートディレクトリ以下のでのディレクトリに置いてもOK(ディレクトリpublicを使う場合は要注意かも)

##### サイトのルートディレクトリってどこさ
gitHubのレポジトリと対応しているディレクトリが、Vercelでデプロイするサイトのルートディレクトリ。
サイトに関するすべてのデータは、基本的にはこのディレクトリに全部入っている必要がある。  
例えば、gitHubにプッシュするときのコマンドが

<pre><code class="language-powershell">
C:\\Users\~~~~\top> git push -u origin main
</code></pre>

であるならば、
gitHubのレポジトリと対応しているというのは、C:\\~~~~~\topのディレクトリ。

##### 何も考えずにサイトを作った場合
.\index.html  
(index.htmlはルートディレクトリ直下に置く)    
index.html以外のファイルは、topの直下になくてもいい(.\blog\article001.htmlとか)。
でも、index.htmlを.\blog\index.htmlに置くのはダメ。

##### もうちょっとVercelらしくやる場合
.\public\index.html    
*どういうこと?*  
ルートディレクトリに、publicという名前のディレクトリを作る。
他の名前じゃダメ。  
このディレクトリを使って、 上記のという位置関係でindex.htmlを配置する。  
(index.html以外は、**public下**の好きなところに配置できる。
例えば .\public\blog\article001.html とか)。
    
*なんで?*  
Vercelでは、publicという名前のディレクトリには「ここには静的コンテンツだけが入っているよ」という特別な意味が込められている。
htmlファイルとかサイトで使う画像とか、「サイト閲覧者の操作に左右されない、完成したコンテンツ」はこのディレクトリに入れましょう、ということになっている。  
シンプルな静的サイトを作るだけだったら、publicうんぬんは特に気にしなくても大丈夫。
でも、Vercelには「Basic認証は、public下のファイルにしか適用できないよ」的な制限がある。
凝ったことをしたいならば、ディレクトリpublicを作って、html, CSS, javaScriptをまるっとお引越しする必要がある。

##  Update your site
サイトの初期設定が完了したら、あとはサイトの更新をgitHubにプッシュするだけでOK。
gitHub上での変更点は、Vercelサイトに自動的に反映される(デプロイ完了)。  
  
gitHubにプッシュしたサイトに致命的な過ち(vercel.jsonがおかしいとか)があった場合には、Vercelが文句(Deployment has failed)を垂れてくるし、その回のデプロイは無かったことにしてくれる。  
どこがマズかったのかのヒントはくれるから、それを読んでコードやら何やらを修正する。
    
##  Vercel CLI
必須ではない。  
とりあえずデプロイしてみてからエラーがないか様子見る、というのもアリ。でも、一日のデプロイ回数には制限がある...  
html, CSS, javaScriptの部分は、ブラウザや、VS CodeのLive Serverからチェックできる。
でも、404ページどうなるの? とか、サーバに関するVercel独自のあれこれについては、上記方法ではチェックできない。
  
Vercelのローカル環境を準備すれば、デプロイせずに色んな機能をチェックできて便利。  
参考:
* Vercel CLI 使ってみる :
  <a href="https://neos21.net/blog/2020/11/23-03.html" target="_blank">link</a>
* [Vercel] Serverless Functions をローカル環境で開発する :
  <a href="https://kotsukotsu.work/tech/2020-08-30-vercel-serverless-functions-%E3%82%92%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E7%92%B0%E5%A2%83%E3%81%A7%E9%96%8B%E7%99%BA%E3%81%99%E3%82%8B/" target="_blank">link</a>

### Node.jsをインストールする
(参考 : <a href="https://qiita.com/sefoo0104/items/0653c935ea4a4db9dc2b" target="_blank">link</a>)  
*コマンド<code class="language-powershell">npm</code>を使えるようにするために必須*
1. <a href="https://nodejs.org/ja/" target="_blank">公式サイト</a>から、Node.jsのインストーラーをダウンロード(とりあえず推奨版で)
2. インストーラーを起動し、インストールを進める。とりあえず[next]をクリックしていけばOK
3. インストールできたかチェック。ターミナルを開いて以下のコマンドを実行。  
    (ターミナルでの作業ディレクトリはどこでもOK。たぶん。PowerShell起動してデフォルトのディレクトリ(C:\Users\私の氏名)でコマンド実行したけれど、特に問題なかった。)
          
    <pre><code class="language-powershell">
    > npm --version
    </code></pre>

    エラーが出なければOK。

### Vercel CLIの準備
(ターミナルの作業ディレクトリはどこでもOkだと思う)

####  Vercel CLIのインストール

<pre><code class="language-powershell">
> npm install -g vercel
</code></pre>

####  Vercelにログイン
以下のコマンドを実行したいのだが...

<pre><code class="language-powershell">
> vercel login
</code></pre>
 
下記のようなエラーメッセージが出ました。上記コマンドは実行できませんでした。  
(エラー出なかったよ、という場合は、
<code class="language-powershell">Continue</code>
うんぬんの操作へGo)

<pre><code class="language-powershell">
vercel : このシステムではスクリプトの実行が無効になっているため、ファイル C:\Users\私の指名\AppData\Roaming\npm\
vercel.ps1 を読み込むことができません。詳細については、「about_Execution_Policies」(https://go.microsoft.com/fwlink/?Li
nkID=135170) を参照してください。
発生場所 行:1 文字:1
+ vercel login
+ ~~~~~~
    + CategoryInfo          : セキュリティ エラー: (: ) []、PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
</code></pre>

<code class="language-powershell">vercel</code>というコマンドを、「危険なコマンドかも!」とPowershellが拒否しています。  
この対策として、<a href="https://www.curict.com/item/d1/d1c4a3e.html" target="_blank">こちら</a>のサイトの「実行ポリシーの設定方法
その1」を試します。

<pre><code class="language-powershell">
> Set-ExecutionPolicy RemoteSigned -Scope Process

実行ポリシーの変更
実行ポリシーは、信頼されていないスクリプトからの保護に役立ちます。実行ポリシーを変更すると、about_Execution_Policies
のヘルプ トピック (https://go.microsoft.com/fwlink/?LinkID=135170)
で説明されているセキュリティ上の危険にさらされる可能性があります。実行ポリシーを変更しますか?
[Y] はい(Y)  [A] すべて続行(A)  [N] いいえ(N)  [L] すべて無視(L)  [S] 中断(S)  [?] ヘルプ (既定値は "N"): 
</code></pre>

とりあえず<code class="language-powershell">y</code>と入力しました。  
もう一度、vercelへのログインを試みます。コマンド

<pre><code class="language-powershell">
> vercel login
</code></pre>

を書き込むと...

<pre><code class="language-powershell">
> vercel login
Vercel CLI 24.0.0
> Log in to Vercel (Use arrow keys)
> Continue with GitHub
  Continue with GitLab
  Continue with Bitbucket
  Continue with Email
  Continue with SAML Single Sign-On
  ─────────────────────────────────
  Abort
</code></pre>

エラーは出なかった。  
ログイン方法(gitHub使う? gitLab使う? etc)を聞かれている。
gitHubでログインしたいので、<code class="language-powershell">Continue with GitHub</code>の先頭に<code class="language-powershell">></code>がついている状態(上記の状態)でEnterをクリック。  
すると、ブラウザでVercelのページが起動する。
**CLI Login Success**とか、gitHubに登録してあるメールアドレスとかが書いてある。
このページは閉じちゃってOK。  
ターミナル側の出力は、

<pre><code class="language-powershell">
> vercel login
Vercel CLI 24.0.0
> Log in to Vercel github
> Success! GitHub authentication complete for 私のメールアドレス
Congratulations! You are now logged in. In order to deploy something, run `vercel`.
💡  Connect your Git Repositories to deploy every branch push automatically (https://vercel.link/git).    
</code></pre>
 
細かい文言は違うかもしれません。とりあえずSuccess! て書いてあるならば成功しているのだろう。

#### 作業ディレクトリに移動(初期設定)
デスクトップ下のディレクトリ11aki2358をサイトのルートディレクトリとしてデプロイしている。
以下では、適宜ご自身の使っているフォルダ名・アカウント名・サイト名などに置き換えて読んで。

<pre><code class="language-powershell">
PS C:\Users\私の名前\Desktop\11aki2358> vercel
Vercel CLI 24.0.0
? Set up and deploy “~\Desktop\11aki2358”? [Y/n] y
? Which scope do you want to deploy to? aki
? Link to existing project? [y/N] y
? What’s the name of your existing project? marlboro-bambi
🔗  Linked to 11aki2358/marlboro-bambi (created .vercel and added it to .gitignore)
🔍  Inspect: https://vercel.com/11aki2358/marlboro-bambi/5iJXofAL6heYwmpSD3vyfC8hFrJc [6s]
✅  Preview: https://marlboro-bambi-11aki2358.vercel.app [copied to clipboard] [17s]
📝  To deploy to production (marlboro-bambi.vercel.app), run `vercel --prod`
</code></pre>

表示された質問と、その回答
* <code class="language-powershell">? Set up and deploy “~\Desktop\11aki2358”? [Y/n]</code> 
  yesと回答
* <code class="language-powershell">? Which scope do you want to deploy to?</code>  
  ユーザー名を選択肢から選べ、ということなのだろう。
  Vercelのアカウントは"aki"で登録しているのしかないので、コレを選択した。
* <code class="language-powershell">? Link to existing project? [y/N]</code>  
  Desktop\11aki2358 のサイトはデプロイ済みなので、yesと回答
* <code class="language-powershell">? What’s the name of your existing project?</code> 
  プロジェクトの名前(サイトのurlの部分)を入力

ディレクトリの中身を確認してみる(ファイル・ディレクトリ数が多いので、一部省略)。

<pre><code class="language-powershell">
PS C:\Users\私の氏名\Desktop\11aki2358> ls

    ディレクトリ: C:\Users\私の名前\Desktop\11aki2358

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        2022/03/09     18:03                .vercel
d-----        2022/03/09     14:16                backyard
d-----        2022/03/03      9:43                css
d-----        2022/03/03      9:43                images
d-----        2022/03/03      9:43                js
d-----        2022/03/04     15:48                public
d-----        2022/03/02     16:43                works
-a----        2022/03/09     18:03              9 .gitignore
-a----        2022/03/03      9:45           2409 404.html
-a----        2022/03/03      9:43           2523 index.html
-a----        2022/03/03      9:43           5613 top.html
</code></pre>

.vercelという名前のディレクトリが出来ている。
このディレクトリには、README.txtとproject.jsonというファイルが入っていた。  
README.txt曰く

* project.jsonには、プロジェクトとユーザのidが入っているよ
* このフォルダの中身は**絶対に**誰にも見せないでね。
  ディレクトリ.vercelは、.gitignoreに書き込まれているよ。

なんか、このディレクトリはいじったらマズそう。触らぬ神に祟りなし。  
なお、.gitignoreというのは、「gitに加えないファイル・ディレクトリの一覧」のこと。
このリストに加えられているファイルは、公に出ない(ローカル環境、自分のPC以外からはアクセスできない)。

### Vercel CLIを使う
面倒な初期設定は終わったぞ!

#### Vercel CLIからデプロイ
普段はgit経由でVercelにデプロイしている。
でも、Vercel CLIがあれば、git無しで直にデプロイできる。  

ターミナル上でルートディレクトリにいる前提で...

* コマンド<code class="language-powershell">vercel</code>   
  ブラウザでVercelの管理画面に行き、**Deployments**を開けば、デプロイされたことを確認できる。  
  ただし、サイト本来のurl(このサイトの場合、<a>https://marlboro-bambi.vercel.app/</a>)からアクセスできるのは、gitHub経由でデプロイしたサイトの方らしい。
  CLIからデプロイした内容はPreview扱い、直近にgitHub経由でデプロイした内容がProduction(Current)となる。  
  なお、Previewや過去にデプロイした古いサイトも、独自のurl(<a href="https://marlboro-bambi-8bwsbhq5o-11aki2358.vercel.app/"
    target="_blank">https://marlboro-bambi-8bwsbhq5o-11aki2358.vercel.app/</a>など)から見ることが出来る。
* コマンド<code class="language-powershell">vercel --prod</code>  
  こちらのコマンドでデプロイしたサイトは、Previwではなく、本サイトとしてデプロイされる。  
  でも、gitでバージョン管理する方が安全だろうから、このコマンドじゃなくて

  <pre><code class="language-powershell">
  > git add .
  > git commit -m "memo"
  > git push origin main
  </code></pre>

  でgitにプッシュ & Vercelにデプロイ、の方がいいと思う...

#### ローカル環境を使う
やっとこさ本題。

<pre><code class="language-powershell">
> vercel dev
</code></pre>

警告のポップアップウィンドウが出た!
>  **このアプリの機能のいくつかがWindown Defender ファイアウォールでブロックされています**  
>  ...略...
>  Nodes.js, javascript runtimeにこれらのネットワーク上での通信を許可してする  
>  <input type="checkbox">プライベートネットワーク  
>  <input type="checkbox">パブリックネットワーク(非推奨)  

プライベートネットワークにだけチェックマークを付けて**アクセスを許可する**をクリック。
コンソールには

<pre><code class="language-powershell">
> Ready! Available at http://localhost:3000
</code></pre>

と出力された。さっそく http://localhost:3000 にアクセスしてみる(コンソール上でリンクを <kbd>Ctr</kbd> + クリック)。
ブラウザで、サイトのindex.htmlページが開く。やったぁ!  
ついでに、Vercel CLIのローカル環境でなければ確認できないことを試してみる。とりあえずお手軽に、404.htmlのチェックを。  
このページの下の方で、Vercelでの404エラーページの作り方を紹介している。
この機能は、普通のブラウザとか、VS Codeの拡張機能Live Serverでは確認できない
(ただ、「そのURLは存在しません」と表示されるだけ)。
でも、Vercel CLIで仮想サーバを開いている場合、存在しないページのURLを入力すると、ちゃんと404.htmlに飛べる。よし!  

コンソール上で`Ctr-C`をクリックすれば、仮想サーバを閉じれる。  

Vercel CLIで仮想サーバを起動すると、phpとかのプログラミング言語をインストールしていなくても、ページの動作を確認できる。まじ感謝。

##  404 Error Page
リンク切れを表す404エラー。
デフォルトでは地味なエラーページに飛ばされるが、自分で404エラーページを用意することが出来る。  
ルートディレクトリ直下に404.htmlの名前で作成したページ(.\404.html)が、エラーページとしていざというときに呼び出される。