<!-- CSS : prism -->
<!-- genre : design -->

## Password Page 

AES暗号を使用

<label>password(キーワードはkey)<br>
  <input type="text" id="passwordAreaAES">
</label>

<input type="button" value="Check" id="checkPasswordAES">

---

javascriptは

<pre data-label=".js"><code class="language-js">
  let checkPasswordAES = document.getElementById('checkPasswordAES');
  checkPasswordAES.addEventListener('click', buttonClickAES);

  function buttonClickAES() {
    let passwordAreaAES = document.getElementById('passwordAreaAES');
    let encrypted = "U2FsdGVkX1+2U6R6sqvUXuT13Il3lRjSCl+L6GfTKTjfokbKNE5Pgp1m+q/3cFk+";
    let decrypted = CryptoJS.AES.decrypt(encrypted, passwordAreaAES.value);
    let txt_decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    window.location.replace('./' + txt_decrypted + '.html');
  }
</code></pre>

<!-- AES暗号 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>

<script>
  let checkPasswordAES = document.getElementById('checkPasswordAES');
  checkPasswordAES.addEventListener('click', buttonClickAES);

  function buttonClickAES() {
    let passwordAreaAES = document.getElementById('passwordAreaAES');
    let encrypted = "U2FsdGVkX1+2U6R6sqvUXuT13Il3lRjSCl+L6GfTKTjfokbKNE5Pgp1m+q/3cFk+";
    let decrypted = CryptoJS.AES.decrypt(encrypted, passwordAreaAES.value);
    let txt_decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    window.location.replace('./' + txt_decrypted + '.html');
  }
</script>