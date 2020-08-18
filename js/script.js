/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener ('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const advSponsor = document.querySelectorAll(".promo__adv img"),
          genre = document.querySelector(".promo__genre"),
          mainFilmImg = document.querySelector(".promo__bg"),
          movieList = document.querySelector(".promo__interactive-list"),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    // введение фильма в строчку и галочка любимый фильм
    addForm.addEventListener('submit', (event) => {
        // добавление без перезагрузки
        event.preventDefault();
        let newFilm = addInput.value;
        // проверка галочки ДА любимый
        const favorite = checkbox.checked;
        
        if (newFilm) {
            // условие что меньше 21 символа
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            // добавление введенного фильма в массив
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies); 

            createMovieList (movieDB.movies, movieList);
        }
        event.target.reset();

    });
          
    // удаление рекламы справа - картинки и надпись "реклама от спонсоров"
    const deleteAdv = (arr) => {
        arr.forEach (item => {
            item.remove();
        });
    };

    // document.querySelector('.promo__adv-title').remove();
    
    const makeChanges = () => {
        // смена жанра
        genre.textContent = "ДРАМА";
    
        // смена картинки марсианин 
        mainFilmImg.style.backgroundImage = "url('img/bg.jpg')";
    };

    const sortArr = (arr) => {
        // список фильмов 
        arr.sort();
    };
    
    function createMovieList (films, parent) {
        parent.innerHTML = "";
        sortArr(films);
    
        films.forEach ((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList (movieDB.movies, movieList);
            });
        });
    }
    deleteAdv(advSponsor);
    makeChanges();
    createMovieList (movieDB.movies, movieList);
});




