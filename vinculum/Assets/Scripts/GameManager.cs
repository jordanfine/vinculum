//Singleton class to manage game progress
using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour
{
	//Public properties
	//------------------------------------------------
	//Number of consecutive matches player must make for each card type to complete turn
	public int NumMatches = 2;
	
	//Lose interval - amount of time in seconds to pause before clearing cards and resetting turn (When player makes a mistake)
	public float LoseInterval = 0.5f;
	
	//Win interval - amount of time in seconds to pause before clearing cards and resetting turn (When player matches 3)
	public float WinInterval = 0.5f;
	
	//-----------------------------------------	
	
	//Private properties
	//Reference to all card objects in the scene
	private GameObject[] CardObjects = null;
	
	//Internal Turn Step Counter (keeps track of how many cards picked so far
	private int TurnStep = 0;
	
	//List of cards picked this turn so far
	private GameObject[] SelectedCards = null;

	private string DoctorMessage = "The Doctor is FREAaAAkY";
	
	//Input enabled for this machine
	//private bool InputEnabled = true;
	
	//Render component for mouse cursor
//	private MeshRenderer CursorRender = null;
	
	//-----------------------------------------
	void Start()
	{
		//Get all card objects
		CardObjects = GameObject.FindGameObjectsWithTag("Card") as GameObject[];
		
		//Get mouse cursor render component
		//CursorRender = GameObject.FindGameObjectWithTag("Cursor").GetComponent<MeshRenderer>();
		
		//Created selected card array
		SelectedCards = new GameObject[NumMatches];
		
		Shuffle();
	}
	//-----------------------------------------
	void Update()
	{
		HandleInput();
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
		/*//Generate ray from touch position
		Ray R = Camera.main.ScreenPointToRay(TapPosition);
		
		//Get hits in scene to detect card selection
		RaycastHit[] Hits;
		
		Hits = Physics.RaycastAll(R);
		
		//Cycle through hits*/

	
	//-----------------------------------------
	//Function to enable/disable input
	/*public void EnableInput(bool bEnabled = true)
	{
		//Set input enabled flag and show/hide cursor graphic
		Screen.showCursor = InputEnabled = bEnabled;
	}*/
	//-----------------------------------------
	//Function to pick a card and update turn
	public void PickCard(GameObject SelectedCard)
	{
		//Pick card
		SelectedCard.SendMessage("SetCardState", Card.CARD_STATE.CARD_REVEALED, SendMessageOptions.DontRequireReceiver);
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
		if(TurnStep >= NumMatches)
		{
			if(SelectedCards[TurnStep-1].GetComponent<Card>().name == "doctor_card")
				Debug.Log (DoctorMessage);
			//Player made all matches. Move to next turn
			StartCoroutine(WinTurn());
		}
	}
	//-----------------------------------------
	//Ends turn as loss condition
	public IEnumerator LoseTurn()
	{
		//Disable input
		//EnableInput(false);
		
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
		
		//EnableInput(true);
	}
	//-----------------------------------------
	//Ends turn as win condition
	public IEnumerator WinTurn()
	{
		//Disable input
		//EnableInput(false);
		
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
		
		//EnableInput(true);
	}
	//-----------------------------------------
}
