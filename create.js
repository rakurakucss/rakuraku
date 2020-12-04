document.getElementById("create_item").onclick=function(){
    var randId=Math.floor(Math.random() * 1000000 );    //乱数id生成
    
    //要素テンプレの取得
    var temp=document.getElementById("template_select")
    var templates=temp.options[temp.selectedIndex].value.split(',');
    //改行フラグの確認
    if(document.getElementById("br_flag").checked) document.getElementById("v_webpage").appendChild(document.createElement('br')); //改行

    //チェックボックス用のラベル作成
    var newLabel=document.createElement('label');       //ラベルを生成
    newLabel.setAttribute('id',randId+"_lbl");          //IDを設定
    newLabel.setAttribute('for',randId+"_cb");          //チェックボックスの判定を継承
    document.getElementById("v_webpage").appendChild(newLabel); //ラベルを追加
    
    //Div要素作成
    var newDiv=document.createElement('div');           //DIVを生成
    newDiv.setAttribute('id',randId+"_div");            //IDを設定
    newDiv.setAttribute('class',"createItem");            //CLASSを設定
    if(templates[0]=="true"){
        newDiv.style.display="inline-block";                //とりあえずinline-blockにしとく
    }
    newLabel.appendChild(newDiv);                       //ラベルの下にDIVを追加

    //選択して編集できるように外枠にチェックボックスを作る
    var newCheckBox=document.createElement('input');    //INPUTを作成
    newCheckBox.setAttribute('type','radio');           //ラジオボタンにする
    newCheckBox.setAttribute('id',randId+"_cb");        //IDを設定
    newCheckBox.setAttribute('name',"radio");           //NAMEを設定 ラジオボタンが連動する
    newCheckBox.setAttribute('checked',"checked");      //新しい要素を作成したとき選択済みにする
    newDiv.appendChild(newCheckBox);                    //DIVにINPUTを追加
    
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
    
    var text=document.getElementById("text").value;     //指定されたテキストを取得
    if(text){
        newText.innerHTML=text;    //中身の本文を設定
    }else{
        newText.innerHTML="null:"+randId;               //なければIDを表示
    }
    newDiv.appendChild(newText);                        //DIVにDIVを追加
    console.log("create item!");
    document.getElementById("br_flag").checked=false;   //改行フラグのチェックを解除
    document.getElementById("text").value="";           //テキストボックスをクリア
    
}