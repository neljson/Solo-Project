export function fetchCodesmith() {
  const endpoint = window.encodeURI(
    `https://api.github.com/users/open-source-labs/repos?q=stars:%3E1&sort=stars&order=desc&per_page=100`
  )
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message)
      }

      // careful codesmith is just object with array, no item property like in JS/Java URI JSON object
      return data
    })
}

// Use open-source-labs over OS-labs-beta
// cannot get CS repos to sort by stars for some reason, tried all these links:
// CS OS labs repos URI link: https://api.github.com/users/oslabs-beta/repos?per_page=50
// https://api.github.com/users/oslabs-beta/repos?q=stars:%3E1&sort=stars&order=desc
// https://api.github.com/users/oslabs-beta/repos?q=stars:%3E1&sort=stars&order=desc
