import {Subject} from "rxjs";
import {State} from "./centralState";

export const upstream: Subject<State> = new Subject()