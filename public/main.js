$('[js="init-vehicle"]').on('click', function () {
    const $button = $(this);
    const vehicleID = $button.attr('vehicle-id');

    $.ajax({
        url: '/vehicle-connect',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({ vehicleID }),
        success: () => {
            open('/vehicles/otter.html', '_self');
        },
        erro: (err) => {
            throw err;
        }
    });
});
