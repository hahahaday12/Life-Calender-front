//import TokenRepository from '../../../repository/TokenRepository';
import Swal from "sweetalert2";

export function ShowConfirm(text, icon){
  const button = document.querySelector('button');
  button.disabled = true;
  return Swal.fire({
    text: text,
    icon : icon,
    showCancelButton: true,
    allowOutsideClick : false,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  }).then((result) => {
    button.disabled = false;
    return result.isConfirmed;
  });
}

export function ShowAlert(text, icon, confirmText){

  const button = document.querySelector('button');
  button.disabled = true;

  const swalConfig = {
    text: text,
    icon : icon,
    allowOutsideClick : false
  }

  if(confirmText){
    swalConfig.confirmButtonText = confirmText;
  }else{
    swalConfig.allowOutsideClick = true;
    swalConfig.showConfirmButton = false;
  }

  return Swal.fire(swalConfig).then((result) => {
    button.disabled = false;
    return result.isConfirmed;
  });
}