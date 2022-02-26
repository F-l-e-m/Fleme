const storageKey = "lang";

const getSavedLocale = function () {
  return localStorage.getItem(storageKey);
};

export { getSavedLocale };
