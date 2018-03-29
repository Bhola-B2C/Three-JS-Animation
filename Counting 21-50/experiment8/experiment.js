/* Author: Bhola Nath Chowdhary */
/* Institute: National Institute of Technology, Durgapur */

/* Terminology of source code */



var totalIndividualStick, totalBunch, totalStick;
var answer;
var match;
var bunch=[];
var div;
var countTill = 0;

var font;
var id;
var system1, system2, system, scene2;
var headings=[];

var listener, sound, AudioLoader;
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
    helpContent = helpContent + "<h2>Counting 21-50</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment renders the random number of matchsticks</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>Click on the start button above in Control Menu</p>";
    helpContent = helpContent + "<p>Control Menu features three Display Text and three Button</p>";
    helpContent = helpContent + "<p><b>Note: </b>The bundle of matchstick contain <b>10</b> individual matchsticks</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Answer: Write the answer in this textbox after Counting the number of matchsticks.</li>";
    helpContent = helpContent + "<li>Correct: This textbox displays the number of correct attempts you have taken.</li>";
    helpContent = helpContent + "<li>Wrong: This displays the number of rounds you have answered wrong.</li>";
    helpContent = helpContent + "<li>Submit: Click this button if you are sure about your answer. It will increase the counts of correct and wrong answers accordingly.</li>";
    helpContent = helpContent + "<li>Verify: Click this button to verify your submitted answer. It counts the number of matchsticks with the help of animation.</li>";
    helpContent = helpContent + "<li>Next: Click this to enter into next round.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
    infoContent="";
    infoContent = infoContent + "<h2>Experiment Concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>Counting the number of matchsticks</p>";
    infoContent = infoContent + "<p>1 bundle matchstick = 10 individual matchsticks";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

/* method to initialise physics variable */
function initialiseVariable() {
    
}

/* method to initialise scene object */
function initialiseObject() {

    geometry = new THREE.PlaneGeometry(0.2,0.2);
    totalBunch = Math.floor((Math.random() * (4-2+1)) + 2);
    for(var i=0;i<totalBunch;i++) {
        bunch[i] = createMesh(geometry, "./assets/bunch2.png");
        bunch[i].scale.set(2,2,2);
        bunch[i].position.set(0-(i+1)/8,0,-2);
        bunch[i].rotation.set(0,0,0);
        bunch[i].castShadow = true;
        bunch[i].receiveShadow = true;
        PIEaddElement(bunch[i]);
    }    

    totalIndividualStick = Math.floor((Math.random() * 10) + 0);
    match = [];
    for(var i=0; i<totalIndividualStick; i++) {
        match[i] = createMesh(geometry,"./assets/match_stick.png");
        match[i].scale.set(2,2,2);
        match[i].position.set(0+i/30, 0, -2);
        match[i].castShadow = true;
        match[i].receiveShadow = true;
        PIEaddElement(match[i]);
    }
    totalStick=totalIndividualStick+10*totalBunch;
    console.log(totalStick);
}

function shower(right){
    cancelAnimationFrame(id);
    system1.visible=false;
    system2.visible=false;            
    PIEpauseAnimation();
    PIErenderer.autoClear=false;

    if(right){
        system1.visible=true;
        system=system1;
        headings[0].visible=true;
        headings[1].visible=false;
    }
    else{
        system2.visible=true;
        system=system2;
        headings[1].visible=true;
        headings[0].visible=false;
    }

    function render(){
        var a = system.geometry.vertices;
        // console.log(a);
        a.forEach(function (v) {
            v.y-=v.velocityY;
            v.x-=v.velocityX;
            if(v.y<-10)
                v.y=10;
            if(v.x<-20 || v.x>20)
                v.velocityX*=-1;
        });
        if(headings[0].scale.x>=1.75 || headings[1].scale.x>=1.75){
            headings[0].scale.set(1,1,1);
            headings[1].scale.set(1,1,1);
            system1.visible=false;
            system2.visible=false;
            cancelAnimationFrame(id);
            system1.visible=false;
            system2.visible=false;  
            PIErenderer.autoClear=true;
            headings[0].visible=false;
            headings[1].visible=false;
            PIEresumeAnimation(); 
            return;     
        }
        if(headings[0].visible){
            headings[0].scale.x+=0.005;
            headings[0].scale.y+=0.005;
            headings[0].scale.z+=0.005;
        }
        if(headings[1].visible){
            headings[1].scale.x+=0.005;
            headings[1].scale.y+=0.005;
            headings[1].scale.z+=0.005;
        }
        system.geometry.verticesNeedUpdate = true;
        PIErenderer.clear();
        PIErender();
        PIErenderer.clearDepth();
        PIErenderer.render(scene2, PIEcamera);
        id=requestAnimationFrame(render);
    }
    render();
}

function initialiseScene() {

    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEscene.add(new THREE.AmbientLight(0xffffff));

    scene2=new THREE.Scene();

    /* Initialise Objects of Scene */
    initialiseObject();

    /* Initialise Physics Variables */
    initialiseVariable();
}

function loadExperimentElements(){

    PIEsetExperimentTitle("Counting 21-50");
    PIEsetDeveloperName("Bhola Nath Chowdhary");
    initialiseControls();

    div = document.createElement("div");
    div.style.position = "absolute";
    div.innerHTML = "Count the MatchSticks";
    div.backgroundColor = "#ffffff";
    div.style.top = "20%";
    div.style.left = "25%";
    div.style.color = "blue";
    div.style.height = "10%";
    div.style.width = "50%";
    div.style.textAlign = "center";
    div.style.fontSize = "50px";
    div.style.zIndex = "100";
    div.style.fontFamily = "Arial";
    div.setAttribute('id', 'anim');
    document.body.appendChild(div);
    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    loader=new THREE.TextureLoader();
    loader.load("./assets/ButtonSmiley.png", function(texture){
        geometry=new THREE.Geometry();
        material=new THREE.ParticleBasicMaterial({
            size:0.5,
            transparent:true,
            opacity:true,
            map:texture,
            blending:THREE.AdditiveBlending,
            sizeAttenuation:true,
            color:0x00ff00
        });
        var range=30;
        for(var i = 0; i<1000; i++){
            var particle = new THREE.Vector3(
                Math.random()*range-range/2+7.5,
                Math.random()*range*1.5,
                -2  
            );
            particle.velocityY = 0.025+Math.random()/10;
            particle.velocityX=(Math.random()-0.5)/20;
            geometry.vertices.push(particle);
        }

        system1 = new THREE.ParticleSystem(geometry, material);
        system1.sortParticles=true;
        system1.dynamic=true;
        PIEscene.add(system1);
        scene2.add(system1);
        system1.visible=false;
        // PIEremoveElement(listener);
        // PIEaddElement(listener);
    });

    loader.load("./assets/ButtonSadSmiley.png", function(texture){
        geometry=new THREE.Geometry();
        material=new THREE.ParticleBasicMaterial({
            size:0.5,
            transparent:true,
            opacity:true,
            map:texture,
            blending:THREE.AdditiveBlending,
            sizeAttenuation:true,
            color:0xff0000
        });
        var range=30;
        for(var i = 0; i<1000; i++){
            var particle = new THREE.Vector3(
                Math.random()*range-range/2+7.5,
                Math.random()*range*1.5,
                -2  
            );
            particle.velocityY = 0.025+Math.random()/6;
            particle.velocityX=(Math.random()-0.5)/20;
            geometry.vertices.push(particle);
        }

        system2 = new THREE.ParticleSystem(geometry, material);
        system2.sortParticles=true;
        system2.dynamic=true;
        PIEscene.add(system2);
        scene2.add(system2);
        system2.visible=false;
    });

    loader = new THREE.FontLoader();
    loader.load("./assets/optimer.json", function(response){
        font = response;
        geometry = new THREE.TextGeometry('CORRECT!', {
            font : font,
            size : 0.2,
            height : 0.2
        });
        headings[0]=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:0x00ff00}));
        headings[0].translation = geometry.center();
        PIEaddElement(headings[0]);
        headings[0].visible=false;
        headings[0].position.set(0, 0, -2);
        headings[0].lookAt(PIEcamera.position);

        geometry = new THREE.TextGeometry('WRONG!', {
            font : font,
            size : 0.2,
            height : 0.2
        });
        headings[1]=new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:'red'}));
        headings[1].translation = geometry.center();
        PIEaddElement(headings[1]);
        headings[1].castShadow=false;
        headings[1].visible=false;
        headings[1].position.set(0, 0, -2);
        headings[1].lookAt(PIEcamera.position);

    });

    // // create an AudioListener and add it to the camera
    // listener = new THREE.AudioListener();

    // // create a global audio source
    // sound = new THREE.Audio( listener );
    // audioLoader = new THREE.AudioLoader();
    // audioLoader.load( './assets/applause-2.mp3', function( buffer ) {
    //     sound.setBuffer( buffer );
    //     sound.setLoop( true );
    //     sound.setVolume( 0.5 );
    //     sound.play();
    // });

}

function initialiseControls(){
   
    PIEaddDisplayText("Answer", 0);
    PIEaddDisplayText("Correct", 0);
    PIEaddDisplayText("Wrong", 0);
    document.getElementsByTagName('INPUT')[1].disabled = true;
    document.getElementsByTagName('INPUT')[2].disabled = true;
    PIEaddDisplayCommand("Submit", function() {
        document.getElementsByTagName('INPUT')[0].disabled = true;
        answer=PIEgetDisplayText("Answer");
        if(answer===totalStick) {
            PIEchangeDisplayText("Correct", PIEgetDisplayText("Correct")+1);
            shower(true);
            headings[0].visible=true;
            PIEaddElement(scene2);
        }
        else {
            PIEchangeDisplayText("Wrong", PIEgetDisplayText("Wrong")+1);
            shower(false);
            headings[1].visible=true;
        }
    });
    PIEaddDisplayCommand("Verify", function() {
        document.getElementsByTagName('INPUT')[0].disabled = true;
        var j,k;
        for(var i=0;i<totalBunch;i++) {
            j=0;
            (function() {
                setTimeout(function() {
                    if(j!=0)
                        bunch[totalBunch-j].scale.set(2,2,2);
                    bunch[totalBunch-j-1].scale.set(3,3,3);
                    j++;
                    div.innerHTML = countTill+10;
                    countTill+=10; 
                }, i*800, i);
            })(i);
        }
        for(var i=0;i<totalIndividualStick;i++) {
            k=0;
            (function() {
                setTimeout(function() {
                    bunch[0].scale.set(2,2,2);
                    if(k!=0)
                        match[k-1].scale.set(2,2,2);
                    match[k].scale.set(3,3,3);
                    k++;
                    div.innerHTML = countTill+1;
                    countTill+=1;
                }, totalBunch*800+i*800, i);
            })(i);
        }
        setTimeout(function() {
            if(totalIndividualStick===0)
                bunch[0].scale.set(2,2,2);
        }, totalBunch*800);
        setTimeout(function() {
            if(totalIndividualStick!==0)
                match[totalIndividualStick-1].scale.set(2,2,2);
        }, totalBunch*800+totalIndividualStick*800);
    });
    PIEaddDisplayCommand("Next", function() {
        PIEchangeDisplayText("Answer", 0);
        document.getElementsByTagName('INPUT')[0].disabled = false;
        for(var i=0;i<totalIndividualStick;i++) {
            PIEremoveElement(match[i]);
        }
        for(var i=0;i<totalBunch;i++) {
            PIEremoveElement(bunch[i]);
        }
        initialiseObject();
        div.innerHTML = "Count the MatchSticks";
    });
}

function updateExperimentElements(t, dt) {
    
}

function resetExperiment() {
    for(var i=0;i<totalIndividualStick;i++) {
        PIEremoveElement(match[i]);
    }
    for(var i=0;i<totalBunch;i++) {
        PIEremoveElement(bunch[i]);
    }
    initialiseObject();
    div.innerHTML = "Count the MatchSticks";
    PIEchangeDisplayText("Answer", 0);
    PIEchangeDisplayText("Correct", 0);
    PIEchangeDisplayText("Wrong", 0);
}
