function selectContent() {

  // チェックボックスの入力状態を収めたオブジェクト
  let selectData = getButtonData();
  // チェックボックスの入力状態をsessionStorageに保存
  const selectDataStr = JSON.stringify(selectData);
  sessionStorage.setItem('selectButtonData', selectDataStr);

  // jsonファイルから、コンテンツのリストを引っ張ってくる
  // ローカルの場合、LiveServer起動しないとエラーになる
  fetch('./works-08.json')
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