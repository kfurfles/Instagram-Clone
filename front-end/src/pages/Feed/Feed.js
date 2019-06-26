import React, {
    Component
} from 'react'
import io from 'socket.io-client'

import more from '../../assets/more.svg'
import like from '../../assets/like.svg'
import send from '../../assets/send.svg'
import ComentaryBox from '../../components/commentary-box'
import './styles.css'

import api from './../../services/api'

class Feed extends Component {
    state = {
        feed: []
    }
    socket = undefined
    async componentDidMount() {
        this.registerToSocket()

        const response = await api.get('posts')

        this.setState({
            feed: response.data
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    registerToSocket = async () => {
        this.socket = io('http://localhost:3333')

        this.socket.on('post', newPost => {
            this.setState({
                feed: [newPost, ...this.state.feed]
            })
        })
        this.socket.on('comment:created', newComment => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === newComment._id ? newComment : post)
            })
        })
        this.socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post)
            })
        })
    }

    handleLike = _id => {
        api.post(`/posts/${_id}/like`)
    }

    handleComment = ( _id, comment ) => {
        api.post(`/posts/${_id}/comment`,{ comment })
    }

    render() {
        return ( <section id = "post-list" > 
                {this.state.feed.map(post => 
                    ( <article key={ post._id } >
                        <header>
                            <div className = "user-info" >
                                <span> { post.author } </span> 
                                <span className="place" >{ post.place } </span> 
                            </div>
                            <img src={ more } alt="Mais" / >
                        </header>
                        <img src={ `http://localhost:3333/files/${post.image}` } 
                            alt="" / >

                    <footer>
                        <div className="actions" >
                            <button type="button" 
                                onClick = { () => this.handleLike(post._id) }>
                                <img src={ like } alt="" / >
                            </button>
                            {/* <img src={ comment } alt="" / > */}
                            <a href="https://www.instagram.com/"
                                rel="noopener noreferrer" 
                                target="_blank">
                                <img src={ send } alt="" / >
                            </a>
                        </div>

                        <strong> { post.likes } curtidas </strong>

                        <p> { post.description } 
                            <span> { post.hashtags } </span>
                        </p>
                        <div className="comment-list">
                            {post.comments.map(({comment, _id}) => <p key={_id}>{comment}</p>)}
                        </div>
                    </footer>
                    <ComentaryBox onSubmit={({comment}) => this.handleComment(post._id, comment)}></ComentaryBox>
                </article >
                ))
            } </section>
        )
    }
}

export default Feed