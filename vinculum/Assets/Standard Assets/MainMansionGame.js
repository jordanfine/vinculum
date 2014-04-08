#pragma strict

var number: int;
var currentNumber : int = 0; 
var totalStyle : GUIStyle;

var buttons = new int[4];
var buttonColors = new int[4];


function Start () {

}

function Update () {
	currentNumber = 0;
	for(var i=0; i<4; i++){
		if(buttonColors[i] == 0)
			continue;
		if(buttonColors[i] == 1)
			currentNumber = currentNumber + buttons[i];
		if(buttonColors[i] == 2)
			currentNumber = currentNumber - buttons[i];
		if(buttonColors[i] == 3)
			currentNumber = currentNumber + (buttons[i]*buttons[i]);
	}
}

function OnGUI(){
	GUI.Label (Rect(800, 300, 50, 50), ""+ currentNumber+"",totalStyle);

}