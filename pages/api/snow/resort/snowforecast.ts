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
  try {
    const snowContent = cssSelect.selectOne('div.forecast-table__content', dom)
    const table = cssSelect.selectOne('table', snowContent)
    const tbody = cssSelect.selectOne('tbody', table)
    const snowRow = cssSelect.selectAll('tr', tbody)[5]
    const snowDivs = cssSelect.selectAll('div', snowRow)
    const snowSpans = cssSelect.selectAll('span', snowDivs)
    // remove first element (label)
    snowSpans.shift()
    // @ts-ignore: trust me bro
    const forecast = snowSpans.filter(span => span.children[0]).map(span => {
      // @ts-ignore: trust me bro
      const data = span.children[0].data
      return data === "—" ? 0 : parseInt(data)
    })
    return forecast
  } catch (e) {
    console.error(e)
    return [0]
  }
}