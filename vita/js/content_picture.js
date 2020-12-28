document.write('	<div class="box" id="box">	');
document.write('	    <div class="inner">	');
document.write('	        <!--轮播图-->	');
document.write('	        <ul>	');

document.write('	            <li>	');
document.write('	                <a href="https://mp.weixin.qq.com/s?subscene=19&__biz=MzA4MjE3NzIzOA==&mid=2656933065&idx=2&sn=bd3242a89cabf5bd637846903d3db68d&chksm=84208970b3570066ed3662e25b48cfdd3b5d39638117f1338ef58344f7a5ec4b8679d1acb333&scene=7&ascene=65&devicetype=android-29&version=27001539&nettype=ctnet&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&exportkey=Awfa21wFK093GXzMicpD3EE%3D&pass_ticket=CvaI6C9qp%2FRsozhQO73e6vztT2PzDQAHUTsk%2F73QMMg6fvffdYrojOoVka%2Bw6v54&wx_header=1">	');
document.write('	                    <img src="../images/11.png" >	');
document.write('	                </a>	');
document.write('	            </li>	');

document.write('	            <li>	');
document.write('	                <a href="https://mp.weixin.qq.com/s?subscene=19&__biz=MzA4MjE3NzIzOA==&mid=2656915616&idx=5&sn=7dc4bc49059ae8d909153fae6fc879c5&chksm=84204d19b357c40f3e814f68e8c44af5e10d7fcfdba00294122a00b5e091795588ff25fc4e51&scene=7&ascene=65&devicetype=android-29&version=27001539&nettype=ctnet&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&exportkey=A%2BVttvBsImIxyw8o7LRhAqY%3D&pass_ticket=CvaI6C9qp%2FRsozhQO73e6vztT2PzDQAHUTsk%2F73QMMg6fvffdYrojOoVka%2Bw6v54&wx_header=1">	');
document.write('	                    <img src="../images/12.png" >	');
document.write('	                </a>	');
document.write('	            </li>	');

document.write('	<li>	');
document.write('	    <a href="https://mp.weixin.qq.com/s?subscene=19&__biz=MzUzOTY0NzAwMw==&mid=2247484250&idx=1&sn=9ca63245c52a05b0e06377d5f9ab83e2&chksm=fac40e2ecdb38738b3417f6f643ce0ed33298f458ff3970a27d1db882d90b3ca376e01d32b48&scene=7&ascene=65&devicetype=android-29&version=27001539&nettype=ctnet&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&exportkey=Awyf1YhaK4yrJRmrwRZZAls%3D&pass_ticket=CvaI6C9qp%2FRsozhQO73e6vztT2PzDQAHUTsk%2F73QMMg6fvffdYrojOoVka%2Bw6v54&wx_header=1">	');
document.write('	        <img src="../images/21.png">	');
document.write('	    </a>	');
document.write('	</li>	');


document.write('	        </ul>	');
document.write('	        <ol class="bar">	');
document.write('	        </ol>	');
document.write('	        <!--左右焦点-->	');
document.write('	        <div id="key">	');
document.write('	            <span id="key_left"><</span>	');
document.write('	            <span id="key_right">></span>	');
document.write('	        </div>	');
document.write('	    </div>	');
document.write('	</div>	');


// 获取id的对象
function my$(id){
    return document.getElementById(id);
}
//    获取各个元素
//    children 属性只返回元素节点；
//    children 属性返回元素的子元素的集合，是一个 HTMLCollection 对象。根据子元素在元素中出现的先后顺序进行排序。
//    使用 HTMLCollection对象的 length属性获取子元素的数量，然后使用序列号(index，起始值为0)访问每个子元素。
var box =my$("box");
var key =my$("key");
var key_right=my$("key_right");
var key_left=my$("key_left");
var inner=box.children[0];
var ul_obj=inner.children[0];
var ol_obj=inner.children[1];
var li_num=ul_obj.children;
var pic=0;
var imgWidth=inner.offsetWidth;// 返回元素的宽度，包括边框和填充，但不是边距




// 根据li创建右下角小按钮
for(i=0;i<li_num.length;i++) {
    // HTML元素经常包含文本。创建指定文本的按钮你需要在按钮元素后添加文本节点:
    var li_obj=document.createElement("li");
    // appendChild() 方法可向节点的子节点列表的末尾添加新的子节点
    ol_obj.appendChild(li_obj);
    li_obj.innerText=(i+1);
    li_obj.setAttribute("index",i);
    //setAttribute() 方法添加新属性。如果元素中已经存在指定名称的属性，它的值更改为 value 参数的值。
    // 为按钮注册mouseover事件
    li_obj.onmouseover=function () {
        for(j=0;j<ol_obj.children.length;j++){
            ol_obj.children[j].removeAttribute("class");
            // removeAttribute() 方法删除指定的属性
        }
        this.className="current";
        // 重新命名该元素的class
        pic=this.getAttribute("index");
        // getAttribute() 方法根据名称取得属性值。
        animate(ul_obj,-pic*imgWidth);
        //    jQuery animate() 方法用于创建自定义动画。
    }//onmouseover=function()
}//for()

// 设置ol中的第一个li有背景颜色
ol_obj.children[0].className="current";
//克隆一个ul中第一个li,加入到ul中的最后
// 该方法将复制并返回调用它的节点的副本。如果传递给它的参数是 true，它还将递归复制当前节点的所有子孙节点。否则，它只复制当前节点。
ul_obj.appendChild(ul_obj.children[0].cloneNode(true));

var timeId=setInterval(click_key,2500);//定时器每过一秒执行一下函数；
box.onmouseover=function () {
    key.style.display="block";
    // setInterval() ：按照指定的周期（以毫秒计）来调用函数或计算表达式。
    // 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
    clearInterval(timeId);
}
box.onmouseout=function () {

    key.style.display="none";
    timeId=setInterval(click_key,2500);
}
key_right.onclick=click_key;
// 点击右键时移动图片
function click_key() {
    //如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
    //所以,如果用户再次点击按钮,用户应该看到第二个图片
    if (pic == li_num.length - 1) {
        //如何从第6个图,跳转到第一个图
        pic = 0;//先设置pic=0
        ul_obj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
    }
    pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
    animate(ul_obj, -pic * imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
    //如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
    if (pic == li_num.length - 1) {
        //第五个按钮颜色干掉
        ol_obj.children[ol_obj.children.length - 1].className = "";
        //第一个按钮颜色设置上
        ol_obj.children[0].className = "current";
    } else {
        //清除所有的小按钮的背景颜色
        for (var i = 0; i < ol_obj.children.length; i++) {
            ol_obj.children[i].removeAttribute("class");
        }
        ol_obj.children[pic].className = "current";
    }



} // click_key()

key_left.onclick=function () {
    if (pic==0){
        pic=list.length-1;
        ul_obj.style.left=-pic*imgWidth+"px";
    }
    pic--;
    animate(ul_obj,-pic*imgWidth);
    for (var i = 0; i < ol_obj.children.length; i++) {
        ol_obj.children[i].removeAttribute("class");
    }
    //当前的pic索引对应的按钮设置颜色
    ol_obj.children[pic].className = "current";
};

//设置任意的一个元素,移动到指定的目标位置
function animate(element, target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        var current = element.offsetLeft;
        //每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        //当前移动到位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.left = target + "px";
        }
    }, 10);
}