
// グローバル変数はglobalVarに入れる

let globalVar = {
  // フォーカス中のコンテンツ(Obj型)
  "glFocusObj": {},

  // 表示するコンテンツ(Obj型)を格納したArray
  "glContentsObjArray": [],
}

// イベントもグローバル変数
// undefinedでいいのか? 動いているからいいんじゃね
let globalEvent = {
  "contentClicked": undefined,
  "imageClicked": undefined,
  "keyDown": undefined,
  "modalLeftClick": undefined,
  "modalRightClick": undefined
}

window.onload = onLoadAction();

function onLoadAction() {
  setVhMax();
  document.getElementById('content-display').style.display = "none";

  //  from: 20260123
  document.getElementById('show-display').checked = false;
  //  to: 20260123

  if (sessionStorage.getItem('firstVisit-work') != '1') {
    // このセッションで初めてworksを訪れた場合は...
    selectContent();
    sessionStorage.setItem('firstVisit-work', '1');
  } else {
    // worksを訪れるのが初めてでない場合は
    setCheckLabel();
    showContentListOnLoad();
  }
}

// チェックボックスの入力状態を確認

function selectContent() {

  // チェックボックスの入力状態を収めたオブジェクト
  let selectData = getButtonData();
  // チェックボックスの入力状態をsessionStorageに保存
  const selectDataStr = JSON.stringify(selectData);
  sessionStorage.setItem('selectButtonData', selectDataStr);

  // jsonファイルから、コンテンツのリストを引っ張ってくる
  // ローカルの場合、LiveServer起動しないとエラーになる
  fetch('./works.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      // data : ファイルから読み取ったjson
      newFunction(selectData, data);
    })


}

// fetchしてきたjsonデータと、ボタンの入力状態の比較とか
function newFunction(selectData, contentListData) {

  let arrayRough;
  // roughについて(OR条件)
  if (Object.keys(selectData.rough).length == 0) {
    console.log('- rough');
    arrayRough = filterFalseData(contentListData, 'rough', selectData.rough);
  } else {
    console.log('rough');
    arrayRough = contentListData;
  }

  // yearについて抽出(OR条件)
  let arrayYear = filterSingle(arrayRough, 'year', selectData.year);

  // genreについて抽出(OR条件)
  let arrayGenre = filterMulti(arrayYear, 'genre', selectData.genre);

  let genreJson = JSON.stringify(arrayGenre);
  sessionStorage.setItem('contentsList', genreJson);

  globalVar.glContentsObjArray = Array.from(arrayGenre);
  showContentList(arrayGenre);

  Object.assign(globalVar.glFocusObj, arrayGenre[0]);
  showFocusedContent(arrayGenre[0]);

  // フォーカスが当たっているデータのオブジェクト
  sessionStorage.setItem('focusContent', JSON.stringify(arrayGenre[0]));
  globalEvent.contentClicked = checkContentsClick(globalVar.glContentsObjArray);
}

/*************************************
 * content display, contents listをいい感じに表示
 ***************************************/

document.getElementById('show-display').addEventListener('change', function () {
  arrangeContentBox(globalVar.glFocusObj);
  scrollToFocus(globalVar.glFocusObj);
}, false);

window.onresize = function () {
  setVhMax();
  arrangeContentBox(globalVar.glFocusObj);
  scrollToFocus(globalVar.glFocusObj);
}

// content-displayが表示されている時・いないとき
function arrangeContentBox(focusObj) {
  let fcsObj = focusObj;
  let contentDisplay = document.getElementById('content-display');
  let contentList = document.getElementById('content-list');
  if (document.getElementById('show-display').checked) {
    let contentBox = document.getElementById('content-box');
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
    showFocusedContent(fcsObj);
  } else {
    contentDisplay.style.display = "none";
    contentList.style.gridArea = '1/1/3/3';
  }
}

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
    listItem.textContent = contentsArray[i].info.title;
    listItem.setAttribute('id', contentsArray[i].info.id);
    contentUl.appendChild(listItem);
  }
}

// 画面をロードしたときにコンテンツリストを表示
function showContentListOnLoad() {
  let sessionJson = sessionStorage.getItem('contentsList');
  globalVar.glContentsObjArray = JSON.parse(sessionJson);
  showContentList(globalVar.glContentsObjArray);

  sessionFocusObj = sessionStorage.getItem('focusContent');
  globalVar.glFocusObj = JSON.parse(sessionFocusObj);
  showFocusedContent(globalVar.glFocusObj);

  scrollToFocus(globalVar.glFocusObj);
}

// リストのコンテンツがクリックされたら、フォーカスを移す
globalEvent.contentClicked = checkContentsClick(globalVar.glContentsObjArray);

function checkContentsClick(contentsArray) {
  var contents = document.getElementById('content-ul').children;
  for (let i = 0; i < contents.length; i++) {
    let ctnArray = Array.from(contentsArray);
    contents[i].addEventListener('click', () => {
      let newFocusId = contents[i].getAttribute('id');
      let newFocusNum = ctnArray.findIndex(obj => obj.info.id == newFocusId);
      moveFocus(newFocusNum, ctnArray);
    });
  }
}

// contentsArrayのfocusNum番目にフォーカスを移す
function moveFocus(focusNum, contentsArray) {
  Object.assign(globalVar.glFocusObj, contentsArray[focusNum]);
  document.getElementsByClassName('focus')[0].classList.remove('focus');
  sessionStorage.setItem('focusContent', JSON.stringify(globalVar.glFocusObj));
  document.getElementById(globalVar.glFocusObj.info.id).classList.add('focus');
  showFocusedContent(globalVar.glFocusObj);
  let showDisplay = document.getElementById('show-display');
  if (showDisplay.checked == false) {
    showDisplay.checked = true;
    arrangeContentBox(globalVar.glFocusObj);
  }
  scrollToFocus(globalVar.glFocusObj);
}

// フォーカス中のコンテンツの表示
function showFocusedContent(focusObj) {

  // フォーカス中のオブジェクト
  let fcsObj = focusObj;

  // フォーカス中のhtml要素
  let focusedElement = document.getElementById(fcsObj.info.id);
  focusedElement.classList.add('focus');

  // タイトルの表示
  showFocusedTitle(fcsObj);
  // 画像の表示
  showFocusedImage(fcsObj);
  // コメントの表示
  showFocusedComment(fcsObj);

  // モーダルで開くか? ウィンドウを切り替えるか?
  let conetntImg = document.getElementById('content-img');
  conetntImg.classList.toggle('modal', (fcsObj.info.modal == true));
  if (conetntImg.classList.value === 'modal') {
    // #img-label(の中の#content-img)が、#show-modalのラヴェルになる
    document.getElementById('img-label').htmlFor = 'show-modal';
  } else {
    document.getElementById('img-label').htmlFor = undefined;
  }
}

// サムネがクリックされたら、モーダルor新しいページを開く
globalEvent.imageClicked = openWindow(globalVar.glFocusObj);

function openWindow(focusObj) {
  let fcsObj = focusObj;
  let conetntImg = document.getElementById('content-img');
  conetntImg.addEventListener('click', () => {
    if (conetntImg.classList.value === 'modal') {
      showModal(fcsObj);
    } else {
      window.location.href = `work-${fcsObj.info.id}.html`;
    }
  }, false);
}

// モーダルウィンドウを開く・閉じる
function showModal(focusObj) {
  let fcsObj = focusObj;
  let modalComment = document.getElementById('modal-comment');
  let modalImg = document.getElementById('modal-img');

  //  モーダルで画像(img id="modal-img" )を表示
  if (fcsObj.info.modal == true) {
    modalComment.style.display = 'none';
    modalImg.src = `./images/work-${fcsObj.info.id}.png`;
    modalImg.style.display = 'inline-block';

    //  loading
    modalImg.addEventListener('load', (e)=>{
      document.getElementById("loader").style.display='none';
    } );


  } else {
    modalComment.style.display = 'inline-block';
    document.getElementById('modal-title').innerHTML = fcsObj.info.title;
    let txt = '';
    txt = document.getElementById('content-comment').innerHTML;
    document.getElementById('modal-explain').innerHTML = txt;
    document.getElementById('modal-link').href = `work-${fcsObj.info.id}.html`;
    modalImg.style.display = 'none';
  }
}

// 矢印キーでフォーカスを移動など
globalEvent.keyDown = keyEvents(globalVar.glFocusObj);

function keyEvents(focusObj) {
  // 本当はglobalVar.glContentsObjArrayも引数として渡したいが、うまく扱えない。
  // 今回は読み取り専用だから、直にアクセスしても良いだろう...
  document.addEventListener('keydown', (e) => {
    let fcsObj = focusObj;
    let showDisplay = document.getElementById('show-display');
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        moveFocusPrev(fcsObj);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        moveFocusNext(fcsObj);
        break;
      case 'Enter':
        if (showDisplay.checked == false) {
          // select contentsが開いていたら : コンテンツディスプレイを開いて終わり。
          showDisplay.checked = true;
          arrangeContentBox(fcsObj);
          break;
        }
        if (document.getElementById('show-modal').checked == true) {
          // モーダルが開いていたら : 閉じて終わり
          document.getElementById('show-modal').checked = false;
          break;
        }
        if (document.getElementById('content-img').classList.value === 'modal') {
          // モーダルが閉じていたら : 開いて終わり
          document.getElementById('show-modal').checked = true;
          showModal(fcsObj);
          break;
        }
        break;
      case 'Escape':
        if (document.getElementById('show-modal').checked == true) {
          // モーダルが開いていたら : 閉じて終わり
          document.getElementById('show-modal').checked = false;
          break;
        }
        break;
      case '[':
        // #content-displayが開いていたら : 閉じる。#select-contentsを開く
        if (showDisplay.checked == true) {
          showDisplay.checked = false;
          arrangeContentBox(fcsObj);
        }
        break;
      case ']':
        // #content-displayが閉じていたら : 開く。#select-contentsを閉じる
        if (showDisplay.checked == false) {
          showDisplay.checked = true;
          arrangeContentBox(fcsObj);
        }
        break;
      default:
    }
  }, false);
}

globalEvent.modalLeftClick = modalLeftClicked(globalVar.glFocusObj);

function modalLeftClicked(focusObj) {
  document.getElementById('modal-left').addEventListener('click', () => {
    let fcsObj = focusObj;
    moveFocusPrev(fcsObj);
  }, false);
}

globalEvent.modalRightClick = modalRightClicked(globalVar.glFocusObj);

function modalRightClicked(focusObj) {
  document.getElementById('modal-right').addEventListener('click', () => {
    let fcsObj = focusObj;
    moveFocusNext(fcsObj);
  }, false);
}

// フォーカスを1個戻す
function moveFocusPrev(focusObj) {
  let fcsObj = focusObj;
  if ((fcsObj.info.id != globalVar.glContentsObjArray[0].info.id)) {
    let newFocusNum = globalVar.glContentsObjArray.findIndex(obj => obj.info.id == fcsObj.info.id) - 1;
    moveFocus(newFocusNum, globalVar.glContentsObjArray);
    if (document.getElementById('show-modal').checked) {
      showModal(globalVar.glFocusObj);
    }
  }
}

// フォーカスを1個進める
function moveFocusNext(focusObj) {
  let fcsObj = focusObj;
  let n = globalVar.glContentsObjArray.length;
  if ((fcsObj.info.id != globalVar.glContentsObjArray[n - 1].info.id)) {
    let newFocusNum = globalVar.glContentsObjArray.findIndex(obj => obj.info.id == fcsObj.info.id) + 1;
    moveFocus(newFocusNum, globalVar.glContentsObjArray);
    if (document.getElementById('show-modal').checked) {
      showModal(globalVar.glFocusObj);
    }
  }
}

// コンテンツリスト:
// フォーカスされているところまでスクロール
function scrollToFocus(focusObj) {
  let fcsObj = focusObj;
  let focusedElement = document.getElementById(fcsObj.info.id);
  focusedElement.scrollIntoView({ behavior: "smooth" });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// サブ的な関数
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function setVhMax() {
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  // スマホで開くと、アドレスバーがウザいから
  // スマホのアドレスバー問題は、jsで解決するしかないみたい。
  const vh = window.innerHeight * 0.01;

  // なぜか上手く機能しない
  // とりあえず、CSSでhtml, bodyに
  // overflow: hidden;
  // 指定して対応している
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

///// selectContent() /////
function createInitProp() {
  let prop = {
    genre: [],
    year: [],
    rough: [],
  };
  return prop;
}

// 選択ボタンから、選択状況に関する構造体selectDataを作る
function getButtonData() {
  var buttonData = createInitProp();

  getDataFromCheck('select-rough', buttonData.rough);
  getDataFromCheck('select-genre', buttonData.genre);
  getDataFromCheck('select-year', buttonData.year);

  return buttonData;
}

// name属性がbNameなボタンのデータとチェック状況を、オブジェクトobjcに入れる
function getDataFromCheck(bName, array) {
  var area = document.getElementsByName(bName);
  for (let i = 0; i < area.length; i++) {
    if (area[i].checked) {
      array.push(area[i].value);
    }
  }
}

// 以下、ボタンの選択状況と各コンテンツの比較(フィルター)

// 属性txtがfalseなコンテンツだけ残す
function filterFalseData(fromArray, txt) {
  let toArray = fromArray.filter(value => {
    if (value[txt] == false) {
      return true;
    }
  });
  return toArray;
}

// yearとか、各コンテンツに1種類しかないものについて探索
function filterSingle(fromArray, txt, arrayB) {
  let toArray = fromArray.filter(value => {
    let n = arrayB.length;
    for (let i = 0; i < n; i++) {
      if (value[txt] == arrayB[i]) {
        return true;
      }
    }
  });
  return toArray;
}

// genreとか、各コンテンツに複数種類が登録されうるものについて探索
function filterMulti(fromArray, txt, arrayB) {
  let toArray = fromArray.filter(value => {
    let m = value[txt].length;
    let n = arrayB.length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (value[txt][i] == arrayB[j]) {
          return true;
        }
      }
    }
  });
  return toArray;
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
  setCheck('rough', selectData.rough);
}

function setCheck(txt, array) {
  // 全部のチェックをfalseに
  var sButton = document.querySelectorAll(`input[name="select-${txt}"]`);
  for (let i = 0; i < sButton.length; i++) {
    sButton[i].checked = false;
  }
  // 適宜、チェックを入れる
  let n = array.length;
  for (let i = 0; i < n; i++) {
    document.getElementById(array[i]).checked = true;
  }
}

function setCheckYear(txt, array) {
  // 全部のチェックをfalseに
  var sButton = document.querySelectorAll(`input[name="select-${txt}"]`);
  for (let i = 0; i < sButton.length; i++) {
    sButton[i].checked = false;
  }
  // 適宜、チェックを入れる
  let n = array.length;
  for (let i = 0; i < n; i++) {
    document.getElementById(`y${array[i]}`).checked = true;
  }
}

///// showFocusedContent()  /////
// フォーカス中のコンテンツのタイトルを表示
function showFocusedTitle(focusObj) {
  let fcsObj = focusObj;
  document.getElementById('content-title').innerHTML = fcsObj.info.title;
}

// サムネを表示
function showFocusedImage(focusObj) {
  let fcsObj = focusObj;
  let showContentHeight = document.getElementById('content-display').clientHeight;
  let showContentWidth = document.getElementById('content-display').clientWidth;
  let conetntImage = document.getElementById('content-image');
  let conetntImageSize;
  let gridColumnTxt;

  if (showContentHeight * 1.2 < showContentWidth) {
    conetntImageSize = showContentHeight * 0.6;
    gridColumnTxt = "span 1";
  } else {
    conetntImageSize = Math.min(showContentHeight * 0.55, showContentWidth)
    gridColumnTxt = "span 2";
  }

  conetntImage.style.gridColumn = gridColumnTxt;
  document.getElementById('content-comment').style.gridColumn = gridColumnTxt;

  conetntImage.style.height = `${conetntImageSize}px`;
  conetntImage.style.width = `${conetntImageSize}px`;

  // サムネ画像
  document.getElementById('content-img').src = `./images/work-${fcsObj.info.id}-thumb.png`;
}

// フォーカス中のコンテンツのコメントを表示
function showFocusedComment(focusObj) {
  let fcsObj = focusObj;
  let focusedComment = '';

  let genres = addCommentInfoMulti(fcsObj, 'genre', 'comment-genre');
  let year = addCommentInfoSingle(fcsObj, 'year', 'comment-year');

  //  20260123  
  let modal = addCommentInfoBool(fcsObj.info, 'modal', 'comment-modal', 'Modal', 'Full-Page');
  if (fcsObj.warn != '') {
    let warns = addCommentInfoMulti(fcsObj, 'warn', 'comment-warn');
    focusedComment = `${genres} / ${warns}<br>${fcsObj.info.comment}<br>${year}`;
  } else {
    focusedComment = `${genres}<br>${fcsObj.info.comment}<br>${year}`;
  }

  //  リンクの表示の仕方が汚い。modalのときとうまく両立したい
  if(document.getElementById('show-modal').checked == false) {
    if (fcsObj.info.modal == false) {
      focusedComment += `<br><a href="work-${fcsObj.info.id}.html" id="comment-link">Visit Page→</a>`;
    }
  }
  //focusedComment = `${genres} / ${modal}<br>${fcsObj.info.comment}<br>${year}`;
  //  20260123

  document.getElementById('content-comment').innerHTML = focusedComment;
}

// genreとか、複数あるものについて
function addCommentInfoMulti(focusObj, key, className) {
  let fcsObj = focusObj;
  let resultText = '';
  let addedElem;
  let noHyphen;
  let n = fcsObj[key].length;
  for (let i = 0; i < n; i++) {
    noHyphen = fcsObj[key][i].replace(/-/g, ' ');
    addedElem = `<span class="${className}">${noHyphen}</span> `;
    resultText += addedElem;
  }
  return resultText;
}

// yearとか、ひとつしかないものについて
function addCommentInfoSingle(focusObj, key, className) {
  let fcsObj = focusObj;
  let resultText = `<span class="${className}">${fcsObj[key]}</span>`;
  return resultText;
}

// modalか否かなど、true/falseで内容が変わるものについて
function addCommentInfoBool(focusObj, key, className, tTxt, fTxt) {
  let fcsObj = focusObj;
  let txt = '';
  if (fcsObj[key] == true) {
    txt = tTxt;
  } else {
    txt = fTxt;
  }
  let resultText = `<span class="${className}">${txt}</span>`;
  return resultText;
}
