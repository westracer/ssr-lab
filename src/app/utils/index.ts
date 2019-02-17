export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as any
  );
}

export const getIconSrc = (iconName: string) => {
    return `/assets/img/icons/${iconName}.svg`;
};

export const getImgSrc = (fileName: string) => {
    return `/assets/img/${fileName}`;
};

export const getPicSrc = (fileName: string) => {
    return `/assets/pic/${fileName}`;
};