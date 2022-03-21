import bus from '../utils/bus'

export function useFlashMessage() {
    function setFlashMessage(message, type) {
        bus.emit('flash', {
            message: message,
            type: type
        })
    }

    return { setFlashMessage }
}