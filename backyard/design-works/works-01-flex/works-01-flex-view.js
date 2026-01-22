// works-01-flex

window.onload = setCheckLabel();
window.onload = arrangeListArea();
window.onload = showContentList();
/*************************************
 * チェックボックスのON/OFFを
  sessionStorage'selectButtonData'に保存された値に合わせる
***************************************/

function setCheckLabel() {
  // このセッションで初めてworksを訪れた場合は...
  if (sessionStorage.getItem('firstVisit') != '1') {
    selectContent();
    sessionStorage.setItem('firstVisit', '1');
    return;
  } else {

    // worksを訪れるのが初めてでない場合は
    const selectDataStr = sessionStorage.getItem('selectButtonData');
    const selectData = JSON.parse(selectDataStr);

    setCheck('genre', selectData.genre);
    setCheck('year', selectData.year);
    setCheck('warn', selectData.warn);
  }
}

// めっちゃ効率悪そう
function setCheck(txt, objc) {
  // 全部のチェックをfalseに
  var sButton = document.querySelectorAll(`input[name="select-${txt}"]`);
  for (let i = 0; i < sButton.length; i++) {
    sButton[i].checked = false;
  }
  // 適宜、チェックを入れる
  var sId;
  for (let i = 0; i < Object.keys(objc).length; i++) {
    sId = Object.keys(objc)[i];
    document.querySelector(`input[id="${sId}"]`).checked = true;
  }
}

/*************************************
 *  #content-displayと#content-listの
    表示非表示・大きさ
***************************************/

var toggleView = document.getElementById('select-hide');

toggleView.addEventListener('change', function() {
  if (toggleView.checked) {
    showDispArea();
  } else {
    hideDispArea();
  }
}, false);

function showDispArea() {
  var disp = document.getElementById('content-display');
  disp.style.display = "block";
  arrangeFlex();
}

function hideDispArea() {
  var disp = document.getElementById('content-display');
  disp.style.display = "none";
  arrangeListArea();
}

window.onresize = function() {
  if (toggleView.checked) {
    arrangeFlex();
  } else {
    arrangeListArea();
  }
}

// #contents-selectが閉じているときに、flexな#content-displayと#content-listをどう配置するか
// margin-bottom: 0.5rem; の長さを引いている
function arrangeFlex() {

  // #content-boxを置ける空間の広さ
  var areaHeight = getAreaHeight();
  var areaWidth = document.getElementsByTagName('main')[0].clientWidth;

  var contentBox = document.getElementById('content-box');
  var disp = document.getElementById('content-display');
  var list = document.getElementById('content-list');
  var rem05 = 0.5 * remToPx();

  if (areaHeight > areaWidth) {
    contentBox.style.flexDirection = 'column';

    disp.style.height = (areaHeight * 0.6 - rem05) + 'px';
    disp.style.width = '100%';
    list.style.height = (areaHeight * 0.4 - rem05) + 'px';
    list.style.width = '100%';
  } else {
    contentBox.style.flexDirection = 'row';
    disp.style.height = (areaHeight - rem05) + 'px';
    disp.style.width = (areaWidth * 0.6) + 'px';
    list.style.height = (areaHeight - rem05) + 'px';
    list.style.width = (areaWidth * 0.4) + 'px';
  }
}

// #contents-selectが開いているときの#content-listの高さ
// margin-bottom: 0.5remの長さを引いている
function arrangeListArea() {
  var areaHeight = getAreaHeight();
  var list = document.getElementById('content-list');
  var rem05 = 0.5 * remToPx();
  list.style.height = (areaHeight - rem05) + 'px';
}

// #content-boxを置ける空間の広さ
function getAreaHeight() {
  var height;
  var htmlHeight = document.getElementsByTagName('html')[0].clientHeight;
  var headerHeight = document.getElementsByTagName('header')[0].clientHeight;
  var selectHeight;
  selectHeight = document.getElementById('contents-select').clientHeight;
  var footerHeight = document.getElementsByTagName('footer')[0].clientHeight;
  height = htmlHeight - headerHeight - selectHeight - footerHeight;

  return height;
}

// 1remは何pxか
function remToPx() {
  var fontSize = getComputedStyle(document.documentElement).fontSize;
  return parseFloat(fontSize);
}

/*************************************
 * #content-listにデータを表示
 * 各作品が選択条件とあっているかのチェック(selectContent())は、演算がヘビー。
    Selectボタンを押した時OR初めてworksを開いたときにしかしたくないので、それ以外のとき(windowを開いたとき)にはsessionStorageを活用。
 ***************************************/
// sessionStorageに保存するの、idの配列じゃなくてhtml要素の配列にしたいのだがうまくいかない。
// idを元に、該当するhtml要素を見つけ出す。
// まどろっこしい
var contentsIdStr;
var contentsIdArray;
var focusNum;
var focus;

function showContentList() {

  // 配列contentsIdArray(表示したいコンテンツのidを格納した)を作る
  resetContentsIdArray();

  // https://into-the-program.com/javascript-get-element-custom-data-value/#data-3
  var selectedContent;
  var contId;
  focusNum = getFocusNum();
  for (let i = 0; i < contentsIdArray.length; i++) {
    contId = contentsIdArray[i];
    selectedContent = document.querySelector(`[data-id="${contId}"]`);
    selectedContent.style.display = 'block';

    if (i == focusNum) {
      focus = selectedContent;
      showFocusedContent(selectedContent);
    }
  }
}

// contentsIdArrayを、最新のに書きかえる
function resetContentsIdArray() {
  contentsIdStr = sessionStorage.getItem('contentsId');
  contentsIdArray = contentsIdStr.split(',');
}

// focusNum : フォーカス中のコンテンツのidは、contentsIdArrayの何番目に入っている?
function getFocusNum() {
  var num = sessionStorage.getItem('focusContent');
  return Number(num);
}

// フォーカスしているコンテンツの表示
function showFocusedContent(focused) {
  focused.classList.add('focus');

  document.getElementById('content-display').innerHTML = focused.dataset.id;

  // https://gray-code.com/javascript/load-image-with-javascript/
  // JavaScriptで画像ファイルを読み込む
  // 使えそう

  // https://gray-code.com/javascript/manipulating-html-with-javascript/
  // JSでhtml要素を追加する

  // https://gray-code.com/javascript/get-child-element-and-paranet-element-and-previous-element-and-next-element-of-specific-html-element/
  // 特定のHTML要素の子要素、親要素、前後の要素を取得する

}

// リストのコンテンツがクリックされたら、フォーカスを移す
var contentsClicked = checkContentsClick();

function checkContentsClick() {
  var contents = document.getElementsByName('content-data');

  for (let i = 0; i < contents.length; i++) {
    contents[i].addEventListener("click", () => {
      console.log('clicked');
      focus.classList.remove('focus');

      if (toggleView.checked == false) {
        toggleView.checked = true;
        showDispArea();
      }

      var contId = contents[i].dataset.id;
      idx = contentsIdArray.indexOf(contId);
      sessionStorage.setItem('focusContent', idx);
      focus = contents[i];
      showFocusedContent(contents[i]);
    }, false);
  }
}