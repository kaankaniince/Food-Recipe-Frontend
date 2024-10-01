import './Pagination.module.css';
import {Pagination} from '@mantine/core';

function PaginationComponent() {
    return (
        <>
            <div className="pagination-container">
                <Pagination total={20}/>
            </div>
        </>
    )
}

export default PaginationComponent;