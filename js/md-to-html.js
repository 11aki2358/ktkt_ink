/**
 * Markdown入力エリアでキーを叩くごとに、MD -> html変換
 * */
document.addEventListener('keyup', convert);

function convert() {
  const mark = document.getElementById('inMD');
  const value = mark.value;
  var elms = document.getElementsByClassName("outHTML");
  for (i = 0; i < elms.length; i++) {
    elms[i].innerHTML = marked(value);
  }
}

/**
 * 完璧なhtmlを出力する(今のところBACKYARD専用)
 * */

function completeHTML() {

  // 追加のcss
  var a1 = '';

  // コンテンツリスト
  var a2 = ''

  // 本文の部分
  const mark = document.getElementById('inMD');
  const mainText = marked(mark.value);

  // フッターのリンク(追加)
  var b1 = '';
  var b1_2 = '';

  let footerIdx = document.getElementsByName('genre');
  for (let i = 0; i < footerIdx.length; i++) {
    if (footerIdx[i].checked) {
      b1_2 = footerIdx[i].value;
    }
  }
  b1 = `<li><a href="./${b1_2}.html" class="btn-flat"><span>${b1_2}</span></a></li>\n`;

  // 追加のjs
  var b2 = '';

  if (document.getElementById('images').checked) {
    a1 +=
      '<link rel="stylesheet" href="../css/images.css" type="text/css" id="style">\n';
  }
  if (document.getElementById('jQuery').checked) {
    b2 += `<script src="../js/jquery-3.6.0.min.js"></script>\n`;
  }

  var addCnJ = document.getElementsByName('addCSSnJS');
  for (let i = 0; i < addCnJ.length; i++) {
    if (addCnJ[i].checked) {
      a1 += `<link rel="stylesheet" href="../css/${addCnJ[i].id}.css" type="text/css" id="style">\n`;
      b2 += `<script src="../js/${addCnJ[i].id}.js"></script>\n`;
    }
  }

  const comp = document.getElementById('outHTML-complete');

  fullHtml = head1 + a1 + head2 + a2 + head3 + mainText + foot1 + b1 + foot2 + b2 + foot3;
  comp.innerHTML = fullHtml;
}

var fullHtml;

// マークダウンファイルのアップロード機能
var form = document.forms.myform;
var fileName = 'output';

form.myfile.addEventListener('change', function(e) {

  //読み込んだファイル情報を取得
  var result = e.target.files[0];

  // 読みこんだファイルの名前(拡張子.mdは除く)
  fileName = result.name.slice(0, -3);

  //FileReaderのインスタンスを作成する
  var reader = new FileReader();

  //読み込んだファイルの中身を取得する
  reader.readAsText(result);

  //ファイルの中身を取得後に処理を行う
  reader.addEventListener('load', function() {

    //ファイルの中身をtextarea内に表示する
    document.getElementById('inMD').innerHTML = reader.result;
    convert();
  })

})

// htmlファイル(full)のダウンロード機能

const dlHtmlButton = document.getElementById('downloadHtml');

dlHtmlButton.addEventListener('click', function() {

  dlHtmlButton.download = `${fileName}.html`;
  completeHTML();
  fullHtml = fullHtml.replace(/&amp;/g, '&');
  let out = fullHtml.split('');
  const blob = new Blob(out, { type: 'text/plain' });
  // ここを
  // const blob = new Blob(out, { type: 'text/html' });
  // にする場合、blobの生成前に
  // fullHtml = fullHtml.replace(/&lt;/g, '<');
  // fullHtml = fullHtml.replace(/&gt;/g, '>');
  // が必要

  dlHtmlButton.href = window.URL.createObjectURL(blob);
})

const dlMdButton = document.getElementById('downloadMd');

dlMdButton.addEventListener('click', function() {
  dlMdButton.download = `${fileName}.md`;
  let markedDoc = document.getElementById('inMD').value;
  console.log(markedDoc);
  let markArray = markedDoc.split('');
  const blob = new Blob(markArray, { type: 'text/plain' });
  dlMdButton.href = window.URL.createObjectURL(blob);
})

// プレビューのタブの切り替え
document.addEventListener('DOMContentLoaded', function() {
  tabs = document.querySelectorAll('#js-tab li');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', tabSwitch, false);
  }

  function tabSwitch() {
    tabs = document.querySelectorAll('#js-tab li');
    var node = Array.prototype.slice.call(tabs, 0);
    node.forEach(function(element) {
      element.classList.remove('active');
    });
    this.classList.add('active');
    content = document.querySelectorAll('.tab-content');
    var node = Array.prototype.slice.call(content, 0);
    node.forEach(function(element) {
      element.classList.remove('active');
    });
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.querySelectorAll('.tab-content')[index].classList.add('active');
  };
});

//  入力補助ボタン
function helpBtn(val, nam) {
  //テキストエリアと挿入する文字列を取得
  var area = document.getElementById('inMD');
  var text1;
  var text2;
  var lang;

  // val : help-css
  // nam : help-pre

  switch (val) {
    case 'help-css':
      lang = 'css';
      break;
    case 'help-html':
      lang = 'html';
      break;
    case 'help-js':
      lang = 'js';
      break;
    case 'help-json':
      lang = 'json';
      break;
    case 'help-php':
      lang = 'php';
      break;
    case 'help-powershell':
      lang = 'powershell';
      break;
    default:
      console.log(`Sorry, we are out of ${val}.`);
  }

  switch (nam) {
    case 'help-pre':
      text1 = `\n<pre data-label=".${lang}"><code class="language-${lang}">\n`;
      text2 = '\n</code></pre>\n';
      break;
    case 'help-code':
      text1 = `<code class="language-${lang}">`;
      text2 = '</code>';
      break;
    case 'help-link':
      text1 = `<a href="" target="_blank">`;
      text2 = '</a>';
      break;
    case 'help-noFileName':
      text1 = `\n<pre><code class="language-${lang}">\n`;
      text2 = '\n</code></pre>\n';
      break;
    default:
      console.log(`Sorry, we are out of ${nam}.`);
  }

  //カーソルの開始位置と終了位置を基準に分割
  area.value = area.value.substr(0, area.selectionStart) +
    text1 +
    area.value.substr(area.selectionStart, area.selectionEnd - area.selectionStart) +
    text2 +
    area.value.substr(area.selectionEnd);
  convert();
}

const head1 =
  '<!DOCTYPE html>\n' +
  '<html lang="ja">\n' +
  '<head>\n' +
  '<meta name="robots" content="noindex,nofollow">\n' +
  '<meta name="googlebot" content="noindex,nofollow">\n' +
  '<meta name="pinterest" content="nopin">\n' +
  '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">\n' +
  '<meta name="theme-color" content="#000000">\n' +
  '<link rel="shortcut icon" href="../images/favicon.svg" type="image/svg+xml">\n' +
  '<title>backyard</title>\n';

// ここに、追加のcss(a1) ... prism.cssなど
// ダウンロードしてきたprism.cssなどの設定を、自作のstyle.cssとかで上書きできるようにしたいので、cssはこの順番で書き込み

const head2 =
  '<link rel="stylesheet" href="../css/decoration.css" type="text/css" id="style">\n' +
  '<link rel="stylesheet" href="../css/footer.css" type="text/css" id="style">\n' +
  '<link rel="stylesheet" href="../css/image.css" type="text/css" id="style">\n' +
  '<link rel="stylesheet" href="../css/style.css" type="text/css" id="style">\n' +
  '</head>\n' +
  '<body>\n' +

  '<header>\n' +
  '<nav>\n' +
  '<div class="header-logo-menu">\n' +
  '<div class="logo-area">\n' +
  '<h1><a href="./backyard.html">backyard</a></h1>\n' +
  '</div>\n' +
  '<div id="nav-drawer">\n' +
  '<input id="nav-input" type="checkbox" class="nav-unshown">\n' +
  '<label id="nav-open" for="nav-input"><span></span></label>\n' +
  '<label class="nav-unshown" id="nav-close" for="nav-input"></label>\n' +
  '<div id="nav-content-record"></div>\n' +
  '<div id="nav-content-jacket">\n' +
  '<div class="nav-content-text center-list"></div>\n';

// ここにコンテンツリスト(a2)

const head3 =
  '</div>\n' +
  '</div>\n' +
  '</div>\n' +
  '</div>\n' +
  '</nav>\n' +
  '</header>\n' +
  '<main>\n';

// ここで本文(mainText)

const foot1 =
  '</main>\n' +
  '<footer>\n' +
  '<button id="back-to-top"></button>\n' +
  '<nav><ul>\n' +
  '<li><a href="../index.html" class="btn-flat"><span>home</span></a></li>\n' +
  '<li><a href="./backyard.html" class="btn-flat"><span>backyard</span></a></li>\n';

// ここに、追加のフッターリンク(b1)

const foot2 =
  '</ul></nav>\n' +
  '</footer>\n';

// ここに、追加のjs (b2)

const foot3 =
  '<script src="../js/general.js"></script>\n' +
  '</body>\n' +
  '</html>';