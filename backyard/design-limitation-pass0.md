<!-- CSS : prism -->
<!-- genre : design -->

<script>
var password = prompt('パスワードは key\nこれ以外のパスワードを入力するとbackyardにとぶ');
if (password != "key") {
  window.location.replace('./design-limitation.html#Demo-0');
}
</script>

## Password Page兼秘密ページ。

javaScriptの部分は、

<pre data-label=".js"><code class="language-js">
var password = prompt('パスワードは key\nこれ以外のパスワードを入力するとbackyardにとぶ');
if (password != "key") {
  window.location.replace('./design-limitation.html#Demo-0');
}
</code></pre>

<input type="button" value="「検索除け」に戻る" id="backButton">
<script>
  document.getElementById("backButton").onclick = function() {
    window.location.replace('./design-limitation.html#Demo-0');
  };
</script>