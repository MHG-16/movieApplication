import axios from "axios";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjMwMDkyZmQ1ZGViYzE2NDA0NzU5NmUyYWYxY2RhZSIsInN1YiI6IjYxMDU2NmI5NzcxOWQ3MDA3MmJjMzQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JdQshfxiz-8PyInbRZlxXLRJb99GfKsRaywDMc4cwr8'
    }
})