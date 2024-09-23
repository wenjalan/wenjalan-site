import { type } from "os"

export default function Debug() {
  const urls = [
    "https://command.verkada.com/embed.html#%7B%22entityId%22%3A%20%2249dc703e-b7d9-4862-afca-281d7e4f6966%22%2C%20%22embedLinkId%22%3A%20%22a875540b-adc5-44e6-b3e2-d6ae3c673a96%22%2C%20%22domains%22%3A%20%22%2A.crystalmountainresort.com%22%2C%20%22token%22%3A%20%22v2_e5c2b6cc7787801128ae4f3dd4a4b35a%22%2C%20%22urlSD%22%3A%20%22https%3A//vstream.command.verkada.com/filter/transcode/v2_e5c2b6cc7787801128ae4f3dd4a4b35a/49dc703e-b7d9-4862-afca-281d7e4f6966/low_res/livevideo.m3u8%22%2C%20%22urlHD%22%3A%20%22https%3A//vfilter.command.verkada.com/filter/transcode/v2_e5c2b6cc7787801128ae4f3dd4a4b35a/49dc703e-b7d9-4862-afca-281d7e4f6966/high_res/livevideo.m3u8%22%7D",
    "https://player.brownrice.com/embed/whistlerroundhouse"
  ]
  return (
    <CameraIFrame src={urls[0]} />
  )
}

type CameraIFrameProps = {
  src: string
}

function CameraIFrame({ src }: CameraIFrameProps) {
  return (
    <div className="w-full overflow-hidden">
      <iframe
        className="h-full w-full absolute top-0 left-0"
        src={src}
      />
    </div>

  )
}