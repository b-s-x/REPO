type stateAction = () => void;

export class FSM {
  private activeState: stateAction;

  public setState(state: stateAction): void {
    this.activeState = state;
  }

  public update(): void {
    if (this.activeState) {
      this.activeState();
    }
  }
}
