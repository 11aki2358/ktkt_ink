// works-04

let toggleView = document.getElementById('select-hide');
let contentBox = document.getElementById('content-box');
let contentDisplay = document.getElementById('content-display');
let contentList = document.getElementById('content-list');

window.onload = onLoadAction();

function onLoadAction() {
  setVhMax();
  contentDisplay.style.display = "none";

  if (sessionStorage.getItem('firstVisit') != '1') {
    // このセッションで初めてworksを訪れた場合は...
    selectContent();
    sessionStorage.setItem('firstVisit', '1');
  } else {
    // worksを訪れるのが初めてでない場合は
    setCheckLabel();
    showContentListOnLoad();
  }
}

/*************************************
 * チェックボックスのON/OFFを
  sessionStorage'selectButtonData'に保存された値に合わせる
***************************************/

function setCheckLabel() {
  const selectDataStr = sessionStorage.getItem('selectButtonData');
  const selectData = JSON.parse(selectDataStr);

  setCheck('genre', selectData.genre);
  setCheckYear('year', selectData.year);
  setCheck('warn', selectData.warn);
}

// めっちゃ効率悪い
function setCheck(txt, array) {
  // 全部のチェックをfalseに
  var sButton = document.querySelectorAll(`input[name="select-${txt}"]`);
  for (let i = 0; i < sButton.length; i++) {
    sButton[i].checked = false;
  }
  // 適宜、チェックを入れる
  var sId;
  let n = array.length;
  for (let i = 0; i < n; i++) {
    sId = array[i];
    document.querySelector(`input[id="${sId}"]`).checked = true;
  }
}

function setCheckYear(txt, array) {
  // 全部のチェックをfalseに
  var sButton = document.querySelectorAll(`input[name="select-${txt}"]`);
  for (let i = 0; i < sButton.length; i++) {
    sButton[i].checked = false;
  }
  // 適宜、チェックを入れる
  var sId;
  let n = array.length;
  for (let i = 0; i < n; i++) {
    sId = `y${array[i]}`;
    document.querySelector(`input[id="${sId}"]`).checked = true;
  }
}


/*************************************
 * content display, contents listをいい感じに表示
 ***************************************/

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// スマホで開くと、アドレスバーがウザいから
// スマホのアドレスバー問題は、jsで解決するしかないみたい。
function setVhMax() {
  const vh = window.innerHeight * 0.01;

  // なぜか上手く機能しない
  // とりあえず、CSSでhtml, bodyに
  // overflow: hidden;
  // 指定して対応している
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

toggleView.addEventListener('change', function() {
  arrangeContentBox();
  scrollToFocus();
}, false);

window.onresize = function() {
  setVhMax();
  arrangeContentBox();
  scrollToFocus();
}

// content-displayが表示されている時・いないとき
function arrangeContentBox() {
  if (toggleView.checked) {
    contentDisplay.style.display = "grid";
    if (contentBox.clientHeight > contentBox.clientWidth) {
      contentDisplay.style.gridArea = '1/1/2/3';
      contentDisplay.style.margin = '0 0 0.5rem 0';
      contentList.style.gridArea = '2/1/3/3';
    } else {
      contentDisplay.style.gridArea = '1/1/3/2';
      contentList.style.gridArea = '1/2/3/3';
      contentDisplay.style.margin = '0 0.5rem 0 0';
    }
    showFocusedContent(focusObj);
  } else {
    contentDisplay.style.display = "none";
    contentList.style.gridArea = '1/1/3/3';
  }
}

/*************************************
 * #content-listにデータを表示
 * 各作品が選択条件とあっているかのチェック(selectContent())は、演算がヘビー。
    Selectボタンを押した時OR初めてworksを開いたときにしかしたくないので、それ以外のとき(windowを開いたとき)にはsessionStorageを活用。
***************************************/

// // 表示するコンテンツ(Obj型)を格納したArray
var contentsObjArray;

// // フォーカス中のコンテンツ(Obj型)
var focusObj;

// 引数はArray型
// Arrayの要素は、表示するコンテンツに関するObject
function showContentList(contentsArray) {
  // 参考
  // https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON#%E3%83%92%E3%83%BC%E3%83%AD%E3%83%BC%E6%83%85%E5%A0%B1%E3%82%AB%E3%83%BC%E3%83%89%E3%81%AE%E4%BD%9C%E6%88%90

  let contentUl = document.getElementById('content-ul');

  // #content-ulの子要素(li)を全部削除
  // https://freefielder.jp/blog/2015/09/javascript-remove-childnodes.html
  while (contentUl.firstChild) {
    contentUl.removeChild(contentUl.firstChild);
  }

  for (let i = 0; i < contentsArray.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = contentsArray[i].title;
    listItem.setAttribute('id', contentsArray[i].id);
    contentUl.appendChild(listItem);
  }
}

// 画面をロードしたときにコンテンツリストを表示
function showContentListOnLoad() {
  let sessionJson = sessionStorage.getItem('contentsList');
  contentsObjArray = JSON.parse(sessionJson);
  showContentList(contentsObjArray);

  sessionFocusObj = sessionStorage.getItem('focusContent');
  focusObj = JSON.parse(sessionFocusObj);
  showFocusedContent(focusObj);

  scrollToFocus();
}

// リストのコンテンツがクリックされたら、フォーカスを移す
var contentsClicked = checkContentsClick();

function checkContentsClick() {
  var contents = document.getElementById('content-ul').children;
  for (let i = 0; i < contents.length; i++) {
    contents[i].addEventListener('click', () => {

      document.getElementsByClassName('focus')[0].classList.toggle('focus');

      var newFocusId = contents[i].getAttribute('id');
      for (let i = 0; i < contentsObjArray.length; i++) {
        if (contentsObjArray[i].id == newFocusId) {
          focusObj = contentsObjArray[i];
          break;
        }
      }
      sessionStorage.setItem('focusContent', JSON.stringify(focusObj));
      contents[i].classList.add('focus');
      showFocusedContent(focusObj);

      if (toggleView.checked == false) {
        toggleView.checked = true;
        arrangeContentBox();
      }
      scrollToFocus();
    });
  }
}

// フォーカス中のコンテンツの表示
function showFocusedContent(focused) {
  let focusedId = focused.id;

  let focusedElement = document.getElementById(focusedId);

  focusedElement.classList.add('focus');

  document.getElementById('content-title').innerHTML = focusObj.title;

  // 仮
  let showContentHeight = document.getElementById('content-display').clientHeight;
  let showContentWidth = document.getElementById('content-display').clientWidth;
  let conetntImage = document.getElementById('content-image');
  let conetntImageSize;

  if (showContentHeight < showContentWidth) {
    // 横長
    conetntImageSize = showContentHeight * 0.6;
    document.getElementById('content-explain').style.gridColumn = "span 1";
    document.getElementById('content-props').style.gridColumn = "span 1";

  } else {
    // 縦長
    conetntImageSize = showContentWidth * 0.6;
    document.getElementById('content-explain').style.gridColumn = "span 2";
    document.getElementById('content-props').style.gridColumn = "span 2";
  }

  conetntImage.style.height = `${conetntImageSize}px`;
  conetntImage.style.width = `${conetntImageSize}px`;

  // 仮の画像
  document.getElementById('content-image').innerHTML = `<img src=\"https://picsum.photos/${conetntImage.clientHeight}/${conetntImage.clientWidth}\">`;
}

// コンテンツリスト:
// フォーカスされているところまでスクロール
function scrollToFocus() {
  let focusedElement = document.getElementById(focusObj.id);
  focusedElement.scrollIntoView({ behavior: "smooth" });
}