export function getParam(key: string) {
  const params = new URLSearchParams(document.location.search)
  return params.get(key)
}

export function setParam(key: string, value: string) {
  const params = new URLSearchParams(document.location.search)

  if (!value) {
    params.delete(key)
  } else {
    params.set(key, value)
  }

  window.history.replaceState({}, '', `?${params.toString()}`)
}