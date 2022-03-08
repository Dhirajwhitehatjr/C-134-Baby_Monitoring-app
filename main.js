img = "";
state = "";
objects = [];
var audio = "";
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded); 
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}
function modelLoaded()
{
    console.log("M o d e l  L o a d e d  ! ! ! ! ! !");
    state = "true";
}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }   
}       
function preload()
{       
    img = loadImage("dog_cat.jpg");
    audio = new Audio('alert.wav');
}       
function draw()
{       
    image(video,0,0,380,380); 
    if(state == "true")
{
    objectDetector.detect(video,gotResults);
    for(i = 0;i < objects.length;i++)  
    {
        r = random(255);
        g = random(255);
        b = random(255);
        document.getElementById("status").innerHTML = "Status - Detected Objects";
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+"   "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[0].label == "person")  
    {
        document.getElementById("baby_status").innerHTML = "Baby detected";
        
    }
    else if(objects[0].label != "person")
    {
        document.getElementById("baby_status").innerHTML = "Baby not detected";
        audio.play();
    }
    }      
}   
}
