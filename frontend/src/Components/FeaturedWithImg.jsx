import React from 'react'

function FeaturedWithImg({title, body, image, category}) {
  return (
<div className="col-md-6 g-2">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative m-0">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary-emphasis">{category}</strong>
          <h3 className="mb-0">{title}</h3>
          <div className="mb-1 text-body-secondary">{new Date().getUTCFullYear()}</div>
          <p className="card-text mb-auto">{body}.</p>
          <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
          </a>
        </div>
        <div className="col-auto d-none d-md-block">
          <img src={image} alt='random pic'/>
        </div>
      </div>
    </div>  )
}

export default FeaturedWithImg