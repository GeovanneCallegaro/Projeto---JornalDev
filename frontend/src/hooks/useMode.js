import { useCallback, useState } from "react"

export const useMode = () => {
    const [themeLight, setTheme] = useState(true)

    const setterTheme = useCallback(() => {
        if(themeLight === true) {
            setTheme((s) => !s)
        } else {
            setTheme((s) => !s)
        }
    }, [themeLight])

    return {setterTheme}
}