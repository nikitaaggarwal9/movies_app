import React, { Component } from 'react'
import { movies } from './getMovies';

export default class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGenre: 'All Genres',
            movies: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("movies") || '[]');
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy',
            36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genres: [...temp],
            movies: [...data]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGenre: genre
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.popularity - objB.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    handlePageChange=(page)=> {
        this.setState({
            currPage: page
        })
    }

    handleDelete=(id)=>{
        let newArr = [];
        newArr = this.state.movies.filter((movieObj)=>movieObj.id != id);
        this.setState({
            movies: [...newArr]
        })
        localStorage.setItem("movies", JSON.stringify(newArr));
    }

    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy',
            36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let filterArr = [];

        // 1. filtered movies acc. to genre
        if (this.state.currGenre !== 'All Genres') {
            filterArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre)
        } else {
            filterArr = this.state.movies;
        }

        // 2. filtered movies acc. to search
        if (this.state.currText !== '') {
            filterArr = filterArr.filter((movieObj) => movieObj.original_title.toLowerCase().includes(this.state.currText.toLowerCase()));
        }

        let pages = Math.ceil(filterArr.length / this.state.limit);
        let pagesArr = [];
        for (let i = 1; i <= pages; i++) {
            pagesArr.push(i);
        }
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + Number(this.state.limit);
        filterArr = filterArr.slice(si, ei);

        return (
            <div>
                <>
                    <div className='main'>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                                <ul className="list-group favourites-generes">
                                    {
                                        this.state.genres.map((genre) => (
                                            this.state.currGenre == genre ?
                                                <li className="list-group-item" style={{ background: 'rgba(40, 40, 169, 0.81)', color: 'white', fontWeight: 'bold' }}>{genre}</li> :
                                                <li className="list-group-item" style={{ background: 'white', color: 'rgba(40, 40, 169, 0.81)' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>

                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='col-lg-9 col-sm-12 favourites-table'>
                                <div className='row'>
                                    <input type="text" className="form-control col" value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <input type="number" className="form-control col" value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} placeholder="Count" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i> Popularity <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i> Rating <i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movieObj) => (
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: '5rem' }} alt="{movie.title}" />{" " + movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ul className="pagination">
                                        {
                                            pagesArr.map((page) => (
                                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}



