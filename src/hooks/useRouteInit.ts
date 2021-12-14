import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  useLocation,
  useParams,
  useSearchParams,
  Params,
  Location,
} from '@elonwu/router';

export interface SearchPair {
  [key: string]: any;
}

export type SetSearchFunc = (update: SearchPair, clearOther?: boolean) => void;

export const useSearch = (
  initialValue?: SearchPair,
): [search: SearchPair, setSearch: SetSearchFunc] => {
  let [searchParams, setSearchParams] = useSearchParams(initialValue);

  const search = useMemo(() => {
    let result: SearchPair = {};

    Array.from(searchParams?.entries()).forEach(
      ([key, val]) => (result[key] = val),
    );

    return result;
  }, [searchParams]);

  const setSearch: SetSearchFunc = useCallback(
    (update, clearOther = false) => {
      setSearchParams(clearOther ? update : Object.assign({}, search, update));
    },
    [search, setSearchParams],
  );

  return [search, setSearch];
};

// 初始化的参数
export const useRouteInit = () => {
  const [initSearch, setInitSearch] = useState<Params<string> | null>(null);
  const [initParams, setInitParams] = useState<SearchPair | null>(null);
  const [initLocation, setInitLocation] = useState<Location | null>(null);

  const [search] = useSearch();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (initSearch === null) setInitSearch(search);
  }, [search, initSearch, setInitSearch]);

  useEffect(() => {
    if (initParams === null) setInitParams(params);
  }, [params, initParams, setInitParams]);

  useEffect(() => {
    if (initLocation === null) setInitLocation(location);
  }, [location, initLocation, setInitLocation]);

  return {
    initSearch,
    initParams,
    initLocation,
  };
};
