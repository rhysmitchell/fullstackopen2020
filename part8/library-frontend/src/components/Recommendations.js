import React, { useState, useEffect } from 'react';
import { ALL_BOOKS } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommendations = (props) => {
    const { show } = props;

    const [fetchBooks, result] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: 'no-cache',
    })

    const [me, setMe] = useState(null)
    const [recommendedBooks, setRecommendedBooks] = useState([])

    const meQuery = useQuery(ME)

    useEffect(() => {
        if (meQuery.data) {
            setMe(meQuery.data.me);
            fetchBooks({ variables: { genre: meQuery.data.me.favouriteGenre } })
        }
    }, [meQuery, me, fetchBooks])

    useEffect(() => {
        if (result.data) {
            setRecommendedBooks(result.data.allBooks)
        }
    }, [result])

    if (!show) {
        return null;
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
            </th>
                    <th>
                        published
            </th>
                </tr>
                {recommendedBooks.map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Recommendations;