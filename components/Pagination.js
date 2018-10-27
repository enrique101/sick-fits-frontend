import React from 'react';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
query PAGINATION_QUERY{
    itemsConnection {
        aggregate {
            count
        }
    }
}
`;

const Pagination = props => {
    return (
        <Query query={PAGINATION_QUERY}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>;
                const { count } = data.itemsConnection.aggregate;
                const pages = Math.ceil(count / perPage);
                const currentPage = props.page;
                return (
                    <PaginationStyles data-test="pagination">
                        <Head>
                        <title>
                            Sick Fits! - Page {currentPage} of {pages}
                        </title>
                        </Head>
                        <Link prefetch
                             href={{
                                pathname: 'items',
                                query: {page: currentPage -1}
                            }}>
                            <a className="prev" aria-disabled={currentPage <= 1}>
                                ← Prev
                            </a>
                        </Link>
                        <p>Page {currentPage} of 
                        <span className="total-pages">
                        {pages}
                        </span></p>
                        <p>{count} Items Total</p>
                        <Link
                            prefetch
                            href={{
                                pathname: 'items',
                                query: { page: currentPage + 1 },
                            }}
                            >
                            <a className="next" aria-disabled={currentPage >= pages}>
                                Next →
                            </a>
                        </Link>
                    </PaginationStyles>
                )
            }}
        </Query>
    )
}

export default Pagination;
export { PAGINATION_QUERY };