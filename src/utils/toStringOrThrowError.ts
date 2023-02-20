export const toStringOrThrowError = (value: string | undefined) => {
  if (value === undefined) throw new Error("Value is undefined");
  return value;
};
