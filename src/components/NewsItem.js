import React from "react";

const NewsItem = ({ title, description, urlToImage, url, author, publishedAt, source }) => {
  return (
    <div className="card mb-3">
      <img src={urlToImage || "https://via.placeholder.com/150"} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read More
        </a>
        <p className="card-text">
          <small className="text-muted">
            By {author || "Unknown"} on {new Date(publishedAt).toLocaleString()} | Source: {source.name}
          </small>
        </p>
      </div>
    </div>
  );
};

export default NewsItem;


