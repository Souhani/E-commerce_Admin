import { SyncLoader } from "react-spinners";

export default function Spinner({fullWidth}) {
    if(fullWidth){
        return(
            <div className="max-w flex justify-center">
              <SyncLoader color={'#5542F6'} speedMultiplier={1} size={11} />
            </div>
        )
    }
    return(
        <SyncLoader color={'#5542F6'} speedMultiplier={1} size={11}/>
    )
}