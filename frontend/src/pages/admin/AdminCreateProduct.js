import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios'
const AdminCreateProduct = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/category/allCategories')
        .then(categ => {
            //console.log(categ.data.categories)
            setCategories(categ.data.categories)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

  return (
    <>
        <div>
            <Header/>
            <h2>Create Product</h2>
            <form>
                <div>
                    <label htmlFor="nameProduct">Name: </label>
                    <input type="text" id="nameProduct" />
                </div>
                <div>
                    <label htmlFor="descProduct">Description: </label>
                    <input type="text" id="descProduct" />
                </div>
                <div>
                    <label htmlFor="priseProduct">Prise: </label>
                    <input type="number" id="priseProduct" />
                </div>
                <div>
                    <label htmlFor="categProduct">Category: </label>
                    <select id="categProduct" name="">
                        <option value="">Choose cateogry</option>
                        {
                            categories && categories.map(categ => {
                                <option key={categ._id} value="categ._id"> {categ.name} </option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="imgProduct"></label>
                    <input type="file" id="imgProduct" />
                </div>
                <img className="img-fluid" src="" alt="" />
                <button type="submit">Create</button>
            </form>
        </div>
    </>
  )
}

export default AdminCreateProduct
