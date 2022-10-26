//console.log("hello from app.js");
window.addEventListener('load',()=> {
    document.getElementById('button-boba').addEventListener('click', ()=>{
        let noCups = document.getElementById('number-boba').value;
        console.log(noCups);

        //creaing the object
        let obj = {"number" : noCups};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route noCups
        fetch('/noCups', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})

        //make a fetch request of type POST so that we can send the (noCups) info to the server
    })

    document.getElementById('get-tracker').addEventListener('click',()=>{
        //get info on ALL the boba we've had so far
        fetch('/getCups')
        .then(res => res.json())
        .then(data => {
            document.getElementById('boba-info').innerHTML = '';
            console.log(data.data);
            for (let i=0; i<data.data.length; i++){
                let string = data.data[i].date + ":" + data.data[i].boba;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('boba-info').appendChild(elt);
            }
        })
    })
})