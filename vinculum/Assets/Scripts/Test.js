#pragma strict

var data : GameData;

function Start () {
	
	data = ScriptableObject.CreateInstance("GameData");
}



function Update () {

}


function OnMouseDown () {
	Debug.Log("mouse down"); 
	Application.LoadLevel("main_menu");
}