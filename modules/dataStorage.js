const LOCAL_STORAGE = 'localStorage';
const BOOK_DATA = 'bookData';

const bookData = [];

const setUp = () => {
  if (localStorage.getItem(BOOK_DATA) === null) {
    localStorage.setItem(BOOK_DATA, JSON.stringify(bookData));
  }
};

/**
 *
 * @param {*} type string
 * @returns Boolean if the browser supports local storage
 */
function storageAvailable(type = LOCAL_STORAGE) {
  let storage;
  try {
    storage = window[type];
    const test = '__storage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    setUp();
    return true;
  } catch (exeption) {
    return exeption instanceof DOMException
      && (exeption.code === 22 || exeption.code === 1014 || exeption.name === 'QuotaExceededError' || exeption.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && (storage && storage.length !== 0);
  }
}

const setBooks = (arrBooks) => {
  localStorage.setItem(BOOK_DATA, JSON.stringify(arrBooks));
};

const getBooks = () => JSON.parse(localStorage.getItem(BOOK_DATA));

export { storageAvailable, setBooks, getBooks };
