var snake_body=[[5,6],];
var direction="right";
var food_x=3;
var food_y=3;
var handler=null;
var flag=1;
var score=0;

window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	var w=canvas.width/30;
	var h=canvas.height/30;
	document.onkeydown=function(event){
			event=event||window.event;
			if(event.keyCode==38&&direction!="down")
				direction="up";
			else if(event.keyCode==39&&direction!="left")
				direction="right";
			else if(event.keyCode==40&&direction!="up")
				direction="down";
			else if(event.keyCode==37&&direction!="right")
				direction="left";
			else if(event.keyCode==80){
				if (flag==1){
					flag=0;
					clearInterval(handler);
				}
				else {
					flag=1;
					handler=setInterval(function(){
							render();
							update();
					},100);
				}
			}
				
	}

	handler=setInterval(function(){
		render();
		update();
		
	},100);

	
		

	function render(){
		context.clearRect(0,0,canvas.width,canvas.height);
		draw_grid();
		draw_snake();
		draw_rect(context,food_x,food_y,"red");
	}

	function update(){
		var head=snake_body[0];
		var new_=[head[0],head[1]];
		if (direction=="right")
			new_[0]=(head[0]+1);
		else if(direction=="left")
			new_[0]=(head[0]-1);
		else if(direction=="down")
			new_[1]=(head[1]+1);
		else if(direction=="up")
			new_[1]=(head[1]-1);

		next=[new_[0],new_[1]];

		if(next[0]>13 || next[0]<0 || next[1]>13 || next[1]<0){
			clearInterval(handler);
			alert("Your snake hit the border.Game over!");
		}

		else if(in_body(next[0],next[1])){
			clearInterval(handler);
			alert("Your snake bite itself.Game over!")
		}

		else if (next[0]==food_x&&next[1]==food_y){
			snake_body.unshift(next);
			score++;
			change_food();
			var $score=document.getElementById("score");
			$score.innerHTML=score;
		}
		else{
			snake_body.pop();
			snake_body.unshift(next);
		}

	}


	function draw_snake(){
		for(var i=0;i<snake_body.length;i++){
			draw_rect(context,snake_body[i][0],snake_body[i][1],"blue");
		}
	}

	function change_food(){
		var x=Math.floor(Math.random()*(w-1));
		var y=Math.floor(Math.random()*(h-1));
		while (in_body(x,y)){
			x=Math.floor(Math.random()*(w-1));
			y=Math.floor(Math.random()*(h-1));
		}
		food_x=x;
		food_y=y;
		
	
	}

	function in_body(x,y){
		for(var i=0;i<snake_body.length;i++){
			if(x==snake_body[i][0]&&y==snake_body[i][1])
				return true;
		}
		return 	false;
	}

	function draw_grid(){
		context.beginPath();
		context.strokeStyle="#565656";
		
		for(var i=0;i<w;i++){
			context.moveTo(15,15+i*30);
			context.lineTo(435,15+i*30);
			context.stroke();
		}
		for(var j=0;j<h;j++){
			context.moveTo(15+j*30,15);
			context.lineTo(15+j*30,435);
			context.closePath();
			context.stroke();
		}
	}

	function draw_rect(cxt,i,j,color){
		
		cxt.fillStyle=color;
		cxt.fillRect(16+i*30,16+j*30,29,29);
	}

}