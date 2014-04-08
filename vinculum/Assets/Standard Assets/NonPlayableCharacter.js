#pragma strict

public class DialogueData {
	var scene: String[] = new String[10];

	function DialogueData(scene){
		this.scene = scene;
	}
};

var dialogueArray: DialogueData[] = new DialogueData[3];
private var gameData : GameObject;
private var gd : GameData; 

//var dialogueStyle: GUIStyle;

//This would be the Id of a NPC.
private var currentLevel: int; 
private var dialogueBox : GameObject;
private var currentDialogue : String = "";
private var dialogueCounter : int = 0;
private var moreConversation: boolean;
var isTalking : boolean = false;

function Start () {
	gameData = GameObject.Find("GameData");
	//This retrieves the GameData object from our GameObject
	gd = gameData.GetComponent(UserInterface).data;
}

function Update () {

	//Debug.Log(currentDialogue);
}

function DisplayDialogue(){
	currentDialogue = dialogueArray[currentLevel].scene[dialogueCounter];
	currentDialogue = currentDialogue + "\n[Press Spacebar to Continue]";
 	dialogueCounter++;
 	if(dialogueCounter >= dialogueArray[currentLevel].scene.length ){
 		moreConversation = false;
 	}
 	else{
 		moreConversation = true;
 	}
	
}
function HideDialogue(){
	dialogueCounter = 0;
	currentDialogue = "";
 	isTalking = false;
 	GameObject.Find("GameData").GetComponent(UserInterface).data.talking = false;
}

function OnGUI() {
	var e : Event = Event.current;
	if (e.isKey) {
		if((e.Equals (Event.KeyboardEvent ("space"))) && isTalking){
			if(moreConversation){
				DisplayDialogue();
			}else{
				HideDialogue();
			}
		}
	}
	GUI.Label (Rect (75, 500, 1050, 336), currentDialogue,gd.dialogueStyle);
}

function OnMouseDown () {
	currentLevel = GameObject.Find("GameData").GetComponent(UserInterface).data.currentLevel;
	GameObject.Find("GameData").GetComponent(UserInterface).data.talking = true; 
	isTalking = true;
	DisplayDialogue();
}