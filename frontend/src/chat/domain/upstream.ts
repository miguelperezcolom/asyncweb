import {Subject} from "rxjs";
import {State} from "./model/centralState";

export const upstream: Subject<State> = new Subject()