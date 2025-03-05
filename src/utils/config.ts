// api and base_path both don't endsWith /

export let base_path = ""
export const setBasePath = (path: string) => {
  base_path = path
  if (!base_path.startsWith("/")) {
    base_path = "/" + base_path
  }
  if (base_path.endsWith("/")) {
    base_path = base_path.slice(0, -1)
  }
}
if (window.ALIST.base_path) {
  setBasePath(window.ALIST.base_path)
}

export let api = import.meta.env.VITE_API_URL as string
if (window.ALIST.api) {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", window.ALIST.api, false) // 第三个参数为 `false` 表示同步请求
  xhr.send()

  if (xhr.status >= 200 && xhr.status < 400) {
    window.ALIST.api = xhr.responseText
  }
  api = window.ALIST.api
}
if (api === "/") {
  api = location.origin + base_path
}
if (api.endsWith("/")) {
  api = api.slice(0, -1)
}

let permanent_api = import.meta.env.VITE_API_URL as string
if (window.ALIST.permanent_api) {
  permanent_api = window.ALIST.permanent_api
}
if (permanent_api.endsWith("/")) {
  permanent_api = permanent_api.slice(0, -1)
  window.ALIST.permanent_api = permanent_api
}

window.ALIST.api = api
export const monaco_cdn =
  window.ALIST.monaco_cdn ||
  "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs"
