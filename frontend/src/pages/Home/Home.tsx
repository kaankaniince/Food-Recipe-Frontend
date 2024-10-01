import './Home.css';
import Search from "../../components/Search/Search.tsx";
import CardTable from "../../components/Card/CardTable.tsx";
import PaginationComponent from "../../components/Pagination/Pagination.tsx";
import CardCarousel from "../../components/Carousels/CardCarousel.tsx";

export default function Home() {

    return (
        <>
            <CardCarousel/>
            <Search />
            <CardTable/>
            <PaginationComponent/>
        </>
    );
}
