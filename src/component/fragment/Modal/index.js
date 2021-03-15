import $ from 'jquery';

export { default } from './ModalBase';

export const openModal = (id) => {
  console.log('Mebuka modal dengan id: ' + id);
  $(`#${id}`).modal('show');
};

export const closeModal = (id) => {
  $(`#${id}`).modal('hide');
};
