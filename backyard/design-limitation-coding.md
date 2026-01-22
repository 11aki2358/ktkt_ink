<!-- genre : design -->

## Coding

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>

<input type="text" name="data" id="data" placeholder="" value="ここに平文">
<label for="">データ / Data</label>  

---

<input type="text" name="pass_phrase" id="pass_phrase" value="ここにパスワード">
<label for="">パスフレーズ / Path Phrase</label>  

---

<input type="submit" id="execute" value="実行">

<div id="output"></div>

---

<a href="https://chakkari.org/blog/2020/05/03/aes-encrypt-with-javascript/" target="_blank">こちら</a>のリンクからコピペした

<script>
    window.onload = () => {
      let buttonExecute = document.getElementById('execute')
      buttonExecute.addEventListener('click', () => {
        execute()
      });
    }

    function execute() {
      // パスフレーズ（暗号鍵）
      let passPhrase = document.getElementById('pass_phrase').value;
      // 暗号化したい元のデータ
      let data = document.getElementById('data').value;
      let utf8_plain = CryptoJS.enc.Utf8.parse(data);
      // 暗号化
      let encrypted = CryptoJS.AES.encrypt(utf8_plain, passPhrase);
      // 復号化
      let decrypted = CryptoJS.AES.decrypt(encrypted, passPhrase);
      let txt_dexrypted = decrypted.toString(CryptoJS.enc.Utf8);
      // 表示
      document.getElementById("output").innerHTML =
        "key : " + passPhrase + "<br />" +
        "data : " + data + "<br />" +
        "encrypted : " + encrypted + "<br />" +
        "decrypted : " + txt_dexrypted;
    }
  </script>