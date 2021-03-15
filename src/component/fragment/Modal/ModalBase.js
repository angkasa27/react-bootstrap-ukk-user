import React from 'react';
import $ from 'jquery';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';

export default function ModalBase({
  header,
  children,
  id,
  onClick,
  confirmText,
}) {
  const history = useHistory();
  const location = useLocation();
  const { page } = queryString.parse(location.search.replace('?', ''));

  const handleClose = () => {
    if (page)
      history.push({
        search: queryString.stringify({
          page,
        }),
      });
    $(`#${id}`).modal('hide');
  };

  return (
    <div
      className="modal fade"
      id={id}
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h4>{header}</h4>
          </div>
          <div className="modal-body">{children}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => handleClose()}
            >
              {confirmText ? 'Batal' : 'Tutup'}
            </button>
            {confirmText && (
              <button type="button" class="btn btn-primary" onClick={onClick}>
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ModalBase.defaultProps = {
  header: '',
  children: {},
  id: '',
  onClick: () => {},
  confirmText: '',
};
