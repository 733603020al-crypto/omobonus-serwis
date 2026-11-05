export interface PaperState {
  key: string; x: number; y: number; w: number; h: number; progress: number;
  tiltAxis: number; tilt: number; spin: number; flatRot: number;
  offX: number; offY: number; curl: number[]; rake: number; rakeAngle: number;
  focus: number[]; flip: number[]; hoverLift: number; fold: number; foldJitter: number[];
}
export interface PaperOptions {
  width: number; height: number; margin: number; dpr: number; seed: number;
  creases: number; creaseAngle: number; lift: number; ballSize: number; paper: string;
  gloss: number; grain: number; rakeElev: number; inset: number[]; radii: number[];
  shadow: string; shadowAmt: number; shadowLift?: number; ao: number; show: number;
  keyDir: number[]; fillDir: number[];
}
export interface PaperScene {
  gl: WebGL2RenderingContext;
  readonly pos: Float32Array;
  setImage(key: string, image: HTMLCanvasElement, fade?: boolean): void;
  creaseReady(w: number, h: number, dpr: number, seed: number): boolean;
  pumpCrease(budget: number, frame?: number): void;
  render(options: PaperOptions, states: PaperState[]): {pw: number; ph: number};
  dispose(): void;
}
export function loadCrumpleData(): Promise<unknown>;
export function prepareScene(canvas: HTMLCanvasElement, data: unknown): Promise<PaperScene>;
