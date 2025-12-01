// Obtener el modal
var modal = document.getElementById("imageModal");

// Obtener la imagen dentro del modal
var modalImg = document.getElementById("imgExpanded");

// Función para abrir el modal con la imagen correcta
function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src; // Carga la imagen correcta en el modal
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = "none";
}

// Opcional: Cierra el modal si el usuario hace clic fuera de la imagen
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
