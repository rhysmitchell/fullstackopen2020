import React, { useState } from 'react';
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'


const Recommendations = (props) => {
    const { show } = props;
    const books = useQuery(ALL_BOOKS)

    const [me, setMe] = useState(null)

    useQuery(ME, {
        onCompleted: ({ me }) => setMe(me)
    })


    if (!show) {
        return null;
    }

    if (books.loading) {
        return <div>loading...</div>
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
                {books.data.allBooks.filter(book => book.genres.includes(me.favouriteGenre)).map(a =>
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