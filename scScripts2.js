// StarCatcher Scripts for the game made by Soft Dev 2015
    // when the web page window loads up, the game scripts will be read
var star = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,
    _sh: 40,
    _sw: 40,
    // add this to the variable list at the top of the star class
    _visible: true,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._img = new Image();
        obj._img.src="images/star.png";
        return obj;
    },

    setSize: function(sw,sh){
        this._sw=sw;
        this._sh=sh;
    },

    // and this just below the other functions in the star class
    visible: function() {
        return this._visible;
    },

    setImage: function(img){
        this._img.src=img;
    },

    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
}; // close star object

var badStar = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,
    _sh: 50,
    _sw: 50,
    // add this to the variable list at the top of the star class
    _visible: true,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._img = new Image();
        obj._img.src="images/bstar.jpg";
        return obj;
    },

    // and this just below the other functions in the star class
    visible: function() {
        return this._visible;
    },

    //Update the new x and y of the star based on the speed.
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
}; // close bad star object


window.onload = function() {
    //load canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
        w = canvas.width = 1000,
        h = canvas.height = 550;
        ctx.fillStyle= "rgba(250,0,0,.4)";
        ctx.fillRect(50,50,w-100,h-100);
        ctx.fillStyle="black";
        ctx.font="30px Sans-Serif";
 ctx.fillText("Stars +1 Life, Hunters -1 Life",w/4,h/2);
 ctx.fillText("Play 3 levels, best of 3 wins",w/4,h/4);
 ctx.fillText("L1 5 GoodStars, L2 10 GoodStars, L3 5 GoodStars",w/8,h/1.5);
 ctx.fillText("Change GoodStars in line 116",w/8,h-30);

    // load variables
    var p1x=w/2+100, p1y=h/2, p2x=w/2-100, p2y=h/2;
    var gameOn=0;
    var p1Score=0, p2Score=0, p1Lives=3, p2Lives=3;

    //load images
    var background = new Image();
    background.src="images/bg2.jpg";
    var ship1 = new Image();
    ship1.src="images/spaceship1.png"
    var ship2 = new Image();
    ship2.src="images/spaceship2.png"

    // moving stars around the screen and update the players movement
   // our stars are created using a single array with a class of information
    var starCount=25;
    var starArray=[];

    // Create an array of stars
    for (var i = 0; i < starCount; i++) {
        // this assigns each element in the array all the information for the star by 
        // using the 'star' class, pass the starting x,y locations 
        //  and speeds into the array.
        starArray.push(star.create(w/2, 5*i+50,5-Math.random()*10,5-Math.random()*10));
    } // close star array

    // our BADstars are created using a single array with a class of information
    var badStarCount=15;
    var badStarArray=[];

    // Create an array of stars
    for (var i = 0; i < badStarCount; i++) {
      
        badStarArray.push(badStar.create(w/2,5*i+50,5-Math.random()*10,5-Math.random()*10));
    }


    function starsUpdate () {
        // to move the stars around
        //  draw star on screen only if visible
        // this checks to see if the star is visible
            for (var i = 0; i < starCount; i++) {
                if (starArray[i].visible()) {
                starArray[i].update();
                ctx.drawImage(starArray[i]._img, starArray[i]._x, starArray[i]._y, starArray[i]._sw, starArray[i]._sh);
                if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
                if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}
                if (Math.abs(p1x-starArray[i]._x)<20 & Math.abs(p1y-starArray[i]._y)<20) {scoring(i,1)}
                if (Math.abs(p2x-starArray[i]._x)<20 & Math.abs(p2y-starArray[i]._y)<20) {scoring(i,2)}
        }

        }//endFor     

        //  draw star on screen only if visible
        // this checks to see if the star is visible
            for (var i = 0; i < badStarCount; i++) {
                if (badStarArray[i].visible()) {
                badStarArray[i].update();
                ctx.drawImage(badStarArray[i]._img, badStarArray[i]._x, badStarArray[i]._y, badStarArray[i]._sw, badStarArray[i]._sh);
                if (badStarArray[i]._x>w || badStarArray[i]._x<0) {badStarArray[i]._xSpeed = -badStarArray[i]._xSpeed}
                if (badStarArray[i]._y>h || badStarArray[i]._y<0) {badStarArray[i]._ySpeed = -badStarArray[i]._ySpeed}
                if (Math.abs(p1x-badStarArray[i]._x)<20 & Math.abs(p1y-badStarArray[i]._y)<20) {lives(i,1);}
                if (Math.abs(p2x-badStarArray[i]._x)<20 & Math.abs(p2y-badStarArray[i]._y)<20) {lives(i,2);}
        }

        }//endFor    bad star

    }  // close starsUpdate
   // a new array is made to keep track of a button being held down
    var keysDown = [];

    // if the key is held down, the keycode is placed in array
    // then it is deleted upon keyup command.  
    // playerUpdate will now control player movements and use the keysDown array

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;  // start the game with keyboard command
        if (e.keyCode == 32) {
            if (gameOn==0){
                gameOn=1
                main();// (key: space bar to start game)
                
                console.log("play")
            }
            else{
                gameOn=0
                console.log("pause")
            }
        }//end if
    }, false);

    //  player 2 movement keyboard commands
    addEventListener("keyup", function (e) {

        //take keycode out of array (not being held down anymore)
        delete keysDown[e.keyCode];
    }, false); 

 //player movement
    function playerUpdate() {
        //player two hodling down a key using the array keysDown
        if (87 in keysDown) {// P2 holding down the w key
            p2y -= 5;
        }
        if (83 in keysDown) { // P2 holding down (key: s)
            p2y += 5;
        }
        if (65 in keysDown) { // P2 holding down (key: a)
            p2x -= 5;
        }
        if (68 in keysDown) { // P2 holding down (key: d)
            p2x += 5;
        }

        // player one hodling key down
        if (37 in keysDown) { // P2 holding down (key: left arrow)
            p1x -= 5;
        }
        if (38 in keysDown) { // P2 holding down (key: up arrow)
            p1y -= 5;
        }
        if (39 in keysDown) { // P2 holding down (key: right arrow)
            p1x += 5;
        }
        if (40 in keysDown) { // P2 holding down (key: down arrow)
            p1y += 5;
        }
        
        if (p1x>w-40) {p1x=41}
        if (p1x<40) {p1x=w-41}
        
        if (p1y>h-40) {p1y=-5}
        if (p1y<-20) {p1y=h-51}

        if (p2x>w-40) {p2x=41}
        if (p2x<40) {p2x=w-41}
        
        if (p2y>h-40) {p2y=-5}
        if (p2y<-20) {p2y=h-41}
         
        //draw images of ships
        ctx.drawImage(ship1, p1x, p1y, 40, 40);
        ctx.drawImage(ship2, p2x, p2y, 40, 40);
    }
           
     

    //Our main function which clears the screens 
    //  and redraws it all again through function updates,
    //  then calls itself out again
    function main(){
        ctx.clearRect(0,0,w,h);
        ctx.drawImage(background,0,0,w,h);
        starsUpdate();
        playerUpdate();
        if(gameOn==1){
            requestAnimationFrame(main);
        }
    }
   
   function scoring(k,wp) {
        starArray[k]._visible=false;
        if (wp==1) {
            // need to place a small star next to player 1 score
            p1Lives=p1Lives+1;
            $("#p1LivesDisp").text(p1Lives);
        }
        else if (wp==2) {
            p2Lives=p2Lives+1;
            $("#p2LivesDisp").text(p2Lives);
        }
    } //close scoring
    function lives(k,wp) {
        badStarArray[k]._visible=false;
        badStarArray[k]._x=w+900;
        if (wp == 1) {
            p1Lives=p1Lives-1;
            if (p1Lives<=0) {
                p1Score-=10; 
                gameOn=false;
                endGame(1);
            }
            $("#p1LivesDisp").text(p1Lives);
            console.log(p1Lives);
            p1x=w/2, p1y=h/2;

        } //close if wp
        if (wp == 2) {
            p2Lives=p2Lives-1;
            if (p2Lives<=0) {
                p2Score-=10; 
                gameOn=false;
                endGame(1);
            }
            $("#p2LivesDisp").text(p2Lives);
            p2x=w/2, p2y=h/2;
        } //close if wp
   
    }   // close lives
   
   function endGame(wp) {
        ctx.fillStyle= "rgba(250,0,0,.4)";
        ctx.fillRect(50,50,w-100,h-100);
        ctx.fillStyle="black";
        ctx.font="30px Sans-Serif";
        if (p1Score>p2Score){
            ctx.fillText("Game over, Player one Wins",w/4,h/2);
        }
        if (p2Score>p1Score){
            ctx.fillText("Game over, Player two Wins",w/4,h/2);
        }       
    } } // close endGame 
