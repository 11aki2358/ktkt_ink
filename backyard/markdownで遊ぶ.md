
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [VS CodeのMarkdownで遊ぶ](#vs-codeのmarkdownで遊ぶ)
  - [test (headline2)](#test-headline2)
  - [Markdown Preview Enhanced](#markdown-preview-enhanced)
  - [Markdown All in one](#markdown-all-in-one)

<!-- /code_chunk_output -->


# VS CodeのMarkdownで遊ぶ

このページは、VS Codeの拡張機能*Markdown Preview Enhanced*を使って作成した。
markdownプレビューのCSSをいじりまくり、そのままhtmlに出力。

配色は[こちら](https://www.schemecolor.com/cartoon-sunrise.php)からお借りした。

実際のmarkdownファイル : [link](markdownで遊ぶ.md)

タイトル通り「お遊び」なので、実際にmarkdown編集するときには、*Markdown Preview Enhanced*は無効化して、拡張機能*Markdown All in one*の地味なプレビュー画面を見ている。

##  test (headline2)

normal senntence  
**strong**  /  *em強調*   /  ==mark== /  ~~del~~  /  [link1]()  /  `inline code` / [link2]

Markdownには、エディタや拡張機能ごとに方言がある。  
==mark==とかは使えないところもある(Markdown Preview Enhancedでは使える)。

| header1    |     header2 |   header3    |
| :--------- | ----------: | :----------: |
| align left | align right | align center |
| a          |           b |      c       |

[link2]: https://www.markdown.jp/syntax/

```markdown
**strong**  __strong__
*em強調*    _em_
==mark==
~~del~~
[link1](https://url)
`inline code`
[link2]

| header1    |     header2 |   header3    |
| :--------- | ----------: | :----------: |
| align left | align right | align center |
| a          |           b |      c       |

[link2]: https://www.markdown.jp/syntax/
```

* test
* list
  * sub list
  * sub list
* list

hr↓

---

1.  ol
2.  ol
3.  ol

* [ ] checkbox  `* [ ] checkbox  ` 
* [x] checked   `* [x] checked`  
  Markdown上では、`x`の有無でチェックを操作(プレビュー上からもいじれる)  
  htmlに出力すると、チェックの有無をブラウザでいじれる

> blockquote
> **strong**   /  *em*  /  ==mark== /  ~~del~~  /  [link]()  /  `inline code`
>
> > 階層構造もOK
>
> 引用でした

```C
//  code block
int main(){
  int a = 0;
  printf("%d\n", a);
  return 0;
}
```

## Markdown Preview Enhanced 

* h見出しにidを付けられる [link](https://shd101wyy.github.io/markdown-preview-enhanced/#/ja-jp/markdown-basics?id=%e8%a6%8b%e5%87%ba%e3%81%97)

* プレビュー画面 : hタグから、自動的に見出しを作ってくれる(プレビュー右上のメニューから選択可能)

* Markdown : 上記と同様に、ページ内リンクを貼ってくれる... [link](https://shd101wyy.github.io/markdown-preview-enhanced/#/ja-jp/toc)  
`Shift-Ctr-P`から*Markdown Preview Enhanced：Create Toc*を選択

* 注釈にジャンプ!  [^1] 

* htmlでのプレビュー(ブラウザが開く)

* html, pdfや画像にエクスポート(CSS保持)

* コードのシンタックスハイライトに対応(htmlは自動でエスケープ)
  ```html 
  <h2><span class="font-thin">Inline decorations</span></h2>
  ```

* `Shift-Ctr-P`(コマンドパレットを開く)の後、*>Markdown Preview Enhanced: Customize CSS*と入力。`Enter`を押すと*style.less*というファイルが開く。CSSと同じ感覚で編集できる。  
Markdownのプレビュー画面がかなり豪華になる。たのしい。
  * プレビュー画面で右クリックして、*Preview Theme*をクリックしちゃった... 
    せっかくオサレに編集したプレビュー画面が崩れてしまう...  
    →VS Codeの*settings.json*を開いて、  
    ```json
    "markdown-preview-enhanced.previewTheme": "one-light.css",
    ``` 
    の行をまるっと削除すればOK  (`one-light.css`ではないかも)

##  Markdown All in one

* Markdownのフォーマッターを使える(`Alt-Shift-F`)。
  表を整形してくれるのが嬉しい
* 編集用のショートカットキー(`Ctr-B`すれば**strong**、とか)
* htmlを出力できる。
  CSSはいじれない。*Markdown Preview Enhanced*で使えていた機能(==mark==や脚注)は使えない。

[^1]: やあ! これは脚注です。