import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function PrivacyPolicy(props) {
 const [privacyPage, setPrivacyPage] = useState(props.data[0].privacyPage);
  const [isLoading, setIsLoading] = useState(false);


async function savePrivacy() {
  setIsLoading(true)
    await axios.put("/api/privacyPolicy", { _id:props.data[0]._id, privacyPage});
    setIsLoading(false)
}

  return (
    <div className='w-full'>
        <div className=''>
        <textarea
        rows={20}
        placeholder="Privacy Policy"
        value={privacyPage}
        onChange={(ev) => setPrivacyPage(ev.target.value)}
      />
        </div>
        {
          isLoading ? <div className=""> <Spinner /></div> : <button className="btn-primary" onClick={savePrivacy}>
          Save
        </button>
        }
    </div>
  )
}
