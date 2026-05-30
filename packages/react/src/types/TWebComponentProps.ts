import type { PropsWithChildren } from "react";
import type { AssertString } from "./AssertString.js";
import type { EventListenerProp } from "./EventListenerProp.js";

type EventListenerProps<Events extends { [name: string]: unknown }> = {
  [EventName in keyof Events as EventListenerProp<AssertString<EventName>>]?: (
    event: CustomEvent<Events[EventName]>,
  ) => void;
};

export type TWebComponentProps<Attributes, Events extends { [name: string]: unknown }> = PropsWithChildren<Attributes> &
  EventListenerProps<Events>;
