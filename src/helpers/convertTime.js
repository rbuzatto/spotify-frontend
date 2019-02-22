const convertTime = (ms) => {
    
    const minutes = Math.floor(ms / 60000)
    const seconds =  Math.floor(ms % 60000 / 1000)

    return `${minutes}:${('0' + seconds).slice(-2)}`
}

export default convertTime