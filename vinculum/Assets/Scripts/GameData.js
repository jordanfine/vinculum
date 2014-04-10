#pragma strict

public class GameData extends ScriptableObject {
	var currentLevel : int;
	var talking : boolean;
	var object : boolean;
	var dialogueStyle: GUIStyle;


	function GameData(){
		//ARB. NUMBER USED...FIX 10 TO WHATEVER AMOUNT OF CHARACTERS...MAYBE CREATE SEPERATE NPC ARRAY?
		currentLevel = 8;
	}
		
}