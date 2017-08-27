;(function(){
	function extend(defaultSetting,yourSetting){
		var newSetting = {};
		yourSetting = yourSetting || {};
		//对defaultSetting属性进行遍历,如果这个属性在yourSetting中存在,用yourSetting的,
		for(var p in defaultSetting){
			if(yourSetting.hasOwnProperty(p)){
				newSetting[p] = yourSetting[p];
			}else{
				newSetting[p] = defaultSetting[p];	
			}
		}
		return newSetting;
	}
	function Circle(dom,UserSetting={}){
		var defaultSetting = {
			fontSize:30,
			bgColor:"rgba(0,0,0,.5)",
			fontColor:"red",
			lineWidth:3,
			data:88
		}
		var setting = extend(defaultSetting,UserSetting);
		var can = dom.querySelector('canvas');
		var data = dom.dataset["number"];
		var currentDate = 0;
		var ctx = can.getContext("2d");
		//圆心的坐标
		var pointX = can.offsetWidth/2;
		var pointY = can.offsetHeight/2;
		//圆心的半径
		var r = can.offsetWidth/2 -10;
		//开始  结束的弧度
		var start = -Math.PI/2;
		var end = start + 2*Math.PI*data/100;	
	
		//动画
		//每隔50毫秒执行一次
		var timer = setInterval(function(){
			ctx.clearRect(0,0,can.offsetWidth,can.offsetHeight)
			currentDate<data && currentDate++;
			end = start + 2*Math.PI*currentDate/100;
			
			//写字
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			var fontContent = currentDate+"%";
			ctx.font = setting.fontSize+"px 黑体"
			ctx.fillText(fontContent,pointX,pointY)
			//画背景的圆弧
		
			ctx.lineWidth = setting.lineWidth;
			ctx.strokeStyle = setting.bgColor;
			ctx.beginPath();
			ctx.arc(pointX,pointY,r,0,2*Math.PI);
			ctx.stroke();
			//画前景的圆弧
			ctx.strokeStyle = setting.fontColor;
			ctx.beginPath();
			ctx.arc(pointX,pointY,r,start,end);
			ctx.stroke();
			
			currentDate == data && clearInterval(timer)
		},50)
	}
		window.Circle = Circle;
})()
