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
                window.socket = io('http://192.168.15.45:5555');

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
            throw 'Vehicle socket is not connected!';
        }

        socket.emit('lights:regular:toggle');
    });

    $('[js="aceleration"]').on('input', function () {
        const $input = $(this);
        const value = Number($input.val());

        if (!socket) {
            throw 'Vehicle socket is not connected!';
        }

        socket.emit('aceleration:change', value);
    });
    
    $('[js="aceleration"]').on('change', function () {
        const $input = $(this);

        if (!socket) {
            throw 'Vehicle socket is not connected!';
        }

        $input.val('0');
        socket.emit('aceleration:change', 0);
    });

    $('[js="steering-wheel"]').on('input', function () {
        const $input = $(this);
        const value = Number($input.val());

        if (!socket) {
            throw 'Vehicle socket is not connected!';
        }

        socket.emit('steering-wheel:change', value);
    });

    
    $('[js="steering-wheel"]').on('change', function () {
        const $input = $(this);

        if (!socket) {
            throw 'Vehicle socket is not connected!';
        }

        $input.val('0');
        socket.emit('steering-wheel:change', 0);
    });
});
