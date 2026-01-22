// works-01-flex

/*****************************************
* チェックボックスからコンテンツの選択状況を読み取る
* 当てはまるコンテンツのidをsessionStorage'contentsId'に格納
  この操作はヘビーなので、
  * セッションで初めてworksページを訪れたとき
  * Selectボタンが押されたとき
  しか行わない。
  それ以外では、sessionStorage'contentsId'や'selectButtonData'を活用
******************************************/
function selectContent() {

  // チェックボタンの入力状態を収めたオブジェクト
  var selectData = getButtonData();
  // console.dir(selectData);
  // sessionStorageに保存
  const selectDataStr = JSON.stringify(selectData);
  sessionStorage.setItem('selectButtonData', selectDataStr);

  var contents = document.getElementsByName('content-data');

  var contentsArray = [].map.call(contents, (element) => {
    return element;
  })

  // warnについて抽出
  var arrayWarn;
  if (Object.keys(selectData.warn).length == 0) {
    // warnの指定なし : wanr属性のあるコンテンツは全部弾く
    arrayWarn = contentsArray.filter(value => {
      if (value.dataset.warn == '') {
        return true;
      } else {
        // 弾くコンテンツは非表示に
        value.style.display = 'none';
      }
    });
  } else {
    // warn属性(OR条件)
    arrayWarn = contentsArray.filter(value => {
      for (let i = 0; i < Object.keys(selectData.warn).length; i++) {
        if ((value.dataset.warn).indexOf(Object.keys(selectData.warn)[i]) > -1) {
          return true;
        } else {
          value.style.display = 'none';
        }
      }
    });
  }

  // yearについて抽出(OR条件)
  var arrayYear = arrayWarn.filter(value => {
    for (let i = 0; i < Object.keys(selectData.year).length; i++) {
      if (value.dataset.year == Object.keys(selectData.year)[i]) {
        return true;
      } else {
        value.style.display = 'none';
      }
    }
  });

  // genreについて抽出(OR条件)
  var arrayGenre = arrayYear.filter(value => {
    for (let i = 0; i < Object.keys(selectData.genre).length; i++) {
      if ((value.dataset.genre).indexOf(Object.keys(selectData.genre)[i]) > -1) {
        return true;
      } else {
        value.style.display = 'none';
      }
    }
  });

  var contentsIdArray = [arrayGenre.length];
  for (let i = 0; i < arrayGenre.length; i++) {
    arrayGenre[i].style.display = 'block';
    contentsIdArray[i] = arrayGenre[i].dataset.id;

    // focusの見た目を初期化
    arrayGenre[i].classList.remove('focus');
  }

  // 選択条件に一致したコンテンツのidを入れた配列contentsIdArray
  // を文字列contentsIdStrに変換
  // 'contentsId'という名前でsessionStorageに保存!
  // ウィンドウを移動しても
  // https://techacademy.jp/magazine/32870
  const contentsIdStr = contentsIdArray.join();
  sessionStorage.setItem('contentsId', contentsIdStr);

  // フォーカスが当たっているのは、'contentsId'の何番目か
  sessionStorage.setItem('focusContent', 0);

  showFocusedContent(arrayGenre[0]);

  resetContentsIdArray();
  focus = arrayGenre[0];

}

function createInitProp() {
  let prop = {
    genre: {},
    year: {},
    warn: {},
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
function getDataFromCheck(bName, objc) {
  var area = document.getElementsByName(bName);
  var selectId = '';
  for (let i = 0; i < area.length; i++) {
    if (area[i].checked) {
      selectId = area[i].id;
      objc[selectId] = 1;
    }
  }
}