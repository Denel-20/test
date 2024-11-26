self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(response => {
            if (response.status === 200 && response.headers.get('Content-Encoding') === 'gzip') {
                const clonedResponse = response.clone();
                const init = {
                    status: clonedResponse.status,
                    statusText: clonedResponse.statusText,
                    headers: clonedResponse.headers
                };
                init.headers.set('Content-Encoding', 'gzip');
                return new Response(clonedResponse.body, init);
            }
            return response;
        })
    );
});
