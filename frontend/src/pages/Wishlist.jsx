/**
 * Wishlist.jsx
 *  a component describing an individual book objects
 */

import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import './Wishlist.css'

const Wishlist = () => {
    const [deleteId, setDeleteId] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState("");
    const [deletedItemData, setDeletedItemData] = useState({});
    const {data, message, loading, error} = useFetch(import.meta.env.VITE_API_URL + "wishlist");
    const [currentItems, setCurrentItems] = useState(data);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(import.meta.env.VITE_API_URL + "wishlist/" + deleteId,
            {method: "DELETE"}
        )
        .then(response => response.json())
        .then((data) => {
            setDeleteSuccess(data.message);
            setDeletedItemData(data.itemDeleted);
        })
    };

   
    const handleClick = (item) => {
        const filterItem = data.filter((item) => item.favorite);
        setCurrentItems(filterItem);
    }

    const handleSeeAllClick = () => {
        setCurrentItems(data);
    }

    //console.log("data initial load: ", data);

    //console.log("initial load: ", loading);

    //console.log("currentItems at load: ", currentItems);

    return (
        <>
        <p>Want to only view your favorites? Click the <em>View Favorites</em> button below</p>
        <input onClick = {() => handleClick(currentItems.favorite) } 
                type='button' className="viewBtn" value="View Favorites" />
        &nbsp;
        &nbsp;
        <input onClick = {() => handleSeeAllClick() } 
                type='button' className="viewBtn" value="View Wishlist" />

        <form onSubmit={handleSubmit}>
            <table>
                <thead>
                    <tr>
                    <th>Category</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Favorited?</th>
                        <th>Delete Item?</th>
                    </tr>
                </thead>
                {currentItems.map((item) => (
                    <tbody key={item._id}>
                    <tr>
                        <td>{item.category}</td>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>${item.price.$numberDecimal}</td>
                        <td>
                        {
                       
                            item.favorite ? (
                            <img src="/images/redheart.png" alt="red heart" width="50"/> 
                            ) : ('')
                        }
                        </td>
                        <td>
                            <input onClick = {() => setDeleteId(item._id)} 
                            type='submit' id="btnSubmit" value="Delete Item" /> 
                        </td>
                    </tr>
                 </tbody>   
                ))}
            </table>
        </form> 
        </>
    )}

export default Wishlist;