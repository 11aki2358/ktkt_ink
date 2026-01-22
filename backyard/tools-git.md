<!-- CSS : prism -->
<!-- genre : start -->

## git

git, gitHubについて

##  gitを始める
<a href="https://breezegroup.co.jp/202102/vscode-github-windows/" target="_blank">この</a>
ページを見れば、VS CodeをgitHubに連携させる方法が分かる。  
<a href="https://www.sukerou.com/2019/12/git-tipsgit.html" target="_blank">この</a>
ページを見れば、既存のディレクトリをgitに登録する方法がわかる。

##  プッシュ(ターミナルからやる方法)

Windows Powershell使用

<pre><code class="language-powershell">
> (ルートディレクトリに移動)
> git add .
> git commit -m "memo"
> git push origin main
</code></pre>

##  プッシュ(VS Codeからやる方法)

(<a href="https://qiita.com/y-tsutsu/items/2ba96b16b220fb5913be" target="_blank">link</a>)

1.  VS Codeの左端のSourse Controlを開く。  
    →編集したファイルは、Changes以下にリストアップされている。
2.  gitにプッシュしたいファイルについては、ファイル名の右にある「+」のアイコンをクリック。  
    →クリックしたファイルはStaged Changes以下に移る。
3.  Source Controlの右側のレ点ぽいマーク(Commit)をクリックする。  
  →入力フォームが表示される。
4.  フォームに、コミット時のコメントを記入しEnterを打つ。  
  →Sync Changesボタンが表示される。
5.  ボタンをクリックする。

##  gitHub経由でページの更新

上記いずれの方法であっても、ローカルPCでの変更がgitHubに反映される＆その反映がVercelやNetlifyに及ぶので、後は放置しておけば勝手にページが更新されている。

gitにプッシュしたのに、公開されたページが勝手に更新されていない場合:   
何かのミスで、NetlifyのDeploysのStop aut publishingボタンを押してしまったのだろう。Stop aut publishingボタンの代わりにStart aut publishingボタンがあるはずだから、それを押す。