document
    .getElementById('load-more')
    .addEventListener('click', function () {
        document
            .querySelectorAll('.hidden-card')
            .forEach(el => el.style.display = 'block');
        this.style.display = 'none';
    });