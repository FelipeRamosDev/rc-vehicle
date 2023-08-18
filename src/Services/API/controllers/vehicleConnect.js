export default function vehicleConnect(req, res) {
    const { vehicleID } = Object(req.body);

    switch (vehicleID) {
        case 'otter-v1': {
            this.initVehicle.Otter();
            break;
        }
        default: {
            if (!vehicleID) {
                return res.status(404).send({
                    error: true,
                    status: 404,
                    name: 'MISSING_PARAM',
                    message: `The "vehicleID" param is required!`
                });
            }
        }
    }

    return res.status(200).send({
        success: true,
        message: `The "${vehicleID}" vehicle was initialized and is connected ready to be drived!`
    });
}
