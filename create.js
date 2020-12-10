var editTxtboxElm=document.getElementById("editTxtbox");
var selectedRb;
var selectedRackItemElm;

//選択されたアイテムとテキストボックスを連動
function selectedRack(e){
  selectedRb=e;
  selectedRackItemElm=document.getElementById(selectedRb.value)
  editTxtboxElm.value=selectedRackItemElm.innerHTML;
}

//作成
//追加ボタンが押されたら実行
document.getElementById("createRackBtn").onclick=function(){
  var newRackId=Math.floor(Math.random() * 1000000 );    //乱数id生成
  
  //要素テンプレの取得
  var moldSelectElm=document.getElementById("moldSelect")
  var moldValues=moldSelectElm.options[moldSelectElm.selectedIndex].value.split(',');
  //改行フラグの確認
  if(document.getElementById("brFlg").checked) document.getElementById("cnvsView").appendChild(document.createElement('br')); //改行

  //ラジオボタン用のラベル作成
  var newLabel=document.createElement('label');       //ラベルを生成
  newLabel.setAttribute('id',newRackId+"Lbl");          //IDを設定
  newLabel.setAttribute('for',newRackId+"Rb");          //ラジオボタンの判定を継承
  document.getElementById("cnvsView").appendChild(newLabel); //ラベルを追加
  
  //Div要素作成
  var newDiv=document.createElement('div');           //DIVを生成
  newDiv.setAttribute('id',newRackId+"Div");            //IDを設定
  newDiv.setAttribute('class',"js-create-Rack");            //CLASSを設定
  if(moldValues[0]=="true"){
    newDiv.style.display="inline-block";                //とりあえずinline-blockにしとく
  }
  newLabel.appendChild(newDiv);                       //ラベルの下にDIVを追加

  //選択して編集できるように外枠にラジオボタンを作る
  var newRb=document.createElement('input');    //INPUTを作成
  newRb.setAttribute('type','radio');           //ラジオボタンにする
  newRb.setAttribute('id',newRackId+"Rb");        //IDを設定
  newRb.setAttribute('name',"Racks_Rb");           //NAMEを設定 ラジオボタンが連動する
  newRb.setAttribute('class',"enable-input");
  newRb.setAttribute('checked',"checked");      //新しい要素を作成したとき選択済みにする
  newRb.setAttribute('onchange',"selectedRack(this)");
  newDiv.appendChild(newRb);                    //DIVにINPUTを追加
  
  //中身の要素|テキスト作成(仮)
  var newRackItem;
  if(moldValues[1]=="A"){
    newRackItem=document.createElement('div');
  }else if(moldValues[1]=="B"){
    newRackItem=document.createElement('h1');
    newRackItem.style.margin="0";
  }else if(moldValues[1]=="C"){
    newRackItem=document.createElement('a');
    newRackItem.href="http://abehiroshi.la.coocan.jp";
  }else if(moldValues[1]=="D"){
    newRackItem=document.createElement('li');
  }
  
  var rackItemElm=document.getElementById("newRackTxtbox");     //指定されたテキストを取得
  if(rackItemElm.value){
    newRackItem.innerHTML=rackItemElm.value;    //中身の本文を設定
    rackItemElm.value="";           //テキストボックスをクリア
  }else{
    newRackItem.innerHTML="null:"+newRackId;               //なければIDを表示
  }
  newRackItem.setAttribute('id',newRackId+"Child");
  newRb.value=newRackId+"Child";
  newDiv.appendChild(newRackItem);                        //DIVにDIVを追加
  console.log("create item!");
  document.getElementById("brFlg").checked=false;   //改行フラグのチェックを解除
  
  selectedRack(newRb);                    //追加された要素を編集可能にする
}

//編集
editTxtboxElm.addEventListener('input',()=>{     //formTestInputValueにinputがされたら
  if(selectedRackItemElm!=null){
    selectedRackItemElm.innerHTML=editTxtboxElm.value;
  }
});

//削除
//削除ボタンが押されたら実行
document.getElementById("deleteRackBtn").onclick=function(){
  if(selectedRb!=null){
    rackParentElm=selectedRb.parentNode.parentNode;  //選択されたアイテムの親Divを取得
    rackParentElm.remove();                                    //要素を削除
    editTxtboxElm.value="";
    console.log("delete item!");
  }
}