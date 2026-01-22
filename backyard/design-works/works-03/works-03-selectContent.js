// works-03

function selectContent() {

  // チェックボックスの入力状態を収めたオブジェクト
  let selectData = getButtonData();
  // チェックボックスの入力状態をsessionStorageに保存
  const selectDataStr = JSON.stringify(selectData);
  sessionStorage.setItem('selectButtonData', selectDataStr);

  // jsonファイルから、コンテンツのリストを引っ張ってくる
  // ローカルの場合、LiveServer起動しないとエラーになる
  fetch('./works-03.json')
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

  // warnについて抽出
  let arrayWarn;
  if (Object.keys(selectData.warn).length == 0) {
    // warnの指定なし : wanr属性のあるコンテンツは全部弾く
    arrayWarn = contentListData.filter(value => {
      if (value.warn == '') {
        return true;
      }
    })
  } else {
    // warn属性(OR条件)
    arrayWarn = contentListData.filter(value => {
      for (let i = 0; i < Object.keys(selectData.warn).length; i++) {
        if ((value.warn).indexOf(Object.keys(selectData.warn)[i]) > -1) {
          return true;
        }
      }
    })
  };

  // yearについて抽出(OR条件)
  let arrayYear = arrayWarn.filter(value => {
    for (let i = 0; i < Object.keys(selectData.year).length; i++) {
      if (value.year == Object.keys(selectData.year)[i]) {
        return true;
      }
    }
  });

  // genreについて抽出(OR条件)
  let arrayGenre = arrayYear.filter(value => {
    for (let i = 0; i < Object.keys(selectData.genre).length; i++) {
      if ((value.genre).indexOf(Object.keys(selectData.genre)[i]) > -1) {
        return true;
      }
    }
  });

  // 抽出した結果を、JSONデータ(テキストデータ)に変換
  let genreJson = JSON.stringify(arrayGenre);

  // 抽出した結果を、sessionStorageに保存
  sessionStorage.setItem('contentsList', genreJson);

  contentsObjArray = arrayGenre;
  showContentList(arrayGenre);

  focusObj = arrayGenre[0];
  showFocusedContent(focusObj);

  // フォーカスが当たっているデータのオブジェクト
  sessionStorage.setItem('focusContent', JSON.stringify(focusObj));

  checkContentsClick();
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
  var selectVal = '';
  for (let i = 0; i < area.length; i++) {
    if (area[i].checked) {
      selectVal = area[i].value;
      objc[selectVal] = 1;
    }
  }
}