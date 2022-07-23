export const emailRegEx =
  /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;
export const nameRegEx = /([A-Za-zА-Яа-я]+(['|\-|\s]?[A-Za-zА-Яа-я]+)*)+/;

export const shortMovieDurationThreshold = 40;

export const hugeScreenMoviesNumber = { numberToShow: 4, numberToUpload: 4 };
export const bigScreenMoviesNumber = { numberToShow: 9, numberToUpload: 3 };
export const mediumScreenMoviesNumber = { numberToShow: 8, numberToUpload: 2 };
export const smallScreenMoviesNumber = { numberToShow: 5, numberToUpload: 2 };
