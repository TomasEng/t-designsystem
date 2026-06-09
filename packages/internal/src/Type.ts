export type Type = NullType | PrimitiveType | ArrayType | ObjectType | UnionType | ConstantType;

export type NullType = { kind: "null" };

export type ConstantType = {
  kind: "constant";
  value: string | number | boolean;
};

export type PrimitiveType = {
  kind: "string" | "number" | "boolean";
};

export type ArrayType = {
  kind: "array";
  subkind: Type;
};

export type ObjectType = {
  kind: "object";
  properties: Record<string, Type>;
  requiredProperties: string[];
};

export type UnionType = {
  kind: "union";
  types: Type[];
};

export type TsType<T extends Type> = T extends NullType
  ? null
  : T extends ConstantType
    ? T["value"]
    : T extends { kind: "string" }
      ? string
      : T extends { kind: "number" }
        ? number
        : T extends { kind: "boolean" }
          ? boolean
          : T extends { kind: "array" }
            ? TsType<T["subkind"]>[]
            : T extends { kind: "object" }
              ? { [Key in T["requiredProperties"][number]]: TsType<T["properties"][Key]> } & {
                  [Key in keyof T["properties"]]?: TsType<T["properties"][Key]>;
                }
              : T extends { kind: "union" }
                ? TsType<T["types"][number]>
                : never;
