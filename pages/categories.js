import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

  function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null)
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(() => {
        fetchCategories();
    }, []);
    async function fetchCategories() {
        setIsLoaded(false);
        await axios.get('/api/categories').then(result => {
            setCategories(result.data)
        });
        setIsLoaded(true);
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        const PropertiesValuesSplit = properties.map(p => {
            if(typeof(p.values)=="string"){
                return (
                    {
                        name: p.name,
                        values: p.values.split(',')
                    }
                )
            }else{
                return (
                    {
                        name: p.name,
                        values: p.values
                    }
                )
            }
        })
        const data = {
            name, 
            parentCategory, 
            PropertiesValuesSplit
        };
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null)
        }else {

            await axios.post('/api/categories', data);
        }
        setName("");
        setParentCategory('');
        setProperties([])
        fetchCategories();
    };
    function editCategory(category) {
       setEditedCategory(category);
       setName(category.name);
       setParentCategory(category.parent?._id)
       setProperties(category.properties)
    };

     function deleteCategory(category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#5542F6',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
         }).then(async result => {
            const { _id } = category;
            if(result.isConfirmed){
                   await axios.delete('/api/categories?_id='+_id);
                   fetchCategories();
            }
         })
    };
    function addProperty() {
        setProperties(prev => {
            return([...prev, {name:'', values:''}])
        });
    };

    function handlePropertyNameChange(index, property, newName){
       setProperties(prev => {
        const properties = [...prev];
        properties[index].name = newName;
        return properties;
       });
    }
      function handlePropertyValuesChange(index, property, newValues){
        setProperties(prev => {
         const properties = [...prev];
         properties[index].values = newValues;
         return properties;
        })
    }

    function removeProprty(indexToRemove) {
        setProperties(prev => {
            const newProperties = [...prev];
            newProperties.splice(indexToRemove, 1);
            return newProperties 
        })
    }
    return(
        <Layout>
            <h1>Categories</h1>
            <label>
                 {editedCategory 
                   ? `Edit category ${editedCategory.name}`
                   : 'Create new category'}
            </label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                    <input 
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}/>
                    <select 
                            onChange={(ev) => setParentCategory(ev.target.value)}
                            value={parentCategory}>
                        <option value={''}>No parent category</option>
                        {categories.length > 0 && categories.map(category => {
                            return(
                                <option key={category._id} value={category._id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button className="btn-default text-sm mb-2"
                            type="button"
                            onClick={ addProperty }>
                        Add new property</button>
                    {properties.length > 0 && properties.map((property, index) => {
                        return(
                            <div key={index} className='flex gap-1 mb-2'>
                                <input onChange={(ev) => {handlePropertyNameChange(index, property, ev.target.value)}} 
                                       type="text" 
                                       value={property.name}
                                       placeholder="property name (example: color)"
                                       className="mb-0" />
                                <input  onChange={(ev) => {handlePropertyValuesChange(index, property, ev.target.value)}} 
                                        type="text" 
                                        value={property.values}
                                        placeholder="values, comma separated (example: red,blue)"
                                        className="mb-0"  />
                                <button className="btn-red"
                                        type="button"
                                        onClick={() => {removeProprty(index)}}>
                                        Remove</button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-1">
                  {editedCategory && 
                  <button onClick={()=> {setEditedCategory(null); setParentCategory(''); setName(''), setProperties([]);}}
                          type="button" className="btn-default">Cancel</button>                  
                  }
                  <button type={"submit"} className="btn-primary">Save</button>
                </div>
            </form>
            {!editedCategory && 
              <table className='basic mt-4'>
              <thead>
                  <tr>
                      <td>Category name</td>
                      <td>Parent category</td>
                      <td></td>
                  </tr>
              </thead>
              <tbody>
                {!isLoaded &&
                 <tr>
                    <td colspan="3">
                        <div className="py-4">
                            <Spinner fullWidth={true} />
                        </div>
                    </td>
                 </tr>
                }
                {categories.length > 0 && categories.map(category => {
                    return(
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <div className="flex">
                                    <button   className="btn-default mr-1"
                                            onClick={() => editCategory(category)}
                                            >Edit</button>
                                    <button className="btn-red"
                                            onClick={() => deleteCategory(category)}
                                            >Delete</button>
                                </div>
                            </td>
                        </tr>)})
                    }
                </tbody>
          </table>
            }
            
        </Layout>
    )
};

export default withSwal(({swal}) => {
    return (
    <Categories swal={swal} />
    );
});