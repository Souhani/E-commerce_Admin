import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {})
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoaded(false)
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            setIsLoaded(true);
        })
    }, [])

    async function saveProduct (ev) {
        ev.preventDefault();
        const data = {title, description, price, images, category, properties: productProperties};
        
        if(_id){
           //update
           await axios.put('/api/products', {...data, _id}).then(setGoToProducts(true));
           
        }else{
            //create
            await axios.post('/api/products', data).then(setGoToProducts(true));;
        }

    
    }

    if (goToProducts) {
        router.push('/products');
    }

    async function uploadImages(ev) {
      setIsUploading(true)
      const files = ev.target?.files;
      if(files?.length > 0){
        const data = new FormData();
        for (const file of files ){
            data.append('file', file)
        };
        const res = await axios.post('/api/upload', data);
        
         setImages(oldImages => {
            return [...oldImages, ...res.data];
         });
      };
      setIsUploading(false)
    };

    function updateImagesOrder(images) {
        setImages(images)
    }
    const SelectedCategoryProperties = []
    if(categories.length > 0 && category) {
        let categoryInfo = categories.find(({_id}) => _id === category);
        SelectedCategoryProperties.push(...categoryInfo.properties);
        while(categoryInfo?.parent?._id){
            const parentCateInfo = categories.find(({_id}) => _id === categoryInfo?.parent?._id);
            SelectedCategoryProperties.push(...parentCateInfo.properties);
            categoryInfo = parentCateInfo;
        }

    }
    function changeProductProperties(propertyName, propertyValue) {
             setProductProperties(prev => {
                const newProductProperties = {...prev};
                newProductProperties[propertyName] = propertyValue;
                return newProductProperties;
             });
             
    };

   
    
   
    return(
            <form onSubmit={saveProduct}>
                <label>Product name</label>
                <input type="text"
                    placeholder="product name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}/>
                <label>
                  Category
                </label>
                <select value = {category}
                        onChange = { e => setCategory(e.target.value)}>
                    <option value=''>Uncategorized</option>
                    {categories.length > 0 && categories.map(category => {
                        return(
                            <option key={category._id} value = {category._id}>
                              {category.name}
                            </option>
                        )
                    })}
                </select>
                <div>
                    {!isLoaded && 
                        <div className='py-4'> 
                            <Spinner />
                        </div>
                    }
                    {SelectedCategoryProperties.length>0 && SelectedCategoryProperties.map(p => {
                    return(
                        <div key={p.name} className="">
                            <label>{p.name[0].toUpperCase()+p.name.substring(1) }</label>
                            <div>
                                <select  value = {productProperties[p.name]} onChange={(e) => changeProductProperties(p.name, e.target.value)}>
                                {p.values.map(v => (
                                    <option key={v.name} value={v}>{v}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                    )
                })}
                </div>
                <label>
                    Photos
                </label>
                <div className='mb-2 flex flex-wrap gap-1'>
                    <ReactSortable list={images}
                                    setList={updateImagesOrder}
                                    className="flex flex-wrap gap-1">
                        {!!images?.length && images.map(link => {
                            return(
                                <div key={link} className="h-24 rounded-sm p-4 bg-white border border-gray-200 shadow-sm">
                                    <img src={link} alt="" className="rounded-lg" />
                                </div>
                            )
                        })}       
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 w-24 flex items-center justify-center p-1 bg-white rounded-sm border border-gray-200 shadow-sm">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24  flex flex-col items-center cursor-pointer justify-center text-sm gap-1 text-primary rounded-ms bg-white shadow-sm border border-primary">  
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                          Add image
                        </div>
                        <input type='file' className="hidden" onChange={uploadImages}></input>
                    </label>
                </div>
                <label>Description</label>
                <textarea placeholder='description'
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}        
                />
                <label>Price (in USD)</label>
                <input type="number"
                    placeholder="price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}        />
                <button type="submit"
                        className="btn-primary"
                        >Save</button>
            </form>
    )
}