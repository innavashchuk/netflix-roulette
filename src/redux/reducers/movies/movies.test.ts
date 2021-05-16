import moviesReducer from './movies';
import {initialState} from './movies';
import {ActionTypes} from '../../action-types';
import {MovieGenreEnum} from '../../../models/enums/movie-genre';

const MOVIE = {
    'id': 181808,
    'title': 'Star Wars: The Last Jedi',
    'tagline': 'The Saga Continues',
    'vote_average': 7.1,
    'vote_count': 4732,
    'release_date': '2017-12-13',
    'poster_path': 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    'overview': 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    'budget': 200000000,
    'revenue': 1325937250,
    'genres': [
        MovieGenreEnum.fantasy,
        MovieGenreEnum.adventure,
        MovieGenreEnum.scienceFiction
    ],
    'runtime': 152
};

const MOVIES = [{
    'id': 181808,
    'title': 'Star Wars: The Last Jedi',
    'tagline': 'The Saga Continues',
    'vote_average': 7.1,
    'vote_count': 4732,
    'release_date': '2017-12-13',
    'poster_path': 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    'overview': 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    'budget': 200000000,
    'revenue': 1325937250,
    'genres': [
        MovieGenreEnum.fantasy,
        MovieGenreEnum.adventure,
        MovieGenreEnum.scienceFiction
    ],
    'runtime': 152
},
    {
        'id': 284054,
        'title': 'Black Panther',
        'tagline': 'Long live the king',
        'vote_average': 7.3,
        'vote_count': 3788,
        'release_date': '2018-02-13',
        'poster_path': 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
        'overview': 'King T\'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country\'s new leader. However, T\'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T\'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \'special forces\'), and an American secret agent, to prevent Wakanda from being dragged into a world war.',
        'budget': 200000000,
        'revenue': 1245257672,
        'genres': [
            MovieGenreEnum.action,
            MovieGenreEnum.adventure,
            MovieGenreEnum.fantasy,
            MovieGenreEnum.scienceFiction
        ],
        'runtime': 134
    },
    {
        'id': 354912,
        'title': 'Coco',
        'tagline': 'The celebration of a lifetime',
        'vote_average': 7.8,
        'vote_count': 3619,
        'release_date': '2017-10-27',
        'poster_path': 'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        'overview': 'Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel\'s family history.',
        'budget': 175000000,
        'revenue': 700920729,
        'genres': [
            MovieGenreEnum.adventure,
            MovieGenreEnum.comedy,
            MovieGenreEnum.family,
            MovieGenreEnum.animation
        ],
        'runtime': 105
    }];

const FILTERED_MOVIES = [{
    'id': 284054,
    'title': 'Black Panther',
    'tagline': 'Long live the king',
    'vote_average': 7.3,
    'vote_count': 3788,
    'release_date': '2018-02-13',
    'poster_path': 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    'overview': 'King T\'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country\'s new leader. However, T\'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T\'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \'special forces\'), and an American secret agent, to prevent Wakanda from being dragged into a world war.',
    'budget': 200000000,
    'revenue': 1245257672,
    'genres': [
        MovieGenreEnum.action,
        MovieGenreEnum.adventure,
        MovieGenreEnum.fantasy,
        MovieGenreEnum.scienceFiction
    ],
    'runtime': 134
},
    {
        'id': 354912,
        'title': 'Coco',
        'tagline': 'The celebration of a lifetime',
        'vote_average': 7.8,
        'vote_count': 3619,
        'release_date': '2017-10-27',
        'poster_path': 'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        'overview': 'Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel\'s family history.',
        'budget': 175000000,
        'revenue': 700920729,
        'genres': [
            MovieGenreEnum.adventure,
            MovieGenreEnum.comedy,
            MovieGenreEnum.family,
            MovieGenreEnum.animation
        ],
        'runtime': 105
    }];

describe('movies reducer', () => {
    it('should return the initial state', () => {
        expect(moviesReducer(undefined, {type: '', payload: ''})).toEqual(initialState);
    });

    it('should handle SET_MOVIE', () => {
        expect(
            moviesReducer(initialState, {
                type: ActionTypes.SET_MOVIE,
                payload: {
                    movie: MOVIE
                }
            })
        ).toEqual({
            ...initialState,
            selectedMovie: MOVIE
        });
    });

    it('should handle SET_MOVIE_NOT_FOUND', () => {
        expect(
            moviesReducer(initialState, {
                type: ActionTypes.SET_MOVIE_NOT_FOUND,
                payload: {
                    notFound: true
                }
            })
        ).toEqual({
            ...initialState,
            notFound: true
        });
    });

    it('should handle SET_MOVIES', () => {
        expect(
            moviesReducer(initialState, {
                type: ActionTypes.SET_MOVIES,
                payload: {
                    movies: MOVIES
                }
            })
        ).toEqual({
            ...initialState,
            items: MOVIES
        });
    });

    it('should handle filter movies on SET_MOVIES when there is a selected movie', () => {
        expect(
            moviesReducer({
                items: [],
                selectedMovie: MOVIE,
                notFound: false
            }, {
                type: ActionTypes.SET_MOVIES,
                payload: {
                    movies: MOVIES
                }
            })
        ).toEqual({
            items: FILTERED_MOVIES,
            selectedMovie: MOVIE,
            notFound: false
        });
    });
});
