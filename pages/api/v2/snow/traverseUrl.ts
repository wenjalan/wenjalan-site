// in some cases, a camera's URL is hidden behind a redirect
// this endpoint will follow the redirect and return the final URL
// example: call to /api/v2/snow/traverseUrl?url=https://vauth.command.verkada.com/embed/html/a875540b-adc5-44e6-b3e2-d6ae3c673a96/
// inital response:
// <!doctype html>
// <html lang=en>
// <title>Redirecting...</title>
// <h1>Redirecting...</h1>
// <p>You should be redirected automatically to the target URL: <a href="https://command.verkada.com/embed.html#%7B%22entityId%22%3A%20%2249dc703e-b7d9-4862-afca-281d7e4f6966%22%2C%20%22embedLinkId%22%3A%20%22a875540b-adc5-44e6-b3e2-d6ae3c673a96%22%2C%20%22domains%22%3A%20%22%2A.crystalmountainresort.com%22%2C%20%22token%22%3A%20%22v2_363030e65c10c7e860e8b4f615a68ca9%22%2C%20%22urlSD%22%3A%20%22https%3A//vstream.command.verkada.com/filter/transcode/v2_363030e65c10c7e860e8b4f615a68ca9/49dc703e-b7d9-4862-afca-281d7e4f6966/low_res/livevideo.m3u8%22%2C%20%22urlHD%22%3A%20%22https%3A//vfilter.command.verkada.com/filter/transcode/v2_363030e65c10c7e860e8b4f615a68ca9/49dc703e-b7d9-4862-afca-281d7e4f6966/high_res/livevideo.m3u8%22%7D">https://command.verkada.com/embed.html#%7B%22entityId%22%3A%20%2249dc703e-b7d9-4862-afca-281d7e4f6966%22%2C%20%22embedLinkId%22%3A%20%22a875540b-adc5-44e6-b3e2-d6ae3c673a96%22%2C%20%22domains%22%3A%20%22%2A.crystalmountainresort.com%22%2C%20%22token%22%3A%20%22v2_363030e65c10c7e860e8b4f615a68ca9%22%2C%20%22urlSD%22%3A%20%22https%3A//vstream.command.verkada.com/filter/transcode/v2_363030e65c10c7e860e8b4f615a68ca9/49dc703e-b7d9-4862-afca-281d7e4f6966/low_res/livevideo.m3u8%22%2C%20%22urlHD%22%3A%20%22https%3A//vfilter.command.verkada.com/filter/transcode/v2_363030e65c10c7e860e8b4f615a68ca9/49dc703e-b7d9-4862-afca-281d7e4f6966/high_res/livevideo.m3u8%22%7D</a>. If not, click the link.
// returned url: https://command.verkada.com/embed.html#%7B%22entityId%22%3A%20%2249dc703e-b7d9-4862-afca-281d7e4f6966%22%2C%20%22embedLinkId%22%3A%20%22a875540b-adc5-44e6-b3e2-d6ae3c673a96%22%2C%20%22domains%22%3A%20%22%2A.crystalmountainresort.com%22%2C%20%22token%22%3A%20%22v2_363030e65c10c7e860e8b4f615a68ca9%22%2C%20%22urlSD%22%3A%20%22https%3A//vstream.command.ver
import { NextApiRequest, NextApiResponse } from 'next'

export default async function traverseUrl(req: NextApiRequest, res: NextApiResponse) {
  console.log(`GET /api/v2/snow/traverseUrl`)
  const { url } = req.query
  if (!url) {
    res.status(400).json({ error: 'url query parameter is required' })
    return
  }
  console.log(`traversing url: ${url}`)
  const response = await fetch(url as string, { redirect: 'manual' })
  const redirectUrl = response.headers.get('location')
  if (!redirectUrl) {
    res.status(400).json({ error: 'no redirect found' })
    return
  }
  console.log(`found redirect: ${redirectUrl}`)
  res.json({ url: redirectUrl })
}