import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function TermsOfUse(props) {
 const [termsPage, setTermsPage] = useState(props.data[0].termsPage);
  const [isLoading, setIsLoading] = useState(false);


async function saveTerms() {
  setIsLoading(true)
    await axios.put("/api/termsOfUse", {_id:props.data[0]._id, termsPage});
    setIsLoading(false)
}

  return (
    <div className='w-full'>
        <div className=''>
        <textarea
        rows={20}
        placeholder="Terms of use"
        value={termsPage}
        onChange={(ev) => setTermsPage(ev.target.value)}
      />
        </div>
        {
          isLoading ? <div className=""> <Spinner /></div> : <button className="btn-primary" onClick={saveTerms}>
          Save
        </button>
        }
    </div>
  )
}
