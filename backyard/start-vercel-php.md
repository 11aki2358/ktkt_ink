<!-- CSS : prism -->
<!-- genre : start -->

最終更新 : 2022年

## Vercelでphpを使う

とりあえず、phpが使えるかの確認

##  必要なもの

* .\vercel.json    
  「php使うよ」宣言をする
* .\api    
  phpなど、プログラムを使うファイルはこのディレクトリ以下に入れる

##  phpファイル

vercelでphpを使える確認をしたいだけなので、次のファイルを作る

.\api\index.php

<pre data-label=".\api\index.php"><code class="language-php">
&amp;lt;?php
phpinfo();
</code></pre>

phpがちゃんと動くならば、この.\api\index.phpではphpの情報が見れるようになるはず。

##  vercel.json
いくつかのサイトを参考にしながら書いてみた。
でもめっちゃエラー出る。
最終的に、以下の記述でイケた。

<pre data-label="vercel.json"><code class="language-json">
{
  "functions": {
    "api/*.php": {
      "runtime": "vercel-php@0.4.0"
    }
  }
}
</code></pre>

phpのバージョンは今後変わるかもしれない。

##  ローカル環境で確認(できなかった)
Vercel CLIをインストールしていれば、phpをインストールしなくてもサイトの動作をローカルで確認できる、的なことを書いているサイトがあった。   
試してみる。
以下のコマンドで、vercelの仮想サーバを立ち上げる。

<pre><code class="language-powershell">
> vercel dev
Vercel CLI 24.0.0
> Ready! Available at http://localhost:3000
</code></pre>

仮想サーバ http://localhost:3000 にアクセスしたのだが...  
.\apiにアクセスしようとすると、以下のエラー文が出てきた。

<pre><code class="language-powershell">
> vercel dev
Vercel CLI 24.0.0
> Ready! Available at http://localhost:3000
Building vercel-php@0.4.0:api/index.php

      🐘 vercel dev is not supported right now.
      Please use PHP built-in development server.

      php -S localhost:8000 api/index.php

Error: Builder exited with 255 before sending build result
    at ChildProcess.onExit (C:\Users\私の氏名\AppData\Roaming\npm\node_modules\vercel\dist\index.js:232654:29)
    at ChildProcess.emit (node:events:532:35)
    at ChildProcess.emit (node:domain:475:12)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:291:12)
> 
</code></pre>

訳：phpインストールしろ。(たぶん)

##  phpが動くか確認
ローカル環境でのテストは、また今度、phpをインストールしてからにしよう。
今日は、Vercelに試験的にデプロイしてみる。  

<pre><code class="language-powershell">
> vercel    
Vercel CLI 24.0.0
🔍  Inspect: https://vercel.com/11aki2358/marlboro-bambi/3YALfe13MqxkzAkEkMKf7iBYmfer [5s]
✅  Preview: https://marlboro-bambi-11aki2358.vercel.app [copied to clipboard] [28s]
📝  To deploy to production (marlboro-bambi.vercel.app), run `vercel --prod`
</code></pre>

(jsonとかに間違いがあると、エラーが出てデプロイされない。)  
コマンド<code class="language-powershell">vercel --prod</code>を使えば正式にデプロイされる(environment : product)のだが、コマンド<code class="language-powershell">vercel</code>を使うと、本サイトにはデプロイされずに、違うドメインから仮に公開される(environment : preview)。  
<code class="language-powershell">🔍 Inspect</code>のところの書かれたurlから、この試験的デプロイに関するページに飛べる。
**Visit**ボタンを押して、サイトを確認(今回、プレビューとしてデプロイした場合、ドメインはmarlboro-bambi-gepxzn4us-11aki2358.vercel.appになった)。  
このバージョンで.\api\indexにアクセスしてみると...
<a href="https://marlboro-bambi-gepxzn4us-11aki2358.vercel.app/api/index" target="_blank">https://marlboro-bambi-gepxzn4us-11aki2358.vercel.app/api/index</a>
ちゃんと機能した!!!

以上、vercelでphpを使えることの確認。  
ローカル環境でphpの確認をするのは、また今度。