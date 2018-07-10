import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: "https://practiceapi.devmountain.com/api"
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
    componentDidMount() {
        axios
          .get(`${this.state.baseUrl}/posts`)
          .then(response => this.setState({ posts: response.data }))
          .catch(error => console.log(error));
    }
        
    updatePost(text, id) {
        axios
          .put(`${this.state.baseUrl}/posts?id=${id}`, { text })
          .then(response => this.setState({ posts: response.data }))
          .catch(error => console.log(error));
         }

    deletePost(id) {
      axios
      .delete(`${this.state.baseUrl}/posts?id=${id}`)
      .then(results => {
        this.setState({ posts: results.data });
      });
    }

  createPost(text) {
    axios
      .post(`${this.state.baseUrl}/posts`, { text })
      .then(response => this.setState({ posts: response.data }))
      .catch(error => console.log(error));
    }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
      <Header />

      <section className="App__content">
        <Compose createPostFn={this.createPost} />
        {console.log(posts)}
        {posts.map((post, i) => (
          <Post
            key={post.id}
            text={post.text}
            date={post.date}
            updatePostFn={this.updatePost}
            id={post.id}
            deletePostFn={this.deletePost}
          />
        ))}
      </section>
    </div>
    );
  }
}

export default App;