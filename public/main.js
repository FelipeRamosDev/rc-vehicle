window.addEventListener('load', () => {
    $('[js="init-vehicle"]').on('click', function () {
        const $button = $(this);
        const vehicleID = $button.attr('vehicle-id');
        const $views = $('.views');
    
        $.ajax({
            url: '/vehicle-connect',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({ vehicleID }),
            success: () => {
                window.socket = io('http://localhost:5555');

                socket.on('connect', () => {
                    console.log('Vehicle socket connection opened!');
                });

                socket.on('disconnect', () => {
                    console.log('Vehicle socket connection closed!');
                });

                socket.on('lights:regular:toggle:response', (response) => {
                    const $painelDisplay = $('.painel .painel-item .value');

                    if (response.error) {
                        alert('An error was caugth on lights toggling!');
                        throw response.data;
                    }

                    if (response.success) {
                        if (response.currentState) {
                            $painelDisplay.text('REGULAR');
                        } else {
                            $painelDisplay.text('OFF');
                        }
                    }
                });

                $views.attr('current', 'vehicle');
            },
            erro: (err) => {
                throw err;
            }
        });
    });

    $('[js="lights:toggle"]').on('click', function () {
        if (!socket) {
            throw 'Vehicle socket is not connected!'
        }

        socket.emit('lights:regular:toggle');
    });
});
