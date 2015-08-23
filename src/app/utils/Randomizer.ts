export function shuffle(array:any[]):any[] {
    var currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export function simple(array:any[]):any[] {
    var lastElement = array[array.length - 1]
    array[array.length - 1] = array[0]
    array[0] = lastElement
    return array
}