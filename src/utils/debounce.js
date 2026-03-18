export function debounce(fn, delay = 300) {
    let timeout;

    return (...args) => {
        return new Promise((resolve) => {
            clearTimeout(timeout);

            timeout = setTimeout(async () => {
                const result = await fn(...args);
                resolve(result);
            }, delay);
        });
    };
}