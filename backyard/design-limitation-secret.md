<!-- CSS : prism -->
<!-- genre : design -->

<script>
var checkPrevLink = checkPrevLink();

function checkPrevLink() {
  let prevLink = document.referrer;
  var result = prevLink.indexOf('marlboro-bambi.vercel.app');
  if (result == -1) {
    alert('previous URL does not include "marlboro-bambi.vercel.app"');
  } else {
    alert('previous URL includes "marlboro-bambi.vercel.app"');
  }
};
</script>

## Secret Page

<input type="button" value="「検索除け」に戻る" id="backButton">

---

どのURLから訪問したのかを判別するjavaScriptは、

<pre data-label=".js"><code class="language-js">
  var checkPrevLink = checkPrevLink();

  function checkPrevLink() {
    let prevLink = document.referrer;
    var result = prevLink.indexOf('marlboro-bambi.vercel.app');
    if (result == -1) {
      alert('previous URL does not include "marlboro-bambi.vercel.app"');
    } else {
      alert('previous URL includes "marlboro-bambi.vercel.app"');
    }
  };
</code></pre>

---

このページを閲覧履歴に残さずに、特定のページに戻るためのjavaScriptは
 
<pre data-label=".js"><code class="language-js">
document.getElementById("backButton").onclick = function() {
  window.location.replace('./design-limitation.html');
};
</code></pre>

<script>
document.getElementById("backButton").onclick = function() {
  window.location.replace('./design-limitation.html');
};
</script>