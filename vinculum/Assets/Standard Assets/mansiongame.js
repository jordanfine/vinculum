#pragma strict

var button_counter : int = 0;
var button_number : int;
var button_id : int;
var currentTotal : int = 0;
var x: int;
var y: int;
var buttonStyle : GUIStyle;

var main : GameObject;

function Start () {
	main =  GameObject.Find("Main");
	main.GetComponent(MainMansionGame).buttons[button_id] = button_number;
}


function Update () {
	if(button_counter == 0){
		this.gameObject.GetComponent(GUITexture).color = Color.green;
	}
	if(button_counter == 1){
		this.gameObject.GetComponent(GUITexture).color = Color.blue;
	}
	if(button_counter == 2){
		this.gameObject.GetComponent(GUITexture).color = Color.red;
	}
	if(button_counter == 3){
		this.gameObject.GetComponent(GUITexture).color = Color.yellow;
	}
	
	main.GetComponent(MainMansionGame).buttonColors[button_id] = button_counter;
}
function OnGUI(){
	GUI.Label (Rect(x, y, 50, 50), ""+ button_number+"",buttonStyle);
}

function OnMouseDown () {
	button_counter++;
	if(button_counter == 4){
		button_counter = 0 ;
	}
}