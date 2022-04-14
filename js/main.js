document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const url = "http://colormind.io/api/";
  const data = {
    model : "ui",
    input : ["N","N","N","N","N"] //[128,0,32] rgb value if custom
    //structure: light shade, light accent, main, dark accent, dark shade
  }

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        let container = document.querySelector('.color_container');
        
        //css color variables
        const colorVar = ['--main_color','--main_accent','--brand_color','--secondary_accent','--secondary_color'];

        //get divs only 
        let divNodes = [];
        for(let i=0; i<container.childNodes.length; i++){
          if(container.childNodes[i].nodeName === 'DIV'){
            divNodes.push(container.childNodes[i])
          }
        }
        })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

