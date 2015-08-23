export function init() {
    disableDocumentScrolling()
}

function disableDocumentScrolling() {
    document.addEventListener('touchstart', function (e) {
        e.preventDefault()
    })
}