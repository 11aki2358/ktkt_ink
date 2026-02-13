<!-- CSS : ---  -->
<!-- genre : start -->

## Start

PCを一台用意して、html、CSSやjavaScriptをいじってサイトを作り、ネット上に公開するまでの方法。  
他にもいろいろなやり方があるけれど、私がやっている方法の記録として残しておく。

##  Tools
* PC: Windows
* Visual Studio Code(VS Code): ローカル環境(自分のパソコン)でhtml, CSS, javaScriptファイルの編集を行う貯めのエディタ。git操作を楽にできる。
* git: PCに落としておく。
* gitHub:
無料で登録が可能。VS Codeと連携させれば、ローカル環境で作成したサイトの編集履歴を保存できる。
* NetlifyかVercel: 無料で登録が可能。静的サイト(html, CSS, javaScriptで記述されたサイト)をネット上に公開するためのホスティングサービス。

##  Initial Settings
最初にやること
1. VS Codeをインストール  
    拡張機能を入れておくと便利だが、無くても大丈夫
2.  htmlを書いてみる! (テンプレ使うのも良い)
3.  gitをインストール。
4. gitHubのアカウントを作る。
5. gitHubに新しいレポジトリを作る。
6.  Vercel(Netlifyでも可)のアカウントを作る。  
  [Deploy with Vercel](start-vercel.html)
7. Vercelからサイトをデプロイ。  
  [Deploy with Vercel](start-vercel.html)


##  Update your Site

最初の設定さえ完了すれば、サイトを更新するのは簡単 

[Update your site - Vercel](start-vercel.html)

1.  VS Codeでサイトに変更を加える
2.  変更点をgitHubにプッシュ
3.  (変更点は、自動でVercelやNetlifyに反映される)