import type { within as withinShadow } from "shadow-dom-testing-library";

type ShadowQueries = ReturnType<typeof withinShadow>;

declare module "storybook/internal/csf" {
  interface Canvas extends ShadowQueries {}
}
