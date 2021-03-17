import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal, { openModal, closeModal } from '../../component/fragment/Modal';
import moment from 'moment';

export default function FormLaporan({ handleSubmit }) {
  const history = useHistory();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [viewImage, setViewImage] = useState('');

  const date = () => {
    return moment().format();
  };

  const onSubmit = () => {
    closeModal('kirimLaporan');
    handleSubmit({
      subject,
      image,
      description,
      createAt: date(),
    });
    history.push('/pengaduan');
  };

  const getBase64 = (e) => {
    setImage(e.target.files[0]);
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    let image = document.getElementById('addImage');
    if (file) reader.readAsDataURL(file);
    reader.onloadend = () => {
      image.src = reader.result;
      setViewImage(image.src);
    };
  };

  return (
    <div className="col-sm-4 card mt-2 p-3">
      <span className="input-span">Subjek</span>
      <input
        placeholder="Subjek"
        autoFocus="true"
        type="text"
        className="form-control mb-1"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <span className="input-span">Deskripsi</span>
      <textarea
        placeholder="Deskripsi"
        autoFocus="true"
        type="text"
        className="form-control mb-1"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
      />
      <div className="mb-2">
        <span className="input-span">Gambar Pendukung</span>
        <br />
        {image ? (
          <img src={viewImage} alt="" className="img-fluid" />
        ) : (
          <label className="btn btn-primary">
            Tambah Gambar
            <input
              type="file"
              onChange={(v) => getBase64(v)}
              id="addImage"
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>
      <button
        className="btn btn-block btn-primary mb-1"
        onClick={() => openModal('kirimLaporan')}
      >
        Kirim
      </button>
      <button
        className="btn btn-outline-primary btn-block mb-1"
        onClick={() => history.push('/pengaduan')}
      >
        Kembali
      </button>
      <Modal
        header="Kirim laporan"
        id="kirimLaporan"
        confirmText="Kirim"
        onClick={() => onSubmit()}
      >
        <p className="text-center">Apakah anda ingin mengirim laporan ini?</p>
      </Modal>
    </div>
  );
}
