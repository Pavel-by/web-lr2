booksWorker = {
    put: (data, callback) => {
        let id = data.id;
        let request = new XMLHttpRequest();

        if (!id)
            request.open("PUT", "/books");
        else
            request.open("PUT", `/books/${id}`);

        request.onreadystatechange = () => {
            if (request.readyState !== 4)
                return;
            let response;
            try {
                response = JSON.parse(request.responseText);
            } catch (e) {
                response = {error: "Response parse error"};
                console.log(e);
            }

            if (typeof callback === 'function')
                callback(response, request);
        };
        request.send(data);
    }
};