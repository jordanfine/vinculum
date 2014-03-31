#pragma strict

var data : GameData;

function Start () {
	
	data = ScriptableObject.CreateInstance("GameData");
	Debug.Log(data.characters[0].id);
}



function Update () {

}


function OnMouseDown () {
	Debug.Log("mouse down"); 
	Application.LoadLevel("main_menu");
}