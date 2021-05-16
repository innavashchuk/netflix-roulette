import {useMemo} from 'react';
import {LocationDescriptor, History} from 'history';
import {useParams, useLocation, useHistory, useRouteMatch} from 'react-router-dom';
import * as queryString from 'query-string';
import {match} from 'react-router';

export interface RouterMemo {
    push: { (path: string, state?: unknown): void; (location: LocationDescriptor<unknown>): void; };
    replace: { (path: string, state?: unknown): void; (location: LocationDescriptor<unknown>): void; };
    pathname: string;
    query: Record<string, unknown>;
    match: match<Record<string, string>>;
    history: History<unknown>;
}

export default function useRouter(): RouterMemo {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return useMemo(() => ({
        push: history.push,
        replace: history.replace,
        pathname: location.pathname,
        query: {
            ...queryString.parse(location.search),
            ...params
        },
        match,
        location,
        history
    }), [params, match, location, history]);
}
