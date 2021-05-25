import React , {useState , useEffect} from 'react'

const useGeolocation = () => {
    const [coord, setcoord] = useState ({
        loaded:false,
        coord: { lat:"" , long:"" }
    })

const onSuccess = coord => {
    setcoord ({
        loaded:true,
        coord:{
            lat:coord.coords.latitude,
            long:coord.coords.longitude
        }
    })
}

const onError = error => {
    setcoord({
        loaded:true,
        error
    })
}
useEffect(() => {
    if (! ("geolocation" in navigator)){
        onError({
            code:0,
            message:"Gelocation not supported"
        })

    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
},[])

return coord
}

export default useGeolocation