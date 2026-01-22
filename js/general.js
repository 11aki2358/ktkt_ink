/*******************************************
  header.cssのために
********************************************/

/*
コンテンツメニューに貼られたリンク(class="nav-link")
がクリックされたら、チェックボックスを外す
*/
function navLinkClicked() {
  let lnk = document.getElementsByClassName("nav-link");
  for (i = 0; i < lnk.length; i++) {
    lnk[i].addEventListener("click", () => {
      document.querySelector(`input[type='checkbox'][id='nav-input'][class='nav-unshown']`).checked = false;
      backToTop.style.display = 'block';
    }, false);
  }
}
var navLinkChecked = navLinkClicked();


/****************************************************
  a リンク
  外部リンクを開く(target="_blank")ときに、自動でnoopenerとnoreferrerを付ける
*****************************************************/

function aTargetBlankRel() {
  const elements = document.getElementsByTagName('a');

  for (let element of elements) {
    let target = element.getAttribute('target');
    if (target === '_blank') {
      element.setAttribute('rel', 'noreferrer noopener');
    }
  }
}
var aBlankRel = aTargetBlankRel();


/****************************************************
  back to top ボタンを押すと、トップに戻れる
  https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
*****************************************************/

const backToTop = document.getElementById('back-to-top');

// トップに戻る
backToTop.onclick = function() {
  window.scrollTo(0, 0);
};

// コンテンツメニューが表示されていたら、back to topは非表示
// addEventListenerを上手く使えばいいんだろうけれど、上手くいかない
// ～～.checked==falseなのも気に入らない
function hideBackToTop() {
  var navOpen = document.getElementById('nav-open');
  var navClose = document.getElementById('nav-close')
  navOpen.onclick = function() {
    if (document.querySelector(`input[type='checkbox'][id='nav-input'][class='nav-unshown']`).checked == false) {
      backToTop.style.display = 'none';
    } else {
      backToTop.style.display = 'block';
    }
  }
  navClose.onclick = function() {
    if (document.querySelector(`input[type='checkbox'][id='nav-input'][class='nav-unshown']`).checked == false) {
      backToTop.style.display = 'none';
    } else {
      backToTop.style.display = 'block';
    }
  }
}
var hideBacktoTopButton = hideBackToTop();