import React from 'react';
import './Blogpage.css';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Components-LandingPage/Footer';
import { Header } from '../Components-LandingPage/Header'; // Inga normal Header import iruku, user choice mardhi use pannikalam
import blogheadimg from "../assets/Blog_Images/bloghead.png";
import blogimg from "../assets/Blog_Images/blog1.png";
import bloggimg from "../assets/Blog_Images/blog2.png";
import blggimg from "../assets/Blog_Images/blog3.png";
import blogcimg from "../assets/Blog_Images/blog4.png";
import bloggcimg from "../assets/Blog_Images/blog5.png";
import blogccimg from "../assets/Blog_Images/blog6.png";
import bloggccimg from "../assets/Blog_Images/blog7.png";
import blggcimg from "../assets/Blog_Images/blog8.png";
import blogimgg from "../assets/Blog_Images/blog9.png";
import bloggimgg from "../assets/Blog_Images/blog10.png";
import blooggimgg from "../assets/Blog_Images/blog11.png";
import { FHeader } from './FHeader';
import { useJobs } from '../JobContext';

export const BlogCard = ({ item }) => {
  const navigate = useNavigate()
  const ReduceDesc = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(/\s+/); 
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
    return (
      <div className='content'>
        <img src={item.Thumbnail} alt={item.title} width="300" />
        <p className='blog-date'>{item.date}</p>
        <h3 className={item.isCategory ? 'card-title' : ''}>{item.title}</h3>
        
        {!item.isCategory && (
          <p>{ReduceDesc(item.desc,10)}</p>
          
        )}
       <p style={{fontSize:"20px",cursor:"pointer",color:"#5295f8",fontWeight:"600"}} onClick={() => navigate(`/Job-portal/jobseeker/Blogs/BlogDatas/${item.title}`, { state: { blogData: item } })}>
  Read more
</p>
      </div>
    );
  };

export const Blogpage = () => {
  const navigate = useNavigate();
  const {publishedBlogs}=useJobs()
  

  return (
    <>
      <FHeader />

      <div style={{ marginTop: "150px" }} className='blogpage'>
        <img src={blogheadimg} alt="blogpage header" width="1450px" style={{ padding: "25px" }} />
      </div>

      {Object.entries(publishedBlogs).map(([sectionTitle, sectionItems]) => (
        <div className='cat-con' key={sectionTitle}>   
          <div className='categories2'>
            <h1>{sectionTitle}</h1>           
            {sectionItems.length > 3 && (
  <button onClick={() => {
      navigate(`/Job-portal/jobseeker/Blogs/view-all/${sectionTitle}`, { 
        state: { pageTitle: sectionTitle, pageData: sectionItems } 
      });
    }} 
    className='view-all'
  >
   View all
  </button>
)}
          </div>

          <div className='container2'>
            {sectionItems.slice(0, 3).map((item) => (
              <BlogCard key={item.id} item={item} />
            ))}
          </div>
          <hr style={{ border: "0.5px solid #eee", margin: "20px 25px" }} />
        </div>
      ))}

      <Footer />
    </>
  );
};