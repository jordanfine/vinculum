//Singleton class to manage game progress
/* The JS files need to be in the standard assets folder - assembly-unityscript-firstpass- because they 
 are compiled before the c sharp files. that is the only way c sharp can community with the JS GameData gameobject*/
using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour
{
	//Public properties
	//------------------------------------------------
	//Number of consecutive matches player must make for each card type to complete turn
	public int NumMatches = 2;

	public int numCardMatches=14;
	//Lose interval - amount of time in seconds to pause before clearing cards and resetting turn (When player makes a mistake)
	public float LoseInterval = 0.1f;
	
	//Win interval - amount of time in seconds to pause before clearing cards and resetting turn (When player matches 3)
	public float WinInterval = 0.1f;

	public string portalDestination;
	//-----------------------------------------	
	
	//Private properties
	//Reference to all card objects in the scene
	private GameObject[] CardObjects = null;

	public AudioClip cardflip;
	//public GameData data;
	public GameObject dialogueBox;
	public GameObject dialogue;
	public GUIStyle dialogueStyle;

	private GameObject gameData;
	private GameData gd;
	
	//Internal Turn Step Counter (keeps track of how many cards picked so far
	private int TurnStep = 0;

	public bool activeInHierarchy;

	public bool talking;
	//List of cards picked this turn so far
	private GameObject[] SelectedCards = null;

	private string currentDialogue = "";

	
	//Input enabled for this machine
	//private bool InputEnabled = true;
	
	//Render component for mouse cursor
//	private MeshRenderer CursorRender = null;
	
	//-----------------------------------------
	void Start()
	{
		dialogueBox = GameObject.Find("DialogueBox");
		dialogue = GameObject.Find("Dialogue");


		//This retrieves the GameData object from our GameObject

		CardObjects = GameObject.FindGameObjectsWithTag("Card") as GameObject[];
//		Scene instance = (Scene)Resources.LoadLevel ("lemonade_stand", typeof(Scene));
		//Get mouse cursor render component
		//CursorRender = GameObject.FindGameObjectWithTag("Cursor").GetComponent<MeshRenderer>();
		
		//Created selected card array
		SelectedCards = new GameObject[NumMatches];

		//shuffles cards. necessary? 
		//Shuffle();

		gameData = GameObject.Find ("GameData");
		gd = gameData.GetComponent<UserInterface>().data;
		GameObject.DontDestroyOnLoad(gameData);

		//Get all card objects

	}
	//-----------------------------------------
	void Update()
	{

		HandleInput();

		//dialogueBox.SetActive(true);
		//dialogue.SetActive(true);
	}
	//-----------------------------------------
	//Resets and Shuffles Cards
	public void Shuffle()
	{
		//Reset all cards to starting states
		foreach(GameObject CardObject in CardObjects)
			CardObject.SendMessage("SetCardState", Card.CARD_STATE.CARD_CONCEALED, SendMessageOptions.DontRequireReceiver);
		
		//Cycle through all cards and exchange for shuffle
		foreach(GameObject Card in CardObjects)
		{
			//Get Transform
			Transform CardTransform = Card.transform;
			
			//Get another random card to exchange position
			Transform ExchangeTransform = CardObjects[Mathf.FloorToInt(Random.Range(0, CardObjects.Length-1))].transform;
			
			//Exchange positions
			Vector3 TmpPosition = CardTransform.localPosition;
			
			CardTransform.localPosition = ExchangeTransform.localPosition;
			ExchangeTransform.localPosition = TmpPosition;
		}
	}
	//-----------------------------------------
	//Handle user input
	public void HandleInput()
	{
		//make sure camera is in orthographic view or raycast doesn't work
		//gets position of mouse and casts a ray from that position down to check if a collider is hit
		//if it is hit, it picks the card and updates the turn

				if (Input.GetMouseButtonDown (0)) {
					float dist = transform.position.z - Camera.main.transform.position.z;
					Vector3 pos = new Vector3(Input.mousePosition.x, Input.mousePosition.y, dist);
						//Vector2 pos = new Vector2 (Input.mousePosition.x, Input.mousePosition.y);	
			
						RaycastHit2D hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint(pos), Vector2.zero);

						if (hit != null) {
								Debug.Log (hit.collider.gameObject.name);
								//Play step
								PickCard (hit.collider.gameObject);
								UpdateTurn (hit.collider.gameObject);

								//return;
						}

				}
		}
		

	//Function to pick a card and update turn
	public void PickCard(GameObject SelectedCard)
	{
		AudioSource.PlayClipAtPoint(cardflip, transform.position);
				//Pick card
				SelectedCard.SendMessage ("SetCardState", Card.CARD_STATE.CARD_REVEALED, SendMessageOptions.DontRequireReceiver);
		   
		}
	//-----------------------------------------
	//Function to start new turn for local player
	public void StartTurn()
	{
		//Reset Step Counter
		TurnStep = 0;
		
		//Clear Selected Array
		for(int i = 0; i<SelectedCards.Length; i++)
			SelectedCards[i]=null;
	}
	//-----------------------------------------
	//Function to Update Turn
	public void UpdateTurn(GameObject PickedCard)
	{

		//Add card to selected array
		SelectedCards[TurnStep] = PickedCard;

		Debug.Log (PickedCard);
		
		//Increment turn step
		++TurnStep;
		
		//Should we exit now?
		if(TurnStep <= 1) return;
		
		//If picked more than one card in sequence, then check is the same
		if(SelectedCards[TurnStep-1].GetComponent<Card>().name != SelectedCards[TurnStep-2].GetComponent<Card>().name)
		{

			//Is not same. Player made mistake. Reset turn for next player.
			StartCoroutine(LoseTurn());
			return;
		}
		
		//Player made successful match. Is end of turn?
		//Displays dialogue for successful match
		if(TurnStep >= NumMatches)
		{
			dialogueBox.renderer.enabled = true;
			//dialogue.renderer.enabled=true;
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "doctor_card"){
				//Debug.Log (DoctorMessage);
				numCardMatches-=2;
				Debug.Log (numCardMatches);
				//talking = true;
				currentDialogue="Boy: The Doctor is like a superhero. Even though he doesn’t have a cape, he saving all of our lives here! I want to be just like him one day. But with a cape.";
			}
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "light_card"){
				//Debug.Log (DoctorMessage);
				//dialogueBox.renderer.enabled = true;
				//talking = true;
				numCardMatches-=2;
				currentDialogue="Boy: I know it looks kinda like a smushed lightning bug, but that’s suppose to be light. The light means everyone is happy. So it’s safe to play again!";
			}
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "key_card"){
				//Debug.Log (DoctorMessage);
				//dialogueBox.renderer.enabled = true;
				//talking = true;
				numCardMatches-=2;
				currentDialogue="Boy: That’s the key to the lighthouse. Only the keyholder is allowed to have it. One time one of my friends found one of them on the ground…";
			}
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "mansion_card"){
				//Debug.Log (DoctorMessage);
				//dialogueBox.renderer.enabled = true;
				//talking = true;
				numCardMatches-=2;
				currentDialogue="Boy: All the most important people in town live there. You have to be SUPER important, though. Like, not bake cookies once for your class kind of important. That was a disappointing day.";
			}
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "needle_card"){
				//Debug.Log (DoctorMessage);
				//dialogueBox.renderer.enabled = true;
				numCardMatches-=2;
				//talking = true;
				currentDialogue="Boy: We all get the cure when we grow up! My mom, who knows a lot of stuff since the nice council people give her lots of things, says that the cure makes all the rashes go away!";
			}

			/*if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "lighthouse_card"){
				numCardMatches--;
			}
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "blank_card"){
				numCardMatches--;
			}*/
			 

			if(numCardMatches==2 ){
				currentDialogue="Mom: That's ENOUGH!";

				StartCoroutine(redirect());
				gd.currentLevel++;
				//Debug.Log (gd.currentLevel);
			}
			//Player made all matches. Move to next turn
			StartCoroutine(WinTurn());
		}
	}

	//these methods delay the flipping/removing/redirecting
	public IEnumerator redirect()
	{
		yield return new WaitForSeconds(3.00F);
		
		Application.LoadLevel (portalDestination);


		}
	//-----------------------------------------
	//Ends turn as loss condition
	public IEnumerator LoseTurn()
	{
	
		//Wait for lost interval
		yield return new WaitForSeconds(LoseInterval);
		
		//Restore revealed cards
		for(int i=0; i<SelectedCards.Length; i++)
		{
			//If valid selection, then restore
			if(SelectedCards[i])
				SelectedCards[i].SendMessage("SetCardState", Card.CARD_STATE.CARD_CONCEALED, SendMessageOptions.DontRequireReceiver);
		}
		
		//Restart turn
		StartTurn();
		

	}
	//-----------------------------------------
	//Ends turn as win condition
	public IEnumerator WinTurn()
	{
		
		//Wait for lost interval
		yield return new WaitForSeconds(WinInterval);
		
		//Hide revealed cards
		for(int i=0; i<SelectedCards.Length; i++)
		{
			//If valid selection, then restore
			if(SelectedCards[i])
				SelectedCards[i].SendMessage("SetCardState", Card.CARD_STATE.CARD_HIDDEN, SendMessageOptions.DontRequireReceiver);
		}
		
		
		//Check if there are cards remaining on board?
		bool CardsRemaining = false;
		
		foreach(GameObject CardObj in CardObjects)
		{
			if(CardObj.GetComponent<Card>().ActiveState != Card.CARD_STATE.CARD_HIDDEN)
			{
				CardsRemaining = true;
				break;
			}
		}
		
		if(CardsRemaining)
		{
			//Move to next turn
			StartTurn();
		}
		else
		{
			//Restart
			Shuffle();
			StartTurn();
		}
		

	}
	//-----------------------------------------
	//puts the dialogue on the screen.
	void OnGUI() {

		if(Input.GetKey("space")){
			currentDialogue="";
		//dialogueBox.renderer.enabled = false;
		}
		GUI.Label (new Rect (150, 500, 900, 336), currentDialogue,dialogueStyle);
		//Debug.Log (gd.currentLevel);
	}
}

