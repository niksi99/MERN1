import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminCreateProduct = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [prise, setPrise] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/category/allCategories')
        .then(categ => {
            console.log(categ.data)
            setCategories(categ.data.categories)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleImage = (event) => {
        const file = event.target.files[0]
        setFileToBase(file);
        console.log(file)
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    const submitForm = async (event) => {
        event.preventDefault()
        try {
            const {data} = await axios.post('/api/product/create', 
            {name, description, prise, category, image})
            if  (data.success === true){
                setName('');
                setDescription('');
                setPrise('');
                setCategory('');
                setImage('');
                toast.success('product created successfully')
            }
            console.log(data);
        }
        catch(error) {
            console.log(error);
        }
    }

  return (
    <>
        <div>
            <Header/>
            <h2>Create Product</h2>
            <form>
                <div>
                    <label htmlFor="nameProduct">Name: </label>
                    <input onChange={(event) => setName(event.target.value)} type="text" id="nameProduct" value={name}/>
                </div>
                <div>
                    <label htmlFor="descProduct">Description: </label>
                    <input onChange={(event) => setDescription(event.target.value)} type="text" id="descProduct" value={description}/>
                </div>
                <div>
                    <label htmlFor="priseProduct">Prise: </label>
                    <input onChange={(event) => setPrise(event.target.value)} type="number" id="priseProduct" value={prise}/>
                </div>
                <div>
                    <label htmlFor="categProduct">Category: </label>
                    <select id="categProduct" onChange={(event) => setCategory(event.target.value)} name="cars" value={category}>
                        <option value="">Choose cateogry</option>
                        {
                            categories && categories.map(categ => (
                                <option key={categ._id} value={categ._id}> {categ.name} </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="imgProduct">Image: </label>
                    <input type="file" id="imgProduct" name="image"/>
                </div>
                <img onChange={handleImage} src={image} alt="" />
                <button type="submit" onClick={submitForm}>Create</button>
            </form>
        </div>
    </>
  )
}

export default AdminCreateProduct
