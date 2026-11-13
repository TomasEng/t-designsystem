import { componentSpec } from "internal/src/componentSpec";
import * as React from "react";
import { TCode } from "tomas-designsystem-react";
import { TAttributes } from "./TAttributes";
import styles from "./TSpecs.module.css";
import type { Component, ElementWithClass, WebComponent } from "internal/src/Component";

export type TSpecsProps = {
  name: string;
};

export function TSpecs({ name }: TSpecsProps): React.ReactNode {
  const componentSpec = findComponentSpec(name);

  return (
    <>
      <h2>Spesifikasjon</h2>
      {componentSpec.type === "web" ? (
        <WebComponentSpecs component={componentSpec} />
      ) : (
        <ClassComponentSpecs component={componentSpec} />
      )}
    </>
  );
}

type WebComponentSpecsProps = {
  component: WebComponent;
};

function WebComponentSpecs({ component }: WebComponentSpecsProps): React.ReactNode {
  return (
    <>
      <h3>Kodenavn</h3>
      <table className={styles.specTable}>
        <thead>
          <tr>
            <th scope="col">HTML</th>
            <th scope="col">React</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <TCode>{component.name}</TCode>
            </td>
            <td>
              <TCode>{reactName(component.name)}</TCode>
            </td>
          </tr>
        </tbody>
      </table>
      <TAttributes component={component} />
    </>
  );
}

type ClassComponentSpecsProps = {
  component: ElementWithClass;
};

function ClassComponentSpecs({ component }: ClassComponentSpecsProps): React.ReactNode {
  return (
    <table className={styles.specTable}>
      <thead>
        <tr>
          <th scope="col">Element</th>
          <th scope="col">Klasse</th>
          <th scope="col">React-navn</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <TCode>{component.htmlElement}</TCode>
          </td>
          <td>
            <TCode>{component.className}</TCode>
          </td>
          <td>
            <TCode>{reactName(component.className)}</TCode>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function findComponentSpec(name: string): Component {
  const component = componentSpec.find(
    (component) =>
      (component.type === "web" && component.name === name) ||
      (component.type === "class" && component.className === name),
  );
  if (!component) {
    throw new Error(`Web component "${name}" was not found in componentSpec.`);
  }
  return component;
}

function reactName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
