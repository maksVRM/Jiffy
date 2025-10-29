const API_KEY = 'BpeUeIW4aQgsJjBJKYzArvXhGAhE4rJ5'

// from trusty
const randomChoise = arr => {
    const randIndex = Math.floor(Math.random() * arr.length)
    return arr[randIndex]
}

function createVideo(src) {
    // createElement lets us create html elements inside of JS
    const video = document.createElement('video')

    // here we can set attributes ìnto our created element using the dot notation
    video.src = src
    video.autoplay = true
    video.loop = true
    // this is how we can set class names using JS (it will overwrite them through)
    video.className = 'video'
    console.log(video)


    // when we use return we tell a fucntion to give us something back
    return video
}

// 1. when we search show the loading spnner (by adding class to the body)
// 2. when successful change the loading hint to say 'see more'
// 3. on fail, let the user know therer was an error

const toggleLoading = state => {
    console.log('we are loading', state)
    // in here we toggle the page loading state between on and off loading and not loading
    // if our state is true, we add a loading class to our body 
    if (state) {
        document.body.classList.add('loading')
    } else {
        // otherwise we remove a loading class
        document.body.classList.remove('loading')
    }
}



// here we grab up all of our fetch functionality into its own function
const searchGiphy = searchTerm => {
    // here we toggle our loading screen so the user knows something is happening
    toggleLoading(true)
    console.log('search for', searchTerm)
    // here we use backticks for our string so that we can embed our API_KEY and searchTerm variables 
    // the searchTerm part will be different for every varying search we make 
    fetch
        (`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)

        // we use .then() to handle the response 
        .then(response => {
            // here we need to convert our response to json
            return response.json()
        })
        // we use .then() again to handle the json data
        .then(json => {
            // json is a big piece of json data that we can then work with 
            // here we grab the first result from our images array
            // here we call our randomChoise function to give us back a random result from the array of images
            const gif = randomChoise(json.data)
            // here we look inside of the first result and grab 
            // the original mp4 src 
            const src = gif.images.original.mp4
            console.log(src)

            // here we use our createVideo function which we give the src attribute to and it gives us back a video element 
            const video = createVideo(src)

            // here we grab our videos elements and then append our newly createdvideo to it 
            const videosEL = document.querySelector('.videos')
            videosEL.appendChild(video)

            // here we listen out for the video loaded event to fire 
            // when its loaded we'll display it on the page  using  a class
            // that triggers a transition effect 
            video.addEventListener('loadeddata', event => {
                // this toggle the fading in effect off our video's
                video.classList.add('visible')

                // here we toggle the loading state off again
                toggleLoading(false)

                // here we add a 'has-results' class to toggle the close button 
                document.body.classList.add('has-results')
                // change the hint text to see mpore results
                hintEl.innerHTML = `Hit enter to search more ${searchTerm}`
            })


        })
        .catch(error => {
            // lastly we can use. catch() to do something in case our fetch fails 
        })

}

// here we grab our search input 
const searchEl = document.querySelector('.search-input')

// here we grab our search hint
const hintEl = document.querySelector('.search-hint')



// here we seperate out our keyup function and we can caal to it in various places in our code
const doSearch = event => {
    // here we grab the search input's value 
    const searchTerm = searchEl.value

    // here we set our search hint to show when we have a searchTerm longer than 2 characters 
    if (searchTerm.length > 2) {
        // here we set text to embed our variable as the hint suggestion  
        hintEl.innerHTML = `Hit enter to search ${searchTerm}`
        // here we add the class to our body tag and use it to show our hint using css
        document.body.classList.add('show-hint')
    } else {
        // otherwise we remove it again 
        document.body.classList.remove('show-hint')
    }

    // is we want to only run a search when we have a searched term that is longer than 2 characters
    // and when they pres the enter key 
    if (event.key === 'Enter' && searchTerm.length > 2) {
        // here we call t our searchGiphy function and pass along the searchTerm with it
        searchGiphy(searchTerm)
    }
}

// we liste out for the keyup event on our search input 
searchEl.addEventListener('keyup', doSearch)