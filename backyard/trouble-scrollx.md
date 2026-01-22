<!-- CSS : prism -->
<!-- genre : design -->

## Fixed Scroll Bar
<style>
  .test {
    position: relative !important;
    z-index: -1;
    overflow: auto !important;
  }
</style>

<pre class="test" data-label="test.css"><code class="language-css">
test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test 
横に長いpreで
スクロールバーは表示されるが、
バーが動かない
このpreのCSSは
.test {
  position: relative !important;
  z-index: -1;
  overflow: auto !important;
}
</code></pre>

## Situation

最初、headerタグ全体には<code class="language-css">z-index</code>の指定をしていなかった(レコードとかジャケットには<code class="language-css">z-index</code>指定していたけれど)。

だけれど、prismを使ってコードを表示すると、コードの部分がヘッダーロゴよりも上に来てしまう。

ここで、
<pre data-label=".css"><code class="language-css">
.language-css, 
.language-html{
  position: relative;
  z-index: -1;
}
</code></pre>
という指定をした
(<code class="language-css">z-index</code>の指定には、<code class="language-css">position</code>の設定も変える必要がある)。

コードがヘッダーロゴに重ならなくなった。
その一方、横に長いコードを表示するときに、スクロールバーが動かなくなってしまった(表示はされるが、バーが動かない)。

## Reason

原因を調べた結果...

### 同じクラスで<code class="language-css">position</code>と<code class="language-css">overflow</code>の設定をするのがマズい

という記述を見つけた。

(親子関係の要素で、親だけ<code class="language-css">overflow</code>、子にだけ<code class="language-css">position</code>の設定をする、というのはOK。親だけ<code class="language-css">position</code>, 子だけ<code class="language-css">overflow</code>でもOK)

今回、prismではデフォルトで<code class="language-css">.language-なんちゃら</code>に<code class="language-css">overflow</code>の設定がしてあった。
この設定だと、自分で書いた<code class="language-css">position : relative</code>と競合してしまい、スクロールバーが動かなくなった。

### ちょっと待って

でも、
<style>
  .test2 {
    position: relative !important;
    z-index: 2;
    overflow: auto !important;
  }
</style>
<div>
<pre class="test2" data-label="test2.css"><code class="language-css">
test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test 
ここのCSSは
.test2 {
  position: relative !important;
  z-index: 2;
  overflow: auto !important;
}
で、positionとoverflowどっちも設定しているけれど、ちゃんとスクロールは動く
</code></pre>
</div>

スクロールバーが動かない原因は<code class="language-css">z-index</code>の値だった。  
本文(<code class="language-css">z-index: 0</code>)よりも下の層にスクロールバーが表示されたから、バーを操作できなかった。

<code class="language-css">position</code>と<code class="language-css">overflow</code>を同時に設定するのもマズいのだろうけれど、今回はもっと初歩的なミスでつまづいていたようだ。

## Solution

よく考えなおしてみたら、コードやpreの<code class="language-css">z-index</code>をいじくってCSSをややこしくするよりも、headerの<code class="language-css">z-index</code>を手前に持ってくる方が楽じゃんね。

自分で書いたコード
<div>
<pre data-label=".css"><code class="language-css">
.language-css, 
.language-html{
  position: relative;
  z-index: -1;
}
</code></pre>
</div>
はばっさりカット。

コードやpreの<code class="language-css">z-index</code>をマイナスにする代わりに、ヘッダーの<code class="language-css">z-index</code>をプラス(<code class="language-css">z-index: 10;</code>)にする。

これで、prismで飾られたコードがヘッダーよりも下に来る & 横に長いコードで横スクロールが効くようになった。

## memo

なんだか長くなったが、最後にまとめ

* スクロールバーが動かないときは、<code class="language-css">z-index</code>の上下関係をチェック
* 同じクラスに<code class="language-css">position</code>と<code class="language-css">overflow</code>を設定すると、マズくなることがあるらしい