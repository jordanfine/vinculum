#pragma strict

var data : GameData;
private var dialogueBox : GameObject;
var dialogueStyle: GUIStyle;


function Start () {
	data = ScriptableObject.CreateInstance("GameData");
	data.dialogueStyle = dialogueStyle;
	dialogueBox = GameObject.Find("DialogueBox");

}

function Update () {
	if(data.talking || data.object)
		dialogueBox.active = true;
	else
		dialogueBox.active = false;
}
