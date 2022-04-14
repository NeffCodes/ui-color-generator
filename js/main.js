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

        //set each color square 
        data.result.forEach( (color,i) => {
          let hex = convertRGBtoHex(...color)
          let rgb = `${color[0]}, ${color[1]}, ${color[2]}`

          document.querySelector('body').style.setProperty(colorVar[i], hex);

          let targetNode = divNodes[i];
          // targetNode.querySelector('.box').style.backgroundColor = `rgb(${rgb})`
          targetNode.querySelector('.hex_value').innerText = hex.toUpperCase();
          targetNode.querySelector('.rgb_value').innerText = rgb;
        })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function convertRGBtoHex(r,g,b){
  let red = r.toString(16).length < 2 ? 
    r.toString(16).padStart(2,0) :
    r.toString(16);
  let green = g.toString(16).length < 2 ? 
    g.toString(16).padStart(2,0) :
    g.toString(16);
  let blue = b.toString(16).length < 2 ? 
    b.toString(16).padStart(2,0) :
    b.toString(16);
  return hex = `#${red}${green}${blue}`
}
