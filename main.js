status="";
object=[];
song="";

function preload()
{
  song=loadSound("music.mp3");
}

function setup()
{
  canvas=createCanvas(640,420);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(640,420);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
  console.log("Model Loaded");
  status = true;
}

function gotResult(error,results)
{
  if(error)
  {
    console.log(error);
  }
  console.log(results);
  object=results;
}

function draw()
{
    image(video,0,0,640,420);
     
   if(status!="")
   {
    objectDetector.detect(video,gotResult);

     for(i=0; i<object.length; i++)
     {
        r = random(255);
        g = random(255);
        b = random(255);

       document.getElementById("status").innerHTML = "Status = Object Detected" ;

       fill(r,g,b);
       percent=floor(object[i].confidence*100);
       text(object[i].label+" "+percent+"%",object[i].x+10,object[i].y+10);
       noFill();
       stroke(r,g,b);
       rect(object[i].x, object[i].y,object[i].width,object[i].height);

       if(object[i].label=="person")
       {
         document.getElementById("status").innerHTML = "Baby Found";
         song.stop();
       }
        else{
          document.getElementById("status").innerHTML = "Baby is not found";
          song.play();
        }

        if(object.length==0)
        {
          document.getElementById("status").innerHTML = "Baby is not found";
          song.play();
        }
        
     }
   }


}