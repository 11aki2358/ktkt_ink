<!-- CSS : prism -->
<!-- genre : design -->

## Password Page

<label>password(キーワードはkey)  
  <input type="text" id="passwordArea">
</label>
<input type="button" value="Check" id="checkPassword">

---

javaScriptの部分は

<pre data-label=".js"><code class="language-js">
  function butotnClick() {
    if (passwordArea.value == "key") {
      window.location.replace('./design-limitation-secret.html');
    } else {
      passwordArea.value = ''
    }
  }
  let passwordArea = document.getElementById('passwordArea');
  let checkPassword = document.getElementById('checkPassword');
  checkPassword.addEventListener('click', butotnClick);
</code></pre>

<script>
  function butotnClick() {
    if (passwordArea.value == "key") {
      window.location.replace('./design-limitation-secret.html');
    } else {
      passwordArea.value = ''
    }
  }
  let passwordArea = document.getElementById('passwordArea');
  let checkPassword = document.getElementById('checkPassword');
  checkPassword.addEventListener('click', butotnClick);
</script>