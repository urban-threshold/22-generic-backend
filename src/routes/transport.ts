import gatherResponse from '../misc';

const allowLocalDevApp = "*"
const allowCloudDevApp = ""

async function getFerry(request: Request): Promise<Response> {
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

async function getBusStops(request: any): Promise<Response> {
    const init = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      };
      const response = await fetch('https://www.spatial-data.brisbane.qld.gov.au/datasets/9fa7ded987ac4b7085af4949034d0594_0.geojson?outSR=%7B%22latestWkid%22%3A28356%2C%22wkid%22%3A28356%7D', init);
      const results = await gatherResponse(response);
    return new Response(results, {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': allowLocalDevApp }
    })
}

async function getBooking(request: any): Promise<Response> {
  const { params } = request;
  let recordFound = await BOOKINGS_KV.get(params.ferryKey);
  let result = "";

  if(recordFound){
    const value = await BOOKINGS_KV.get(params.ferryKey);
    result = '{"counter":' + value + '}';
  } else {
    result = '{"counter": 0}';
  }

  return new Response(result, {
    status: 200,
    headers: { 'Access-Control-Allow-Origin': allowLocalDevApp, 'Content-Type': 'application/json'}
  })
}

async function storeBooking(request: any): Promise<Response> {
  const { params } = request;

  let result = "";
  console.log(params.ferryKey);
  let recordFound = await BOOKINGS_KV.get(params.ferryKey);
  if(recordFound){
    const value = await BOOKINGS_KV.get(params.ferryKey);
    let newValue = Number(value) + 1;
    await BOOKINGS_KV.put(params.ferryKey,String(newValue));
    result = "record updated";
  } else {
    //init the key value to 0
    await BOOKINGS_KV.put(params.ferryKey, "1")
    storeBooking;
    result = "record added";
  }

  return new Response(result, {
    status: 200,
    headers: { 'Access-Control-Allow-Origin': allowLocalDevApp }
  })
}

export {getFerry, getBusStops, storeBooking, getBooking}