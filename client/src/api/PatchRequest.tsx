export default async function patchRequest(data: object, API_URL: string): Promise<any> {
    console.log(data)
    const newData = JSON.stringify(data)
    console.log(newData)
    const res = await fetch(API_URL, {
        mode: 'cors',
        method: "PATCH",
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