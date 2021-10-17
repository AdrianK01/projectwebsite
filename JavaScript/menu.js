//Written by Adrian Klimaszewski
function Slide() {
    const menu = document.querySelector('.menu_icon');
    const navigation = document.querySelector('.navigation-links');
    menu.addEventListener('click', () => {
        navigation.classList.toggle('menu-active');
    }
    )
}
Slide();