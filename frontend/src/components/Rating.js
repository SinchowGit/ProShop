import React from 'react'

const Ratings = ({value, text}) => {
  return (
    <div className='rating'>
        <span>
          <i style={{color:'#f8e825'}} className={value>=1 ? 'fa-solid fa-star' : value>=0.5 ? 'fa fa-star-half-stroke' : 'fa-regular fa-star'}></i>
        </span>
        <span>
          <i style={{color:'#f8e825'}} className={value>=2 ? 'fa-solid fa-star' : value>=1.5 ? 'fa fa-star-half-stroke' : 'fa-regular fa-star'}></i>
        </span>
        <span>
          <i style={{color:'#f8e825'}} className={value>=3 ? 'fa-solid fa-star' : value>=2.5 ? 'fa fa-star-half-stroke' : 'fa-regular fa-star'}></i>
        </span>
        <span>
          <i style={{color:'#f8e825'}} className={value>=4 ? 'fa-solid fa-star' : value>=3.5 ? 'fa fa-star-half-stroke' : 'fa-regular fa-star'}></i>
        </span>
        <span>
          <i style={{color:'#f8e825'}} className={value>=5 ? 'fa-solid fa-star' : value>=4.5 ? 'fa fa-star-half-stroke' : 'fa-regular fa-star'}></i>
        </span>

        <span>{text && text}</span>
    </div>
  )
}

export default Ratings