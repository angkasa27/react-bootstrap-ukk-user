import React from 'react';
import queryString from 'querystring';
import { useHistory, useLocation } from 'react-router-dom';

export default function Pagination(props) {
  const history = useHistory();
  const location = useLocation();
  const { className, meta, query } = props;
  const { page, totalPage } = meta;
  // const classes = [styles.root, className].filter(Boolean).join(' ');
  const toPrevPage = page && page > 1 ? parseInt(page) - 1 : 1;
  const toNextPage = page && page <= totalPage ? parseInt(page) + 1 : totalPage;
  const disablePrev = page <= 1;
  const disableEnd = page >= totalPage;

  const getLink = (toPrevPage) => {
    return {
      pathname: location.pathname,
      search: queryString.stringify({
        page: toPrevPage,
      }),
    };
  };

  return (
    <section className={'d-flex ' + className}>
      <button
        className={
          disablePrev
            ? 'btn btn-secondary text-white btn-sm d-flex justify-content-center align-items-center mr-1'
            : 'btn btn-dark text-white btn-sm d-flex justify-content-center align-items-center mr-1'
        }
        disabled={disablePrev}
        onClick={() => history.push(getLink(toPrevPage))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
      <PageNumber
        location={location}
        meta={meta}
        prevQuery={query}
        getLink={getLink}
      />
      <button
        className={
          disableEnd
            ? 'btn btn-secondary text-white btn-sm d-flex justify-content-center align-items-center'
            : 'btn btn-dark text-white btn-sm d-flex justify-content-center align-items-center'
        }
        disabled={disableEnd}
        onClick={() => history.push(getLink(toNextPage))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </button>
    </section>
  );
}

Pagination.defaultProps = {
  className: '',
  meta: {},
  query: { size: 10 },
};

export function PageNumber({ meta, getLink }) {
  const history = useHistory();
  const { page, totalPage } = meta;
  const length = totalPage > 5 ? 5 : totalPage;
  const mainPages = Array.from(Array(length).keys()).map((i) => {
    if (totalPage <= 5 || page === 1) return i + 1;
    if (page === totalPage || page === totalPage - 1)
      return totalPage - (4 - i);
    return page + i - 1;
  });
  const leftPages = totalPage > 5 && mainPages[0] - 1 > 1 ? [1, '...'] : [];
  const rightPages =
    totalPage > 5 && totalPage - mainPages[3] > 1 ? ['...', totalPage] : [];
  const pages = leftPages.concat(mainPages, rightPages);

  return pages.map((item, key) => {
    // const activePage = page === item && styles.active;
    // const pageClasses = [styles['page-number'], activePage]
    //   .filter(Boolean)
    //   .join(' ');
    const active = item === parseInt(page);
    // const disabled = typeof item !== 'number';

    if (item === '...') {
      return <h5>{item}</h5>;
    } else {
      return (
        <button
          className={
            active
              ? 'btn btn-secondary text-white btn-sm d-flex justify-content-center align-items-center mr-1'
              : 'btn btn-dark text-white btn-sm d-flex justify-content-center align-items-center mr-1'
          }
          disabled={active}
          key={key}
          onClick={() => history.push(getLink(item))}
        >
          {/* <Link
          disabled={disabled}
          key={key}
          to={getLink(query, location, prevQuery)}
        > */}
          {item}
        </button>
      );
    }
  });
}

PageNumber.defaultProps = {
  meta: {},
  prevQuery: {},
  getLink: () => {},
};
