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

    this.setTime = function (hours, minutes, seconds) {
        this.hours = (hours+myTimezone>23) ? hours+myTimezone-24 : hours+myTimezone;
        this.minutes = minutes;
        this.seconds = seconds;
    };

    this.updateView = function () {
        if ( myView )
            myView.update();
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
    }
}


function TimeView() {
    var myModel = null;
    var myField = null;
    var hoursDiv = null;
    var minutesDiv = null;
    var secondsDiv = null;

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
    var myModel = null;
    var myField = null;
    var id;

    this.start=function(model,field) {
        myModel = model;
        myField = field;

        var buttonStart = myField.querySelector(".start");
        buttonStart.addEventListener("click", this.startClock);
        var buttonStop = myField.querySelector(".stop");
        buttonStop.addEventListener("click", this.stopClock);

        this.startClock();
    };

    this.startClock = function () {
        let date = new Date();
        myModel.setTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        id = setInterval(function(){
            myModel.tick();
        }, 1000);
    };

    this.stopClock = function () {
        clearInterval(id);
    };
}

var timeModel1 = new TimeModel();
var timeView1 = new TimeView();
var timeController1 = new TimeController();

var field1 = document.getElementById("field1");

timeModel1.start(timeView1, -5);
timeView1.start(timeModel1, field1);
timeController1.start(timeModel1, field1);

timeModel1.updateView();


var timeModel2 = new TimeModel();
var timeView2 = new TimeView();
var timeController2 = new TimeController();

var field2 = document.getElementById("field2");

timeModel2.start(timeView2, 0);
timeView2.start(timeModel2, field2);
timeController2.start(timeModel2, field2);

timeModel2.updateView();


var timeModel3 = new TimeModel();
var timeView3 = new TimeView();
var timeController3 = new TimeController();

var field3 = document.getElementById("field3");

timeModel3.start(timeView3, 1);
timeView3.start(timeModel3, field3);
timeController3.start(timeModel3, field3);

timeModel3.updateView();


var timeModel4 = new TimeModel();
var timeView4 = new TimeView();
var timeController4 = new TimeController();

var field4 = document.getElementById("field4");

timeModel4.start(timeView4, 3);
timeView4.start(timeModel4, field4);
timeController4.start(timeModel4, field4);

timeModel4.updateView();


var timeModel5 = new TimeModel();
var timeView5 = new TimeView();
var timeController5 = new TimeController();

var field5 = document.getElementById("field5");

timeModel5.start(timeView5, 9);
timeView5.start(timeModel5, field5);
timeController5.start(timeModel5, field5);

timeModel5.updateView();


var timeModel6 = new TimeModel();
var timeView6 = new TimeView();
var timeController6 = new TimeController();

var field6 = document.getElementById("field6");

timeModel6.start(timeView6, 10);
timeView6.start(timeModel6, field6);
timeController6.start(timeModel6, field6);

timeModel6.updateView();