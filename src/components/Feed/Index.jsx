import { useEffect, useState } from "react"
import * as styles from "./Feed.module.css"
import { AiFillLike } from "react-icons/ai"
import { FaRegTrashAlt } from "react-icons/fa"
import { useTheme } from "../ThemeContext"
import api from "../../service/api"

export default function Feed() {
    const [comment, setComment] = useState([]);
    const [likedId, setLikedId] = useState(new Set());
    const { likeColor, likeActiveColor, getInitials } = useTheme()

    useEffect(() => {
        api
            .get("/comentario")
            .then((response) => {
                setComment(response.data);
            })
            .catch(() => {
                console.log("Erro de requisição");
            })
    }, []);

    function deleteComent(id) {
        api
            .delete(`/comentario/${id}`);
            setComment(comment.filter((comment) => comment.id !== id));
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

                return (
                    <div key={post.id} className={styles}>
                        <div className={styles}>
                            {post.avatarUrl
                                ? <img src={post.avatarUrl} alt={post.nome} className={styles.avatar} />
                                : <img 
                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${post.nome}`}
                                    alt={post.nome}
                                    className={styles.avatar}
                                    onError={(e)  => {
                                        e.target.style.display = 'none';
                                    }} 
                                />
                            }
                            <div className={styles}>{getInitials(post.nome)}</div>
                            <div>
                                <p className={styles}>{post.nome}</p>
                                <p className={styles}>{new Date(post.dataPostagem).toLocaleDateString("pt-br")}</p>
                            </div>
                        </div>
                        <p className={styles}>{post.postagem}</p>

                        <div className={styles}>
                            <button
                                className={styles.actionBtn}
                                style={{ color: liked ? likeActiveColor : likeColor }}
                                onClick={() => like(post.id)}
                            >
                                <AiFillLike /> {liked ? post.like + 1 : post.like}
                            </button>

                            <button
                                className={styles.deleteBtn}
                                onClick={() => deleteComent(post.id)}
                            >
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}