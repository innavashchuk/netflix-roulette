import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FilterBar from './filter-bar';

jest.mock('react-redux', () => ({
    useSelector: (cb: () => string) => cb(),
    useDispatch: () => (): null => null
}));
jest.mock('../../redux/selectors', () => ({
    ...jest.requireActual('../../redux/selectors'),
    selectFilterParam: (): string => 'Documentary',
    selectSortOrderParam: (): string => 'desc'
}));

const onFilterChange = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('FilterBar', () => {
    it('should initialize', () => {
        const {asFragment} = render(<FilterBar onFilterChange={onFilterChange}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should set correct filter value based on the useSelector(selectFilterParam)', () => {
        render(<FilterBar onFilterChange={onFilterChange}/>);
        const activeButton = screen.getByRole('button', {name: 'DOCUMENTARY'});
        expect(activeButton).toBeTruthy();
        expect(activeButton.classList).toContain('active');

        const inactiveButton = screen.getByRole('button', {
            name: 'ALL'
        });
        expect(inactiveButton.classList).not.toContain('active');
    });

    it('should set correct sort order value based on the useSelector(selectSortOrderParam)', () => {
        render(<FilterBar onFilterChange={onFilterChange}/>);
        const sortOrderIcon = screen.getByTestId('sortOrderIcon');
        expect(sortOrderIcon.className).toEqual('filter-tab__sort_direction_desc');
    });
});
