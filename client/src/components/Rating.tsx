import React from "react";

/* The Rating component takes props as an argument, which include 
   rating (number), numReviews (optional number), and caption (optional string) */
const Rating = (props: {
  rating: number;
  numReviews?: number;
  caption?: string;
}) => {
  const { rating, numReviews, caption } = props;

  return (
    <div className='rating'>
      {/* renders five spans, each representing a star icon */}
      {/* each span is conditionally set based on the rating value */}
      <span>
        <i
          className={
            rating >= 1
              ? // displaying full star icon using font-awesome classes
                "fas fa-star"
              : rating >= 0.5
              ? // displaying half star icon
                "fas fa-star-half-alt"
              : // displaying empty star icon
                "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? // displaying full star icon using font-awesome classes
                "fas fa-star"
              : rating >= 1.5
              ? // displaying half star icon
                "fas fa-star-half-alt"
              : // displaying empty star icon
                "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? // displaying full star icon using font-awesome classes
                "fas fa-star"
              : rating >= 2.5
              ? // displaying half star icon
                "fas fa-star-half-alt"
              : // displaying empty star icon
                "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? "fas fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      {/* If a caption is provided,  */}
      {caption ? (
        // it is rendered as a span element.
        <span>{caption}</span>
      ) : // If a numReviews value is provided and it is not equal to 0,
      numReviews != 0 ? (
        // it is rendered as a span element showing the number of reviews.
        <span>{" " + numReviews + " reviews"}</span>
      ) : (
        ""
      )}
    </div>
  );
};

// The component is then exported as the default export for use in other parts of the application.
export default Rating;
