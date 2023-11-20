export default async function postRequest(data: object, API_URL: string): Promise<any> {
    const newData = JSON.stringify(data)
    const res = await fetch(API_URL, {
        mode: 'cors',
        method: "POST",
        body: newData,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json'
        },
    })
    const res_1 = await res.json()
    return res_1
}