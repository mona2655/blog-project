import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuth = post && userData ? post.userId === userData.$id : false;

    // Fetch Post Data
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate('/');
            });
        }
    }, [slug, navigate]);

    // Delete Post Function
    const deletePost = () => {
        if (post) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate('/');
                }
            });
        }
    };

    // Prevent Rendering if Post is Null
    if (!post) return null;

    return (
        <div className='py-8'>
            <Container>
                {/* Post Image and Actions */}
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-xl'
                    />
                    
                    {/* Edit & Delete Buttons */}
                    {isAuth && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button onClick={deletePost} bgColor='bg-red-500'>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>

                {/* Post Content */}
                <div className='browser-css'>{parse(post.content)}</div>
            </Container>
        </div>
    );
}
