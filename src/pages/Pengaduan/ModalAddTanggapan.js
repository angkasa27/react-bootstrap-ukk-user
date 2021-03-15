import React, { useState, useEffect } from 'react';
import Modal from '../../component/fragment/Modal';
import moment from 'moment';
// import TextArea from '../../input/InputTextArea';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';
import InputTextArea from '../../component/fragment/Input/InputTextArea';

export default function ModalTanggapan({ handleAction }) {
  const location = useLocation();
  const { id } = queryString.parse(location.search.replace('?', ''));
  const [description, setDescription] = useState('');

  const date = () => {
    return moment().format();
  };

  const handleSubmit = () => {
    handleAction({ description, createAt: date() });
  };

  useEffect(() => {
    if (!id) setDescription('');
  }, [id]);

  return (
    <Modal
      header="Tambahkan Tanggapan"
      id="tanggapiLaporan"
      confirmText="Simpan"
      onClick={() => handleSubmit()}
    >
      <InputTextArea
        name="description"
        label="Tanggapan"
        placeholder="Masukan tanggapan anda"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="col-md-12"
      />
    </Modal>
  );
}
