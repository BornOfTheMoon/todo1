export default async function deleteRequest(data: any, API_URL: string) {
    console.log(data)
    const newData = JSON.stringify(data)
    console.log(newData)
    const res = await fetch(API_URL, {
        mode: 'cors',
        method: "DELETE",
        body: newData,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        },
    })
    const res_1 = await res.json()
    console.log(res_1)
    return res_1
}