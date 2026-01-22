## 通常のWork

```js
{
    "genre": ["the-Struts"],  //  文字列の配列(タグ)
    "year": 2020,             //  数字
    "rough": false,           //  T/F
    "info": {
      "title": "Adam Slack",                      //  文字列
      "comment": "お誕生日イラスト<br>Adamoo",    //  文字列(html)
      "id": "a20200221-00",                       //  文字列 (画像ファイル名.png)
      "modal": true,                              //  T/F
      "editDate": 20200221,                       //  数字
      "postDate": 20200221                        //  数字
    }
  }
```


## シークレットなWork

```js
{
  "genre": ["Led-Zeppelin"],  //  文字列の配列(タグ)
  "year": 2022,               //  数字
  "warn": ["B", "C"],         //  文字列の配列
  "info": {
    "title": "#0007, 2022, B C, LZ, T",   //  文字列
    "comment": "コメント!",   //  文字列(html)
    "id": "b0007",            //  文字列 (画像ファイル名.png)
    "modal": true             //  T/F
  }
}
```

----

## 統合 & 追加

```js
{
    "genre": ["the-Struts"],  //  文字列の配列(タグ)
    "year": 2020,             //  数字
    "rough": false,           //  T/F
    "warn": ["B", "C"],         //  文字列の配列
    "info": {
      "title": "Adam Slack",                      //  文字列
      "comment": "お誕生日イラスト<br>Adamoo",    //  文字列(html)
      "id": "a20200221-00",                       //  文字列(画像ファイル名.png)
      "modal": true,                              //  T/F
      "editDate": 20200221,                       //  数字
      "postDate": 20200221,                       //  数字
      "SNS": ["twitter", "pixiv", "instagram", "tumblr"]  //  文字列の配列(タグ)
    }
  }
```