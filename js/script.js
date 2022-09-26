const toggleButton = document.getElementsByClassName ("nav-container__toggle") [0]
const navbarlinks = document.getElementsByClassName ("nav__articles") [0]

toggleButton.addEventListener('click', () => {
    navbarlinks.classList.toggle('active')
})