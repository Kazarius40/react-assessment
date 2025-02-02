import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {paginationSliceActions} from "../../redux/slices/paginationSlice.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useEffect} from "react";

export const PaginationComponent = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams();
    const {total, limit, page} = useAppSelector(state => state.pagination);

    useEffect(() => {
        const urlPage = Number(query.get("pg")) || 1;
        if (urlPage !== page) {
            dispatch(paginationSliceActions.setPage(urlPage));
        }
    }, [query, page, dispatch]);

    const changePage = (newPage: number) => {
        dispatch(paginationSliceActions.setPage(newPage));
        setQuery({pg: newPage.toString()});
    };

    return (
        <>
            <button disabled={page <= 1} onClick={() => changePage(page - 1)}>
                Попередня
            </button>

            <button disabled={page * limit >= total} onClick={() => changePage(page + 1)}>
                Наступна
            </button>
        </>
    );
};