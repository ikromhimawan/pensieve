import Swal from 'sweetalert2';

const IsAlert = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn border text-secondary btn-light mx-1'
    },
    buttonsStyling: false
})

export {
    IsAlert
}