#pragma strict

//This would be the Id of a NPC.
var npcId : int;
var currentLevel: int; 
var sceneId : int;
var sceneCounter : int = 0; 
private var dialogueBox : GameObject;
private var dialogue : GUIText;

function Start () {
	dialogueBox = GameObject.Find("DialogueBox");
	//dialogue = GameObject.Find("Dialogue").GetComponent(GUIText);
}

function Update () {
}

function DisplayDialogue(){

}



function OnMouseDown () {
	currentLevel = GameObject.Find("GameData").GetComponent(UserInterface).data.currentLevel;
	//We might want to do something similar to whats being done in ClickableObject, wehre we get the GameData obj first and then use it as we need it.
	//Debug.Log(GameObject.FindWithTag("MainData").GetComponent(UserInterface).data.characters[npcId].dialogueData[0].sceneData[0].sceneArray[1]);	
	//	Debug.Log(GameObject.Find("GameData").GetComponent(UserInterface).data.characters[npcId].dialogueData[currentLevel].sceneData[sceneId].sceneArray[sceneCounter]);	
	//GameObject.Find("GameData").GetComponent(UserInterface).data.talking = true;
	//dialogue.text = GameObject.Find("GameData").GetComponent(UserInterface).data.characters[npcId].dialogueData[currentLevel].sceneData[sceneId].sceneArray[sceneCounter];
	GameObject.Find("GameData").GetComponent(UserInterface).DisplayDialogue(npcId-1,currentLevel,sceneId,sceneCounter);
}