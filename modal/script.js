'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-modal');

const openModalButton = document.querySelectorAll('.show-modal');

function showModal() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')    
}

function hideModal() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')      
}
openModalButton.forEach(element => element.addEventListener('click', showModal))

closeModalButton.addEventListener("click", hideModal)
overlay.addEventListener("click", hideModal)

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) hideModal()
    console.log(e.key)
})