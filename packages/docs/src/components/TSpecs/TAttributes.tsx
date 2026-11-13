import { subtypes } from "internal/src/componentSpec";
import { generateType } from "internal/src/generate-types/generateType";
import * as React from "react";
import { TCode } from "tomas-designsystem-react";
import styles from "./TSpecs.module.css";
import type { WebComponent } from "internal/src/Component";

export type TAttributesProps = {
  component: WebComponent;
};

export function TAttributes({ component }: TAttributesProps): React.ReactNode {
  const attributes = Object.entries(component.attributes);

  return (
    <>
      <h3>Attributter</h3>
      {attributes.length ? (
        <table className={styles.specTable}>
          <thead>
            <tr>
              <th scope="col">Navn</th>
              <th scope="col">Type</th>
              <th scope="col">Standardverdi</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map(([name, attribute]) => (
              <tr key={name}>
                <th scope="row">
                  <TCode>{name}</TCode>
                </th>
                <td>
                  <TCode>
                    {generateType(
                      attribute.type.kind === "reference"
                        ? (subtypes[attribute.type.name] ?? attribute.type)
                        : attribute.type,
                    )}
                  </TCode>
                </td>
                <td>
                  <TCode>{JSON.stringify(attribute.default) ?? "undefined"}</TCode>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Ingen attributter.</p>
      )}
    </>
  );
}
