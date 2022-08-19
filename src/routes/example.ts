import { IExampleType } from './../types';

const allowLocalDevApp = "http://0.0.0.0:3000"
const allowCloudDevApp = ""

const exampleData: IExampleType = {
    name: "Hey, what's going on",
    value: 1337
}

export default async function example(request: Request): Promise<Response> {
    return new Response(exampleData.name, {
        status: 204,
        headers: { 'Access-Control-Allow-Origin': allowLocalDevApp }
    })
}
