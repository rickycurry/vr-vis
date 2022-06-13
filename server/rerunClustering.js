async function rerunClustering() {
    const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ok": "my guy",
            "cash_in": "cash_out"
        })
        // TODO: Pass arguments
    });
    const text = await response.text();
    console.log(text);
}