主要なもののみメモ

カルノー図風の状態遷移表

いずれまともなカルノー図にして簡略化・整理したいのだが...

## #contents-selectと#content-boxのレイアウト

### 構成
* main (grid)
  * #contents-select
    * チェックボックス #show-display
    * #checkbox-area
  * #content-box (grid)
    * #content-display
    * #content-list

### レイアウト
* A : #show-displayの値
* B : #content-boxについて : height > width

| area             | CSS       | AB: 00/01 |      11      |      10      |
| :--------------- | :-------- | :-------: | :----------: | :----------: |
| #checkbox-area   | display   |   block   |     none     |     none     |
| #content-display | display   |   none    |     grid     |     grid     |
|                  | grid-area |     X     |   1/1/2/3    |   1/1/3/2    |
|                  | margin    |     0     | 0 0 0.5rem 0 | 0 0.5rem 0 0 |
| #content-list    | grid-area |  1/1/3/3  |   2/1/3/3    |   1/1/3/2    |

* CSSファイルでは、#content-boxのグリッドは2列と定義されている
  * 表ではグリッドが3列になっている箇所があるが、これはわざと。気にするな。

##  #content-displayのレイアウト

### 構成

* #content-display (grid)
  * #content-title
  * #content-image
  * #content-comment

### レイアウト

* #content-displayの高さ : CDH
* #content-displayの幅 : CDW

|                | CSS         | propety |
| :------------- | :---------- | :-----: |
| #content-title | grid-column | span 2  |
|                | grid-area   | 1/1/1/2 |

* A : CDH x 1.2 > CDW
* B : CDH x 0.55 > CDW

|                  | CSS           | AB : 00/01 |   11    |     10     |
| :--------------- | :------------ | :--------: | :-----: | :--------: |
| #content-image   | grid-column   |   span 1   | span 2  |   span 2   |
|                  | grid-area     |  2/1/2/1   | 2/1/2/2 |  2/1/2/2   |
|                  | height, width | CDH x 0.6  |   CDW   | CDH x 0.55 |
| #content-comment | grid-column   |   span 1   | span 2  |   span 2   |
|                  | grid-area     |  2/2/2/2   | 3/1/3/2 |  3/1/3/2   |

##  key events

### まとめ

* A=0 : #show-modal = false
  * C=0 : #show-display = false
    * B=0 : #content-imgのクラスが link
    * B=1 : #content-imgのクラスが modal
    * [Enter] : display表示(A=0,C=1)
    * [arrow] : フォーカスの移動、display表示(A=0,C=1)
  * C=1 : #show-display = true
    * B=0 : #content-imgのクラスが link
    * B=1 : #content-imgのクラスが modal
      * [Enter] : modalを開く(A=1,B=1,C=1)
* A=1 : #show-modal = true (C=1)
  * B=0 : #content-imgのクラスが link
    * リンクをクリック : ページ遷移
    * [Esc] : modalを閉じる(A=0,B=0,C=1)
  * B=1 : #content-imgのクラスが modal
    * [Enter][Esc] : modalを閉じる(A=0,B=1,C=1)
  * [arrow] : フォーカスの移動(A=1,C=1)

| ABC  |        arrow        |          Enter          |       Escape        |   [   |   ]   |
| :--- | :-----------------: | :---------------------: | :-----------------: | :---: | :---: |
| 000  | フォーカス移動(0*1) | contentDisplay開く(001) |          X          |       |       |
| 001  | フォーカス移動(0*1) |  (クリック:ページ遷移)  |          X          |       |       |
| 011  | フォーカス移動(0*1) |    モーダル開く(111)    |          X          |       |       |
| 010  | フォーカス移動(0*1) | contentDisplay開く(011) |          X          |       |       |
| 110  | フォーカス移動(0*1) | contentDisplay開く(011) |          X          |   X   |   X   |
| 111  | フォーカス移動(1*1) |   モーダル閉じる(011)   | モーダル閉じる(011) |   X   |   X   |
| 101  | フォーカス移動(1*1) |  (クリック:ページ遷移)  | モーダル閉じる(001) |   X   |   X   |
| 100  | フォーカス移動(0*1) | contentDisplay開く(001) |          X          |   X   |   X   |

##  モーダルウィンドウの挙動

* fcsObj.info.modal = true
  * モーダルが閉じている
    * サムネをクリック → モーダルが開く・画像を表示
    * [Enter] → モーダルが開く・画像を表示
  * モーダルが開いている
    * どこかをクリック → モーダルが閉じる
    * [Enter][Esc] → モーダルが閉じる 
* fcsObj.info.modal = false
  * モーダルが閉じている
    * サムネをクリック → ページ遷移
  * モーダルが開いている(未実装)
    * タイトル、コメント、サムネ(小さめ)とページ遷移用のリンクを表示