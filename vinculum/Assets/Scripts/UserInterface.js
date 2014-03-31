#pragma strict

public var data : GameData;

function Start () {
	data = ScriptableObject.CreateInstance("GameData");
	Debug.Log(data.characters[0].id);
}

function Update () {

}