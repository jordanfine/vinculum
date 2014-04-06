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

private var dialogueBox : GameObject;
private var dialogue : GameObject;

function Start () {
	//This finds the GameObject with all of our data
	gameData = GameObject.Find("GameData");
	//This makes sure that it is not destroyed when we switch between levels
	GameObject.DontDestroyOnLoad(gameData);
	
	dialogueBox = GameObject.Find("DialogueBox");
	GameObject.DontDestroyOnLoad(dialogueBox);
	
	dialogue = GameObject.Find("Dialogue");
	GameObject.DontDestroyOnLoad(dialogue);
	
	
	gameData = GameObject.Find("GameData");
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;
}

function Update () {

}

function OnMouseDown () {
	if(portal){
		gd.talking = false;
		Application.LoadLevel(portalDestination);		
	}
	else {
		Debug.Log(gd.characters[objectId].name);	
	}
}