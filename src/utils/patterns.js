const emailPattern = RegExp("^[a-zA-Z0-9.!#$%&’'`*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")
const namePattern = RegExp("^[a-zA-Z][a-zA-Z .'-]*$")
const urlPattern = RegExp('^(https?://localhost).|(https:\\/\\/)' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i')
const appNamePattern = RegExp('^[a-zA-Z0-9](?:[a-zA-Z0-9 ]){1,49}$')

export { emailPattern, namePattern, urlPattern, appNamePattern }
