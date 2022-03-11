import api  from '../../utils/api'

import {useEffect, useState} from 'react'

import styles from './MainPosts.module.css'

export const MainPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        api.get('/posts').then((response) => {
            setPosts(response.data.posts)
        })
    }, [])


    return (
        <section>
            <div className={styles.mainSectionPosts}>
                <div className={styles.postItem}>
                    {posts.length > 0 && (
                        posts.map((post) => (
                            <div className={styles.elementPost} key={post._id}>
                                <h2>{post.title}</h2>
                                <p>{post.subtitle}</p>
                            </div>
                        ))
                    )}
                    {posts.length === 0 && (
                        <p>Não há posts cadastrados</p>
                    )}
                </div>
            </div>
        </section>
    )
}