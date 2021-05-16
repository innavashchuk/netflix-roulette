import { Movie } from './movie';

export interface InitialMovieValues {
  id?: number,
  title: string,
  release_date: Date;
  poster_path: string,
  genres: Array<string>,
  overview: string,
  runtime: number
}

export class InitialMovieRecord implements InitialMovieValues {
  id: number;
  title = '';
  release_date = new Date();
  poster_path = '';
  genres: string[] = [];
  overview = '';
  runtime = 0;

  static mapMovieRecordToInitialValues(record: Movie): InitialMovieValues {
    const initialRecord = new InitialMovieRecord();
    initialRecord.genres = record.genres;
    initialRecord.overview = record.overview;
    if (record.id) {
      initialRecord.id = record.id;
    } else {
      delete initialRecord.id;
    }
    initialRecord.poster_path = record.poster_path;
    initialRecord.release_date = new Date(record.release_date);
    initialRecord.runtime = record.runtime;
    initialRecord.title = record.title;
    return initialRecord;
  }

  static mapInitialValuesToMovieRecord(record: Movie, initialRecord: InitialMovieValues): Movie {
    record.genres = initialRecord.genres;
    record.overview = initialRecord.overview;
    record.poster_path = initialRecord.poster_path;
    record.release_date = initialRecord.release_date.toISOString();
    record.runtime = initialRecord.runtime;
    record.title = initialRecord.title;
    return record;
  }
}
