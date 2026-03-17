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
    //const [currentItems, setCurrentItems] = useState(data);
    const [deletedItemData, setDeletedItemData] = useState({});

    const {data, message, loading, error} = useFetch(`${import.meta.env.API_URL}/wishlist/`);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${import.meta.env.API_URL}/wishlist/` + deleteId,
            {method: "DELETE"}
        )
        .then(response => response.json())
        .then((data) => {
            setDeleteSuccess(data.message);
            setDeletedItemData(data.itemDeleted);
        })
    };

   /** 
    const handleClick = (item) => {
        const filterItem = data.filter((item) => item.favorite);
        setCurrentItems(filterItem);
    }

    const handleSeeAllClick = () => {
        setCurrentItems(data);
    }
*/
    return (
        <>
        {
        /** 
        <p>Want to only view your favorites? Click the button below</p>
        <input onClick = {() => handleClick() } 
                type='button' id="btnSubmit" value="View Favorites" />
        
        <input onClick = {() => handleSeeAllClick() } 
                type='button' id="btnSubmit" value="View Wishlist" />
        */
        }
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
                {data.map((item) => (
                    <tbody>
                    <tr>
                        <td>{item.category}</td>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>${item.price.$numberDecimal}</td>
                        <td>
                        {
                       
                            item.favorite ? (
                            <img src="/images/redheart.png" alt="red heart" width="50"/> 
                            ) : ("no")
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