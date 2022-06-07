import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }

    async componentDidMount() {
        // side effects  
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2753fc6c0687229f6e45ed8fc67b9a6d&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies: [...data.results]
        })
        console.log(data);
    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2753fc6c0687229f6e45ed8fc67b9a6d&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies: [...data.results]
        })
    }

    handleRight = () => {
        let temparr = [];
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            temparr.push(i);
        }

        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)
    }

    handleLeft = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }

    handleClick = (value) => {
        if (value != this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavourites = (movieObj) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        if (this.state.favourites.includes(movieObj.id)) {
            oldData = oldData.filter((movie) => movie.id != movieObj.id)
        } else {
            oldData.push(movieObj);
        }
        console.log(oldData)
        localStorage.setItem("movies", JSON.stringify(oldData));
        this.handleFavouritesState();
    }

    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = oldData.map((movie) => movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    render() {
        // let movie = movies.results
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h1 className='text-center'><strong>Trending</strong></h1>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="movie-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="{movieObj.title}" />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                            {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                                            <div className='button-wrapper' style={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    this.state.hover == movieObj.id &&
                                                    <a className="btn btn-primary movie-button" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from favourites" : "Add to Favourites"}</a>
                                                }

                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                    {
                                        this.state.parr.map(value => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                </ul>
                            </nav>
                        </div>
                }
            </>
        )
    }
}
