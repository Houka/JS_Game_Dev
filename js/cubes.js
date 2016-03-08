$(document).ready(onReady)

$(window).resize(resize)
window.onorientationchange = resize;

var width = 480;
var height = 320;

// window boundary set up 
var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;

// window
var container;

// mouse events
var pressed = false;

// testing text 
var mouseInputText;

// game characterSet
var cube;

// what to do when everything loads
function onReady()
{
	// bg = white
	renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor:0xFFFFFF});
	stage = new PIXI.Stage(0xFFFFFF);
	
	amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;

	if(amount == 5)
	{
		renderer.context.mozImageSmoothingEnabled = false
		renderer.context.webkitImageSmoothingEnabled = false;
		
	}
	
	// set up renderer
	renderer.view.style["transform"] = "translatez(0)";
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
	requestAnimationFrame(update);
	
	// create window to contain everything
	container = new PIXI.Container();
	container = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
	stage.addChild(container);
	
	// create text element 
	mouseInputText = document.createElement("div");
	mouseInputText.className = "mouseInputText";
	document.body.appendChild(mouseInputText);
	mouseInputText.innerHTML = "Mouse is Pressed: " + pressed;
	
	// set up cube character element 
	cube = new PIXI.Texture.fromImage("img/cube.png");	
	var c = new PIXI.Sprite(cube);
	container.addChild(c);	
	// mouse event set up 
	$(renderer.view).mousedown(function(){
		pressed = true;
	});
	
	$(renderer.view).mouseup(function(){
		pressed = false;
	})
	
	// adding touch events
	document.addEventListener("touchstart", onTouchStart, true);
	document.addEventListener("touchend", onTouchEnd, true);
	
	resize();
}

function onTouchStart(event)
{
	pressed = true;
}

function onTouchEnd(event)
{
	pressed = false;
}

// resize container window
function resize()
{

	var width = $(window).width(); 
	var height = $(window).height(); 
	
	// cap window size to 800x600 px 
	if(width > 800)width  = 800;
	if(height > 600)height = 600;
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;
	
	// setting css styles of each element (setting up canvas width and height)
	renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	renderer.view.style.top = $(window).height() / 2 - height/2 + "px"
	
	// testing text element 
	mouseInputText.style.left = w + "px";
	mouseInputText.style.top = h + "px";
	mouseInputText.style.font = "bold 10px arial,serif";
	
	renderer.resize(width, height);
}

function update()
{
	
	if(pressed)
	{
		mouseInputText.innerHTML = "Mouse is Pressed: " + pressed;
	}else{
		mouseInputText.innerHTML = "Mouse is Pressed: " + pressed;
	}
	
	renderer.render(stage);
	requestAnimationFrame(update);
}