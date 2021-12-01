export const save = (key, value) => {
  try {
    const stringifyValue = JSON.stringify(value);
    localStorage.setItem(key, stringifyValue);
  } catch (error) {
    console.error(error.message);
  }
};

export const load = key => {
  try {
    const stringifyValue = localStorage.getItem(key);
    return stringifyValue === null ? undefined : JSON.parse(stringifyValue);
  } catch (error) {
    console.error(error.message);
  }
};

export const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};
