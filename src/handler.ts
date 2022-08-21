import { Router } from 'itty-router'
import example from './routes/example'
import { getFerry, getBusStops, storeBooking, getBooking } from './routes/transport'


const router = Router()

const optionsReqr = () => {
  return new Response("", {status: 204, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET", "Access-Control-Allow-Headers": "*"}})
}

router
  .post("/addbooking/:ferryKey", storeBooking)
  .get("/booking/:ferryKey", getBooking)
  .get("/busstops", getBusStops)
  .get("/ferries", getFerry)
  .get("/example", example)
  .options('/example', () => optionsReqr)
  .options('/booking/:ferryKey', () => optionsReqr)
  .options('/addbooking/:ferryKey', () => optionsReqr)
  .options('/ferries', () => optionsReqr)
  .all('*', () => new Response('Not Found.', { status: 404 }))
export const handleRequest = (request: Request) => router.handle(request)