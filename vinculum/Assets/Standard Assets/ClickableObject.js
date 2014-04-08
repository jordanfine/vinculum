#pragma strict

//Portal would be any object that progresses you through the game. 
var portal : boolean;
var portalDestination : String;
var portalId : int;

//This would be the Id of a object that is clickable but not a portal
var objectId : int;

//This is the GameObject that we bind the Data to
private var gameData : GameObject;

//This is the physical data
private var gd : GameData; 
var dialogueArray: String[] = new String[3];

private var dialogueBox : GameObject;
private var dialogue : GameObject;
private var currentText : String = "";

var lockedOn: boolean[] = new boolean[3];

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

function DisplayText(){
	currentText = dialogueArray[gd.currentLevel];
	currentText = currentText + "\n[Press Spacebar to Continue]";
}

function HideText(){
	currentText = "";
	gd.object = false;
}

function OnGUI() {
	var e : Event = Event.current;
	if (e.isKey) {
		if((e.Equals (Event.KeyboardEvent ("space"))) && gd.object){
			HideText();
		}
	}
	GUI.Label (Rect (75, 500, 1050, 336), currentText,gd.dialogueStyle);
}

function OnMouseDown () {

	if(portal && !lockedOn[gd.currentLevel]){
		gd.object = false;
		Application.LoadLevel(portalDestination);		
	}
	else {
		gd.object = true;
		DisplayText();	
	}
}



