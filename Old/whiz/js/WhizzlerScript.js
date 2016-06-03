// ALL VARIABLE AND CONSTANT DECLARATIONS ARE
// MADE AT THE TOP OF THIS FILE

// FIRST THE CONSTANTS, WHICH ARE THINGS THAT NEVER
// CHANGE AND ARE USED FOR INITIALIZATION AND
// RESETTING OF GAME CONTROL SETTINGS

// FIRST FOR INITIALIZING THE CANVAS
var MIN_CANVAS_DIM;
var MAX_CANVAS_DIM;
var CANVAS_STEP;

// THESE ARE FOR INITIALIZING THE FPS SLIDER
var FPS_MIN;
var FPS_MAX;
var FPS_STEP;
var FPS_INIT;

// THESE ARE FOR INITIALIZING POSITION CONTROLS
var XY_MIN;
var XY_MAX;
var XY_INIT;
var XY_STEP;
var STROKE;

// INITIAL WHIZZLE VELOCITY
var V_INIT;

// TYPES OF WHIZZLES
var ELLIPSE_WHIZZLE_TYPE;
var RECTANGLE_WHIZZLE_TYPE;
var OUTLINE_WHIZZLE_MODE;
var FILLED_WHIZZLE_MODE;

// WHIZZLE PROPERTIES
var W_TYPE;
var W_MODE;
var W_WIDTH;
var W_HEIGHT;
var W_X;
var W_Y;
var W_VX;
var W_VY;

// NOW FOR THE VARIABLES, THINGS THAT MAY CHANGE
// DURING THE EXECUTION OF THIS APPLICATION

// CANVAS SETTINGS
var canvasWidth;
var canvasHeight;
var canvas;
var canvas2D;

// TIMER SETTINGS FOR RUNNING, SLOWING DOWN, SPEEDING UP,
// AND PAUSING THE ANIMATION
var timer;
var fps;
var fpsInc;
var millisPerFrame;

// WHIZZLE INITIALIZATION SETTINGS
var xInc;
var yInc;
var xAcc;
var yAcc;
var centerX;
var centerY;
var radius;

// HERE IS OUR ARRAY OF WHIZZLES AND A COUNTER
var whizzles;
var whizzleCounter;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var notes = [16.35, 18.35 , 19.45, 21.83,24.50, 25.962, 29.14, 32.7, 36.71, 38.89, 43.65 , 49.00, 51.91, 58.27 , 65.41 , 73.42, 77.78, 87.31, 98.00, 103.83,  116.54, 130.81, 146.83, 196.00, 207.65, 233.08, 261.94, 293.66, 311.13, 349.63, 392.00, 415.30, 466.16, 523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33, 1046.50, 1174.66, 1244.51, 1396.91, 1567.98, 1661.22, 1864.66, 2093.00];
var context = new AudioContext();



/*
 * This function prepares the initial controls and canvas
 * so that the app can run.
 */
function initTheWhizzler()
{
    // INITIALIZE THE THINGS THAT WILL NEVER CHANGE
    initConstants();
    
    // INITIALIZE THE HTML5 RENDERING SURFACE
    initCanvas();
    
    // INITIALIZE THE APPLICATION CONTROLS
    initControls();
    
    // INITIALIZE THE DATA STRUCTURE FOR STORING THE WHIZZLES
    initData();    
}

/**
 * This function initializes all the things that will never change and
 * are used for initializing and resetting controls and other data.
 */
function initConstants()
{
    // 2 TYPES OF WHIZZLES
    ELLIPSE_WHIZZLE_TYPE = "Ellipse";
    RECTANGLE_WHIZZLE_TYPE = "Rectangle";
    
    // 2 MODES OF WHIZZLE RENDERING
    OUTLINE_WHIZZLE_MODE = "Outline";
    FILLED_WHIZZLE_MODE = "Filled";    
    
    // CANVAS DIMENSION BOUNDARIES
    MIN_CANVAS_DIM = 100;
    MAX_CANVAS_DIM = 1400;
    CANVAS_STEP = 100;

    // POSSIBLE WHIZZLE LOCATIONS
    XY_MIN = 0;
    XY_MIN = 0;
    XY_MAX = MAX_CANVAS_DIM;
    XY_MAX = MAX_CANVAS_DIM;    

    // THE INITIAL VELOCITY FOR ALL WHIZZLES FOR BOTH AXES
    V_INIT = 5;

    // FPS INITIALIZION
    FPS_MIN = 1;
    FPS_MAX = 100;
    FPS_STEP = 1;
    FPS_INIT = 30;
    
    // WHIZZLE PROPERTIES, THIS HELPS US ACCESS AND CHANGE
    // DATA INSIDE A WHIZZLE
    W_TYPE      = 0;
    W_MODE      = 1;
    W_COLOR     = 2;
    W_WIDTH     = 3;
    W_HEIGHT    = 4;
    W_X         = 5;
    W_Y         = 6;
    W_VX        = 7;
    W_VY        = 8;

    // INCREMENT FOR SLIDERS
    XY_STEP = 1;
    
    // INITIAL SIZE OF WHIZZLES
    XY_INIT = 50;
}

/*
 * This function initializes the HTML5 canvas so that we 
 * can rendering whizzles to it.
 */
function initCanvas()
{
    canvasWidth = 800;
    canvasHeight = 500;
    canvas = document.getElementById("whizzler_canvas");
    canvas2D = canvas.getContext("2d");
}

/*
 * This function initializes the controls that are available at the
 * start of the app. Note that the whizzle controls are added dynamically
 * as whizzles are added.
 */
function initControls()
{
    initButtonAnimations();
    
    // INITIALIZE THE THREE SLIDER CONTROLS
    initSlider("#canvas_width_slider", MIN_CANVAS_DIM, MAX_CANVAS_DIM, CANVAS_STEP, canvasWidth, updateCanvas);
    initSlider("#canvas_height_slider", MIN_CANVAS_DIM, MAX_CANVAS_DIM, CANVAS_STEP, canvasHeight, updateCanvas);
    initSlider("#anim_speed_slider", FPS_MIN, FPS_MAX, FPS_STEP, FPS_INIT, updateSpeed);
    
    // AND THE CUSTOM JSCOLOR CONTROL FOR CHANGING THE
    // CANVAS' BACKGROUND COLOR
    $("#canvas_background_color").change(function(){
        var selectedColor = $("#canvas_background_color").val();
        $("#whizzler_canvas").css("background-color", "#" + selectedColor);
    });
}

function initButtonAnimations()
{
    $("button").mouseenter(function() {
        $(this).animate({
            opacity: '0.75',
            borderWidth: '5'
        });
    });
    $("button").mouseleave(function() {
        $(this).animate({
            opacity: '1.0',
            borderWidth: '2'
        });
    });
}

/*
 * Initializes a slider for use. Note that this function accepts
 * the update method as an argument. This is the function that
 * will be called as the user moves the slider. Note that we
 * are using a JQuery Slider. This is a custom UI component
 * provided by the JQuery library.
 * 
 * http://jqueryui.com/slider/
 */
function initSlider(slider, initMin, initMax, initStep, initValue, updateMethod)
{
    $(slider).slider();
    $(slider).slider({ min: initMin });
    $(slider).slider({ max: initMax });
    $(slider).slider({ step: initStep });
    $(slider).slider({ value: initValue });
    $(slider).slider({
        slide: function(){ updateMethod();}
    });
}

/* 
 * Initializes data for our app, including the array that will
 * contain all the whizzles.
 */
function initData()
{
    // INIT FRAME RATE STUFF
    fps = FPS_INIT;
    fpsInc = FPS_STEP;
    millisPerFrame = 1000/fps;

    // WE HAVE NOT YET STARTED ANIMATION, SO MAKE THE TIMER NULL,
    // NOTE THAT EVERY TIME WE PAUSE THE TIMER WE'LL NEED TO ALSO
    // MAKE THE TIMER NULL
    timer = null;
    
    // THIS WILL HOLD ALL THE WHIZZLES
    whizzles = new Array();
    whizzleCounter = 0;
}

/*
 * This makes and returns a whizzle, which has a bunch of
 * properties, which can really be anything, but we'll put
 * rendering settings inside.
 */
function Whizzle(initIdNum)
{
    this.properties = new Array();
    this.idNum = initIdNum;
	this.prevVX = 0;
	this.prevVY = 0;
    this.setProperty = function(property, value) {
        this.properties[property] = value;
    };
    this.getProperty = function(property) {
        return this.properties[property];
    };
}

/*
 * Called when the FPS changes, it updates the frame
 * rate and then restarts the timer if the animation
 * is currently running.
 */
function updateSpeed()
{
    // UDPATE THE FPS WITH THE SLIDER VALUE
    fps = $("#anim_speed_slider").slider("value");
    millisPerFrame = 1000/fps;

    // IF THE ANIMATION IS RUNNING, UPDATE THE
    // TIMER WITH THE NEW FRAME RATE
    if (timer !== null)
    {
        clearInterval(timer);
        timer = setInterval(stepSimulation, millisPerFrame);
    }
}

/*
 * Clears all the old whizzles off the screen.
 */
function resetWhizzles()
{
    canvas2D.clearRect(0, 0, canvas.width, canvas.height);
	
	//for each whizzel put them in the oriinal poistion
	
	//make sure all values are the same
	
	
	
	whizzles.forEach(function(element, index) {
		//store old value
		element.prevVX = element.getProperty(W_VX);
		element.prevVY = element.getProperty(W_VY);
		
		//set velocity to zero
		element.setProperty(W_VX, 0);
		element.setProperty(W_VY, 0);
		
	});
	/* for (let item in whizzles)
    {
		item.setProperty(W_VX, 0);
		item.setProperty(W_VY, 0);
		
    }*/
	
	
}

/*
 * Pauses animation.
 */
function pauseWhizzles()
{
    if (timer !== null)
    {
        clearInterval(timer);
        timer = null;
    }
	
	
	whizzles.forEach(function(element, index) {
	
		
		//set velocity to zero
		//element.setProperty(W_VX, element.prevVX);
		//element.setProperty(W_VY, element.prevVY);
		
	});
}

/*
 * Starts animation, which causes the stepSimulation method
 * to be called each frame.
 */
function startWhizzles()
{
	
	whizzles.forEach(function(element, index) {
	
		
		//set velocity to zero
		element.setProperty(W_VX, element.prevVX);
		element.setProperty(W_VY, element.prevVY);
		
	});
	
    timer = setInterval(stepSimulation, millisPerFrame);
	
	//reset the velocity
	
}

/*
 * Called after canvas settings are changed, it uses the
 * settings in the canvas controls to update the canvas.
 */
function updateCanvas()
{
    canvasWidth = $("#canvas_width_slider").slider("value");
    canvasHeight = $("#canvas_height_slider").slider("value");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    resetWhizzles();
}

/*
 * Called whtn the user presses the Add Whizzle button, it
 * makes all the new controls and puts them in the DOM.
 */
function addWhizzle()
{
    // STOP THE SIMULATION
    if (timer !== null)
    {
        clearInterval(timer);
        timer = null;
    }
    
    // RESET ALL THE WHIZZLES ALREADY RUNNING        
    resetWhizzles();

    // LET'S BUILD THE NEWEST WHIZZLE CONTROLS
    
    // FIRST, MAKE A WHIZZLE DIV
    var whizzleId = "" + whizzleCounter;
    $("#whizzles").append("<div id='" + whizzleId + "' class='whizzle'></div>");
    whizzleId = "#" + whizzleId;
    
    // ADD THE TITLE DIV
    var whizzleDiv = $(whizzleId);
    whizzleDiv.append("<div class='toolbar_title'></div>");
    var toolbarTitleDiv = whizzleDiv.find(".toolbar_title");
    toolbarTitleDiv.text("Whizzle #");
    toolbarTitleDiv.append("<span class='whizzle_id'>" + whizzleCounter + "</span>");
    
    // NOW ADD THE DIV TO HOLD THE MIN, MAX, AND REMOVE BUTTONS
    whizzleDiv.append("<div class='buttons_toolbar'></div>");
    var buttonsDiv = whizzleDiv.find(".buttons_toolbar");
    
    // AND THE MIN BUTTON
    // NOTE THAT THIS BUTTON CURRENTLY DOESN'T DO ANYTHING
    buttonsDiv.append("<button class='min_button'>-</button>");
    whizzleDiv.find(".min_button").click(function() {
        var toolbar = $(this).parent().parent().find(".whizzle_controls_toolbar");
        toolbar.hide();
    });

    // AND THE MAX BUTTON
    // NOTE THAT THIS BUTTON CURRENTLY DOESN'T DO ANYTHING
    buttonsDiv.append("<button class='max_button'>+</button>");
    whizzleDiv.find(".max_button").click(function() {
        var toolbar = $(this).parent().parent().find(".whizzle_controls_toolbar");
        toolbar.show();
    });

    // AND THE REMOVE BUTTON
    buttonsDiv.append("<button class='remove_button'>X</button>");
    var removeButton = buttonsDiv.find(".remove_button");
    removeButton.click(function(){
        removeWhizzle($(whizzleId));
    });

    // NOW ADD ALL THE WHIZZLE CONTROLS. FIRST THE DIV TO HOLD THEM
    whizzleDiv.append("<div class='whizzle_controls_toolbar'></div>");
    var whizzleControlsDiv = whizzleDiv.find('.whizzle_controls_toolbar');

    // ADD THE WHIZZLE TYPE SELECTION DROP DOWN LISTS
    whizzleControlsDiv.append("<div class='whizzle_toolbar'><span class='whizzle_toolbar_title'>Type:</span><div class='whizzle_toolbar_control'><select class='whizzle_type' name='whizzle_type'><option value='" + ELLIPSE_WHIZZLE_TYPE + "'>" + ELLIPSE_WHIZZLE_TYPE + "</option><option value='" + RECTANGLE_WHIZZLE_TYPE + "'>" + RECTANGLE_WHIZZLE_TYPE + "</option></select></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Mode:</span> <div class='whizzle_toolbar_control'><select class='whizzle_mode' name='whizzle_mode'><option value='" + OUTLINE_WHIZZLE_MODE + "'>" + OUTLINE_WHIZZLE_MODE + "</option><option value='" + FILLED_WHIZZLE_MODE + "'>" + FILLED_WHIZZLE_MODE + "</option></select></div></div><br />\n");
    whizzleControlsDiv.append("<div class='whizzle_toolbar'><span class='whizzle_toolbar_title'>Outline:</span><div class='whizzle_toolbar_control'><select class='whizzle_outline' name='whizzle_outline'><option value='RED'>'RED'</option><option value='GREEN'>'GREEN'</option><option value='YELLOW'>'YELLOW'</option><option value='PURPLE'>'PURPLE'</option><option value='BLUE'>'BLUE'</option></select></div></div><br />\n");
    whizzleControlsDiv.append("<div class='whizzle_toolbar'><span class='whizzle_toolbar_title'>Fill:</span><div class='whizzle_toolbar_control'><select class='whizzle_fill' name='whizzle_fill'><option value='fRED'>'RED'</option><option value='fGREEN'>'GREEN'</option><option value='fYELLOW'>'YELLOW'</option><option value='fPURPLE'>'PURPLE'</option><option value='fBLUE'>'BLUE'</option></select></div></div><br />\n");
	//whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Fill: </div><span class=\"fill_js_color_span\"></span></div>\n")
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Stroke: <span class='whizzle_stroke_display'>" + STROKE + "</span></span> <div class='whizzle_stroke'></div></div><br />\n");
	whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Width: <span class='whizzle_width_display'>" + XY_INIT + "</span></span> <div class='whizzle_width_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Height: <span class='whizzle_height_display'>" + XY_INIT + "</span></span> <div class='whizzle_height_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start X: <span class='whizzle_startX_display'>" + canvasWidth/2 + "</span></span> <div class='whizzle_x_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start Y: <span class='whizzle_startY_display'>" + canvasHeight/2 + "</span></span> <div class='whizzle_y_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start Vx: <span class='whizzle_startVx_display'>" + V_INIT + "</span></span> <div class='whizzle_vX_slider'></div></div><br />\n");
    whizzleControlsDiv.append("<div class=\"whizzle_toolbar\"><span class=\"whizzle_toolbar_title\">Start Vy: <span class='whizzle_startVy_display'>" + V_INIT + "</span></span> <div class='whizzle_vY_slider'></div></div><br />\n");
    
    // NOW INIT THE JS COLOR SELECTORS
    var jsColorSpan = whizzleControlsDiv.find(".outline_js_color_span");
    var jsColorInput = document.createElement('input');
    jsColorInput.style.width = '5em';
    var jsColor = new jscolor.color(jsColorInput);
    jsColor.fromHSV(1.0, 1.0, 1.0);
    jsColorSpan.append(jsColorInput);
    
    var colorFromTextbox = whizzleControlsDiv.find(".whizzle_outline").val();
	var fillColor = whizzleControlsDiv.find(".whizzle_fill").val();
	
	
	
	jsColorInput = jsColorSpan.find("input");
    jsColorInput.change(function(){
        var selectedColor = $(this).val();
        $("#whizzler_canvas").css("background-color", "#" + selectedColor);
    });    

    jsColorSpan = whizzleControlsDiv.find(".fill_js_color_span");
    jsColorInput = document.createElement('input');
    jsColorInput.style.width = '5em';
    jsColor = new jscolor.color(jsColorInput);
    jsColor.fromHSV(.2, .6, .2);
    jsColorSpan.append(jsColorInput);

    // NOW INIT THE SLIDERS THAT WE JUST ADDED
    initWhizzleSlider(whizzleDiv.find(".whizzle_width_slider"), XY_MIN, XY_MAX/10, XY_STEP, XY_INIT);
    initWhizzleSlider(whizzleDiv.find(".whizzle_height_slider"), XY_MIN, XY_MAX/10, XY_STEP, XY_INIT);
	initWhizzleSlider(whizzleDiv.find(".whizzle_stroke"),  0, 10, 1, canvasWidth/2);
    initWhizzleSlider(whizzleDiv.find(".whizzle_x_slider"),  XY_MIN, canvasWidth, XY_STEP, canvasWidth/2);
    initWhizzleSlider(whizzleDiv.find(".whizzle_y_slider"),  XY_MIN, canvasHeight, XY_STEP, canvasHeight/2);
    initWhizzleSlider(whizzleDiv.find(".whizzle_vX_slider"), XY_MIN, 40, XY_STEP, V_INIT);    
    initWhizzleSlider(whizzleDiv.find(".whizzle_vY_slider"), XY_MIN, 40, XY_STEP, V_INIT);

    // SETUP ALL THE EVENT RESPONSES
    $(whizzleId).find(".whizzle_type").change(function(){
        updateWhizzleAfterControlChange(whizzleId, $(this), W_TYPE, false);
    });
	
	    $(whizzleId).find(".whizzle_outline").change(function(){
        updateWhizzleAfterControlChange(whizzleId, $(this), colorFromTextbox, false);
    });
	
		    $(whizzleId).find(".whizzle_fill").change(function(){
        updateWhizzleAfterControlChange(whizzleId, $(this), fillColor, false);
    });
	
	
    $(whizzleId).find(".whizzle_mode").change(function(){
        updateWhizzleAfterControlChange(whizzleId, $(this), W_MODE, false);
    });
    $(whizzleId).find(".whizzle_width_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_width_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_WIDTH, true);
        }
    });
	
	    $(whizzleId).find(".whizzle_stroke").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_stroke_display");
			
            updateWhizzleAfterControlChange(whizzleId, $(this), STROKE, true);
        }
    });
	
	
	
	
	
    $(whizzleId).find(".whizzle_height_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_height_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_HEIGHT, true);
        }
    });
    $(whizzleId).find(".whizzle_x_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startX_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_X, true);
        }
    });    
    $(whizzleId).find(".whizzle_y_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startY_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_Y, true);
        }
    });    
    $(whizzleId).find(".whizzle_vX_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startVx_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_VX, true);
        }
    });
    $(whizzleId).find(".whizzle_vY_slider").slider({
        slide: function(){
            updateSliderDisplay($(this), ".whizzle_startVy_display");
            updateWhizzleAfterControlChange(whizzleId, $(this), W_VY, true);
        }
    });
    
    // FINALLY, MAKE THE WHIZZLE WITH ALL THE CURRENT UI SETTINGS
    // AND PUT IT IN THE ARRAY
    var whizzleToAdd = makeWhizzle($("#whizzles").last(), whizzleCounter);

	whizzleToAdd.color = colorFromTextbox;
	whizzleToAdd.fill = fillColor;
	whizzleToAdd.stroke = STROKE;
		
    whizzles[whizzleCounter] = whizzleToAdd;
    whizzleCounter++;
    
    // UPDATE THE CANVAS DISPLAY
    render();
}

function updateSliderDisplay(whizSlider, displaySpanClass)
{
    var whizzleSliderData = whizSlider.slider("value");
    var whizzleDiv = whizSlider.parent();
    var whizSpan = whizzleDiv.find(displaySpanClass);
    whizSpan.text(whizzleSliderData); 
}

/*
 * Provides the response to when the user changes a value
 * in a whizzle control.
 */
function updateWhizzleAfterControlChange(whizzleId, control, valueToChange, isSlider)
{
    // PAUSE EVERYTHING AND CLEAR THE CANVAS
    pauseWhizzles();
    
	
	
	
    // GET THE UPDATED VALUE
    var newValue;
    if (isSlider)
        newValue = control.slider("value");
    else
        newValue = control.val();
    
    // GET THE AFFECTED WHIZZLE
	
	
    var indexStr = whizzleId.substr(1);
    var index = Number(indexStr).valueOf();
    var whiz = whizzles[index];
    
    if(valueToChange == 7 || valueToChange == 8){
		if(newValue > 30){
			newValue = 30;
		}
		
	}
	
	// CHANGE THE AFFECTED WHIZZLE
    whiz.setProperty(valueToChange, newValue);
    
	
	//will need to update whizzle filter. 
		if( newValue == "RED"){
			console.log("red");
			whiz.color = "#FF0000";
			
			var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);
			var imag = new Float32Array(real.length);
			var horntable = context.createPeriodicWave(real, imag);
			whiz.oscillator.setPeriodicWave(horntable);
			
			
		}else if( newValue == "BLUE"){
			console.log("blue");
			whiz.color = "#0000CC";
		} else if( newValue == "GREEN"){
			whiz.color = "#00CC00";
		} else if (newValue == "YELLOW"){
			whiz.color = "#FFFF00";
		} else if (newValue == "PURPLE"){
			whiz.color = "#FF00FF";

		}
		
		if( newValue == "fRED"){
			console.log("red");
			whiz.fill = "#FF0000";
	
		}else if( newValue == "fBLUE"){
			console.log("blue");
			whiz.fill = "#0000CC";
		} else if( newValue == "fGREEN"){
			whiz.fill = "#00CC00";
		} else if (newValue == "fYELLOW"){
			whiz.fill = "#FFFF00";
		} else if (newValue == "fPURPLE"){
			whiz.fill = "#FF00FF";

		}
		
	
	
	
	
    // CLEAR THE CANVAS AND RENDER FROM SCRATCH WITH THE CHANGE
    clearCanvas();
    render();
}

/*
 * This function removes a whizzle.
 */
function removeWhizzle(whizzleToRemove)
{
    // GET THE ID NUMBER OF THE WHIZZLE TO REMOVE, WHICH
    // CORRESPONDS TO ITS INDEX IN THE ARRAY
    var whizzleId = whizzleToRemove.find('.whizzle_id');
    var whizzleIdText = whizzleId.text();
    var whizzleIdNum = Number(whizzleIdText);

    // REMOVE THIS WHIZZLE
    var parent = whizzleToRemove.parent();
    whizzleToRemove.remove();
    console.log("" + whizzleCounter);

    // DEC THE COUNTER
    whizzleCounter--;
    
    // UPDATE THE WHIZZLE ARRAY
    for (var i = whizzleIdNum; i < whizzleCounter; i++)
    {
        whizzles[i] = whizzles[i+1];
    }
    
    // NOW GO THROUGH ALL THE WIZZLES TO CORRECT
    // ANY POSSIBLE IDS
    for (var i = 0; i < whizzleCounter; i++)
    {
        whizzles[i].idNum = i;
    }    
    
    // AND MAKE SURE THE DISPLAY IS UPDATED PROPERLY
    var children = parent.children('.whizzle');
    children.each(function (i) {
        var idSpan = $(this).find('.whizzle_id');
        idSpan.text("" + i);
    });
}

/*
 * Used for setting up a whizzle slider
 */
function initWhizzleSlider(whizzleSlider, initMin, initMax, initStep, initValue)
{
    // NOTE THAT .slider IS A JQuery METHOD FOR THE CUSTOM
    // JQuery UI SLIDER COMPONENT
    whizzleSlider.slider();
    whizzleSlider.slider({ min: initMin });
    whizzleSlider.slider({ max: initMax });
    whizzleSlider.slider({ step: initStep });
    whizzleSlider.slider({ value: initValue });    
}

/*
 * This method retrives the controls setttings for the proper
 * whizzle and makes and returns a new whizzle.
 */
function makeWhizzle(whizzleDiv, initIdNum)
{
    // FIRST GET ALL THE DATA
    var wControls = whizzleDiv.find(".whizzle_controls_toolbar");
    var wTypeControl = wControls.find(".whizzle_type");
    var wType = wTypeControl.val();
    var wModeControl = wControls.find(".whizzle_mode");
    var wMode = wModeControl.val();
    var wWidth = wControls.find(".whizzle_width_slider").slider("value");
	
    var wHeight = wControls.find(".whizzle_height_slider").slider("value");
    var wX = wControls.find(".whizzle_x_slider").slider("value");
    var wY = wControls.find(".whizzle_y_slider").slider("value");
    var wVx = wControls.find(".whizzle_vX_slider").slider("value");
    var wVy = wControls.find(".whizzle_vY_slider").slider("value");
	var vStroke = wControls.find(".whizzle_stroke").slider("value");

    // AND NOW USE IT TO MAKE AND RETURN A NEW WHIZZLE
    
    // FIRST CONSTRUCT IT
    var newWhizzle = new Whizzle(initIdNum);
    
    // NOW INIT ALL ITS PROPERTIES
    newWhizzle.setProperty(W_TYPE, wType);
    newWhizzle.setProperty(W_MODE, wMode);
    newWhizzle.setProperty(W_WIDTH, wWidth);
    newWhizzle.setProperty(W_HEIGHT, wHeight);
    newWhizzle.setProperty(W_X, wX);
    newWhizzle.setProperty(W_Y, wY);
    newWhizzle.setProperty(W_VX, wVx);
    newWhizzle.setProperty(W_VY, wVy);
	newWhizzle.setProperty(STROKE, vStroke);
	
	//set its init vx and vy
	newWhizzle.isplaying = false;
	
	newWhizzle.prevVX = wVx;
	newWhizzle.prevVY= wVy;
	newWhizzle.stroke = wControls.find(".whizzle_stroke").slider("value");
	
	newWhizzle.oscillator = context.createOscillator();
	
		newWhizzle.oscillator.frequency.value = 261.63;
		 newWhizzle.g = context.createGain();
		newWhizzle.g.gain.value = .01;
		newWhizzle.oscillator.start(0);
		
		newWhizzle.oscillator.connect(newWhizzle.g);
		newWhizzle.distortion = context.createWaveShaper();
		newWhizzle.oscillator.connect(newWhizzle.distortion);
		newWhizzle.distortion.connect(newWhizzle.g);
		
		
		newWhizzle.g.connect(context.destination);
		
		
	
    // NOW RETURN THE WHIZZLE
    return newWhizzle;
}

/*
 * Called oncde per frame, it just updates and renders.
 */
function stepSimulation()
{
    // UPDATE ALL WHIZZLES
    updateWhizzles();
    
    // AND RENDER. NOTE WE DON'T CLEAR THE CANVAS
    render();
}

/*
 * Updates the position of each whizzle using its velocity and bouncing
 * it off of walls.
 */
function updateWhizzles()
{
    // GO THROUGH ALL THE WHIZZLES
    for (var i = 0; i < whizzleCounter; i++)
    {
        var whiz = whizzles[i];
        whiz.setProperty(W_X, whiz.getProperty(W_X) + whiz.getProperty(W_VX));
        whiz.setProperty(W_Y, whiz.getProperty(W_Y) + whiz.getProperty(W_VY));
        
        // CLAMPING, WHICH BOUNCES IT OFF WALLS
        if (whiz.getProperty(W_X) <= 0)
            whiz.setProperty(W_VX, whiz.getProperty(W_VX) * -1);
        if ((whiz.getProperty(W_X) + whiz.getProperty(W_WIDTH)) >= canvasWidth) 
            whiz.setProperty(W_VX, whiz.getProperty(W_VX) * -1);
        if (whiz.getProperty(W_Y) <= 0)
            whiz.setProperty(W_VY, whiz.getProperty(W_VY) * -1);
        if ((whiz.getProperty(W_Y) + whiz.getProperty(W_HEIGHT)) >= canvasHeight)
            whiz.setProperty(W_VY, whiz.getProperty(W_VY) * -1);
    }
}

/*
 * This method renders all the whizzles, whether they are rectangles
 * or ovals, filled or not.
 */
function render()
{
    // GO THROUGH ALL THE WHIZZLES
    for (var i = 0; i < whizzleCounter; i++)
    {
        // GET THE WHIZZLE
        var whiz = whizzles[i];
        
        // START RENDERING
        canvas2D.beginPath();
        
        // THESE SHOULD BE CUSTOM COLORS

		
		
		canvas2D.strokeStyle = whiz.color;
        canvas2D.fillStyle = whiz.fill;
		canvas2D.lineWidth = whiz.stroke;
        var x = whiz.getProperty(W_X);
        var y = whiz.getProperty(W_Y);
        var width = whiz.getProperty(W_WIDTH);
        var height = whiz.getProperty(W_HEIGHT);
		canvas2D.lineWidth = whiz.getProperty(STROKE);
		
		var segment = canvas.width /48;
		//note to play
		//console.log(Math.floor(x / segment));
        
		var noteToPlay = Math.floor(x / segment);
		
		whiz.oscillator.frequency.value = notes[noteToPlay];
		
		//blue
		if(whiz.color == "#0000CC"){
			//whiz.oscillator.stop(0);
			
			var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);

			var imag = new Float32Array(real.length);
			var hornTable = context.createPeriodicWave(real, imag);
			
			whiz.oscillator.setPeriodicWave(hornTable);
			//whiz.distortion.curve = makeDistortionCurve(900);
			//whiz.distortion.oversample = '4x';
			
			//whiz.oscillator.start(0);
		}
		
		//red
		if(whiz.color == "#FF0000"){
			
			var real1 = new Float32Array([1,0,1]);

			var imag1 = new Float32Array(real1.length);
			var hornTable1 = context.createPeriodicWave(real1, imag1);
			
			whiz.oscillator.setPeriodicWave(hornTable1);
			
			
		
			
		}
		//green
		if(whiz.color == "#00CC00"){
			
			var real2 = new Float32Array([1,0,0,0.4,0.4,1,1,1,0,0.4,0.4,1,1,1,0,0.4,0.4,1,1,1]);

			var imag2 = new Float32Array(real2.length);
			var hornTable2 = context.createPeriodicWave(real2, imag2);
			
			whiz.distortion.curve = makeDistortionCurve(900);
			whiz.distortion.oversample = '4x';

			whiz.oscillator.setPeriodicWave(hornTable2);
			
			
		}
		
		//purple
		if(whiz.color == "#FF00FF"){
			
			var real4 = new Float32Array([0,0.4,0.4, .4, .4]);

			var imag4 = new Float32Array(real4.length);
			var hornTable4 = context.createPeriodicWave(real4, imag4);

			whiz.oscillator.setPeriodicWave(hornTable4);

		}
		//yellow
		if (whiz.color == "#FFFF00"){
			
			var real3 = new Float32Array([.1,.3,.48,.45,.71,.69,.36,.89,.49,.26,.43,.08,.56,.16,.86]);
			
			var imag3 = new Float32Array(real3.length);
			var hornTable3 = context.createPeriodicWave(real3, imag3);

			whiz.oscillator.setPeriodicWave(hornTable3);
			
			
		}
		
		whiz.g.gain.value = y / canvas.height;
		
		
		
        // RENDER AS AN ELLIPSE, WHICH IS A LITTLE TRICKY
        // IF WE WANT IT TO LOOK GOOD
        if (whiz.getProperty(W_TYPE) === ELLIPSE_WHIZZLE_TYPE)
        {            
            drawEllipse(x, y, width, height, whiz.getProperty(W_MODE));
        }
        // RENDER WHIZZLE AS RECTANGLE
        else if (whiz.getProperty(W_TYPE) === RECTANGLE_WHIZZLE_TYPE)
        {
            canvas2D.rect(x, y, width, height);
            if (whiz.getProperty(W_MODE) === FILLED_WHIZZLE_MODE)
            {
                canvas2D.fill();
            }
            else
            {
                canvas2D.stroke();
            }
        }
		
		canvas2D.closePath();
    }
}

/*
 * Renders an ellipse using a Bezier curve.
 */
function drawEllipse(x, y, w, h, mode) 
{
    var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

    canvas2D.beginPath();
    canvas2D.moveTo(x, ym);
    canvas2D.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    canvas2D.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    canvas2D.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    canvas2D.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    canvas2D.closePath();
    if (mode === OUTLINE_WHIZZLE_MODE)
        canvas2D.stroke();
    else
        canvas2D.fill();
}

/*
 * Clears the canvas, removing all past whizzle paths.
 */
function clearCanvas()
{
    canvas2D.clearRect(0, 0, canvas.width, canvas.height);    
}

/*
 * This helper method gets the whizzle that corresponds to
 * a given slider control. This is useful when setting up
 * the controls such that we may respond to a slider change
 * by updating the correct whizzle data.
 */
function getSliderWhizzle(slider)
{
    var sliderParent = slider.parent();            
    var sliderGrandParent = sliderParent.parent();
    var whizzleId = sliderGrandParent.find(".whizzle_id");
    var whizzleIdNum = whizzleId.text();
    var whiz = whizzles[whizzleIdNum];
    return whiz;
}


function loadAudio(object, url) 
	{
 	var request = new XMLHttpRequest();
	request.open('GET', url, true);
 	request.responseType = 'arraybuffer';

	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
      		object.buffer = buffer;
    	});
  	}
  	request.send();
}

/*
* function taken from stack overflow for distortion. 
*/
function makeDistortionCurve( amount ) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

