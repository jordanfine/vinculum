using UnityEngine;
using System.Collections;

public class Card : MonoBehaviour {

	//Card States
	public enum CARD_STATE {CARD_CONCEALED = 0, CARD_REVEALED = 1, CARD_HIDDEN = 2};
	//Current State for Card - read only
	public CARD_STATE ActiveState = CARD_STATE.CARD_CONCEALED;
	//Z Positions for card and covers - (X = Card Z Pos, Y = Cover Z Pos)
	public Vector2[] ZPosStates = new Vector2[3];
	//Cached transform for card
	private Transform CardTransform = null;
	//Cache transform for card cover
	private Transform CoverTransform = null;

	void Awake()
	{
		//Cache Card Transform
		CardTransform = transform;
		//Cache cover transform
		CoverTransform = CardTransform.GetChild(0).transform;
	}
	//Function to set card state
	public void SetCardState(CARD_STATE State = CARD_STATE.CARD_CONCEALED)
	{
		//Updates state
		ActiveState = State;
		//Sets positions
		CardTransform.localPosition = new Vector3(CardTransform.localPosition.x, CardTransform.
		                                          localPosition.y, ZPosStates[(int)ActiveState].x);
		CoverTransform.localPosition = new Vector3(CoverTransform.localPosition.x, CoverTransform.
		                                           localPosition.y, ZPosStates[(int)ActiveState].y);
	}

	void Start () {
	
	}
	

	void Update () {
	
	}
}
