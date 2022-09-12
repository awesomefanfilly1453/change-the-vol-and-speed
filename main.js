song="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
leftWrist_score=0;
rightWrist_score=0;

function preload(){
  song=loadSound("music.mp3");  
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    
    pose=ml5.poseNet(video,ModelLoaded);
pose.on("pose",GotPoses);
}
function play(){
    song.stop();
    song.play();
    song.rate(1);
    song.setVolume(1);
}
function ModelLoaded(){
    console.log("Model Loaded!");
}
function GotPoses(result,error){
if(error){
console.log(error);
}    
if (result.length>0){
    console.log(result);
    leftWrist_score=result[0].pose.keypoints[9].score;
    rightWrist_score=result[0].pose.keypoints[10].score;
    
    leftWrist_x=result[0].pose.leftWrist.x;
      leftWrist_y=result[0].pose.leftWrist.y;
    
    rightWrist_x=result[0].pose.rightWrist.x;
    rightWrist_y=result[0].pose.rightWrist.y;
}
}
function draw(){
image(video,0,0,500,500);

fill("#FF0000");
    stroke("#FF0000");
    
    if(rightWrist_score >0.2){
        circle(rightWrist_x,rightWrist_y,20);
        if(rightWrist_y>0 && rightWrist_y<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
       else if (rightWrist_y>100 && rightWrist_y<=200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if (rightWrist_y>200 && rightWrist_y<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightWrist_y>300 && rightWrist_y<=400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if (rightWrist_y>400 && rightWrist_y<=500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
       }
    if (leftWrist_score>0.2){
        circle(leftWrist_x,leftWrist_y,20);
        number=Number(leftWrist_y);
        number1=floor(number);
        volume=number1/500;
        document.getElementById("vol").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }

}


