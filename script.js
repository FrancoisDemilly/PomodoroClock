window.onload = function(){


var breakLength = 5
var sessionLength = 75;
var time = 0;
var updatedTime;
var flag = 1;
var state = true;
var formated;




displaySetTime(breakLength, sessionLength);


var event = Array.prototype.slice.call(document.getElementsByTagName('span'));
event.forEach(function(item, index){
  item.addEventListener("click", function(){


      var key = this.dataset.name

      setTime(key);

      displaySetTime(breakLength, sessionLength);

  });//end of addeventlistener

}) //end of forEach



//helpers fonctions

function setTime(expr){

  switch (expr){

        case 'BL-':
        if(breakLength > 1){
          breakLength -= 1;}
          break;
        case 'BL+':
          breakLength += 1;
          break
        case 'SL-':
        if(sessionLength > 1){
          sessionLength -= 1;}
          break;
        case 'SL+':
          sessionLength += 1;
          break
      }//end of switch
}//end of setTime





function displaySetTime(var1, var2){
  document.getElementById("BL").innerHTML = var1;
  document.getElementById("SL").innerHTML = var2;
} // end of displaySetTime



function manageStart(){
  var startTimer = document.getElementById("circle");
  startTimer.addEventListener("click", fnStart, false);
}; //end of manageFlag

function fnStart(){
  time = sessionLength* 60;
  convertTime(time);
  displayTimer(formated);
  countFlag();
  if(flag % 2 === 0){
  getUpdate();
  }else if(flag % 2 !== 0){
    clearInterval(updatedTime)
  }
};



function countTime(){

  time -= 1;
  convertTime(time)
  displayTimer(formated);
  filler();
if (state === true && time === 0){
  state = false;
  clearInterval(updatedTime);
  time = breakLength *60;
  displayTimer(formated);
  beep()
  getUpdate();
}if (state === false && time === 0){
  state = true;
  clearInterval(updatedTime);
  time = sessionLength *60;
  displayTimer(formated);
  beep();
  getUpdate();
}
}; //end of countTime


function getUpdate(){
  updatedTime = setInterval(function(){
    countTime()
  }, 1000)
}

function countFlag(){
  flag += 1;
}

//display minutes and seconds
function convertTime(value){
  // get time in seconds by multiplying by 60
  var seconds = value % 60;
  var minutes = ((value%3600) - seconds) / 60;
  var hours = (value-(value%3600))/3600;
   seconds = pad(seconds);
   minutes = pad(minutes)
   hours = pad(hours);

   if (hours === "00" && minutes === "00"){
    formated = seconds;
    return formated;
   }else if (hours === "00"){
    formated =  minutes+":"+seconds;
    return formated;
   } else{
    formated = hours +":"+ minutes+":"+seconds;
    return formated;
   }

}
//helper function for convertTime
function pad(n){
    return (n < 10) ? ("0" + n) : n;
  }

function filler(){
  var circle2Height, ratio;

  if(state === true){
    ratio = ((sessionLength*60)-time)/(sessionLength*60);
  }else{
    ratio = ((breakLength*60)-time)/(breakLength*60);
  }

  circle2Height = Math.round(200 * ratio)
  console.log("state: ", state, "  circle2Height: ", circle2Height);
  document.getElementById("circle2").style.height = circle2Height+"px";
}//end of filler


//managing audio
var audio = new Audio('http://soundbible.com/grab.php?id=1815-A-Tone&type=mp3');

function beep() {

  audio.play();
}


//function that display the time decreasing
function displayTimer(time){
  document.getElementById("displayTime").innerHTML = time;
}


manageStart();
convertTime(sessionLength*60);
displayTimer(formated);





};//end of window.onload




