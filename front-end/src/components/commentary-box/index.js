import React, { Component } from 'react';

import './styles.css';

export default class CommentaryBox extends Component {
    state = {
        comment: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = ev =>{
        ev.preventDefault();
        this.props.onSubmit(this.state)
        this.setState({ comment: '' })
    }

    render() {
        return (
        <div className="commentary-box">
            <form className="X7cDz" method="POST" onSubmit={this.onSubmit}>
                <textarea  
                    placeholder="Adicione um comentário..."
                    name="comment"
                    onChange={this.handleChange}
                    value={this.state.comment}
                    required 
                    className="" autoComplete="off" autoCorrect="off">
                    </textarea>
                <button className="_0mzm- sqdOP yWX7d" 
                        disabled="" 
                        type="submit">
                            Publicar
                </button>
            </form>
        </div>);
    }
}
