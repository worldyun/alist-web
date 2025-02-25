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
  const alistResponse = await fetch(window.ALIST.api, {
    method: "GET",
    redirect: "follow", // 确保跟随重定向
  })

  // 检查响应是否成功
  if (!alistResponse.ok) {
    throw new Error(`HTTP error! status: ${alistResponse.status}`)
  }
  window.ALIST.api = alistResponse.url
  api = window.ALIST.api
}
if (api === "/") {
  api = location.origin + base_path
}
if (api.endsWith("/")) {
  api = api.slice(0, -1)
}

export const monaco_cdn =
  window.ALIST.monaco_cdn ||
  "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/monaco-editor/0.33.0-dev.20220228/min/vs"
