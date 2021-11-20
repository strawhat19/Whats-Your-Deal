console.log(`Hello`);

fetch(`http://data.streetfoodapp.com/1.1/locations/washington/vijs`)
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
    // window.addEventListener('DOMContentLoaded', (event) => {
    //     data.items.forEach(item => {
    //         let itemElement = $(`<div class="itemElement"><img src="${item.media.image_versions2.candidates[0].url}"></div>`);
    //         $(`body`).append(itemElement);
    //     });
    // });
})
.catch(err => {
	console.error(err);
});