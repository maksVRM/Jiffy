function createVideo(src) {
    // createElement lets us create html elements inside of JS
    const video = document.createElement('video')

    // here we can set attributes ìnto our created element using the dot notation
    video.src = src
    video.autoplay = true
    video.loop = true
    console.log(video)


    // when we use return we tell a fucntion to give us something back
    return video
}

// here we put our URL into fetch

fetch`https://api.giphy.com/v1/gifs/search?api_key=BpeUeIW4aQgsJjBJKYzArvXhGAhE4rJ5&q=doggo&limit=2&offset=0&rating=g&lang=en&bundle=messaging_non_clips`

    // we use .then() to handle the response 
    .then(response => {
        // here we need to convert our response to json
        return response.json()
    })
    // we use .then() again to handle the json data
    .then(json => {
        // json is a big piece of json data that we can then work with 
        // here we grab the first result from our images array
        const gif = json.data[0]
        // here we look inside of the first result and grab 
        // the original mp4 src 
        const src = gif.images.original.mp4
        console.log(src)

        // here we use our createVideo function which we give the src attribute to and it gives us back a video element 
        const video = createVideo(src)

        // here we grab our videos elements and then append our newly createdvideo to it 
        const videosEL = document.querySelector('.videos')
        videosEL.appendChild(video)
    })
    .catch(error => {
        // lastly we can use. catch() to do something in case our fetch fails 
    })




