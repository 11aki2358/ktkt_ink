<!-- CSS : prism -->
<!-- genre : design -->

##  Escape Search

検索除けについて

## Basic

* METAタグでロボット対策と、robots.txt(*全ページ*) :  
  <a href="https://www.just-size.net/support/tips_searchdeny.php" target="_blank">link</a>
* aリンクに<code class="language-html">rel="nofollow"</code>をつける(ヤバいページに至るリンクには必須か) :  
  <a href="https://www.just-size.net/support/tips_searchdeny.php" target="_blank">link</a>  

いずれの方法も、ロボットの侵入を完全に防げるという保障はない。
おまじない程度。

## more

* 一番安全な方法は、パスワード制限を付けるなどして、サーバ側で閲覧管理をすること(ロボットは絶対に侵入できない)  
  ...htaccessとかを置ける環境であれば、サーバ側からの制限を書けることが出来る(Basic認証など)  
  Vercelの場合、ディレクトリpublicにしかBasic認証を掛けることが出来ない
* プログラムによる制限  
  phpとかを使うやりかた(フォーム認証)  
  データベース不要で実装できることもある。
  Vercelの場合。phpやRubyを使えるのは、ディレクトリapi以下のファイルのみ。
  javaScriptで同様のプログラムを書くことも不可能ではないが、phpプログラムの実行は絶対であるのに対し、javascriptは無効化できるので、む～～～ん...