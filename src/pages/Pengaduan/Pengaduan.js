import React, { useState, useEffect } from 'react';
import Navbar from '../../component/fragment/Navbar';
import Table from '../../component/fragment/Table';
import Moment from 'moment';
import { getAll, getDetail, updateStatus, submitPengaduan } from './action';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import Pagination from '../../component/fragment/Pagination';
import Modal, { openModal, closeModal } from '../../component/fragment/Modal';
import ModalDetail from './ModalDetail';
import ModalTanggapan from './ModalTanggapan';
import FormLaporan from './FormLaporan';

export default function Pengaduan() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({ data: [] });
  const [dataDetail, setDataDetail] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const { page = 1, id, add = false } = queryString.parse(
    location.search.replace('?', '')
  );

  // render col detail laporan dan action untuk menampilkan modal Detail
  const renderDetail = (detail, pengaduanId) => {
    if (detail)
      return (
        // history.push buat nambah query
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: pengaduanId,
              }),
            });
            openModal('detailPengaduan');
          }}
          className="text-danger cursor-pointer"
        >
          lihat detail
        </span>
      );
    else return <p className="text-secondary">laporan dibatalkan</p>;
  };

  //render col tanggapan dan action untuk menampilkan
  const renderResponse = (response, pengaduanId) => {
    if (response)
      return (
        // history.push buat nambah query
        <span
          onClick={() => {
            history.push({
              search: queryString.stringify({
                page,
                id: pengaduanId,
              }),
            });
            openModal('detailTanggapan');
          }}
          className="text-danger cursor-pointer"
        >
          lihat tanggapan
        </span>
      );
    else return <p className="text-secondary">belum ada tanggapan</p>;
  };

  //Mengubah status dalam table dengan bahasa yang lebih mudah dimengerti
  const renderStatus = (status) => {
    switch (status) {
      case 'submitted':
        return 'laporan terkirim';
      case 'onProgress':
        return 'sedang ditinjau';
      case 'responded':
        return 'tanggapan diterima';
      case 'done':
        return 'selesai';
      case 'rejected':
        return 'ditolak';
      default:
        return 'dibatalkan';
    }
  };

  //Untuk format data(ex: 01-17-2021 ->  17 januari 2021)
  const renderDate = (date) => {
    return Moment(date).locale('id').format('D MMMM YYYY');
  };

  //Me render tombnol action (paling kanan) sesuai dengan status data
  const renderAction = (status, pengaduanId) => {
    // if (status === 'submitted' || status === 'onProgress')
    return (
      <div className="d-flex">
        {status === 'responded' ? (
          <span
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  id: pengaduanId,
                }),
              });
              openModal('selesaikanLaporan');
            }}
            className="btn btn-success text-white btn-sm d-flex justify-content-center align-items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </span>
        ) : (
          <button
            disabled
            className="btn btn-secondary text-white btn-sm d-flex justify-content-center align-items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </button>
        )}

        {/* history.push buat nambah query */}
        {status === 'submitted' ? (
          <span
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  id: pengaduanId,
                }),
              });
              openModal('batalkanLaporan');
            }}
            className="ml-1 btn btn-warning text-dark btn-sm d-flex justify-content-center align-items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark-x"
              viewBox="0 0 16 16"
            >
              <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
            </svg>
          </span>
        ) : (
          <button
            disabled
            className="ml-1 btn btn-secondary text-white btn-sm d-flex justify-content-center align-items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark-x"
              viewBox="0 0 16 16"
            >
              <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  //Nama column dan bentuk data yang ditampilkan
  const column = [
    {
      heading: 'Subjek',
      value: (v) => v.subject,
    },
    {
      heading: 'detail laporan',
      value: (v) => renderDetail(v.detail, v.pengaduanId),
    },
    {
      heading: 'tgl pengaduan',
      value: (v) => renderDate(v.createAt),
    },
    {
      heading: 'status',
      value: (v) => renderStatus(v.status),
    },

    {
      heading: 'tanggapan',
      value: (v) => renderResponse(v.response, v.pengaduanId),
    },
    {
      heading: 'petugas',
      value: (v) => v.operatorName,
    },
    {
      heading: '',
      value: (v) => renderAction(v.status, v.pengaduanId),
    },
  ];

  //function yang digunakan untuk menutup SEMUA modal
  const closeAllModal = () => {
    // Karena modalnya pake framework punya Bosstrap yang pake jquery, jadi cuman gini
    closeModal('detailPengaduan');
    closeModal('detailTanggapan');
    closeModal('selesaikanLaporan');
    closeModal('batalkanLaporan');

    // Untuk membersihkan query selain page
    history.push({
      search: queryString.stringify({
        page,
      }),
    });
  };

  const handleSubmit = (v) => {
    const form = new FormData();
    form.append('subject', v.subject);
    form.append('image', v.image);
    form.append('description', v.description);
    form.append('createAt', v.createAt);
    submitPengaduan(form, setLoading, handleResponse);
  };

  useEffect(() => {
    getAll(page, setData);
  }, [page, loading]);

  useEffect(() => {
    if (id) getDetail(id, setDataDetail);
  }, [id, loading]);

  const handleResponse = (v) => {
    if (v) history.push('/pengaduan');
  };

  const handleUpdateStatus = (status) => {
    updateStatus(id, { status }, setLoading);
    closeAllModal();
  };

  return (
    <div>
      {/* Manggil navbar */}
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="my-4 h1">Pengaduan</h1>
        </div>
        <div className="row">
          {add ? (
            <FormLaporan handleSubmit={handleSubmit} />
          ) : (
            <div className="col-12 card shadow p-4 rounded-3 border-0">
              <div className="d-flex align-items-center mb-2 justify-content-between">
                <h5 className="h4">
                  {'Total : ' + (data.meta ? data.meta.totalData : 0)}
                </h5>
                <button
                  onClick={() =>
                    history.push({
                      search: queryString.stringify({
                        add: true,
                      }),
                    })
                  }
                  className="btn btn-primary"
                >
                  Buat Laporan Baru
                </button>
              </div>
              <Table
                column={column}
                data={data.data}
                className="overflow-auto table-sm"
              />
              <div className="row d-flex flex-row-reverse mt-4">
                <Pagination location={location.pathname} meta={data.meta} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buat nge cek dataDetail.data ada atau tidak, 
      untuk mencegah muncul error karena dataDetail.data kosong */}
      {dataDetail.data && (
        <>
          {/* Manggil modal buat detail detail tanggapa */}
          <ModalDetail data={dataDetail.data} />
          <ModalTanggapan data={dataDetail.data} />
        </>
      )}

      {/* Manggil modal buat konfirmasi selesaikan laporan */}
      <Modal
        header="Selesaikan Laporan"
        id="selesaikanLaporan"
        confirmText="Selesai"
        onClick={() => handleUpdateStatus('done')}
      >
        <p className="text-center">Apakah laporan masalah ini telah selesai?</p>
      </Modal>

      {/* Manggil modal buat konfirmasi membatalkan laporan */}
      <Modal
        header="Batalkan Laporan"
        id="batalkanLaporan"
        confirmText="Batalkan"
        onClick={() => handleUpdateStatus('canceled')}
      >
        <p className="text-center">
          Apakah anda ingin membatalkan pengajuan laporan ini?
        </p>
      </Modal>

      {/* Manggil modal buat nambah tanggapan baru */}
    </div>
  );
}
