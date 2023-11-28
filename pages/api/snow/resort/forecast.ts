import { NextApiRequest, NextApiResponse } from 'next'
import * as htmlparser from 'htmlparser2'
import * as cssSelect from 'css-select'

// CORS proxy for API calls to Vail Resorts websites
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string
  const dom = await getDom(url)
  // @ts-ignore: trust me bro
  const forecast = getForecast(dom)
  res.status(200).json({"forecast": forecast})
}

async function getDom(url: string) {
  const response = await fetch(url)
  const html = await response.text()
  return htmlparser.parseDocument(html)
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