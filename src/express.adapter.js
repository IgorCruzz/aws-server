const adapRoute = (controller) => async (req, res) => {
    const httpRequest = {
        body: req.body,

        params: req.params,

        codigo: req.codigo,

        headers: req.headers,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
        res.status(httpResponse.status).json(httpResponse.body);
    } else {
        res.status(httpResponse.status).json({
            error: httpResponse.body.message,
        });
    }
};

export default adapRoute;
