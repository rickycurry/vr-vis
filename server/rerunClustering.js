async function rerunClustering() {
    const children = document.getElementById('options').children;
    let options = Array.from(children);
    options = options.filter(d => d.tagName === 'SELECT' || d.tagName === 'INPUT');
    let mapped = options.map(d => {
        obj = {};
        obj[d.id] = d.value;
        return obj;
    });
    const response = await fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            [
                ...mapped,
                {
                    "meanshift-cluster-all": document.getElementById('meanshift-cluster-all').checked
                }
            ]
        )
    });
    const text = await response.text();
    console.log(text);
}