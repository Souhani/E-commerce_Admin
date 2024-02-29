import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function About(props) {
 const [aboutPage, setaboutPage] = useState(props.data[0].aboutPage);
  const [isLoading, setIsLoading] = useState(false);


async function saveAbout() {
  setIsLoading(true)
    await axios.put("/api/about", {_id:props.data[0]._id, aboutPage});
    setIsLoading(false)
}

  return (
    <div className='w-full'>
        <div className=''>
        <textarea
        rows={20}
        placeholder="About Us"
        value={aboutPage}
        onChange={(ev) => setaboutPage(ev.target.value)}
      />
        </div>
        {
          isLoading ? <div className=""> <Spinner /></div> : <button className="btn-primary" onClick={saveAbout}>
          Save
        </button>
        }
    </div>
  )
}
