import { NextApiRequest, NextApiResponse } from 'next'
import * as htmlparser from 'htmlparser2'
import * as cssSelect from 'css-select'

// CORS proxy for API calls to Vail Resorts websites
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string
  const response = await fetch(url)

  if (!response.ok) {
    res.status(500).json({ error: `Error fetching Snow Forecast data from ${url}: ${response.status} ${response.statusText}`})
    return
  }

  const html = await response.text()
  const dom = htmlparser.parseDocument(html)
  // @ts-ignore: trust me bro
  const forecast = getForecast(dom)
  res.status(200).json({"forecast": forecast})
}

function getForecast(dom: Document) {
  const snowContent = cssSelect.selectOne('div.forecast-table__content', dom)
  const snowRow = cssSelect.selectOne('tr.forecast-table-snow.forecast-table__row', snowContent)
  const snowSpans = cssSelect.selectAll('span', snowRow)
  // @ts-ignore: trust me bro
  const forecast = snowSpans.filter(span => span.children[0]).map(span => {
    // @ts-ignore: trust me bro
    return span.children[0].data === "—" ? 0 : parseInt(span.children[0].data)
  })
  return forecast
}