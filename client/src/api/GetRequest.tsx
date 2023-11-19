export const GetRequest = (data: any, URL: string) => {
    fetch(URL, {
        mode: 'no-cors',
        method: "GET",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            return response
        })
}