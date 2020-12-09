var edittext=document.getElementById("edit_text");
var selected_radiobutton;

//作成
document.getElementById("create_item_button").onclick=function(){
    var newItemId=Math.floor(Math.random() * 1000000 );    //乱数id生成
    
    //要素テンプレの取得
    var temp=document.getElementById("template_select")
    var templates=temp.options[temp.selectedIndex].value.split(',');
    //改行フラグの確認
    if(document.getElementById("br_flag").checked) document.getElementById("virtual_web_contents").appendChild(document.createElement('br')); //改行

    //チェックボックス用のラベル作成
    var newLabel=document.createElement('label');       //ラベルを生成
    newLabel.setAttribute('id',newItemId+"_lbl");          //IDを設定
    newLabel.setAttribute('for',newItemId+"_cb");          //チェックボックスの判定を継承
    document.getElementById("virtual_web_contents").appendChild(newLabel); //ラベルを追加
    
    //Div要素作成
    var newDiv=document.createElement('div');           //DIVを生成
    newDiv.setAttribute('id',newItemId+"_div");            //IDを設定
    newDiv.setAttribute('class',"createItem");            //CLASSを設定
    if(templates[0]=="true"){
        newDiv.style.display="inline-block";                //とりあえずinline-blockにしとく
    }
    newLabel.appendChild(newDiv);                       //ラベルの下にDIVを追加

    //選択して編集できるように外枠にチェックボックスを作る
    var newCheckBox=document.createElement('input');    //INPUTを作成
    newCheckBox.setAttribute('type','radio');           //ラジオボタンにする
    newCheckBox.setAttribute('id',newItemId+"_cb");        //IDを設定
    newCheckBox.setAttribute('name',"items_radiobutton");           //NAMEを設定 ラジオボタンが連動する
    newCheckBox.setAttribute('checked',"checked");      //新しい要素を作成したとき選択済みにする
    newCheckBox.setAttribute('onchange',"selectedItem(this)");
    newDiv.appendChild(newCheckBox);                    //DIVにINPUTを追加
    selected_radiobutton=newCheckBox;
    
    //中身の要素|テキスト作成(仮)
    if(templates[1]=="A"){
        var newText=document.createElement('div');
    }else if(templates[1]=="B"){
        var newText=document.createElement('h1');
        newText.style.margin="0";
    }else if(templates[1]=="C"){
        var newText=document.createElement('a');
        newText.href="http://abehiroshi.la.coocan.jp";
    }else if(templates[1]=="D"){
        var newText=document.createElement('li');
    }
    
    var text=document.getElementById("new_item_text");     //指定されたテキストを取得
    if(text.value){
        newText.innerHTML=text.value;    //中身の本文を設定
        text.value="";           //テキストボックスをクリア
    }else{
        newText.innerHTML="null:"+newItemId;               //なければIDを表示
    }
    newText.setAttribute('id',newItemId+"_child");
    newCheckBox.value=newItemId+"_child";
    newDiv.appendChild(newText);                        //DIVにDIVを追加
    console.log("create item!");
    document.getElementById("br_flag").checked=false;   //改行フラグのチェックを解除
    
}

//編集
function selectedItem(e){
    selected_radiobutton=e;
    edittext.value=document.getElementById(selected_radiobutton.value).innerHTML;
}

edittext.addEventListener('input',()=>{     //formTestInputValueにinputがされたら
    document.getElementById(selected_radiobutton.value).innerHTML=edittext.value;
});

//削除
document.getElementById("delete_item_button").onclick=function(){
    parent=selected_radiobutton.parentNode.parentNode;
    parent.remove();
    console.log("delete");
}