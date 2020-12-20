<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>炸金花小游戏</title>
    <style>
        body{
            background-color: green;
        }
        #right{

            text-align: center;
            position: absolute;
            right: 0;
            top: 25%;
            width: 25%;
            /*height:30%;*/
            font-size: 20px;
        }
        #left{

            text-align: center;
            position: absolute;
            left: 0;
            top: 25%;
            width: 25%;
            /*height:30%;*/
            font-size: 20px;
        }
        #top{

            text-align: center;
            position: absolute;
            left: 35%;
            width: 30%;
            top: 0;

            height:20%;
        }
        #button{
            text-align: center;
            position: absolute;
            left: 35%;
            bottom: 5%;
            width: 30%;
            height:20%;
        }
        #center{
            background-color: antiquewhite;
            text-align: left;
            position: absolute;
            left: 35%;
            top: 25%;
            width: 30%;
            height:20%;
        }
        #center1{
            //background-color: red;
            text-align: center;
            position: absolute;
            left: 32%;
            top: 25%;


        }
        #who_Win{
            font-size: 50px;
            align-content: center;
            color: red;
        }
    </style>
    <script >
        var picture =new Array();//所有的牌
        var player1 =new Array();//玩家一的牌
        var player2 =new Array();//玩家二的牌
        var player1_num = new Array();//玩家一牌的数字
        var player2_num = new Array();//玩家二牌的数字
        var player1_char = new Array();//玩家一牌的花色
        var player2_char = new Array();//玩家二牌的花色
        var player1_score ;//玩家一牌的得分
        var player2_score ;//玩家一牌的得分
        function picture_number() {//生成一副扑克牌
            var k=0;
            var number = new Array("2","3","4","5","6","7","8","9","10","11","12","13","14");
            var shape = new Array("s","h","d","c");
            for(var i=0;i<13;i++){
                for(var n=0;n<4;n++){
                    picture[k]=shape[n]+'_'+number[i];
                    k++;
                }
            }
        }

        function send_card() {//发牌
            document.getElementById("who_Win").innerHTML="猜一猜谁会赢！";
            var o1 = "<img src=pukeImage/big.jpg width='80'/>";
            var l1=document.getElementById("right1").innerHTML;
            var l2=document.getElementById("left1").innerHTML;
            for(i=0;i<3;i++){//给玩家一发三张纸牌
                var i_1 = parseInt(Math.random()*(picture.length));
                i1= picture[i_1];//随机抽取一张扑克牌
                picture[i_1]=picture[picture.length-1];
                picture.length--;//确保之后抽取的扑克牌不重复
                player1[i]=i1;//记录玩家一抽取到的牌子
                document.getElementById("right1").innerHTML=l1+o1;
            }

            for(i=0;i<3;i++){//给玩家二发三张纸牌
                var i_2 = parseInt(Math.random()*(picture.length));
                i2= picture[i_2];//随机抽取一张扑克牌
                picture[i_2]=picture[picture.length-1];
                picture.length--;//确保之后抽取的扑克牌不重复
                player2[i]=i2;//记录玩家二抽取到的牌子
                document.getElementById("left1").innerHTML=l2+o1;
            }
            function sortNumber(a,b){//将字牌数字降序排序
                return b - a;
            }

            for(var i=0;i<3;i++){
                player1_num[i]=player1[i].substr(2);//提取牌的数字部分
                player2_num[i]=player2[i].substr(2);//提取牌的数字部分
                player1_char[i]=player1[i].substr(0,1);//提取牌的花色
                player2_char[i]=player2[i].substr(0,1);//提取牌的花色
            }
            player1_num.sort(sortNumber);//将字牌数字降序排序
            player2_num.sort(sortNumber);//将字牌数字降序排序
            document.getElementById("center").innerHTML="1.请查看牌<br>2.下注：按按钮或直接在下注框输入<br>" +
                "3.豹子 > 顺金 > 金花 > 顺子 > 对子 > 单张<br>" +
                "4.特殊：当豹子存在时，特殊牌型（非同花的235） > 豹子。";
        }//send_card()

        function open_card() {//开牌，打开两个人的牌
            look_card(1);
            look_card(2);
        }
        function look_card(i_n) {//查看玩家的牌
            if(i_n==1) {//查看玩家一的纸牌
                document.getElementById("right1").innerHTML="";//清空原有的底牌
                for(i=0;i<3;i++){
                    i1 = player1[i];//获取玩家纸牌
                    var o1 = "<img src=pukeImage/" + i1 + ".jpg width='80'/>";
                    var l1=document.getElementById("right1").innerHTML;
                    document.getElementById("right1").innerHTML=l1+o1;
                }
            }
            else{//查看玩家二的纸牌
                document.getElementById("left1").innerHTML="";//清空原有的底牌
                for(i=0;i<3;i++){
                    i1 = player2[i];//获取玩家纸牌
                    var o1 = "<img src=pukeImage/" + i1 + ".jpg width='80'/>";
                    var l1=document.getElementById("left1").innerHTML;
                    document.getElementById("left1").innerHTML=l1+o1;
                }
            }
        }

        function repetition_num(a) {//判断有几个相同的数字
            var k=1;
            for(i=0;i<2;i++){
                for(n=i+1;n<3;n++)
                    if(a[i]==a[n])
                        k++;//记录相同数字数量
            }
            return k;
        }
        function repetition_char(a) {//判断有几个相同的花色
            var k=1;
            for(i=0;i<2;i++){
                for(n=i+1;n<3;n++)
                    if(a[i]==a[n])
                        k++;//记录相同花色数量
            }
            return k;
        }
        function compare_num() {//当两人牌类型一样时，比较每个牌的大小
            // ff.p11.value=player1_num[0];
            // ff.p12.value=player1_num[1];
            // ff.p13.value=player1_num[2];
            // ff.p21.value=player2_num[0];
            // ff.p22.value=player2_num[1];
            // ff.p23.value=player2_num[2];
            for(i=0;i<3;){
                if( parseInt(player1_num[i])>parseInt(player2_num[i]) ){
                    player1_score=player1_score+player1_num[i];
                    return player1_score;
                }
                if(parseInt(player1_num[i])< parseInt(player2_num[i]) ){
                    player2_score=player2_score+player2_num[i];
                    return player2_score;
                }
                if( parseInt(player1_num[i]) == parseInt(player2_num[i]) )
                    i++;//如果第i张相同就比较下一张
            }
        }//compare_num()
        function card_type(a,b,c_num) {
            c1=parseInt(c_num[1])+1;
            c2=parseInt(c_num[2])+1;

            function sort_card() {//判断是不是顺子
                if( c_num[0]==c1 && c_num[1]==c2 )
                    return 1;
                else if( c_num[0]==14 && c_num[1] == 3 && c_num[0]==2 )
                    return 1;
                else
                    return 0;
            }//sort_card()
            var sum;
            var s=sort_card();
            if(a>=3){
                // 豹子：三张点相同的牌
                sum=666;
                return sum;
            }
            if(b>=3){
                if(s==1){ //顺金：花色相同的顺子
                    sum=555;
                    return sum;
                }
                else{//金花：花色相同
                    sum=444;
                    return sum;
                }
            }
            if(s==1&&b<4){//顺子：花色不同的顺子。
                sum=333;
                return sum;
            }
            if(a==2){// 对子：两张点数相同的牌。
                sum=222;
                return sum;
            }
            if(a==1){// 单张：三张牌不组成任何类型的牌。
                sum=111;
                return sum;
            }

        }//card_type()
        function compare_score() {
            if(!compare_money()) {
                document.getElementById("who_Win").innerHTML="请跟下注或者请弃牌";
                return false;
            }

            NumPlayer1=repetition_num(player1_num);//记录该数字数量
            CharPlayer1=repetition_char(player1_char);//记录该花色数量
            NumPlayer2=repetition_num(player2_num);//记录该数字数量
            CharPlayer2=repetition_char(player2_char);//记录该花色数量

            player1_score  = card_type(NumPlayer1,CharPlayer1,player1_num);//记录玩家一得分
            player2_score  = card_type(NumPlayer2,CharPlayer2,player2_num);//记录玩家二得分


            if( parseInt(player1_score)>parseInt(player2_score) ){
                settle_accounts(1);
            }
            if( parseInt(player1_score)<parseInt(player2_score) ){
                settle_accounts(2);
            }
            if( parseInt(player1_score)==parseInt(player2_score) ){
                m =parseInt(compare_num());//当两人牌类型一样时，比较每个牌的大小
                if(m==parseInt(player1_score)){
                    settle_accounts(1);
                }
                else if(m==parseInt(player2_score)){
                    settle_accounts(2);
                }
            }
            if(player1_score==500){//如果玩家一是豹子，玩家二是特殊牌则玩家二赢
                if(player2_num[0]==5&&player2_num[1]==3&&player2_num[2]==2&&CharPlayer2==1)
                    settle_accounts(2);
                else
                    settle_accounts(1);
            }
            if(player2_score==500){//如果玩家二是豹子，玩家一是特殊牌则玩家一赢
                if(player1_num[0]==5&&player1_num[1]==3&&player1_num[2]==2&&CharPlayer1==1)
                    settle_accounts(1);
                else
                    settle_accounts(2);
            }
            f11.t11.value=player1_score;
            f22.t11.value=player2_score;

        }//compare_score()



        function close_card(i_n) {//关闭纸牌
            var o1 = "<img src=pukeImage/big.jpg width='80'/>";

            if(i_n==1){
                document.getElementById("right1").innerHTML="";
                for(i=0;i<3;i++){
                    var l1=document.getElementById("right1").innerHTML;
                    document.getElementById("right1").innerHTML=l1+o1;
                }
            }
            else{
                document.getElementById("left1").innerHTML="";
                for(i=0;i<3;i++){
                    var l1=document.getElementById("left1").innerHTML;
                    document.getElementById("left1").innerHTML=l1+o1;
                }
            }
        }//close_card(i_n)

        function Next_game() {
            picture_number();//洗牌
            player1_score =0;//玩家一的得分置为零
            player2_score =0;//玩家二的得分置为零
            f11.t11.value=player1_score;
            f22.t11.value=player2_score;
            f11.t33.value=0;
            f22.t33.value=0;
            document.getElementById("right1").innerHTML="";//清空原有的底牌
            document.getElementById("left1").innerHTML="";//清空原有的底牌
            document.getElementById("center").innerHTML="<div id='center1'>开始请按发牌<br/>" +
                " <input type='button' value='发牌' onclick='put_card()' style='font-size: 20px'/> " +
                "</div>";


        }//Next_game()

        function put_card() {
            for( var ti=1;ti<=3;ti++)
                send_card();
        }//put_card()
        
        function money(a,b) {//下注多少钱
            a.t33.value=b;
        }
        function compare_money() {//比较下注的钱
            if(f11.t33.value==f22.t33.value)
                return true;
            else
                return false;
        }//compare_money()
        function discard(a) {//弃牌
            if(a==1)
                settle_accounts(2);
            else
                settle_accounts(1);
        }//discard(a)
        function settle_accounts(a) {
            if(a==1){
                document.getElementById("who_Win").innerHTML="玩家一赢了";
                f11.t22.value=parseInt(parseInt(f11.t22.value)+parseInt(f11.t33.value));
                f22.t22.value=parseInt(parseInt(f22.t22.value)-parseInt(f22.t33.value));
                f11.t33.value=0;
                f22.t33.value=0;
            }
            else{
                document.getElementById("who_Win").innerHTML="玩家二赢了";
                f22.t22.value=parseInt(parseInt(f22.t22.value)+parseInt(f22.t33.value));
                f11.t22.value=parseInt(parseInt(f11.t22.value)-parseInt(f11.t33.value));
                f11.t33.value=0;
                f22.t33.value=0;
            }

        }
        

    </script>
</head>
<body onload="picture_number()">
<!--    <form name="ff">-->
<!--        p1<input type="text" name="p11"  value="0" style="width: 50px "><br/>-->
<!--        p1<input type="text" name="p12"  value="0" style="width: 50px "><br/>-->
<!--        p1<input type="text" name="p13"  value="0" style="width: 50px "><br/>-->
<!--        p2：<input type="text" name="p21"  value="0"  style="width: 50px "><br/>-->
<!--        p2：<input type="text" name="p22"  value="0"  style="width: 50px "><br/>-->
<!--        p2：<input type="text" name="p23"  value="0"  style="width: 50px "><br/>-->

<!--    </form>-->
    <div id="right" >
        <div id="p1">玩家一</div>
        <form name="f11">
            纸牌分：<input type="text" name="t11"  value="0" style="width: 50px "><br/>
            总 &nbsp 钱：<input type="text" name="t22"  value="500"  style="width: 50px "><br/>
            下 &nbsp 注：<input type="text" name="t33"  value="0" style="width: 50px "><br/>
        </form>
        <table align="center">
            <tr align="center">
                <td><input type="button" value="看牌" onclick="look_card(1)" style="font-size: 10px"/></td>
                <td><input type="button" value="合上" onclick="close_card(1)" style="font-size: 10px"/></td>
                <td><input type="button" value="弃牌" onclick="discard(1)" style="font-size: 10px"/></td>
            </tr>
            <tr align="right">
                <td><input type="button" value="10" onclick="money(f11,this.value)" style="font-size: 15px"/></td>
                <td><input type="button" value="20" onclick="money(f11,this.value)" style="font-size: 15px"/></td>
                <td><input type="button" value="30" onclick="money(f11,this.value)" style="font-size: 15px"/></td>
            </tr>
        </table>
        <div id="right1"></div>
    </div>

    <div id="left">
        <div id="p2">玩家二</div>
        <form name="f22">
            纸牌分：<input type="text" name="t11"  value="0" style="width: 50px "><br/>
            总 &nbsp 钱：<input type="text" name="t22"  value="500" style="width: 50px "><br/>
            下 &nbsp 注：<input type="text" name="t33"  value="0" style="width: 50px "><br/>
        </form>
        <table align="center">
            <tr align="center">
                <td><input type="button" value="看牌" onclick="look_card(2)" style="font-size: 10px"/></td>
                <td><input type="button" value="合上" onclick="close_card(2)" style="font-size: 10px"/></td>
                <td><input type="button" value="弃牌" onclick="discard(2)" style="font-size: 10px"/></td>
            </tr>
            <tr align="right">
                <td><input type="button" value="10" onclick="money(f22,this.value)" style="font-size: 15px"/></td>
                <td><input type="button" value="20" onclick="money(f22,this.value)" style="font-size: 15px"/></td>
                <td><input type="button" value="30" onclick="money(f22,this.value)" style="font-size: 15px"/></td>
            </tr>
        </table>
        <div id="left1"></div>
    </div>
    <div id="center">

        <div id="center1">
            开始请按发牌<br/>
            <input type="button" value="发牌" onclick="put_card()" style="font-size: 20px"/>
        </div>
    </div>

    <div id="top"><br/>
        <div id="who_Win">
            <font color="yellow" >炸金花<br>小游戏</font>
        </div>
    </div>

    <div id="button"><br/>
        <input type="button" value="评定" onclick="compare_score()" style="font-size: 20px"/>
        <input type="button" value="开牌" onclick="open_card()" style="font-size: 20px"/>
        <input type="button" value="下一局" onclick="Next_game()" style="font-size: 20px"/>
    </div>
</body>
</html>
