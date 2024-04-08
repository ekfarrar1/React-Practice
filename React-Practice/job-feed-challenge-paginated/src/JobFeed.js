import React, { useState, useEffect } from 'react';
import styles from './CSS_modules/JobFeed.module.css';
import axios from 'axios';
import moment from 'moment';

// GET API = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
// Metadata GET API = https://hacker-news.firebaseio.com/v0/item/YOUR_POST_ID_HERE.json`


function JobFeed() {
  const [jobPosts, setJobPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)
  const [perPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [endReached, setEndReached] = useState(false);


  //asynchronous function: used to handle functions that may take some time (common for API calls)
   //let app run smoothly w/o getting blocked while waiting for these operations to finish
  const fetchIds = async() => {
    if (!endReached){
      try{
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/jobstories.json`)
        // const totalPages = Math.ceil(response.data.length / perPage);
        // setTotalPages(totalPages);

        //can't use a setter function for job IDs because it's inside an async function
          //state functions are updated in batches in React JS, so if you try to set job IDs 
          //with a setter function and access right after it likely won't be updated to current state yet
        
        // grab 5 job IDs based on page number
          //.splice overwrites original array
          //so, response.data returns all job IDs every time and splice takes the next 5 needed until reach the end
        const jobPostIds = response.data.splice(pageNumber*5, 5)

        
        // jobPosts.length is growing by 5 with each API call, so you know you've reached the end once the length of job posts 
          // is >= length of the response with every job post in it
        console.log(jobPosts.length)
        // console.log(jobPostIds.length)
        if (jobPosts.length >= response.data.length){
          // Once endReached is true, no more calls will be made to the API
          setEndReached(true)
        }
        //fetch metadata on all job post IDs currently loaded on the page
        fetchMetadata(jobPostIds) 
      } catch(error) 
        { console.log(error) }
    }
  };

    // useEffect 
      //pulls data from API using .get function, can see data or error in console (dev tools)
      //if get is successful, IDs is set to response.data (the IDs)
      //runs whenever pageNumber updates
        //**this is not inside of FetchIds because you can't call useEffect conditionally */
    useEffect(() => {
      fetchIds()}, [pageNumber])
    
    // Fetch metadata for given array of job post IDs (array gets longer each time "Load More" is pressed)
    const fetchMetadata = async (jobPostIds) => {
      jobPostIds.forEach((jobPostId) => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${jobPostId}.json`)
        // if successful, set job IDs as response data
        .then(response =>{
          console.log(response)
          // Can use setter function because this isn't an async function
          // '...' = "Spread Syntax"
          // response.data contains metadata for job post
          // '(jobPosts) => [...jobPosts, response.data]' appends new response.data to existing jobPosts array
          setJobPosts((jobPosts) => [...jobPosts, response.data])
        })
        // if fails, print error to dev console
        .catch(error => {
          console.log('Error fetching metdata', error)
        })
      })
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Hackernews Jobs</h1>
        <div className={styles.allPostsContainer}> 
        {
          // .map iterates over jobposts
          // callback function ('onePost, idx') renders each post
            // 'key={onePost?.id}' --> key is provided so React can identify each component in list
              // ? is a chaining operator, helps avoid errors if onePost is undefined/null
            // 'post={onePost}' --> passes onePost as prop to <Post> component so that it can render its properties
          jobPosts.map((onePost, idx) => (
            <Post key={ idx } post={ onePost } />
        ))}
        </div>
        {
          // only display "Load More" button if end hasn't been reached
          !endReached && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              // increment pageNumber by one with each button click
              onClick={() => setPageNumber(pageNumber + 1)}
              className={styles.button}>
              Load More
            </button>
          </div>
      )}
    </div>
  );
};

export default JobFeed;


// Job Post Object
const Post = ({ post }) => {
  return (
    // <a> is the hyperlink tag.
    // __blank target opens link in new tab/window
    // hyper link is applied to anywhere in job post container
    <a href={post?.url} target="__blank" style={{ textDecoration: 'none' }}>
      {/* <div> defines divison. block-level element used as container for HTML elements--> */}
      <div className={styles.postContainer}>
        <p>
          {/* <span> is an inline container used to mark up text */}
          ID: <span>{post?.id}</span>{' '}
        </p>
        <h1>{post?.title}</h1>
        <p>{moment(post?.time).format('Do MMM YYYY hh:mm a')}</p>
        <p>
          Posted by: <span>{post?.by}</span>{' '}
        </p>
      </div>
    </a>
  );
};

// Pagination component

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  // Add index for each page number to pages array
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        // generate button for each page
        // set class style conditionally (active vs non-active page numbers have different style)
        // change page on button click
        <button
          key={page}
          className={currentPage === page ? styles.activePage : styles.page}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

