function setup(){
    canvas = createCanvas(500,500);
    canvas.position(780,200);
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
}
video = "";
objects = []


function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
for (i = 0; i < objects.length; i++) {
    document.getElementById("status").innerHTML = "Status : objects detected";
    document.getElementById("number_of_object").innerHTML = "number of objects detected are:"+ objects.length;
    r =  floor(random(0,255));
    g =  floor(random(0,255));
    b =  floor(random(0,255));
    console.log("r = " + r + " g = " + g + " b = " + b);
    fill(r,g,b);
    percant = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percant + "%", objects[i].x +15, objects[i].y + 15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

}
    
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "status: detecting object";

}
function modelLoaded(){
    console.log("Model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
    if(error){
        console.log(error);

    }
    console.log(results);
    objects = results;
}