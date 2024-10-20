import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = ({ pageSize = 8, category = "general", apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    try {
      setProgress(10);
  
      // Construct the API URL
      const url = new URL("https://newsapi.org/v2/top-headlines");
      const params = {
        country: "us",  // Use 'us' for testing
        category: category, // Passed from props
        apiKey: apiKey,
        page: page,
        pageSize: pageSize,
      };
  
      // Add query parameters to the URL
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
  
      console.log("API Request URL:", url); // Log to confirm the URL
  
      setLoading(true);
      const response = await fetch(url);
      const parsedData = await response.json();
      console.log("API Response:", parsedData); // Debug the response
  
      if (parsedData.status === "ok" && parsedData.totalResults > 0) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
      } else {
        console.warn("No articles found.");
        setArticles([]); // Reset articles if none are found
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]); // Handle errors gracefully
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };
  
  

  useEffect(() => {
    document.title = `News on ${category}`;
    updateNews(); 
    // eslint-disable-next-line
  }, [category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    setPage(nextPage);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles((prev) => prev.concat(parsedData.articles || []));
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "90px" }}>
        NewsMonkey - Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div className="col-md-4" key={article.url}>
                  <NewsItem {...article} />
                </div>
              ))
            ) : (
              <p>No articles found for this category.</p>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;






