import React from 'react';
import Modal from '../../component/fragment/Modal';
import moment from 'moment';

export default function ModalTanggapan({ data }) {
  return (
    <Modal header="Detail Tanggapan" id="detailTanggapan">
      <h5>{data.subject}</h5>
      <span className="text-black-50">
        {data.userName +
          ', ' +
          moment(data.createAt).locale('id').format('D MMMM YYYY')}
      </span>
      <p className="mt-2 mb-0">{data.response && data.response.description}</p>
      <p className="text-black-50">
        {data.operatorName +
          ', ' +
          moment(data.response && data.response.createAt)
            .locale('id')
            .format('D MMMM YYYY')}
      </p>
    </Modal>
  );
}
