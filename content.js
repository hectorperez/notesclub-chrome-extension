const url = window.location.toString()
// alert(`Hello! ${url}`);

fetch(`https://935f3a7d7cf4.ngrok.io/v1/search/count?url=${url}`).then(r => r.text()).then(result => {
  alert(`response: ${result}`)
})
