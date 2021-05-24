import { SortingDirectionEnum, SortingFieldsEnum } from './enums/movies-list';

export interface MovieQueryParams {
  toQueryString?: () => string,
  sortBy?: string,
  sortOrder?: string,
  search?: string,
  searchBy?: string,
  filter?: string,
  offset?: string,
  limit?: string
}

export class MovieQueryParamsDict implements MovieQueryParams {

  sortBy?: string;

  sortOrder?: string;

  search?: string;

  searchBy?: string;

  filter?: string;

  offset?: string;

  limit?: string;

  constructor(params: MovieQueryParams = {
    sortBy: '',
    sortOrder: SortingDirectionEnum.desc,
    search: '',
    searchBy: 'title',
    filter: '',
    offset: '',
    limit: '24'
  }) {
    if (!params) {
      return this;
    }
    this.sortBy = params.sortBy || '';
    this.sortOrder = params.sortOrder || SortingDirectionEnum.desc;
    this.search = params.search || '';
    this.searchBy = params.searchBy || 'title';
    this.filter = params.filter || '';
    this.offset = params.offset || '';
    this.limit = params.limit || '24';
  }

  static toQueryString(params: MovieQueryParams = {}): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value !== 'function' && value) {
        searchParams.set(key, value);
      }
    });
    return searchParams.toString();
  }

  static toSearchQueryString(params: MovieQueryParams = {}): string {
    const searchParams = new URLSearchParams();
    if (params.search) {
      searchParams.set('search', params.search);
      return searchParams.toString();
    }
    return '';
  }
}
