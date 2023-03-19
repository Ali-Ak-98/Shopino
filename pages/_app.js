import '@/styles/globals.css'
import {IconContext} from "react-icons";


export default function App({Component, pageProps}) {
    return (
        <IconContext.Provider value={{color: "blue", className: "global-class-name"}}>
            <Component {...pageProps} />
        </IconContext.Provider>
    )
}
