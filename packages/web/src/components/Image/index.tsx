import React, { useEffect, useState } from "react";
import loadGif from './load.gif'

type PropsImage = {
  source: string,
  imgDefault?: string,
  onError?: () => void
}

const Image = ({source, imgDefault, onError}: PropsImage) => {

  const [img, setImg] = useState(source);

  const handleError = () => {

    setImg(loadGif)
    if(onError) {

      onError()
    } else {

      if(imgDefault) {
        setImg(imgDefault);
      }
    }
  }

  useEffect(() => {
    setImg(loadGif)
    setImg(source)
  }, [source])

  return (<>
            <img src={img} onError={(e)=>{ handleError() }} />
          </>)
}

export default Image;