#pragma strict

//This would be the Id of a NPC.
var npcId : int;
 
function Start () {
}

function Update () {

}

function OnMouseDown () {
	//We might want to do something similar to whats being done in ClickableObject, wehre we get the GameData obj first and then use it as we need it.
	Debug.Log(GameObject.FindWithTag("MainData").GetComponent(UserInterface).data.characters[npcId].dialogue);	
}