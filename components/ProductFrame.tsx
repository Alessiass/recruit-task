import React from 'react'
import { ProductData } from './Listing'
import Image from 'next/image'

interface InputProps {
    frameData: ProductData
}

const ProductFrame = (props:InputProps) => {
    
  return (
      <div>
          <div>
            <Image width="300px" height="300px" src={props.frameData.images[0]} alt="Product image" />
          </div>
          <div>
              Product name: {props.frameData.title}
              Product description: {props.frameData.description}
              Price: {props.frameData.price}
          </div>
    </div>
  )
}

export default ProductFrame