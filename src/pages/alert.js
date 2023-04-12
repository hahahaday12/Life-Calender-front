import Swal from "sweetalert2";

export function ShowConfirm(text, icon){

  const button = document.querySelector('button');
  button.disabled = true;
  return Swal.fire({
    text: text,
    icon : icon || 'info',
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

  try {
    const button = document.querySelector('button');
  

    const swalConfig = {
      text: text,
      icon : icon,
      allowOutsideClick : false
    }

    if(confirmText){
      swalConfig.confirmButtonText = confirmText;
      if(button != null){
        button.disabled = true;
      }
    }else{
      swalConfig.allowOutsideClick = true;
      swalConfig.showConfirmButton = false;
    }

  return Swal.fire(swalConfig).then((result) => {
    if(button != null){
      button.disabled = false;
    }
    return result.isConfirmed;
  });
  } catch (error) { 
    console.error(error);
  } 
};
