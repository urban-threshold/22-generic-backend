import gatherResponse from '../misc';

const allowLocalDevApp = "http://localhost:3000"
const allowCloudDevApp = ""

export default async function getFerry(request: Request): Promise<Response> {
    const init = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      };
      const response = await fetch('https://www.spatial-data.brisbane.qld.gov.au/datasets/d8d73b6bfdc34a3c8e9254817f0afa85_0.geojson?outSR=%7B%22latestWkid%22%3A28356%2C%22wkid%22%3A28356%7D', init);
      const results = await gatherResponse(response);
    return new Response(results, {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': allowLocalDevApp }
    })
}