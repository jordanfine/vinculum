#pragma strict

var data : GameData;
private var dialogueBox : GameObject;
private var dialogue : GameObject;
var currentDialogue : String = "";
var dialogueStyle: GUIStyle;
var moreConversation : boolean = false;
var isEdithSpeaking : boolean = false;
var currentEdithCounter : int = 0;


//information about current dialogue:
var currentNPC : int;
var currentNPCLevel : int;
var currentNPCsceneID : int;  
var currentNPCsceneCounter: int; 

function Start () {
	data = ScriptableObject.CreateInstance("GameData");
	dialogueBox = GameObject.Find("DialogueBox");
	dialogue = GameObject.Find("Dialogue");
	//Debug.Log(data.characters[0].id);
}

function Update () {
	dialogueBox.active = data.talking;
	dialogue.active = data.talking;
}

function DisplayDialogue(npcId,currentLevel,sceneId,sceneCounter){
	currentNPC = npcId;
	currentNPCLevel = currentLevel;
	currentNPCsceneID = sceneId;
	currentNPCsceneCounter = sceneCounter;
	var arraySize: int = data.characters[npcId].dialogueData[currentLevel].sceneData[sceneId].sceneArray.length;
	var edithArraySize : int = data.characters[0].dialogueData[currentLevel].sceneData[sceneId].sceneArray.length;
	//Debug.Log(arraySize);
	data.talking = true;
	var tempScene : int = sceneCounter;
	//SO IF CONVERSATION IS EVEN THATS EDITH ALSO GOTTA CHECK IF THERE IS SOMETHNG SHE SAYS BACK!
	if(isEdithSpeaking){
		currentDialogue = data.characters[0].dialogueData[currentLevel].sceneData[sceneId].sceneArray[currentEdithCounter];
		currentEdithCounter++;
	}
	else{
		currentDialogue = data.characters[npcId].dialogueData[currentLevel].sceneData[sceneId].sceneArray[sceneCounter];
		currentNPCsceneCounter++;	
		//tempScene++;
	}
	currentDialogue = currentDialogue + "\n[Press Spacebar to Exit]";
	//CONVERSATION ODD IS NPC
	Debug.Log("CEC" + currentEdithCounter);
	if(arraySize > tempScene){
		moreConversation = true;
		isEdithSpeaking = !isEdithSpeaking;
	}
	else if(edithArraySize > currentEdithCounter){
		moreConversation = true;
		isEdithSpeaking = true;
	}
	else if(edithArraySize == currentEdithCounter){
		moreConversation = false;
		isEdithSpeaking = false; 
		currentEdithCounter = 0;
	}
	else {
		moreConversation = false; 
		isEdithSpeaking = false;
		currentDialogue = "";
	}
	
}
function HideDialogue(){
	data.talking = false;
	dialogueBox.active = data.talking;
	currentDialogue = "";
}

function OnGUI() {
	var e : Event = Event.current;
	if (e.isKey) {
		if((e.Equals (Event.KeyboardEvent ("space"))) && data.talking){
			if(moreConversation){
				DisplayDialogue(currentNPC, currentNPCLevel, currentNPCsceneID,currentNPCsceneCounter);
			}else{
				HideDialogue();
			}
		}
		//Debug.Log("Detected key code: " + e.keyCode);
	}
	GUI.Label (Rect (75, 500, 1050, 336), currentDialogue,dialogueStyle);
}

function advanceLevel(){
	data.currentLevel++;
}