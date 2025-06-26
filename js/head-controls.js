document.addEventListener('DOMContentLoaded', function () {
    const controls = document.querySelectorAll('.talking-head-control');
    const dreamy = document.getElementById('dreamy');
    const suprematism = document.getElementById('suprematism');
    const illustrative = document.getElementById('illustrative');
    const head3D = document.getElementById('3d-head');

    controls.forEach(control => {
        control.addEventListener('click', function () {
            // Remove control-active from all & add to the clicked one
            controls.forEach(btn => btn.classList.remove('control-active'));
            control.classList.add('control-active');

            // Hide every talking head & show selected one
            dreamy.classList.add('d-none');
            suprematism.classList.add('d-none');
            illustrative.classList.add('d-none');
            head3D.classList.add('d-none');

            if (control.id === '3d-head-btn') {
                head3D.classList.remove('d-none');
            } else if (control.id === 'dreamy-btn') {
                head3D.classList.remove('d-none');
                dreamy.classList.remove('d-none');
            } else if (control.id === 'suprematism-btn') {
                suprematism.classList.remove('d-none');
            } else if (control.id === 'illustrative-btn') {
                illustrative.classList.remove('d-none');
            }
        });
    });
});
