#pragma strict

var object : GameObject;
private var textDisplay : GUIText;
 
function OnMouseEnter() {
 object.guiText.material.color = Color.yellow; 

 
}
function OnMouseExit() {
 object.guiText.material.color = Color.white;
 
}