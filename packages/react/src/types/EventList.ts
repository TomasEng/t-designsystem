import type { AssertString } from "./AssertString.js";
import type { EventListenerProp } from "./EventListenerProp.js";

export type EventList<EventObject extends Record<string, UIEvent>> = EventPropNames<AssertString<keyof EventObject>>;

type EventPropNames<E extends string> = {
  [Key in E as EventListenerProp<Key>]: `t-${Key}`;
};
