import React, {useState, useEffect} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [Post, setPosts] =  useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        if(slug){
            appwriteService.getPost(slug).then((Post) =>{
                if(Post){
                    setPosts(Post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])
  return Post ? (
    <div className='py-8'>
        <Container>
         <PostForm post={Post}/>
        </Container>
    </div>
  ) : null
   
}

export default EditPost