/* eslint-disable no-shadow */
export enum MovieGenreEnum {
    drama = 'Drama',
    actionAndAdventure = 'Action & Adventure',
    comedy = 'Comedy',
    thriller = 'Thriller',
    oscarWinning = 'Ocar winning Movie',
    documentary = 'Documentary',
    horror = 'Horror',
    crime = 'Crime',
    adventure = 'Adventure',
    action = 'Action',
    fantasy = 'Fantasy',
    scienceFiction = 'Science Fiction',
    family = 'Family',
    animation = 'Animation',
    mystery = 'Mystery',
    music = 'Music',
    romance = 'Romance'
}

export const MOVIE_GENRES_LIST: Array<string> = [
    MovieGenreEnum.action,
    MovieGenreEnum.adventure,
    MovieGenreEnum.animation,
    MovieGenreEnum.comedy,
    MovieGenreEnum.crime,
    MovieGenreEnum.thriller,
    MovieGenreEnum.drama,
    MovieGenreEnum.family,
    MovieGenreEnum.fantasy,
    MovieGenreEnum.horror,
    MovieGenreEnum.music,
    MovieGenreEnum.mystery,
    MovieGenreEnum.romance,
    MovieGenreEnum.scienceFiction,
    MovieGenreEnum.documentary
];
