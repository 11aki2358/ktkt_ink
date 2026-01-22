// works-01-grid

window.onload = setCheckLabel();
window.onload = setVhMax();
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
 * content display, contents listをいい感じに表示
 ***************************************/

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// スマホで開くと、アドレスバーがウザいから
function setVhMax(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

let toggleView = document.getElementById('select-hide');
let contentBox = document.getElementById('content-box');
let contentDisplay = document.getElementById('content-display');
let contentList = document.getElementById('content-list');

toggleView.addEventListener('change', function() {
  arrangeContentBox();
}, false);

window.onresize = function() {
  setVhMax();
  arrangeContentBox();
}

// content-displayが表示されている時
function arrangeContentBox() {
  if (toggleView.checked) {
    contentDisplay.style.display = "block";
    if (contentBox.clientHeight > contentBox.clientWidth) {
      contentDisplay.style.gridArea = '1/1/2/3';
      contentDisplay.style.margin = '0 0 0.5rem 0';
      contentList.style.gridArea = '2/1/3/3';
      return;
    } else {
      contentDisplay.style.gridArea = '1/1/3/2';
      contentList.style.gridArea = '1/2/3/3';
      contentDisplay.style.margin = '0 0.5rem 0 0';
      return;
    }
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

// リストのコンテンツがクリックされたら、フォーカスを移す
var contentsClicked = checkContentsClick();

function checkContentsClick() {
  var contents = document.getElementsByName('content-data');

  for (let i = 0; i < contents.length; i++) {
    contents[i].addEventListener("click", () => {
      focus.classList.remove('focus');

      if (toggleView.checked == false) {
        toggleView.checked = true;
        arrangeContentBox();
      }

      var contId = contents[i].dataset.id;
      idx = contentsIdArray.indexOf(contId);
      sessionStorage.setItem('focusContent', idx);
      focus = contents[i];
      showFocusedContent(contents[i]);
    }, false);
  }
}

// フォーカスしているコンテンツの表示
function showFocusedContent(focused) {
  focused.classList.add('focus');

  // 仮
  document.getElementById('content-display').innerHTML = focused.dataset.id;

  // let focusedChildren = focused.children;

  // let title = focusedChildren.item(0).innerHTML;
  // document.getElementById('content-display-title').innerHTML = title;

  // let comment = focusedChildren.item(1).innerHTML;
  // document.getElementById('content-display-comment').innerHTML = comment;

  // https://gray-code.com/javascript/load-image-with-javascript/
  // JavaScriptで画像ファイルを読み込む
  // 使えそう

  // https://gray-code.com/javascript/manipulating-html-with-javascript/
  // JSでhtml要素を追加する

  // https://gray-code.com/javascript/get-child-element-and-paranet-element-and-previous-element-and-next-element-of-specific-html-element/
  // 特定のHTML要素の子要素、親要素、前後の要素を取得するz

}