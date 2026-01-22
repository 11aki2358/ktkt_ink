// works-09

window.onload = onLoadAction();

async function onLoadAction() {
  let contentDisplay = document.getElementById('content-display');

  // 表示するコンテンツ(Obj型)を格納したArray
  var contentsObjArray = [];

  // フォーカス中のコンテンツ(Obj型)
  var focusObj;

  setVhMax();
  contentDisplay.style.display = "none";

  if (sessionStorage.getItem('firstVisit') != '1') {
    // このセッションで初めてworksを訪れた場合は...

    // selectContent()の実行に時間がかかるから、あとのコードの結果の方が先に出てきちゃう
    // 同期処理アホみたいに面倒...
    contentsObjArray = await selectContent();
    focusObj = contentsObjArray[0];
    sessionStorage.setItem('firstVisit', '1');
  } else {
    // worksを訪れるのが初めてでない場合は
    setCheckLabel();
    let o = showContentListOnLoad();
    contentsObjArray = o.array;
    focusObj = o.focused;
  }

  document.getElementById('button-select').addEventListener('click', async() => {
    contentsObjArray = await selectContent();
    focusObj = contentsObjArray[0];

    let events1 = someEvents(focusObj);

    focusObj = await tcv(contentsObjArray);

  }, false);

  // コンテンツがクリックされるまで
  let events2 = someEvents(focusObj);

  // リストがクリックされてから
  focusObj = await tcv(contentsObjArray);
}

// focusObjの値を変えないイベントたち
// focusobjの値を変えるイベントの末尾に記述(TCVなど)
async function someEvents(focused) {
  console.log('>> someEvents()');
  console.dir(focused);
  return new Promise(function(resolve, reject) {

    let selectHideToggle = selectHideChange(focused);
    let imageClicked = openWindow(focused);

    // キー操作 : 改良必須!!!!!!!!!!!!!!!!!!!!!!!!
    let keyDown = keyEvents(focused);

    window.onresize = function() {
      setVhMax();
      arrangeContentBox(focused);
      scrollToFocus(focused);
    }
    console.log('<< someEvents()');
    resolve('');
  });
}

// selectContent
async function selectContent() {
  console.log('from : selectContent()');

  return new Promise(function(resolve, reject) {

    // チェックボックスの入力状態を収めたオブジェクト
    let selectData = getButtonData();
    // チェックボックスの入力状態をsessionStorageに保存
    const selectDataStr = JSON.stringify(selectData);
    sessionStorage.setItem('selectButtonData', selectDataStr);

    // jsonファイルから、コンテンツのリストを引っ張ってくる
    // ローカルの場合、LiveServer起動しないとエラーになる
    fetch('./works-09.json')
      .then(response => {
        return response.json();
      })
      .then(contentListData => {
        // data : ファイルから読み取ったjson
        // warnについて抽出
        let arrayWarn;
        if (Object.keys(selectData.warn).length == 0) {
          arrayWarn = filterNoData(contentListData, 'warn');
        } else {
          arrayWarn = filterMulti(contentListData, 'warn', selectData.warn);
        };

        // yearについて抽出(OR条件)
        let arrayYear = filterSingle(arrayWarn, 'year', selectData.year);
        // genreについて抽出(OR条件)
        let arrayGenre = filterMulti(arrayYear, 'genre', selectData.genre);

        let genreJson = JSON.stringify(arrayGenre);
        sessionStorage.setItem('contentsList', genreJson);

        showContentList(arrayGenre);
        showFocusedContent(arrayGenre[0]);

        // フォーカスが当たっているデータのオブジェクト
        sessionStorage.setItem('focusContent', JSON.stringify(arrayGenre[0]));
        console.log('to   : selectContent()');
        resolve(arrayGenre);
      });
  });
}

function createInitProp() {
  let prop = {
    genre: [],
    year: [],
    warn: [],
  };
  return prop;
}

// 選択ボタンから、選択状況に関する構造体selectDataを作る
function getButtonData() {
  var buttonData = createInitProp();

  getDataFromCheck('select-genre', buttonData.genre);
  getDataFromCheck('select-year', buttonData.year);
  getDataFromCheck('select-warn', buttonData.warn);

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

// 属性txtのあるコンテンツは全部弾く
function filterNoData(fromArray, txt) {
  let toArray = fromArray.filter(value => {
    if (value[txt] == '') {
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

// genreとかwarnとか、各コンテンツに複数種類が登録されうるものについて探索
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
  console.log('from : setCheckLabel()');

  const selectDataStr = sessionStorage.getItem('selectButtonData');
  const selectData = JSON.parse(selectDataStr);

  setCheck('genre', selectData.genre);
  setCheckYear('year', selectData.year);
  setCheck('warn', selectData.warn);
  console.log('to   : setCheckLabel()');
}

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

// content-displayが表示されている時・いないとき
function arrangeContentBox(focused) {
  let fcsObj = focused;
  console.dir(fcsObj);
  let contentList = document.getElementById('content-list');
  let contentDisplay = document.getElementById('content-display');
  let selectHide = document.getElementById('select-hide');
  if (selectHide.checked == true) {
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

// #select-hideが切り替わったとき
function selectHideChange(focused) {
  fcsObj = focused;
  document.getElementById('select-hide').addEventListener('change', () => {
    arrangeContentBox(fcsObj);
    scrollToFocus(fcsObj);
  }, false);
}

/*************************************
 * #content-listにデータを表示
 * 各作品が選択条件とあっているかのチェック(selectContent())は、演算がヘビー。
    Selectボタンを押した時OR初めてworksを開いたときにしかしたくないので、それ以外のとき(windowを開いたとき)にはsessionStorageを活用。
***************************************/

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
  console.log('from : showContentListOnLoad()');

  let sessionJson = sessionStorage.getItem('contentsList');
  let cArray = JSON.parse(sessionJson);
  showContentList(cArray);

  sessionFocus = sessionStorage.getItem('focusContent');
  let fcsObj = JSON.parse(sessionFocus);
  showFocusedContent(fcsObj);

  scrollToFocus(fcsObj);
  console.log('to   : showContentListOnLoad()');

  return { "focused": fcsObj, "array": cArray };
}


// リストをクリックしたとき、フォーカスをずらす
async function tcv(contentsArray) {
  return new Promise(function(resolve, reject) {
    let contents = document.getElementById('content-ul').children;
    for (let i = 0; i < contents.length; i++) {
      contents[i].addEventListener('click', async() => {

        console.log('list clicked');

        let contentUl = contents[i];
        let fcsObj;

        // document.getElementsByClassName('focus')[0].classList.toggle('focus');

        var newFocusId = contentUl.getAttribute('id');
        for (let i = 0; i < contentsArray.length; i++) {
          if (contentsArray[i].info.id == newFocusId) {
            fcsObj = contentsArray[i];
            break;
          }
        }
        sessionStorage.setItem('focusContent', JSON.stringify(fcsObj));
        contentUl.classList.add('focus');
        showFocusedContent(fcsObj);

        let selectHideElem = document.getElementById('select-hide');
        if (selectHideElem.checked == false) {
          selectHideElem.checked = true;
          arrangeContentBox(fcsObj);
        }
        scrollToFocus(fcsObj);
        document.getElementById('select-hide').checked = true;


        ///////////////////////////////////////////////////////////////////////////
        // someEvents(fcsObj);
        await someEvents(fcsObj);
        ///////////////////////////////////////////////////////////////////////////

        console.dir(fcsObj);
        resolve(fcsObj);
      }, false);
    }
  });
}

// フォーカス中のコンテンツの表示
function showFocusedContent(focusedObj) {

  // フォーカス中のオブジェクト
  let fcsObj = focusedObj;

  while (document.getElementsByClassName('focus')[0] != null) {
    document.getElementsByClassName('focus')[0].classList.remove('focus');
  }

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
    document.getElementById('img-label').htmlFor = 'show-modal';
  } else {
    document.getElementById('img-label').htmlFor = undefined;
  }
}

function openWindow(focused) {
  let fcsObj = focused;

  let conetntImg = document.getElementById('content-img');
  conetntImg.addEventListener('click', () => {
    console.dir(fcsObj);

    if (conetntImg.classList.value === 'modal') {
      console.log('modal');
      showModal(fcsObj);
    } else {
      console.log('open window');
    }
  }, false);
}

// フォーカス中のコンテンツのタイトルを表示
function showFocusedTitle(focused) {
  document.getElementById('content-title').innerHTML = focused.info.title;
}

// フォーカス中のコンテンツのコメントを表示
function showFocusedComment(focused) {
  let fcsObj = focused;
  let focusedComment = '';

  let genres = addCommentInfoMulti(fcsObj, 'genre', 'comment-genre');
  let year = addCommentInfoSingle(fcsObj, 'year', 'comment-year');

  if (fcsObj.warn != '') {
    let warns = addCommentInfoMulti(fcsObj, 'warn', 'comment-warn');
    focusedComment = `${genres} / ${warns}<br>${fcsObj.info.comment}<br>${year}`;
  } else {
    focusedComment = `${genres}<br>${fcsObj.info.comment}<br>${year}`;
  }

  document.getElementById('content-comment').innerHTML = focusedComment;
}

// genreとかwarnとか、複数あるものについて
function addCommentInfoMulti(focused, txt, className) {
  let fcsObj = focused;
  let resultText = '';
  let addedElem;
  let noHyphen;
  let n = fcsObj[txt].length;
  for (let i = 0; i < n; i++) {
    noHyphen = fcsObj[txt][i].replace(/-/g, ' ');
    addedElem = `<span class="${className}">${noHyphen}</span> `;
    resultText += addedElem;
  }
  return resultText;
}

// yearとか、ひとつしかないものについて
function addCommentInfoSingle(focused, txt, className) {
  let fcsObj = focused;
  let resultText = `<span class="${className}">${fcsObj[txt]}</span>`;
  return resultText;
}

// モーダルウィンドウを開く・閉じる
function showModal(focused) {
  let fcsObj = focused;
  document.getElementById('modal-img').src = `../images/${fcsObj.info.id}.png`;
}


// 矢印キーでフォーカスを移動
function keyEvents(focused) {
  document.addEventListener('keydown', (e) => {
    let fcsObj = focused;
    switch (e.key) {
      // case 'ArrowUp':
      // case 'ArrowLeft':
      //   // フォーカスを戻す
      //   ///////// fcsObjの値を変える!!! ///////////
      //   if ((focusObj != contentsObjArray[0]) && (document.getElementById('show-modal').checked == false)) {
      //     document.getElementsByClassName('focus')[0].classList.toggle('focus');
      //     let focusNum = contentsObjArray.indexOf(focusObj) - 1;
      //     focusObj = contentsObjArray[focusNum];
      //     showFocusedContent(focusObj);
      //   }
      //   break;
      // case 'ArrowDown':
      // case 'ArrowRight':
      //   // フォーカスを進める
      //   ///////// fcsObjの値を変える!!! ///////////
      //   let n = contentsObjArray.length;
      //   if ((focusObj != contentsObjArray[n - 1]) && (document.getElementById('show-modal').checked == false)) {
      //     document.getElementsByClassName('focus')[0].classList.toggle('focus');
      //     let focusNum = contentsObjArray.indexOf(focusObj) + 1;
      //     focusObj = contentsObjArray[focusNum];
      //     showFocusedContent(focusObj);
      //   }
      //   break;
      case 'Enter':
        if (document.getElementById('select-hide').checked == false) {
          // select contentsが開いていたら : コンテンツディスプレイを開いて終わり。
          console.log('open #content-display');
          document.getElementById('select-hide').checked = true;
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
        console.log('[');
        // #content-displayが開いていたら : 閉じる。#select-contentsを開く
        if (document.getElementById('select-hide').checked == true) {
          document.getElementById('select-hide').checked = false;
          arrangeContentBox(fcsObj);
        }
        break;
      case ']':
        console.log(']');
        // #content-displayが閉じていたら : 開く。#select-contentsを閉じる
        if (document.getElementById('select-hide').checked == false) {
          document.getElementById('select-hide').checked = true;
          arrangeContentBox(fcsObj);
        }
        break;
      default:
    }
  }, false);
}

// サムネを表示
function showFocusedImage(focused) {
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

  document.getElementById('content-img').src = `../images/${focused.info.id}.png`;

}

// コンテンツリスト:
// フォーカスされているところまでスクロール
function scrollToFocus(focused) {
  let focusedElement = document.getElementById(focused.info.id);
  focusedElement.scrollIntoView({ behavior: "smooth" });
}