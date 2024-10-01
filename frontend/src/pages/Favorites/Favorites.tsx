import './favorites.css';
import Search from "../../components/Search/Search.tsx";
// import CardTable from "../../components/Card/CardTable.tsx";
import PaginationComponent from "../../components/Pagination/Pagination.tsx";

export default function favorites() {

    return (
        <>
            <Search />
            {/*<CardTable/>*/}
            <PaginationComponent/>
        </>
    );
}
