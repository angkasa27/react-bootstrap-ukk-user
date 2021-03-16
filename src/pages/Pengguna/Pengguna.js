import React, { useState, useEffect } from 'react';
import Navbar from '../../component/fragment/Navbar';
import Table from '../../component/fragment/Table';
import Moment from 'moment';
import ModalEdit from './ModalEditPengguna';
import { getAll, editUser, deleteOne } from './action';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import Pagination from '../../component/fragment/Pagination';
import { getRole } from '../../utils/storage';
import Modal, { openModal, closeModal } from '../../component/fragment/Modal';

export default function Pengguna() {
  const history = useHistory();
  const location = useLocation();
  const [detail, setDetail] = useState({});
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const { page = 1, id } = queryString.parse(location.search.replace('?', ''));

  const renderDate = (date) => {
    return Moment(date).locale('id').format('LL');
  };

  //Me render tombnol action
  const renderAction = (userId) => {
    return (
      <div className="d-flex">
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: userId,
              }),
            });
            openModal('editUser');
          }}
          className="btn btn-info text-white btn-sm d-flex justify-content-center align-items-center p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </span>
        {getRole() === 'admin' && (
          // history.push buat nambah query
          <span
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  id: userId,
                }),
              });
              openModal('hapusUser');
            }}
            className="ml-1 btn btn-danger text-white btn-sm d-flex justify-content-center align-items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </span>
        )}
      </div>
    );
  };

  const column = [
    {
      heading: 'Nama',
      value: (v) => v.nama,
    },
    {
      heading: 'Username',
      value: (v) => v.username,
    },
    {
      heading: 'Nomor Telepon',
      value: (v) => v.telp,
    },
    {
      heading: 'NIK',
      value: (v) => v.nik,
    },
    {
      heading: 'tgl bergabung',
      value: (v) => renderDate(v.createAt),
    },
    {
      heading: '',
      value: (v) => renderAction(v.order),
    },
  ];

  //function yang digunakan untuk menutup SEMUA modal
  const closeAllModal = () => {
    // Karena modalnya pake framework punya Bosstrap yang pake jquery, jadi cuman gini
    closeModal('editUser');
    closeModal('hapusUser');

    // Untuk membersihkan query selain page
    history.push({
      search: queryString.stringify({
        page,
      }),
    });
  };

  useEffect(() => {
    getAll(page, setResponse);
  }, [page, loading]);

  useEffect(() => {
    if (id) {
      const data = response.data;
      if (data) setDetail(data[id]);
    }
  }, [id, loading]);

  const handleEdit = (v) => {
    editUser(v.nik, v, setLoading);
    closeAllModal();
  };

  const handleDelete = () => {
    deleteOne(detail.nik, setLoading);
    closeAllModal();
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="my-4 h1">Pengguna</h1>
        </div>
        <div className="row">
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <div className="d-flex align-items-center mb-2 justify-content-between">
              <h4 className="h4">
                {'Total : ' + (response.meta ? response.meta.totalData : 0)}
              </h4>
            </div>
            <Table column={column} data={response.data} />
            <div className="row d-flex flex-row-reverse mt-4">
              <Pagination location={location.pathname} meta={response.meta} />
            </div>
          </div>
        </div>
      </div>

      {getRole() === 'admin' && (
        <Modal
          header="Hapus pengguna"
          id="hapusUser"
          confirmText="Hapus"
          onClick={() => handleDelete()}
        >
          Apakah anda yakin ingin menghapus akun pengguna ini?
        </Modal>
      )}
      <ModalEdit data={detail} handleSubmit={(v) => handleEdit(v)} />
    </div>
  );
}
