export const parser = <T = string>(text?: string): T | undefined => {
  if (!text) return;

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
};

export const flatten = (data: object, parent?: string): object => {
  return Object.entries(data).reduce((accumulator, element) => {
    const key = parent ? `${element[0]}.${parent}` : element[0];
    const value: unknown = element[1];
    if (!value) return accumulator;

    if (Array.isArray(value)) {
      return {
        ...accumulator,
        [key]: value.map((item) => (typeof item === "object" ? flatten(value, key) : value)),
      };
    }

    if (typeof value === "object") return { ...accumulator, [key]: flatten(value, key) };

    return { ...accumulator, [key]: value };
  }, {});
};
