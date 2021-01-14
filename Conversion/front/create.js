//ページ遷移時警告
window.addEventListener('beforeunload', function(e){ e.returnValue=''; }, false);

//サニタイジング処理
function enEsc(str){
  str = str.replace(/'/g, "&#39;");
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  return str;
}
function deEsc(str){
  str = str.replace(/&#39/g, "\'");
  str = str.replace(/&quot;/g, '\"');
  str = str.replace(/&lt;/g, "\<");
  str = str.replace(/&gt;/g, "\>");
  str = str.replace(/&amp;/g, "\&");
  str = str.replace(/&nbsp;/g," ");
  return str;
}

//改行タグ追加関数
function addBr(parents){
  var newBr = document.createElement('br');
  newBr.setAttribute('class', 'divbr');
  parents.appendChild(newBr);
}

//RGB>HEX変換関数
function toHexColor(c){
  c = c.replace(/[rgb(|)]/g, "");
  c = c.split(",");
  hex = "#" + toHex(c[0]) + toHex(c[1]) + toHex(c[2]);
  return hex;
}
//10>16進変換
const COLOR_DIGIT=2;
function toHex(n) {
  var x = Number(n).toString(16);
  return x.length == COLOR_DIGIT ? x : "0" + x;
}

//ラック詳細設定


//--------------------------------------------------------------------------------
//  ラック作成処理

//作成ボタン押下
document.getElementById('createRackBtn').onclick=function(){

  var newRackId=Math.floor(Math.random() * 1000000);    //乱数id生成
  var tmpary = new Array(10); //変換用配列（convary）に追加用配列
  tmpary[0] = newRackId;

  //タグ、初期値取得
  var moldSelectElm = document.getElementById('moldSelect')
  var moldValues = moldSelectElm.options[moldSelectElm.selectedIndex].value.split(", ");
  
  //ラベル作成
  var newLabel=document.createElement('label');
  newLabel.setAttribute('id', 'Lbl' + newRackId);
  newLabel.setAttribute('class', 'Lbl');
  newLabel.setAttribute('for', 'Rb' + newRackId);
  document.getElementById('cnvsView').appendChild(newLabel);
  
  //div作成
  var newDiv=document.createElement('div');
  newDiv.setAttribute('id', 'Div' + newRackId);
  newDiv.setAttribute('class', 'js-create-Rack');
  if(moldValues[0] == 'true'){
    newDiv.style.display = 'inline-block';
  }
  newLabel.appendChild(newDiv);

  //改行
  if(document.getElementById('brFlg').checked){
    addBr(newLabel);
  }

  //ラジオボタン作成
  var newRb = document.createElement('input');
  newRb.setAttribute('type', 'radio');
  newRb.setAttribute('id', 'Rb' + newRackId);
  newRb.setAttribute('name', 'racks_rb');
  newRb.setAttribute('class', 'enable-input');
  newRb.setAttribute('checked', 'checked');
  newRb.setAttribute('onchange', 'selectedRack(this)');
  newDiv.appendChild(newRb);                    //DIVにINPUTを追加
  
  //中身のタグ作成
  var newRackItem;
  newRackItem = document.createElement(moldValues[1]);

  if(moldValues[1]=="div"){
    tmpary[1] = 3;
    tmpary[2] = "";
    tmpary[3] = newRackId;
  }else if(moldValues[1]=="h1"){
    newRackItem.style.margin="0";
    tmpary[1] = 5;
    tmpary[2] = 1;
  }else if(moldValues[1]=="a"){
    newRackItem.href="http://abehiroshi.la.coocan.jp";
    tmpary[1] = 9;
    tmpary[2] = newRackItem.href;
  }else if(moldValues[1]=="li"){
    tmpary[1] = 13;
  }
  console.log(tmpary);  //test

  if(moldValues[1]=='a'){
    // newRackItem.href='http://abehiroshi.la.coocan.jp';
    newRackItem.setAttribute('target', '_blank');
  }

  newRackItem.setAttribute('id', 'Child' + newRackId);
  newRb.value = 'Child' + newRackId;

  //テキスト設定
  var rackItemElm = document.getElementById('newRackTxtbox');     //指定されたテキストを取得
  if(rackItemElm.value){
    newRackItem.innerHTML = enEsc(rackItemElm.value);    //中身の本文を設定
    tmpary[5] = rackItemElm.value;
    rackItemElm.value = '';           //テキストボックスをクリア
  }else{
    newRackItem.innerHTML = 'null:' + newRackId;               //なければIDを表示
    tmpary[5] = "null:"+newRackId;
  }

  newRackItem.style.color = '#000000';
  newRackItem.style.fontSize = moldValues[2] + 'px';
  newRackItem.style.margin = '0px';
  newRackItem.style.padding = '0px';
  newRackItem.style.border = 'solid 0px #000000';

  newDiv.appendChild(newRackItem);                        //DIVにDIVを追加

  document.getElementById('brFlg').checked = false;   //改行フラグのチェックを解除
  
  selectedRack(newRb);                    //追加された要素を選択済みにする

  convary.push(tmpary);

  // データ送信  
  $.ajax({
    // POST通信
    type: 'POST',
    data: {"ary" : convary},
    // ここでデータの送信先URLを指定します。
    url: './../template/Conversion.php',
  }).done(function(response) {
    $('#code').html(response);
  });
}
//  ラック作成処理
//--------------------------------------------------------------------------------
//  ラック編集処理

//変数宣言
const convary = new Array();  //変換用配列
var selectedRb;
var selectedRackItemElm;
var rackParentDivElm;
var rackParentLabelElm;
var editTxtboxElm = document.getElementById('editTxtbox');
var editTxtColorElm = document.getElementById('editTxtColor');
var editTxtSizeTxtboxElm = document.getElementById('editTxtsizeTxtbox');
var editTxtMarginTxtboxElm = document.getElementById('editTxtMarginTxtbox');
var editTxtBgcolorElm = document.getElementById('editTxtBgcolor');
var editTxtPaddingTxtboxElm = document.getElementById('editTxtPaddingTxtbox');
var editTxtBorderTxtboxElm = document.getElementById('editTxtBorderTxtbox');
var editBorderColorElm = document.getElementById('editBorderColor');

var brElm;
var editBrFlgElm;

//ラック選択時
function selectedRack(e){
  selectedRb = e;
  selectedRackItemElm = document.getElementById(selectedRb.value);
  editTxtboxElm.value = deEsc(selectedRackItemElm.innerHTML);
  editTxtColorElm.value = toHexColor(selectedRackItemElm.style.color);
  editTxtBgcolorElm.value = toHexColor(selectedRackItemElm.style.backgroundColor);
  var states=selectedRackItemElm.style.border.split(' ');
  editBorderColorElm.value = toHexColor(states[2]+states[3]+states[4]);
  rackParentDivlElm = selectedRb.parentNode;           //選択されたアイテムの親Divを取得
  rackParentLabelElm = rackParentDivlElm.parentNode;   //選択されたアイテムのLabelを取得

  brElm = document.querySelector('#' + rackParentLabelElm.id + ' > .divbr');
  editBrFlgElm = document.getElementById('editBrFlg');
  if(brElm == null){
    editBrFlgElm.checked = '';
  }else{
    editBrFlgElm.checked = 'true';
  }

  editTxtSizeTxtboxElm.value = Number(selectedRackItemElm.style.fontSize.replace("px", ""));
  editTxtMarginTxtboxElm.value = Number(selectedRackItemElm.style.margin.replace("px", ""));
  editTxtPaddingTxtboxElm.value = Number(selectedRackItemElm.style.padding.replace("px", ""));
  editTxtBorderTxtboxElm.value = Number(states[0].replace("px", ""));
}

function selectedRackBrCb(e){
  if(e.checked == true){
    addBr(rackParentLabelElm);
  }else{
    brElm = document.querySelector('#' + rackParentLabelElm.id + ' > .divbr');
    brElm.remove();
  }
}

//テキスト
editTxtboxElm.addEventListener('input', ()=>{
  if(selectedRackItemElm != null){
    selectedRackItemElm.innerHTML = enEsc(editTxtboxElm.value);
  }
  if(selectedRackItemElm.innerHTML == ""){
    selectedRackItemElm.innerHTML = "&nbsp;";
  }
});

//文字色
editTxtColorElm.addEventListener('input', ()=>{
    selectedRackItemElm.style.color = editTxtColorElm.value;
});

//背景色
editTxtBgcolorElm.addEventListener('input', ()=>{
  selectedRackItemElm.style.backgroundColor = editTxtBgcolorElm.value;
});

//文字サイズ
editTxtSizeTxtboxElm.addEventListener('input', ()=>{
  if(selectedRackItemElm != null){
    if(editTxtSizeTxtboxElm.value < 1 || 50 < editTxtSizeTxtboxElm.value){
      editTxtSizeTxtboxElm.value = Number(selectedRackItemElm.style.fontSize.replace('px', ''));
    }else{
      selectedRackItemElm.style.fontSize = String(editTxtSizeTxtboxElm.value) + 'px';
    }
  }
});

//margin
editTxtMarginTxtboxElm.addEventListener('input', ()=>{
  if(selectedRackItemElm != null){
    if(editTxtMarginTxtboxElm.value < 0 || 50 < editTxtMarginTxtboxElm.value){
      editTxtMarginTxtboxElm.value = Number(selectedRackItemElm.style.margin.replace('px', ''));
    }else{
      selectedRackItemElm.style.margin = String(editTxtMarginTxtboxElm.value) + 'px';
    }
  }
});

//padding
editTxtPaddingTxtboxElm.addEventListener('input', ()=>{
  if(selectedRackItemElm != null){
    if(editTxtPaddingTxtboxElm.value < 0 || 50 < editTxtPaddingTxtboxElm.value){
      editTxtPaddingTxtboxElm.value = Number(selectedRackItemElm.style.padding.replace('px', ''));
    }else{
      selectedRackItemElm.style.padding = String(editTxtPaddingTxtboxElm.value) + 'px';
    }
  }
});

//border
//  line
editTxtBorderTxtboxElm.addEventListener('input', ()=>{
  if(selectedRackItemElm != null){
    if(editTxtBorderTxtboxElm.value < 0 || 50 < editTxtBorderTxtboxElm.value){
      editTxtBorderTxtboxElm.value = Number(states[0].replace('px', ''));
    }else{
      selectedRackItemElm.style.border = String(editTxtBorderTxtboxElm.value) + 'px ' + 'solid ' + editBorderColorElm.value;
    }
  }
});

//  color
editBorderColorElm.addEventListener('input', ()=>{
  selectedRackItemElm.style.border = 'solid ' + String(editTxtBorderTxtboxElm.value) + 'px ' + editBorderColorElm.value;
});

//改行
//文字装飾
//背景色
//padding

//ラック移動
document.getElementById('movePrevRackBtn').onclick = function(){  //前移動

  var found = 0;  //移動する要素の場所
  var value = selectedRb.value.substr(5, 10);  //選択された要素のID
  console.log(value);

  for (var i = 0, len = convary.length; i < len ; i++) {  //foundを探索
    if ( convary[i][0] == value){
      found = i;
      break;
    }
  }

  if ( found != 0 ) { //選択された要素が0番目でなければ配列を入れ替え
    var prevary = convary[found];
    convary[found] = convary[found-1];
    convary[found-1] = prevary;
  }

  // データ送信  
  $.ajax({
    // POST通信
    type: 'POST',
    data: {"ary" : convary},
    // ここでデータの送信先URLを指定します。
    url: './../template/Conversion.php',
  }).done(function(response) {
    $('#code').html(response);
  });
  
  rackParentLabelElm = selectedRb.parentNode.parentNode;
  var prevRackElm = rackParentLabelElm.previousElementSibling;
  if(prevRackElm != null){
    document.getElementById('cnvsView').insertBefore(rackParentLabelElm, prevRackElm);
  }
}

document.getElementById('moveNextRackBtn').onclick = function(){  //後ろ移動

  var found = 0;  //移動する要素の場所
  var value = selectedRb.value.substr(5, 10);  //選択された要素のID
  console.log(value);

  for (var i = 0, len = convary.length; i < len ; i++) {  //foundを探索
    if ( convary[i][0] == value){
      found = i;
      break;
    }
  }

  if ( convary[found+1] ) { //選択された要素が0番目でなければ配列を入れ替え
    var prevary = convary[found];
    convary[found] = convary[found+1];
    convary[found+1] = prevary;
  }

  // データ送信  
  $.ajax({
    // POST通信
    type: 'POST',
    data: {"ary" : convary},
    // ここでデータの送信先URLを指定します。
    url: './../template/Conversion.php',
  }).done(function(response) {
    $('#code').html(response);
  });


  rackParentLabelElm = selectedRb.parentNode.parentNode;
  var nextRackElm = rackParentLabelElm.nextElementSibling;
  if(nextRackElm != null){
    document.getElementById('cnvsView').insertBefore(nextRackElm, rackParentLabelElm);
  }
}

//ラック削除
document.getElementById('deleteRackBtn').onclick = function(){
  if(selectedRb != null){

    var found = 0;  //削除する要素の場所
    var value = selectedRb.value.substr(0, 6);  //選択された要素のID

    for (var i = 0, len = convary.length; i < len ; i++) {  //foundを探索
      if ( convary[i][0] == value){
        found = i;
        break;
      }
    }
    convary.splice(found, 1);   //選択された要素の行を削除
    if ( convary.length ) { //配列が空でない場合、配列を送信
      // データ送信  
      $.ajax({
        // POST通信
        type: 'POST',
        data: {"ary" : convary},
        // ここでデータの送信先URLを指定します。
        url: './../template/Conversion.php',
      }).done(function(response) {
        $('#code').html(response);
      });
    } else {  //要素が0個の場合はから配列を送信
      const emptyary = Array(1).fill().map(() => Array(10).fill(0));
      // データ送信  
      $.ajax({
        // POST通信
        type: 'POST',
        data: {"ary" : emptyary},
        // ここでデータの送信先URLを指定します。
        url: './../template/Conversion.php',
      }).done(function(response) {
        $('#code').html(response);
      });
    }

    rackParentLabelElm.remove();
    editTxtboxElm.value = '';
  }
}

//  ラック編集処理
//--------------------------------------------------------------------------------
//ページ編集処理
var cnvsViewElm = document.getElementById('cnvsView');
cnvsViewElm.style.padding = "8px";
var editPagePaddingTxtboxElm = document.getElementById('editPagePaddingTxtbox');
editPagePaddingTxtboxElm.value = 8;
var editPageBgcolorElm = document.getElementById('editPageBgcolor');
editPageBgcolorElm.value = "#ffffff";

editPagePaddingTxtboxElm.addEventListener('input', ()=>{
  if(cnvsViewElm != null){
    if(editPagePaddingTxtboxElm.value < 0 || 50 < editPagePaddingTxtboxElm.value){
      editPagePaddingTxtboxElm.value = Number(cnvsViewElm.style.padding.replace('px', ''));
    }else{
      cnvsViewElm.style.padding = String(editPagePaddingTxtboxElm.value) + 'px';
    }
  }
});

editPageBgcolorElm.addEventListener('input', ()=>{
  cnvsViewElm.style.backgroundColor = editPageBgcolorElm.value;
});
//--------------------------------------------------------------------------------
