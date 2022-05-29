import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin=false, keyword='' }) => {

    let to
    if(!window.location.pathname.startsWith('/admin')){
        to = keyword ? `/search/${keyword}/page` : `/page`
    }else{
        to = keyword ? `/admin/productlist/search/${keyword}/page` : `/admin/productlist/page`
    }
  return pages > 1 && (
      <Pagination>
          {[...Array(pages).keys()].map(x => (
              <LinkContainer key={x+1} to={`${to}/${x+1}`}>
                  <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
              </LinkContainer>
          ))}
      </Pagination>
  )
}

export default Paginate