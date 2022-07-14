export class FSM {
  currentState: any = null;
  constructor(
    public alphabet: string,
    public states: string[],
    public startState: string,
    public finiteStates: string[],
    public transitions: object
  ) {
    this.alphabet = alphabet;
    this.states = states;
    this.startState = startState;
    this.finiteStates = finiteStates;
    this.transitions = transitions;
    this.currentState = null;
  }

  _checkIsBelongAlphabet(symbol: string): boolean {
    return this.alphabet.includes(symbol);
  }

  _changeState(symbol: string) {
    if (
      this.transitions[this.currentState] &&
      this.transitions[this.currentState][symbol]
    ) {
      this.currentState = this.transitions[this.currentState][symbol];
    } else {
      throw new Error(`ERROR: ${this.currentState} by ${symbol}`);
    }
  }
}
