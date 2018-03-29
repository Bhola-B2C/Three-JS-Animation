/* Author: Bhola Nath Chowdhary */
/* Institute: National Institute of Technology, Durgapur */

/* Terminology of source code */
/* Car1 => Blue Car */
/* Car2 => Red Car */
/* Car3 => Orange Car */
/* Car4 => Green Car */
/* Car5 => Yellow Car */

/* Scene Dimensions (in meters: at z = -2) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Car objects in scene */
var car1;
var car2;
var car3;
var car4;
var car5;
var geometry;
var time1;
var time2;
var time3;
var time4;
var time5;
var user_car=-1;
var carSelect = ["Blue Car" , "Red Car" , "Orange Car" , "Green Car" , "Yellow Car"];

/* Other physics variable */
var t=0;				/* Initial time */
var speed1;	            /* Initial Speed of Car 1 */
var speed2;	            /* Initial Speed of Car 2 */
var speed3;	            /* Initial Speed of Car 3 */
var speed4;	            /* Initial Speed of Car 4 */
var speed5;	            /* Initial Speed of Car 5 */
var divider=1000000;    /* To realize the speed of car, actual speed will be speed/divider */
var flag;                // To avoid multiple alerts when race is completed
var flag1, flag2, flag3, flag4, flag5;      // To disable the checkbox when anyone car completes the race

/* createMesh function to add png file */
function createMesh(geom, imageFile) {
       var texture = new THREE.TextureLoader().load(imageFile);
       var mat = new THREE.MeshBasicMaterial();
       mat.map = texture;
       mat.transparent = true;
       mat.map.needsUpdate = true;
       var mesh = new THREE.Mesh(geom, mat);
       PIErender();
       return mesh;
}

/* Load Experiment Objects Code */

var helpContent;
function initialiseHelp() {
	helpContent="";
	helpContent = helpContent + "<h2>Which is the fastest car</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows four car lining up for the race in race track.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>Click on the start button above in Control Menu</p>";
    helpContent = helpContent + "<p>As soon as start button is clicked, race will start each car having random speed.</p>";
    helpContent = helpContent + "<p>A list of checkbox will pop from top-right side, you will get only one chance to guess the fastest car.</p>";
    helpContent = helpContent + "<p>As soon as any checkbox is selected or any car finishes the race, you will not be allowed to select any car.</p>";
    helpContent = helpContent + "<p>The software will assume that you haven't chosen any car.</p>";
    helpContent = helpContent + "<p>And if you have chosen any car, Message box will be displayed accordingly at the end of the race.</p>";
    helpContent = helpContent + "<p>You can reset the setup on clicking on reset button.</p>";
    helpContent = helpContent + "<p><b>Make sure to run this experiment in any server (python -m http.server or wamp) otherwise you will face COR error!!</b></p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
	infoContent="";
	infoContent = infoContent + "<h2>Experiment Concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows five cars</p>";
    infoContent = infoContent + "<h3>Speed of car</h3>";
    infoContent = infoContent + "<p>The rate at which someone or something moves or operates or is able to move or operate.</p>";
    infoContent = infoContent + "<p>Its SI unit is m/s. The fastest moving particle in universe is light whose speed is 3x10^8 m/s.</p>";
    infoContent = infoContent + "<p>The formula to calculate speed of any object is: </p>";
    infoContent = infoContent + "<ul><li> s=d/t </li></ul>";
    infoContent = infoContent + "<p>'s' is the speed of the body, 'd' is the distance covered by the body, and 't' is the time taken by the body to cover 'd' distance</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
	PIEupdateInfo(infoContent);
}

/* method to initialise physics variable */
function initialiseVariable() {
    flag=1,flag1=1, flag2=1, flag3=1, flag4=1, flag5=1;

    /* randomly choose the speed of cars between 1 and 12 which will be divided by divider later on */
    speed1 = Math.floor(Math.random() * 12) + 1;
    speed2 = Math.floor(Math.random() * 12) + 1;
    speed3 = Math.floor(Math.random() * 12) + 1;
    speed4 = Math.floor(Math.random() * 12) + 1;
    speed5 = Math.floor(Math.random() * 12) + 1;
    speed1/=divider;
    speed2/=divider;
    speed3/=divider;
    speed4/=divider;
    speed5/=divider;
}

/* method to initialise scene object */
function initialiseObject() {

    geometry = new THREE.PlaneGeometry(0.2,0.2);
    var geometry_alien = new THREE.PlaneGeometry(0.2,0.5);

    /* Add Blue Car */
    car1 = createMesh(geometry,"blue_car.png");
    car1.position.set(-1.0, 0.4, -2);
    car1.castShadow = true;
    car1.receiveShadow = true;
    PIEaddElement(car1);

    /* Add Red Car */
    car2 = createMesh(geometry,"red_car.png");
    car2.position.set(-1.0, 0.2, -2);
    car2.castShadow = true;
    car2.receiveShadow = true;
    PIEaddElement(car2);

    /* Add Orange Car */
    car3 = createMesh(geometry,"orange_car.png");
    car3.position.set(-1.0, 0.0, -2);
    car3.castShadow = true;
    car3.receiveShadow = true;
    PIEaddElement(car3);

    /* Add Green Car */
    car4 = createMesh(geometry,"green_car.png");
    car4.position.set(-1.0, -0.2, -2);
    car4.castShadow = true;
    car4.receiveShadow = true;
    PIEaddElement(car4);

    /* Add Yellow Car */
    car5 = createMesh(geometry,"yellow_car.png");
    car5.position.set(-1.0, -0.4, -2);
    car5.castShadow = true;
    car5.receiveShadow = true;
    PIEaddElement(car5);


}

function initialiseScene() {

	/* Initialise Scene Variable */

    mySceneTLX = 0.0;
    mySceneTLY = 50;
    mySceneBRX = 52;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

    /* Load Race Track */
    PIEscene.background = new THREE.TextureLoader().load('road5.png');

    /* Initialise Objects of Scene */
    initialiseObject();

    /* Initialise Physics Variables */
    initialiseVariable();
}

function loadExperimentElements(){

	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "25%";
	div.style.left = "25%";
	div.style.color = "blue";
	div.style.height = "50%";
	div.style.width = "50%";
	div.style.textAlign = "center";
	div.style.zIndex = "100";
	div.style.display = "none";
	div.style.background = "#fff";
	div.style.borderStyle = "dashed";
	div.setAttribute('id', 'res');
	document.body.appendChild(div);

	PIEsetExperimentTitle("Which one is fastest");
	PIEsetDeveloperName("Bhola Nath Chowdhary");
	PIEhideControlElement();

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* Add Menu Control to allow the interaction with user */
    PIEaddDisplayCheckbox('Blue Car', false, checkCar1);
	PIEaddDisplayCheckbox('Red Car', false, checkCar2);
	PIEaddDisplayCheckbox('Orange Car', false, checkCar3);
	PIEaddDisplayCheckbox('Green Car', false, checkCar4);
	PIEaddDisplayCheckbox('Yellow Car', false, checkCar5);
}

function updateExperimentElements(t, dt) {
    

    /* Features to allow users to click on respective car */
    // car1.click = function() { user_car=1; }
    // car2.click = function() { user_car=2; }
    // car3.click = function() { user_car=3; }
    // car4.click = function() { user_car=4; }
    // car5.click = function() { user_car=5; }

	var x1=car1.position.x;
	var y1=car1.position.y;
	var x2=car2.position.x;
	var y2=car2.position.y;
	var x3=car3.position.x;
	var y3=car3.position.y;
	var x4=car4.position.x;
	var y4=car4.position.y;
	var x5=car5.position.x;
	var y5=car5.position.y;

    /* As soon as car reaches end point calculate time for respective car and disable all check box */
    if(x1>=1.0 && flag1===1) {

        time1=t/1000;
        flag1=0;
        speed1=0;
        disableAllCheckbox();
    }
    if(x2>=1.0 && flag2===1) {

        time2=t/1000;
        flag2=0;
        speed2=0;
        disableAllCheckbox();
    }
    if(x3>=1.0 && flag3===1) {

        time3=t/1000;
        flag3=0;
        speed3=0;
        disableAllCheckbox();
    }
    if(x4>=1.0 && flag4===1) {

        time4=t/1000;
        flag4=0;
        speed4=0;
        disableAllCheckbox();
    }
    if(x5>=1.0 && flag5===1) {

        time5=t/1000;
        flag5=0;
        speed5=0;
        disableAllCheckbox();
    }

    /* Triggers when all the cars reaches the end point */
    if (x1>=1.0 && x2>=1.0 && x3>1.0 && x4>=1.0 && x5>=1.0 && flag===1) {

        var msg;                                                    // result message
        var fastest_car=Math.min(time1,time2,time3,time4,time5);    // time taken by the fastest car
        var time_arr=[time1,time2,time3,time4,time5];               // insert time taken by all car in time_arr array

        // console.log(time_arr.indexOf(fastest_car));

        /* If user don't select any car */
        if(user_car===-1) {
            msg="You didn't selected any Car! Click on reset to start again!!";
        }
        /* If user select the correct car */
        else if(time_arr[user_car-1]===fastest_car) {
            msg="Hurray! Your Selected Car was fastest";
        }
        /* If user select the wrong car */
        else {
            msg="Oops! Your selected car wasn't fastest!!";
        }
        /* Display the message accordingly */
        document.getElementById("res").style.display = "block"; 
        var res_info = "<h2><strong>Race is Completed !!</strong></h2><hr>";
        res_info+= "<h3>" + "Time taken by Blue Car: " + time1 + " sec" + "<br>" +"Time taken by Red Car: " + time2 + " sec" + "<br>" + "Time taken by Orange Car: " + time3 + " sec" + "<br>" +"Time taken by Green Car: " + time4 + " sec" +"<br>" +"Time taken by Yellow Car: "+ time5 + " sec" + "</h3>";
        res_info+= "<h4><span> You selected: " + ((user_car===-1)?"none": carSelect[user_car-1]) + "</span><span> | Fastest Car: " + carSelect[time_arr.indexOf(fastest_car)] + "</h4>";
        document.getElementById('res').innerHTML = res_info + "<h4>" + msg + "</h4>";
        flag=0;
    }

	t=t+dt;
    if(t!=0)
    {
        x1+=speed1*(dt+t);
        x2+=speed2*(dt+t);
        x3+=speed3*(dt+t);
        x4+=speed4*(dt+t);
        x5+=speed5*(dt+t);
    }

	car1.position.set(x1,y1,-2.0);
	car2.position.set(x2,y2,-2.0);
	car3.position.set(x3,y3,-2.0);
	car4.position.set(x4,y4,-2.0);
	car5.position.set(x5,y5,-2.0);
}

function resetExperiment() {

    car1.position.set(-1.0,0.4,-2.0);
	car2.position.set(-1.0,0.2,-2.0);
	car3.position.set(-1.0,0.0,-2.0);
	car4.position.set(-1.0,-0.2,-2.0);
	car5.position.set(-1.0,-0.4,-2.0);

    initialiseVariable();
    document.getElementById("res").style.display = "none"; 
    enableAllCheckbox();
    for(var i=0 ; i<5; i++){
        PIEchangeDisplayCheckbox(carSelect[i], false);
    }

}

/* Method to disable all checkboxes */
function disableAllCheckbox() {
    for(var i=0;i<5;i++) {
        document.getElementsByTagName('INPUT')[i].disabled = true;
    }
}

/* Method to enable all checkboxes */
function enableAllCheckbox() {
    for(var i=0;i<5;i++) {
        document.getElementsByTagName('INPUT')[i].disabled = false;
    }
}

/* Methods to make checkbox work like radio button */
function checkCar1(){
    for(var i=0 ; i<5; i++){
        if(i != 0){
            PIEchangeDisplayCheckbox(carSelect[i], false);
        }
    }
    PIEchangeDisplayCheckbox(carSelect[0], true);
    user_car=1;
    disableAllCheckbox();
}

function checkCar2(){
    for(var i=0 ; i<5; i++){
        if(i != 1){
            PIEchangeDisplayCheckbox(carSelect[i], false);
        }
    }
    PIEchangeDisplayCheckbox(carSelect[1], true);
    user_car=2;
    disableAllCheckbox();
}

function checkCar3(){
    for(var i=0 ; i<5; i++){
        if(i != 2){
            PIEchangeDisplayCheckbox(carSelect[i], false);
        }
    }
    PIEchangeDisplayCheckbox(carSelect[2], true);
    user_car=3;
    disableAllCheckbox();
}

function checkCar4(){
    for(var i=0 ; i<5; i++){
        if(i != 3){
            PIEchangeDisplayCheckbox(carSelect[i], false);
        }
    }
    PIEchangeDisplayCheckbox(carSelect[3], true);
    user_car=4;
    disableAllCheckbox();
}

function checkCar5(){
    for(var i=0 ; i<5; i++){
        if(i != 4){
            PIEchangeDisplayCheckbox(carSelect[i], false);
        }
    }
    PIEchangeDisplayCheckbox(carSelect[4], true);
    user_car=5;
    disableAllCheckbox();
}