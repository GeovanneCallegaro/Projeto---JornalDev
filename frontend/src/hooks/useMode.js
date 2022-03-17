import { useState } from "react"

export const useMode = () => {
    const [themeLight, setTheme] = useState(true)

    const setterTheme = () => {
        if(themeLight === true) {
            setTheme((e) => !e)
        } else {
            setTheme((e) => !e)
        }

        return themeLight
    }

    console.log(themeLight)

    return {setterTheme}
}