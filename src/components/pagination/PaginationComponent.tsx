import {useDispatch} from "react-redux";
import {paginationSliceActions} from "../../redux/slices/paginationSlice.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const PaginationComponent = () => {
    const {limit, page, total} = useAppSelector(state => state.pagination);
    const dispatch = useDispatch();

    const changePage = (newPage: number) => {
        dispatch(paginationSliceActions.setPage(newPage));
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