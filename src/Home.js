import {useState, useEffect } from 'react'
import BlogList from './BlogList'

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // const [blogs, setBlogs] = useState([
    //     {title:'My New Website',body:'Hey there this is new',author:'mario',id:1},
    //     {title:'My New Website2',body:'Hey there this is new2',author:'neet',id:2},
    //     {title:'My New Website3',body:'Hey there this is new3',author:'mario',id:3}
    // ]);
    
    // const [name, setName] = useState('mario');

    // const handleDelete = (id) => {
    //     //filter, if condition = false, it will remove from the array
    //     //if id does not match, it gets to stay
    //     const newBlogs = blogs.filter((blog) => blog.id !== id);
    //     setBlogs(newBlogs)
    // }

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
                if (!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err =>{
                setIsPending(false);
                setError(err.message);
            })
    },[]); //empty [] is when run the effect once

    return (
        <div className="home">
            { error && <div>{error}</div>}
            { isPending && <div>Loading ...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"></BlogList>}
            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's Blogs!"></BlogList> */}
        </div> 
    );
}
 
export default Home;