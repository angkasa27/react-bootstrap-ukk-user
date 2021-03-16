import React, { useState, useEffect } from 'react';
import Navbar from '../../component/fragment/Navbar';
import Table from '../../component/fragment/Table';
import Moment from 'moment';
import {
  getAll,
  getDetail,
  updateStatus,
  getDokumen,
  sendTanggapan,
  deleteOne,
} from './action';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import Pagination from '../../component/fragment/Pagination';
import { getRole } from '../../utils/storage';
import Modal, { openModal, closeModal } from '../../component/fragment/Modal';
import ModalDetail from './ModalDetail';
import ModalTanggapan from './ModalTanggapan';
import ModalAddTanggapan from './ModalAddTanggapan';

export default function Pengaduan() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({ data: [] });
  const [dataDetail, setDataDetail] = useState({});
  const [dokumen, setDokumen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { page = 1, id } = queryString.parse(location.search.replace('?', ''));

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
        return 'laporan baru';
      case 'onProgress':
        return 'sedang ditinjau';
      case 'responded':
        return 'tanggapan terkirim';
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
        {status === 'submitted' || status === 'onProgress' ? (
          <>
            {status === 'submitted' && (
              // history.push buat nambah query
              <span
                onClick={() => {
                  history.push({
                    search: queryString.stringify({
                      page,
                      id: pengaduanId,
                    }),
                  });
                  openModal('terimaLaporan');
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
            )}
            {status === 'onProgress' && (
              // history.push buat nambah query
              <span
                onClick={() => {
                  history.push({
                    search: queryString.stringify({
                      page,
                      id: pengaduanId,
                    }),
                  });
                  openModal('tanggapiLaporan');
                }}
                className="btn btn-info text-white btn-sm d-flex justify-content-center align-items-center p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-left-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </span>
            )}
            {/* history.push buat nambah query */}
            <span
              onClick={() => {
                history.push({
                  search: queryString.stringify({
                    page,
                    id: pengaduanId,
                  }),
                });
                openModal('tolakLaporan');
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
          </>
        ) : (
          <>
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
          </>
        )}
        {getRole() === 'admin' && (
          // history.push buat nambah query
          <span
            onClick={() => {
              history.push({
                search: queryString.stringify({
                  page,
                  id: pengaduanId,
                }),
              });
              openModal('hapusLaporan');
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

  //Nama column dan bentuk data yang ditampilkan
  const column = [
    {
      heading: 'Subjek',
      value: (v) => v.subject,
    },
    {
      heading: 'pelapor',
      value: (v) => v.userName,
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

  // Mengambil semua data setiap ada perubahan page atau saat value loading berubah
  useEffect(() => {
    // Page untuk mengetahui lokasi page sekarang
    // Set data untuk tempat menaruh data response
    getAll(page, setData);
  }, [page, loading]);

  //Mengambil data detail pengaduan setiap ada id dan saat loading berubah
  useEffect(() => {
    // Id untuk mengetahui pengaduan mana yang ingin diambil
    // Set data untuk tempat menaruh data response
    if (id) getDetail(id, setDataDetail);
  }, [id, loading]);

  //function yang digunakan untuk menutup SEMUA modal
  const closeAllModal = () => {
    // Karena modalnya pake framework punya Bosstrap yang pake jquery, jadi cuman gini
    closeModal('detailPengaduan');
    closeModal('detailTanggapan');
    closeModal('terimaLaporan');
    closeModal('tolakLaporan');
    closeModal('tanggapiLaporan');
    closeModal('hapusLaporan');

    // Untuk membersihkan query selain page
    history.push({
      search: queryString.stringify({
        page,
      }),
    });
  };

  // Funcution untuk menghandle uodate status
  const handleUpdateStatus = (status) => {
    // dengan param nya id, dan bodynya status
    //setLoading agar saat selesai update status function getAll berjalan
    // (ke trigger karena value loading berubah dari false ke true kemudian false lagi)
    updateStatus(id, { status }, setLoading);
    closeAllModal();
  };

  //Buat submit tanggapan
  const submitTanggapan = (v) => {
    //setLoading agar saat selesai update status function getAll berjalan
    // (ke trigger karena value loading berubah dari false ke true kemudian false lagi)
    sendTanggapan(id, v, setLoading);
    closeAllModal();
  };

  //Buat nge handle kalau ada data yang di hapus
  const handleDelete = () => {
    //setLoading agar saat selesai update status function getAll berjalan
    // (ke trigger karena value loading berubah dari false ke true kemudian false lagi)
    deleteOne(id, setLoading);
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
          <div className="col-12 card shadow p-4 rounded-3 border-0">
            <div className="d-flex align-items-center mb-2 justify-content-between">
              <h5 className="h4">
                {'Total : ' + (data.meta ? data.meta.totalData : 0)}
              </h5>
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

      {/* Manggil modal buat konfirmasi terima laporan */}
      <Modal
        header="Terima Laporan"
        id="terimaLaporan"
        confirmText="Terima"
        onClick={() => handleUpdateStatus('onProgress')}
      >
        <p className="text-center">
          Apakah anda ingin menerima dan memproses laporan ini?
        </p>
      </Modal>

      {/* Manggil modal buat konfirmasi menolak laporan */}
      <Modal
        header="Tolak Laporan"
        id="tolakLaporan"
        confirmText="Tolak"
        onClick={() => handleUpdateStatus('rejected')}
      >
        <p className="text-center">Apakah anda ingin menolak laporan ini?</p>
      </Modal>

      {/* Manggil modal buat konfirmasi hapus laporan */}
      {getRole() === 'admin' && (
        <Modal
          header="Hapus Laporan"
          id="hapusLaporan"
          confirmText="Hapus"
          onClick={() => handleDelete()}
        >
          <p className="text-center">
            {
              'Apakah anda ingin menghapus laporann ini? (Tidak dapat dibatalkan)'
            }
          </p>
        </Modal>
      )}

      {/* Manggil modal buat nambah tanggapan baru */}
      <ModalAddTanggapan handleAction={(v) => submitTanggapan(v)} />
    </div>
  );
}
