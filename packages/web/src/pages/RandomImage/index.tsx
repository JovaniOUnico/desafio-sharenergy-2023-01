import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Image from "../../components/Image";
import * as R from './styles';

const ramdom_dog = axios.create({
  baseURL: process.env.RANDOM_IMAGES
});

const RandomImage = () => {

  const [image, setImage] = useState(`${process.env.RANDOM_IMAGES}`);

  useEffect(() => {
    refreshImage();
  }, [])

  const refreshImage = () => {

    const getRandomDog = async () => {
      const randomDog = await ramdom_dog.get('/woof',);

      let img = randomDog.data;
      setImage(`${process.env.RANDOM_IMAGES}/` + img);
    }

    getRandomDog();
  }

  return (<div>
            <R.Container>
              <Button text='Refresh Image'
                        Type='button'
                        onClick={() => { refreshImage() }} />

              <Image source={image}
                     onError={() => { refreshImage() }}/>
            </R.Container>
          </div>)

}

export default RandomImage;