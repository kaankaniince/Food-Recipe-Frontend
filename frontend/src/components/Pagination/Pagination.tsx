import { Pagination } from '@mantine/core';
import './Pagination.module.css';

interface PaginationProps {
    total: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

function PaginationComponent({ total, currentPage, onPageChange }: PaginationProps) {
    return (
        <div className="pagination-container">
            <Pagination
                total={total}
                value={currentPage}
                onChange={onPageChange}
            />
        </div>
    );
}

export default PaginationComponent;
