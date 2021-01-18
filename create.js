var editTxtboxElm=document.getElementById("editTxtbox");
var editTxtColorElm=document.getElementById("editTxtColor");
var editTxtSizeTxtboxElm=document.getElementById("editTxtsizeTxtbox");
var selectedRb;
var selectedRackItemElm;
var rackParentDivElm;
var rackParentLabelElm;
var brElm;
var editBrFlgElm;

window.addEventListener('beforeunload',function(e){
  e.returnValue="";
},false);

//改行追加処理
function addBr(parents){
  var newBr=document.createElement('br');
  newBr.setAttribute('class',"divbr");
  parents.appendChild(newBr);
}

//選択されたアイテムと編集用インプットを連動
function selectedRack(e){
  selectedRb=e;
  selectedRackItemElm=document.getElementById(selectedRb.value);
  editTxtboxElm.value=selectedRackItemElm.innerHTML;
  editTxtColorElm.value=toHexColor(selectedRackItemElm.style.color);

  rackParentDivlElm=selectedRb.parentNode;
  rackParentLabelElm=rackParentDivlElm.parentNode;   //選択されたアイテムのLabelを取得

  brElm=document.querySelector("#"+rackParentLabelElm.id + " > .divbr");
  editBrFlgElm=document.getElementById("editBrFlg");
  if(brElm==null){
    editBrFlgElm.checked="";
  }else{
    editBrFlgElm.checked="true";
  }

  editTxtSizeTxtboxElm.value=Number(selectedRackItemElm.style.fontSize.replace("px",""));

}

function selectedRackBrCb(e){
  if(e.checked==true){
    addBr(rackParentLabelElm);
  }else{
    brElm=document.querySelector("#"+rackParentLabelElm.id + " > .divbr");
    brElm.remove();
  }
}

//RGB->HEX変換
function toHexColor(color){
  color=color.replace(/[(rgb(|))]/g,"");
  color=color.split(', ');
  hex="#" + toHex(color[0]) + toHex(color[1]) + toHex(color[2]);
  return hex;
}

//16進数変換
function toHex(c) {
  var hex = Number(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

//作成
//追加ボタンが押されたら実行
document.getElementById("createRackBtn").onclick=function(){
  var newRackId=Math.floor(Math.random() * 1000000 );    //乱数id生成
  
  //要素テンプレの取得
  var moldSelectElm=document.getElementById("moldSelect")
  var moldValues=moldSelectElm.options[moldSelectElm.selectedIndex].value.split(',');
  //改行フラグの確認
  
  //ラジオボタン用のラベル作成
  var newLabel=document.createElement('label');         //ラベルを生成
  newLabel.setAttribute('id',"Lbl"+newRackId);          //IDを設定
  newLabel.setAttribute('class',"Lbl");                 //classを設定
  newLabel.setAttribute('for',"Rb"+newRackId);          //ラジオボタンの判定を継承
  newLabel.setAttribute('draggable',"true");            //ドラッグできるように
  document.getElementById("cnvsView").appendChild(newLabel); //ラベルを追加
  
  //Div要素作成
  var newDiv=document.createElement('div');           //DIVを生成
  newDiv.setAttribute('id',"Div"+newRackId);            //IDを設定
  newDiv.setAttribute('class',"js-create-Rack");            //CLASSを設定
  if(moldValues[0]=="true"){
    newDiv.style.display="inline-block";                //とりあえずinline-blockにしとく
  }
  newLabel.appendChild(newDiv);                       //ラベルの下にDIVを追加

  //改行
  if(document.getElementById("brFlg").checked){
    addBr(newLabel);
  }

  //選択して編集できるように外枠にラジオボタンを作る
  var newRb=document.createElement('input');    //INPUTを作成
  newRb.setAttribute('type','radio');           //ラジオボタンにする
  newRb.setAttribute('id',"Rb"+newRackId);        //IDを設定
  newRb.setAttribute('name',"Racks_Rb");           //NAMEを設定 ラジオボタンが連動する
  newRb.setAttribute('class',"enable-input");
  newRb.setAttribute('checked',"checked");      //新しい要素を作成したとき選択済みにする
  newRb.setAttribute('onchange',"selectedRack(this)");
  newDiv.appendChild(newRb);                    //DIVにINPUTを追加
  
  //中身の要素|テキスト作成(仮)
  var newRackItem;
  if(moldValues[1]=="div"){
    newRackItem=document.createElement('div');
  }else if(moldValues[1]=="h1"){
    newRackItem=document.createElement('h1');
    newRackItem.style.margin="0";
  }else if(moldValues[1]=="a"){
    newRackItem=document.createElement('a');
    newRackItem.href="http://abehiroshi.la.coocan.jp";
    newRackItem.setAttribute("target","_blank");
  }else if(moldValues[1]=="li"){
    newRackItem=document.createElement('li');
  }
  
  var rackItemElm=document.getElementById("newRackTxtbox");     //指定されたテキストを取得
  if(rackItemElm.value){
    newRackItem.innerHTML=rackItemElm.value;    //中身の本文を設定
    rackItemElm.value="";           //テキストボックスをクリア
  }else{
    newRackItem.innerHTML="null:"+newRackId;               //なければIDを表示
  }
  newRackItem.setAttribute('id',"Child"+newRackId);
  newRackItem.setAttribute('style',"color:#000000;font-size:"+moldValues[2]+"px");     //初期の色・文字サイズ
  newRb.value="Child"+newRackId;
  newDiv.appendChild(newRackItem);                        //DIVにDIVを追加

  document.getElementById("brFlg").checked=false;   //改行フラグのチェックを解除
  
  selectedRack(newRb);                    //追加された要素を編集可能にする
}

//編集
editTxtboxElm.addEventListener('input',()=>{     //innerHTML変更
  if(selectedRackItemElm!=null){
    selectedRackItemElm.innerHTML=editTxtboxElm.value;
  }
});

editTxtColorElm.addEventListener('input',()=>{     //色変更
    selectedRackItemElm.style.color=editTxtColorElm.value;
});

editTxtSizeTxtboxElm.addEventListener('input',()=>{     //文字サイズ変更
  if(selectedRackItemElm!=null){
    if(editTxtSizeTxtboxElm.value<1||50<editTxtSizeTxtboxElm.value){
      editTxtSizeTxtboxElm.value=Number(selectedRackItemElm.style.fontSize.replace("px",""));
    }else{
      selectedRackItemElm.style.fontSize=String(editTxtSizeTxtboxElm.value)+"px";
    }
  }
});


//削除
//削除ボタンが押されたら実行
document.getElementById("deleteRackBtn").onclick=function(){
  if(selectedRb!=null){
    // rackParentLabelElm=selectedRb.parentNode.parentNode;  //選択されたアイテムの親Divを取得
    rackParentLabelElm.remove();                                    //要素を削除
    editTxtboxElm.value="";
  }
}

//要素を前に移動
document.getElementById("movePrevRackBtn").onclick=function(){
  rackParentLabelElm=selectedRb.parentNode.parentNode;
  var prevRackElm=rackParentLabelElm.previousElementSibling;
  if(prevRackElm!==null){
    document.getElementById("cnvsView").insertBefore(rackParentLabelElm, prevRackElm);
  }
}
//要素を後ろに移動
document.getElementById("moveNextRackBtn").onclick=function(){
  rackParentLabelElm=selectedRb.parentNode.parentNode;
  var nextRackElm=rackParentLabelElm.nextElementSibling;
  if(nextRackElm!==null){
    document.getElementById("cnvsView").insertBefore(nextRackElm,rackParentLabelElm);
  }
}