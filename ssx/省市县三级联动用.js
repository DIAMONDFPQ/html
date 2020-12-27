function province()
{
    var xmlhttp;
    var citys;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            citys=xmlhttp.responseText.split("\r\n");//将文本类切为数组
            var pro=new RegExp(/^..0000/);//正则表达式,第3-6位数为0的
            for(i=0;i<citys.length;i++)
            {
                if(pro.test(citys[i]))//如果是省份
                {
                    $("#province").append("<option value="+citys[i]+">"+citys[i].substring(7,citys.length)+"</option>");//增加城市
                }
            }
		}
    }
    xmlhttp.open("GET","jjx.txt",true);
	xmlhttp.send();
}
function city()
{
    var xmlhttp;
    var citys;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            citys=xmlhttp.responseText.split("\r\n");//将文本类切为数组
            var province=$("#province").val().substring(0,2);
			var pro=new RegExp(/^....00/);//正则表达式,第5-6位数为0且34位不为0
			document.getElementById("city").innerHTML="<option selected='selected'>请选择</option>";
			document.getElementById("county").innerHTML="<option selected='selected'>请选择</option>";
            for(i=0;i<citys.length;i++)
            {
                if(pro.test(citys[i])&&(province==citys[i].substring(0,2)))//判断是否属于上一个省份
                {
					//console.log(citys[i]);
                    $("#city").append("<option>"+citys[i]+"</option>");//增加城市
                }
            }
		}
    }
    xmlhttp.open("GET","jjx.txt",true);
	xmlhttp.send();
}
function county()
{
    var xmlhttp;
    var citys;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            citys=xmlhttp.responseText.split("\r\n");//将文本类切为数组
            var province=$("#city").val().substring(0,4);
			document.getElementById("county").innerHTML="<option selected='selected'>请选择</option>";
            for(i=0;i<citys.length;i++)
            {
                if(province==citys[i].substring(0,4))//判断是否属于上一个城市
                {
					//console.log(citys[i]);
                    $("#county").append("<option>"+citys[i]+"</option>");//增加城市
                }
            }
		}
    }
    xmlhttp.open("GET","jjx.txt",true);
	xmlhttp.send();
}
province();