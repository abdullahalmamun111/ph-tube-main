const videoArray = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}

// console.log('script file added')

// fetching api
const dataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => dataDisplay(data.categories))
        .catch((error) => console.log(error))
}

dataLoad();

const dataDisplay = (data) => {
    const categoriContainer = document.getElementById('category');
    for (let item of data) {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="cateGoryVideo(${item.category_id})" class=" btn category-btn">${item.category}</button>
        `
        // append the button

        categoriContainer.append(buttonContainer)
    }
}

// load video

const loadVideo = (searText ="") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searText}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(err => console.log(err))
}

const displayVideo = (videos) => {
    const videoContainer = document.getElementById('video')
    videoContainer.innerHTML = '';
    if (videos.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class=" min-h-[300px] flex flex-col justify-center items-center gap-5">
        <img src="assets/Icon.png" />
        <h1 class=" text-5xl font-bold">NO CONTENT HERE!</h1>
        </div>
        
        `
    }
    else {
        videoContainer.classList.add('grid')
    }
    for (let item of videos) {
        const div = document.createElement('div')
        div.classList = 'card card-compact';
        div.innerHTML = `
    <figure class =" h-[200px] relative">
    <img class =" w-full h-full object-cover" src= ${item.thumbnail} />
    ${item.others.posted_date?.length === 0 ? "" : `<span class =" text-white bg-black text-xs p-2 rounded-md absolute right-2 bottom-2">${getTime(item.others.posted_date)}</span>`}
    
    </figure>
    <div class=" px-0 py-2 flex gap-3">
        <div>
          <img src = ${item.authors[0].profile_picture} class = " w-10 h-10 rounded-full object-cover" />
        </div>
        <div>
        <h1 class=" font-bold ">${item.title}</h1>
        <div class="flex gap-1 items-center">
        <p>${item.authors[0].profile_name}</p>
        ${item.authors[0].verified === true ? '<img class=" w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>' : ''}
        </div>
        <p>${item.others.views} views</p>
        <p><button onclick="loadDetails('${item.video_id}')" class=" btn btn-sm btn-error">Details</button></p>
        </div>
    </div>
    `
        videoContainer.append(div)
    }
}
loadVideo();

// load details function
const loadDetails = async(videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)
}

// display details function
const displayDetails = (video) => {
   const detailsContainer =document.getElementById('modal-content')

   detailsContainer.innerHTML = `
   <img src=${video.thumbnail} />
   <p>${video.description}</p>
   `

   document.getElementById('customModal').showModal();
}


// second to convert hour and minute function
const getTime = (date) => {
    const hour = parseInt(date / 3600);
    let remainSecond = date % 3600;
    const minute = parseInt(remainSecond / 60)
    remainSecond = remainSecond % 60;
    return `${hour} hour ${minute} minute ${remainSecond} second ago`
}

// categorywise video load on click button
const cateGoryVideo = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // all active class remove
            const buttons = document.getElementsByClassName('category-btn')
            console.log(buttons);
            for (let btn of buttons) {
                btn.classList.remove('active')
            }
            // active btn 
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active");
            displayVideo(data.category)
        })
        .catch(err => console.log(err))
}

// search section work
document.getElementById('input-value').addEventListener('keyup', (e)=>{
    loadVideo(e.target.value)
    
})




