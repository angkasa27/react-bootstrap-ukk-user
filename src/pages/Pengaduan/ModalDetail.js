import React from 'react';
import Modal from '../../component/fragment/Modal';
import moment from 'moment';

export default function ModalDetail({ data }) {
  return (
    <Modal header="Detail Laporan" id="detailPengaduan">
      <div>
        <img
          className="img-fluid"
          src={data.detail && data.detail.image}
          alt="Gambar Detail"
        />
      </div>
      <h5>{data.subject}</h5>
      <span className="text-black-50">
        {data.userName +
          ', ' +
          moment(data.createAt).locale('id').format('D MMMM YYYY')}
      </span>
      <p className="">{data.detail && data.detail.description}</p>
    </Modal>
  );
}
