import {useState, useEffect } from 'react'
import BlogList from './BlogList'

const Home = () => {
    const [blogs, setBlogs] = useState(null);

    // const [blogs, setBlogs] = useState([
    //     {title:'My New Website',body:'Hey there this is new',author:'mario',id:1},
    //     {title:'My New Website2',body:'Hey there this is new2',author:'neet',id:2},
    //     {title:'My New Website3',body:'Hey there this is new3',author:'mario',id:3}
    // ]);
    
    const [name, setName] = useState('mario');

    const handleDelete = (id) => {
        //filter, if condition = false, it will remove from the array
        //if id does not match, it gets to stay
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogs)
    }

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setBlogs(data)
            })
    },[]); //empty [] is when run the effect once

    return (
        <div className="home">
            {blogs && <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete}></BlogList>}
            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's Blogs!"></BlogList> */}
            <button onClick={() => setName('luigi')}>Change Name</button>
            <p>{name}</p>
        </div> 
    );
}
 
export default Home;