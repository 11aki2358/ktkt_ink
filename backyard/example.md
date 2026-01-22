<!-- CSS : images, prism, lightbox -->
<!-- genre : design -->

##  Example

いろんな要素の一覧。

##  h2

to lead a better life
i need my love to be here

h2のフォントは、縦に1.2倍に伸ばしている

### h3

to lead a better life
i need my love to be here

#### h4

to lead a better life
i need my love to be here

##### h5

to lead a better life
i need my love to be here

######  h6

to lead a better life
i need my love to be here

##  List

### 通常のリスト

* all together now
* all together now
  * all together now
* all together now
* all together now
  * all together now
  
### 数字付きリスト

1.  taxman
2.  eleanor rigby
3.  i'm only sleeping
4.  love you to

### 番外編

箇条書きは、「・や数字が縦に並んだ列」と、「それが対応する項目が縦に並んだ列」が横に並んだもの。 従って、・や数字は必ず一直線上に配置される。

コンテンツメニューでは各項目が番号付きリストとして並んでいるが、「数字も含めて中央配置」を実現するために、各項目は箇条書きとして扱っていない。
<div class="center-list">
  <span>sgt. Pepper's Lonely Heart Club Band</span>
  <span>With a little help from my friend</span>
  <span>3つめの項目</span>
</div>

##  Inline decorations

abc順に、主に文や単語を装飾するものを。imgとかinput, label, textareaとかselectとかは別で説明。<br>

[a](backyard.html) : 同じタブで開く(本サイトのページ)

<a href="https://discography.ledzeppelin.com/lz1.html" target="_blank">a
  target="_blank"</a> :
新しいタブで開く(外部サイトのページ)

<a href="../css/decoration.css" target="_blank" class="code-file">
  a target="_blank" class="code-file"</a> :
新しいタブで開く(本サイトのCSSやjavaScript)

<b>b</b>

<button>button</button>

<cite>cite</cite>

<code>code</code>

<code class="language-css">code class="language-css"</code>

<em>em</em>

<i>i</i>

<kbd>kbd</kbd>

<mark>mark</mark>

<q>q</q>

<samp>samp</samp>

<small>small</small>

<strong>strong</strong>

<time>time</time>

<var>var</var>

<span class="font-thin">class="font-thin"</span>

詳細はここ : [link](design-inlineDeco.html)

##  Images

詳細は [link](design-images.html)

<div class="image-set center">
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/beck-bogert-and-appice-jeff-beck-at-a-hotel-in-tokyo-japan-may-1973-picture-id1264079987?s=612x612"
    data-lightbox="example-set" data-title="Click the right half of the image to move forward.">
    <img class="example-image medium"
      src="../images/sample-150x150.png"
      alt="Beck Bogert And Appice First Japan Tour">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/jeff-beck-performs-onstage-at-the-25th-anniversary-rock-roll-hall-of-picture-id106299793?s=612x612"
    data-lightbox="example-set" data-title="Or press the right arrow on your keyboard.">
    <img class="example-image medium"
      src="../images/sample-150x180.png"
      alt="25th Anniversary Rock & Roll Hall Of Fame Concert - Night 2 - Show">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/jeff-beck-performs-on-stage-at-the-roundhouse-london-23rd-may-1973-he-picture-id1265962807?s=612x612"
    data-lightbox="example-set" data-title="The next image in the set is preloaded as you're viewing.">
    <img class="example-image medium"
      src="../images/sample-180x150.png"
      alt="Jeff Beck Warm-Up Gig At Roundhouse Before US Tour">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/photo-of-jeff-beck-picture-id85357696?s=612x612"
    data-lightbox="example-set" data-title="Click anywhere outside the image or the X to the right to close.">
    <img class="example-image medium"
      src="../images/sample-150x150.png" alt="Photo of Jeff BECK">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/beck-bogert-and-appice-jeff-beck-at-a-hotel-in-tokyo-japan-may-1973-picture-id1264079987?s=612x612"
    data-lightbox="example-set" data-title="Click the right half of the image to move forward.">
    <img class="example-image medium"
      src="../images/sample-150x180.png"
      alt="Beck Bogert And Appice First Japan Tour">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/jeff-beck-performs-onstage-at-the-25th-anniversary-rock-roll-hall-of-picture-id106299793?s=612x612"
    data-lightbox="example-set" data-title="Or press the right arrow on your keyboard.">
    <img class="example-image medium"
      src="../images/sample-180x150.png"
      alt="25th Anniversary Rock & Roll Hall Of Fame Concert - Night 2 - Show">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/jeff-beck-performs-on-stage-at-the-roundhouse-london-23rd-may-1973-he-picture-id1265962807?s=612x612"
    data-lightbox="example-set" data-title="The next image in the set is preloaded as you're viewing.">
    <img class="example-image medium"
      src="../images/sample-150x150.png"
      alt="Jeff Beck Warm-Up Gig At Roundhouse Before US Tour">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/photo-of-jeff-beck-picture-id85357696?s=612x612"
    data-lightbox="example-set" data-title="Click anywhere outside the image or the X to the right to close.">
    <img class="example-image medium"
      src="../images/sample-150x180.png" alt="Photo of Jeff BECK">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/beck-bogert-and-appice-jeff-beck-at-a-hotel-in-tokyo-japan-may-1973-picture-id1264079987?s=612x612"
    data-lightbox="example-set" data-title="Click the right half of the image to move forward.">
    <img class="example-image medium"
      src="../images/sample-180x150.png"
      alt="Beck Bogert And Appice First Japan Tour">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/jeff-beck-performs-onstage-at-the-25th-anniversary-rock-roll-hall-of-picture-id106299793?s=612x612"
    data-lightbox="example-set" data-title="Or press the right arrow on your keyboard.">
    <img class="example-image medium"
      src="../images/sample-150x150.png"
      alt="25th Anniversary Rock & Roll Hall Of Fame Concert - Night 2 - Show">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/jeff-beck-performs-on-stage-at-the-roundhouse-london-23rd-may-1973-he-picture-id1265962807?s=612x612"
    data-lightbox="example-set" data-title="The next image in the set is preloaded as you're viewing.">
    <img class="example-image medium"
      src="../images/sample-150x180.png"
      alt="Jeff Beck Warm-Up Gig At Roundhouse Before US Tour">
  </a>
  <a class="example-image-link"
    href="https://media.gettyimages.com/photos/photo-of-jeff-beck-picture-id85357696?s=612x612"
    data-lightbox="example-set" data-title="Click anywhere outside the image or the X to the right to close.">
    <img class="example-image medium"
      src="../images/sample-180x150.png" alt="Photo of Jeff BECK">
  </a>
</div>