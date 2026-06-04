import React, { useState } from 'react';
import './AdminBlogPost.css';
import Trash from '../assets/AdminAssets/TrashIcon.png';
import Filter from '../assets/AdminAssets/Filter.png';
import Drafts from '../assets/AdminAssets/Draft.png';
import Published from '../assets/AdminAssets/PublishedBlog.png';
import AllPosts from '../assets/AdminAssets/AllPosts.png';
import threedots from '../assets/ThreeDots.png';
import { useJobs } from '../JobContext';
import Searchicon from '../assets/icon_search.png'
import { AdminCreateBlog } from './AdminCreateBlog';

export const AdminBlogPost = () => {
    const { publishedBlogs } = useJobs();
    const [openMenu, setOpenMenu] = useState(null);
    const [mode, setmode] = useState("list");

    const allBlogsArray = Object.values(publishedBlogs).flat();
    const totalPostsCount = allBlogsArray.length;
    const publishedCount = allBlogsArray.filter(blog => blog.Status === "Published").length;
    const draftsCount = allBlogsArray.filter(blog => blog.Status === "Draft").length;

    return (
        <>
            {mode === "list" ? (
                <div className="admin-Blog-li-admin-blog-post">
                    <div className="admin-Blog-li-top-section">
                        <div className="admin-Blog-li-posts-header">
                            <div>
                                <h2>Posts</h2>
                                <p>Manage and organize all blog posts</p>
                            </div>

                            <button
                                className="admin-Blog-li-create-btn"
                                onClick={() => setmode("create")}
                            >
                                + Create New
                            </button>
                        </div>

                        <div className="admin-Blog-li-post-cards">
                            <div className="admin-Blog-li-post-card">
                                <img src={AllPosts} alt="" />
                                <div>
                                    <h3>All Posts</h3>
                                    <span>{totalPostsCount}</span>
                                </div>
                            </div>

                            <div className="admin-Blog-li-post-card">
                                <img src={Published} alt="" />
                                <div>
                                    <h3>Published</h3>
                                    <span>{publishedCount}</span>
                                </div>
                            </div>

                            <div className="admin-Blog-li-post-card">
                                <img src={Drafts} alt="" />
                                <div>
                                    <h3>Drafts</h3>
                                    <span>{draftsCount}</span>
                                </div>
                            </div>

                            <div className="admin-Blog-li-post-card">
                                <img src={Trash} alt="" />
                                <div>
                                    <h3>Trash</h3>
                                    <span>8</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-Blog-li-table-section">
                       
                        <div className="admin-Blog-li-table-actions">
                             <input type="text" placeholder="Search posts..." />
                                <button style={{position:'relative',right:"125px"}} className="admin-Blog-li-filter-btn">
                                    <img src={Searchicon} alt="search" /> 
                                </button>
                        </div>

                        <div className="admin-Blog-li-posts-table-container">
                            <table className="admin-Blog-li-posts-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Categories</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Object.entries(publishedBlogs).flatMap(([categoryName, blogList]) =>
                                        blogList.map((blog) => (
                                            <tr key={blog.id}>
                                                <td>
                                                    <div className="admin-Blog-li-title-cell">
                                                        <img src={blog.Thumbnail} alt={blog.title} />
                                                        <span>{blog.title}</span>
                                                    </div>
                                                </td>
                                                <td>{categoryName}</td>
                                                <td>
                                                    {blog.date} <br />
                                                    {blog.time || "12:00 PM"}
                                                </td>
                                                <td>
                                                    <span
                                                        className={
                                                            (blog.status || "Published") === "Published"
                                                                ? "admin-Blog-li-status admin-Blog-li-published"
                                                                : "admin-Blog-li-status admin-Blog-li-draft"
                                                        }
                                                    >
                                                        {blog.status || "Published"}
                                                    </span>
                                                </td>
                                                <td className="admin-Blog-li-menu-dot">
                                                    <img
                                                        src={threedots}
                                                        alt="Menu"
                                                        className="admin-Blog-li-threedots-icon"
                                                        onClick={() => { setOpenMenu(openMenu === blog.id ? null : blog.id); }}
                                                    />
                                                    {openMenu === blog.id && (
                                                        <div className="admin-Blog-li-dropdown-menu">
                                                            <div className="admin-Blog-li-dropdown-item">Edit</div>
                                                            <div className="admin-Blog-li-dropdown-item">View</div>
                                                            <div className="admin-Blog-li-dropdown-item">Trash</div>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="admin-Blog-li-view-more">View more...</div>
                        </div>
                    </div>
                </div>
            ) : (

                <AdminCreateBlog setmode={setmode} />
            )}
        </>
    );
};