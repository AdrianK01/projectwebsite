//Written by Adrian Klimaszewski
function Quiz() {
    const answer1 = document.querySelector('#correct1');
    const answer2 = document.querySelector('#correct2');
    const answer3 = document.querySelector('#correct3');
    const button = document.querySelector('#submit');
    button.addEventListener('click', () => {
        answer1.innerHTML = "The Diamond - Correct Answer";
        answer2.innerHTML = "West Bank - Correct Answer";
        answer3.innerHTML = "Endcliffe - Correct Answer";
        answer1.classList.add('correct');
        answer2.classList.add('correct');
        answer3.classList.add('correct');
    }
    )
}
Quiz();