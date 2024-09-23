import React from "react"
import { useEffect } from "react"

export type CameraIFrameProps = {
  src: string
  fetchRedirect: boolean
}

/* 
  src should be a link to an iframe
  not every iframe is guaranteed to be compatible
  
  example src urls:
  crystal mountain:
  https://command.verkada.com/embed.html#%7B%22entityId%22%3A%20%2249dc703e-b7d9-4862-afca-281d7e4f6966%22%2C%20%22embedLinkId%22%3A%20%22a875540b-adc5-44e6-b3e2-d6ae3c673a96%22%2C%20%22domains%22%3A%20%22%2A.crystalmountainresort.com%22%2C%20%22token%22%3A%20%22v2_e5c2b6cc7787801128ae4f3dd4a4b35a%22%2C%20%22urlSD%22%3A%20%22https%3A//vstream.command.verkada.com/filter/transcode/v2_e5c2b6cc7787801128ae4f3dd4a4b35a/49dc703e-b7d9-4862-afca-281d7e4f6966/low_res/livevideo.m3u8%22%2C%20%22urlHD%22%3A%20%22https%3A//vfilter.command.verkada.com/filter/transcode/v2_e5c2b6cc7787801128ae4f3dd4a4b35a/49dc703e-b7d9-4862-afca-281d7e4f6966/high_res/livevideo.m3u8%22%7D
  
  whistler blackcomb:
  https://player.brownrice.com/embed/whistlerroundhouse
*/
export default function CameraIFrame({ src, fetchRedirect = false }: CameraIFrameProps) {
  const [cameraSrc, setCameraSrc] = React.useState<string>(src)
  useEffect(() => {
    // get the redirect url from /api/v2/traverseUrl
    if (fetchRedirect) {
      fetch(`/api/v2/snow/traverseUrl?url=${src}`)
        .then(res => res.json())
        .then(data => {
          setCameraSrc(data.url)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      setCameraSrc(src)
    }
  }, [src, fetchRedirect])

  return (
    <div className="h-full w-full no-scrollbar">
      <iframe
        className="h-full w-full relative top-0 left-0 no-scrollbar"
        src={cameraSrc}
      />
    </div>
  )
}