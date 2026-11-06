import { componentSpec, subtypes } from "internal/src/componentSpec.ts";
import { generateType } from "internal/src/generate-types/generateType.ts";
import * as React from "react";
import { TCode } from "tomas-designsystem-react";

export type TAttributesProps = {
  name: string;
};

export function TAttributes({ name }: TAttributesProps): React.ReactNode {
  const component = componentSpec.find((component) => component.type === "web" && component.name === name);
  if (!component || component.type !== "web") {
    throw new Error(`Web component "${name}" was not found in componentSpec.`);
  }
  const attributes = Object.entries(component.attributes);

  return (
    <>
      <h2>Attributter</h2>
      <table>
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
          {attributes.length === 0 && (
            <tr>
              <td colSpan={3}>Komponenten har ingen attributter.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
