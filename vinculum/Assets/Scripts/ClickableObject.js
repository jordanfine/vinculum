#pragma strict

//Portal would be any object that progresses you through the game. 
var portal : boolean;
var portalDestination : String;
var portalId : int;

//This would be the Id of a object that is clickable but not a portal
var objectId : int;

//This is the GameObject that we bind the Data to
var gameData : GameObject;

//This is the physical data
var gd : GameData; 

function Start () {
	//This finds the GameObject with all of our data
	gameData = GameObject.FindWithTag("MainData");
	//This makes sure that it is not destroyed when we switch between levels
	GameObject.DontDestroyOnLoad(gameData);
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;
}

function Update () {

}

function OnMouseDown () {
	if(portal){
		Application.LoadLevel(portalDestination);
		Debug.Log(gd.characters[portalId].name);	
	}
	else {
		Debug.Log(gd.characters[objectId].name);	
	}
}