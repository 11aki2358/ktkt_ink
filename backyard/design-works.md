<!-- genre : design -->

## works

Worksの実装の記録。書き途中で中止したコードもあるけれど、削除するのはもったいないので。

git履歴でのコード管理がままならないポンコツ。

冗長なコードが山ほどありそうだけれど、とりあえず動けばいい。

## about

概要 

ページ遷移しても、同じタブ上では
* Select Contentの選択状況
* フォーカス中のコンテンツはどれか

がSession Storageに保存される(Local Storageを使うのは大げさな感じ)。

状態遷移とか挙動の条件のあれこれに関するメモはこっち : [link](design-works-memo.html)  
編集中のWorksページの最新版とは対応していないかもしれない。

##  14. Loading

モーダルの画像(`img src="" id="modal-img"`)に、ローディング時のアニメーションを追加した。

* html変更点:

  <code class="lang-html">img src="" id="modal-img"</code>要素の近くに<code class="lang-html">div class="loader"</code>を追加

* CSS変更点

  img.cssファイル : <code class="lang-css">.loader</code>の記述を追記(ローディングのアニメーション部分)

* javascript変更点


##  13. minor change

2026年 微編集

* WARN内容の表示の仕方
* 検索KEY(html)

javascriptの方はきちんと編集できていない。
冗長なコードが残ったままかも

## 12. Modal(click event)

* <a href="./design-works/works-12/works-12.html" target="_blank">link</a>

変更点
* モーダルウィンドウを、矢印キーだけでなくクリックでも移動できるようにした(モーダルの右側、左側でクリック)

そろそろ完成かな。
あと必要な機能は
* **サムネ画像は200px, モーダルではオリジナルサイズ、的なやつ**
* jsonのinfo欄に、各SNSへの投稿状況をメモ(管理用)
  
あと、サムネを取っ払えば、この機能は更新履歴にも日記にも使えそう。
サイト作りが一気に進むわ～～

## 11. Modal

* <a href="./design-works/works-11/works-11.html" target="_blank">link</a>

変更点
* チェックボックスのidが紛らわしかったので、<code class="lang-css">#select-hide</code> → <code class="lang-css">#show-display</code>に変更。
* イベント(<code class="lang-js">addEventListner</code>使うやつ)を呼ぶ変数について。
  グローバルなのに扱いが雑だたため、こちらもグローバル変数用オブジェクト<code class="lang-js">globalEvent</code>に格納。
  初期値は<code class="lang-js">undefinied</code>にしてある。
* <code class="lang-css">#content-display</code>のコメント欄に、モーダルか否かを表すタグを追加。
* モーダルウィンドウを開いた状態でもフォーカスを移動できるようにした(キーボード操作時のみ)。
  それに伴い、<code class="lang-json">"modal" : false</code>なコンテンツ(ページ遷移が要るコンテンツ)の情報も、モーダルウィンドウで表示できるようにした。

## 10. edit structure

08版のコードの編集(09版での変更は無視)

* <a href="./design-works/works-10/works-10.html" target="_blank">link</a>

コード全体を整理した。
改善の余地は山ほどあるが、以前よりはすっきりしたコードになったと思う。

* 二つのファイルに分けていたjavascriptを、一つに統合
* グローバル変数の扱い(必要最小限のグローバル変数を、オブジェクト<code class="lang-js">globalVar</code>に格納)
* 個別の作品ページがある場合、ページ遷移できるようにした

今後のコーディングでも役に立ちそうなメモ。
理解しきっている訳ではない。適宜調べなおすこと。
* オブジェクトのコピー : 
  (参照ではなく)値、中身の値そのものをコピーする場合は、<code class="lang-js">objectA = objectB</code>では不完全。
  <code class="lang-js">Object.assign(objectA, objectB)</code>を使う。
* オブジェクトの比較 : 
  二つのオブジェクトの(参照ではなく)値、中身が一致するか否かを判定するとき。
  <code class="lang-js">objectA == objectB</code>では不完全。   
  <code class="lang-js">function checkContentsClick</code>では、id値によってのみオブジェクトの一致・不一致を判定している(<code class="lang-js">obj.info.id == newFocusId</code>)。場合によっては、idとかを使った判定もアリだと思う(比較する各オブジェクトの特性に依る!!)
* 配列の何番目? : 
  * <code class="lang-js">array.indexOf(a)</code>によって、aは配列arrayの何番目の要素であるかを知れる。
  * 細かい条件を指定したい場合は、<code class="lang-js">array.findIndex(条件)</code>が役に立つ。
    配列に格納されているのがオブジェクトである場合など(例 : <code class="lang-js">function checkContentsClick</code>)。

**問題点**

* selectボタンを押した直後だと、いくつかのイベント(コンテンツリストのクリックによるフォーカスの移動など)が実行されない

## ~~09. Without Global variable~~

* <a href="./design-works/works-09/works-09.html" target="_blank">link</a>

javascriptの苦手なところ : グローバル変数・グローバル関数を使わないと実装が難しいところ。

なんとかして局所変数のみでプログラム全体を回せないか試行錯誤...

> window.onload()内で変数を定義し、各関数に引数として渡す。
> この変数を書きかえる関数は、ちゃんとreturnを使って値を戻す。

頑張ってみたが、どうにも限界がある。分らない。同期・非同期でつまづいた。

諦めてグローバル変数使う。またいつか再挑戦するかも。

## 08. key events

* <a href="./design-works/works-08/works-08.html" target="_blank">link</a>

キーボードイベントを追加。

キーを1回たたいた場合は、そのキーに関する機能1つのみが動作する
(1つのキーに複数の機能が割り当てられている場合、上に書かれているものが優先的に実行される)。

|     key     | 条件                         | 動作                           |
| :---------: | :--------------------------- | :----------------------------- |
|  left, up   |                              | フォーカスを1個戻す            |
| right, down |                              | フォーカスを1個進める          |
|    Enter    | #select-contentsが開いている | #select-contentsと表示切り替え |
|             | モーダルが開いている         | モーダルを閉じる               |
|             | モーダルが閉じている         | モーダルを開く                 |
|   Escape    | モーダルが開いている         | モーダルを閉じる               |
|      [      | #content-displayが開いている | #select-contentsと表示切り替え |

モーダルウィンドウをスマホで見たときの100vh問題も解決。

## 07. #content-display : icons, json(ver. 4), modal window

* <a href="./design-works/works-07/works-07.html" target="_blank">link</a>

変更点は3つ

### コンテンツ情報を表すタグを追加

<code class="lang-css">#content-comment</code>に、genreやwarnをタグみたいに表示。
描いた年は、コメント欄の末尾に表示。
(03版のpropetyに書きたいと思っていたもの)。

### json (ver. 4)

jsonファイルに、key値<code class="lang-json">modal</code>を追加。

サムネ画像<code class="lang-css">#content-img</code>をクリックした際...
* <code class="lang-json">"modal": true</code> :
コンテンツをモーダルウィンドウで表示
(絵が1枚だけ・注釈不要の場合)。
* <code class="lang-json">"modal": false</code> :
コンテンツは新しいページで開く
(複数枚の絵でひとつのコンテンツとなっている場合)

各コンテンツのタイトルに書かれた'T', 'F'が、このキーの真偽値を示している。

### モーダルウィンドウの実装

なるべくチェックボックスやCSSを使って実装した。
いい感じだと思う。

### 問題点

* 100vh問題 : モーダルの高さ。スマホで観たときに特にズレが顕著。

## 06. #content-display, json (ver. 3)

* <a href="./design-works/works-06/works-06.html" target="_blank">link</a>

変更点は二つ

### #content-display

レイアウトを変えた。
コメントと各種タグは、同じエリアに書き込む。
この方が、レスポンシブを実装しやすい。

「コンテンツ固有のページに飛ぶためのリンク」は、文字やボタン状でなく、
画像リンク(一枚のみならばモーダルウィンドウ)にすればよいだろう(未実装)。

### jsonファイル

コンテンツの検索に必要ないデータ(id, title, commentなど)は、infoというオブジェクトに納めた。
このほうが検索が速くなるはず。
<pre data-label="version3.json"><code class="lang-json">
{
  "genre": ["Jeff-Beck", "Led-Zeppelin"],
  "year": 2021,
  "warn": ["C"],
  "info": {
    "id": "0006",
    "title": "#0006, 2021, C, JB LZ",
    "comment": "コメント! #0006"
  }
}
</code></pre>

## 05. filter function

今更だが、selectContent.js内で配列にフィルターを掛ける部分を、関数として独立させた。
<code class="lang-js">function filterNoData</code>,
<code class="lang-js">function filterSingle</code>,
<code class="lang-js">function filterMulti</code>
の部分。

* <a href="./design-works/works-05/works-05.html" target="_blank">フィルター部分を改良</a>

## 04. json (ver. 2)

ちょっと後戻りするが、jsonファイルのデータ構造を少し変えた
(genreやwarnなど、複数通り登録される可能性がある項目を、配列形式に変更)。

* <a href="./design-works/works-04/works-04.html" target="_blank">jsonの形式を変更</a>

<pre data-label="version2.json"><code class="lang-json">
{
  "genre": ["JeffBeck", "LedZep"],
  "id": "0017",
  "title": "#0017, 2020, -, JB LZ",
  "warn": [],
  "year": 2020
}
</code></pre>

## 03. #content-display

さらにgridレイアウト。

* <a href="./design-works/works-03/works-03.html" target="_blank">#content-displayにもgrid</a>

背景を黒ドットにすると、LZ Iぽくなる

## 02. json (ver. 1)

各コンテンツのデータをjsonファイルに納めている場合。

* <a href="./design-works/works-02/works-02.html" target="_blank">jsonファイルにデータを格納</a>

コンテンツリストのスクロール機能(フォーカスが当たっているコンテンツを表示できるように)も追加。

## 01. layout

レイアウトのCSSをどう実装しようかな、というテスト。

* <a href="./design-works/works-01-flex/works-01-flex.html" target="_blank">flexレイアウト</a>
* <a href="./design-works/works-01-grid/works-01-grid.html" target="_blank">gridレイアウト</a>

いずれも、各コンテンツのデータはhtmlファイル内に格納されている。
コンテンツが増えすぎた場合、読み込みや処理に時間がかかるかも...

コンテンツの選別や、session storageの様子のチェックの為だけなので、コンテンツ情報については、タイトルとidしか表示できない。

今後はgridレイアウトで実装しよう。