let clockArr = document.getElementsByClassName("clock");

for(let i=0; i<clockArr.length; i++){
    drawSegments(clockArr[i]);
}

function drawSegments(clock) {
    for(let i=1; i<=12; i++){
        let segment = document.createElement('div');
        segment.setAttribute("class", "segment");
        let num = document.createTextNode(i.toString());
        segment.appendChild(num);
        clock.appendChild(segment);
        let cos = Math.cos(toRadians(30*(i-3)))*80;
        let sin = Math.sin(toRadians(30*(i-3)))*80;
        segment.style.transform = "translate("+cos+"px,"+sin+"px)";
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI/180);
}


function TimeModel() {

    this.hours = null;
    this.minutes = null;
    this.seconds = null;

    var myView = null;
    var myTimezone = null;

    this.start = function(view, timezone) {
        myView = view;
        myTimezone = timezone;
    };

    this.setTime = function (date) {
        this.hours = date.getUTCHours()+myTimezone;
        if(this.hours>23){
            this.hours -=24;
        }
        this.minutes = date.getUTCMinutes();
        this.seconds = date.getUTCSeconds();
    };

    this.tick = function () {
        this.seconds += 1;
        if(this.seconds > 59){
            this.seconds-=60;
            this.minutes+=1;
        }
        if(this.minutes > 59){
            this.minutes-=60;
            this.hours+=1;
        }
        if(this.hours > 23){
            this.hours=0;
        }
        this.updateView();
    };

    this.updateView = function () {
        if (myView){
            myView.update();
        }
    };
}


function TimeView() {
    let myModel = null;
    let myField = null;
    let hoursDiv = null;
    let minutesDiv = null;
    let secondsDiv = null;

    this.start=function(model,field) {
        myModel = model;
        myField = field;
        hoursDiv=myField.querySelector(".hours");
        minutesDiv=myField.querySelector(".minutes");
        secondsDiv=myField.querySelector(".seconds");
    };

    this.update=function() {
        hoursDiv.style.transform = "rotate("+360/12 * (myModel.hours + myModel.minutes/60)+"deg)";
        minutesDiv.style.transform = "rotate("+360/60 * (myModel.minutes + myModel.seconds/60)+"deg)";
        secondsDiv.style.transform = "rotate("+360/60 * myModel.seconds+"deg)";
    };
}



function TimeController() {
    let myModel = null;
    let myField = null;
    let id;

    this.start=function(model,field) {
        myModel = model;
        myField = field;

        let buttonStart = myField.querySelector(".start");
        buttonStart.addEventListener("click", this.startClock);
        let buttonStop = myField.querySelector(".stop");
        buttonStop.addEventListener("click", this.stopClock);

        this.startClock();
    };

    this.startClock = function () {
        let date = new Date();
        myModel.setTime(date);
        if(id){
            clearInterval(id);
        }
        id = setInterval(function(){
            myModel.tick();
        }, 1000);

    };

    this.stopClock = function () {
        clearInterval(id);
    };
}

function createInstance(timezone, field) {
    let timeModel = new TimeModel();
    let timeView = new TimeView();
    let timeController = new TimeController();

    let currentField = document.getElementById(field);

    timeModel.start(timeView, timezone);
    timeView.start(timeModel, currentField);
    timeController.start(timeModel, currentField);

    timeModel.updateView();
}

createInstance(-5, "field1");
createInstance(0, "field2");
createInstance(1, "field3");
createInstance(3, "field4");
createInstance(9, "field5");
createInstance(10, "field6");