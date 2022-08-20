import { Router } from 'itty-router'
import example from './routes/example'
import { getFerry, getBusStops } from './routes/transport'


const router = Router()

router
  .get("/busstops", getBusStops)
  .get("/ferries", getFerry)
  .get("/example", example)
  .options('/example', () => new Response("", {status: 204, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET", "Access-Control-Allow-Headers": "*"}}))
  .all('*', () => new Response('Not Found.', { status: 404 }))
export const handleRequest = (request: Request) => router.handle(request)