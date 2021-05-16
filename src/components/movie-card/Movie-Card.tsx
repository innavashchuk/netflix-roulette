import * as React from 'react';
import {Movie} from '../../models/movie';
import Modal from '../modal/Modal';
import './movie-card.scss';
import MovieDetailsForm from '../movie-details-form/Movie-Details-Form';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useState} from 'react';
import useToggle from '../../hooks/use-toggle';
import {useDispatch} from 'react-redux';
import DeleteMovie from '../delete-movie/Delete-Movie';
import {InitialMovieRecord, InitialMovieValues} from '../../models/initial-movie-record';
import {setQueryParams} from '../../redux/actions';
import useRouter from '../../hooks/use-router';

export interface MovieCardProps {
    movie: Movie,
    onDeleteMovie: (id: number) => void,
    onUpdateMovie: (movie: Movie) => void
}

const DEFAULT_SRC = '../../assets/images/no-image.png';

const MovieCard: React.FunctionComponent<MovieCardProps> = (props: MovieCardProps) => {
    const dispatch = useDispatch();
    const [movie] = useState(InitialMovieRecord.mapMovieRecordToInitialValues(props.movie));
    const [isMenuVisible, toggleIsMenuVisible] = useToggle();
    const [isModalVisible, toggleIsModalVisible] = useToggle();
    const [shouldDeleteMovie, setShouldDeleteMovie] = useState(false);

    const router = useRouter();

    const onClickMenuBtn = (e: React.SyntheticEvent): void => {
        toggleIsMenuVisible();
        e.stopPropagation();
    };

    const onClickCloseMenuBtn = (e: React.BaseSyntheticEvent): void => {
        toggleIsMenuVisible();
        e.stopPropagation();
    };
    const onClickEditMenuBtn = (e: React.BaseSyntheticEvent): void => {
        e.stopPropagation();
        toggleIsMenuVisible();
        toggleIsModalVisible();
    };

    const onClickDeleteMenuBtn = (e: React.BaseSyntheticEvent): void => {
        e.stopPropagation();
        toggleIsMenuVisible();
        toggleIsModalVisible();
        setShouldDeleteMovie(true);
    };

    const handleMovieDelete = (): void => {
        toggleIsModalVisible();
        setShouldDeleteMovie(false);
        props.onDeleteMovie(movie.id);
    };

    const handleFormSubmit = (movieRecord: InitialMovieValues): void => {
        if (!movieRecord) {
            return;
        }
        toggleIsModalVisible();
        props.onUpdateMovie(InitialMovieRecord.mapInitialValuesToMovieRecord(props.movie, movieRecord));
    };

    const handleMovieCardClick = (e: React.BaseSyntheticEvent): void => {
        const {target} = e;
        if (isModalVisible || target.id === 'menu-button') {
            return;
        }
        dispatch(setQueryParams(null));
        router.push(`/film/${movie.id}`);
    }

    const addDefaultSrc = (event: React.BaseSyntheticEvent): void => {
        event.target.src = DEFAULT_SRC;
    };

    return (
        <div className="movie-card" key={movie.id} onClick={handleMovieCardClick}>
            <img className="movie-image"
                 src={movie.poster_path || DEFAULT_SRC}
                 alt="poster"
                 onError={addDefaultSrc}
            />
            <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p>{movie.genres.sort().join(', ')}</p>
                <p className="movie-release-date">{movie.release_date.getFullYear()}</p>
            </div>
            <button className="menu-button" id="menu-button" onClick={onClickMenuBtn}>
                <MoreVertIcon fontSize="large"/>
            </button>
            {
                isMenuVisible
                && <div className="menu-display">
                    <button className="menu-display__close button-dark" onClick={onClickCloseMenuBtn}>
                        <CloseIcon fontSize="small"/>
                    </button>
                    <button className="button-dark" onClick={onClickEditMenuBtn}>Edit</button>
                    <button className="button-dark" onClick={onClickDeleteMenuBtn}>Delete</button>
                </div>
            }
            {
                isModalVisible
                && <Modal onModalClose={toggleIsModalVisible}>
                    {
                        shouldDeleteMovie
                            ? <DeleteMovie onConfirm={handleMovieDelete}/>
                            : <MovieDetailsForm movieRecord={movie} isEdit onFormSubmit={handleFormSubmit}/>
                    }
                </Modal>
            }
        </div>
    )
};

export default MovieCard;

MovieCard.defaultProps = {
    movie: {
        'id': 1,
        'title': 'No Title Provided',
        'tagline': 'No tagline provided',
        'vote_average': 0,
        'vote_count': 0,
        'release_date': '01-01-2021',
        'poster_path': '',
        'overview': 'No overview provided',
        'budget': 0,
        'revenue': 0,
        'genres': ['No genre'],
        'runtime': 0
    }
}
