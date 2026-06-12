import { useEffect, useState } from "react"
import * as styles from "./Feed.module.css"
import apiMock from "../../service/apiMock"
import {AiFillLike} from "react-icons/ai"
import { FaRegTrashAlt } from "react-icons/fa"
import { useTheme } from "../ThemeContext"

export default function Feed() {
    const [comment, setComment] = useState([]);
    const [likedId, setLikedId] = useState(new Set());
    const { likeColor, likeActiveColor, getInitials } = useTheme()

    useEffect(() => {
        apiMock
            .get("/all/coments")
            .then((response) => {
                setComment(response.data);
            })
            .catch(() => {
                console.log("Erro de requisição");
            })
    }, []);

    function deleteComent(id) {
        apiMock.delete(`/all/coments/${id}`);
        setComment(comment.filter((comment) => comment.id !== id ));
    }

    function like(id) {
        setLikedId((prop) => {
            const proximo = new Set(prop);
            proximo.has(id) ? proximo.delete(id) : proximo.add(id);
        });
    }

  return (
    <div className={styles}>
        {comment.map((post) => {
            const liked = likedId.has(post.id);

            return(
                <div key={post.id} className={styles}>
                    <div className={styles}>
                        {post.avatarUrl
                            ? <img src={post.avatarUrl} alt={post.name} className={styles.avatar} />
                            : <div className={styles}>{getInitials(post.name)}</div>
                        }
                        <div className={styles}>{getInitials(post.name)}</div>
                        <div>
                            <p className={styles}>{post.name}</p>
                            <p className={styles}>{new Date(post.createdAt).toLocaleDateString("pt-br")}</p>
                        </div>
                    </div>
                    <p className={styles}>{post.text}</p>

                    <div className={styles}>
                        <button
                            className={styles.actionBtn}
                            style={{ color: liked ? likeActiveColor : likeColor }}
                            onClick={() => like(post.id)}
                        >
                            <AiFillLike/> {liked ? post.likes + 1 : post.likes} 
                        </button>

                        <button 
                            className={styles.deleteBtn} 
                            onClick={() => deleteComent(post.id)}
                        >
                            <FaRegTrashAlt/> 
                        </button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}