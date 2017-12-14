# image-search
### A simple API service that can perform a search for images that are related to a given search phrase. 
---  
  
 Live: https://low-second.glitch.me/
  
**Promises:**  

 * You can get the image URLs, alt text and page urls for a set of images relating to a given search string.
 * You can paginate through the responses by adding a ?offset=2 parameter to the URL.
 * You can get a list of the most recently submitted search strings

**Examples calls:**
  
 * `https://low-second.glitch.me/api/cars`
 * `https://low-second.glitch.me/api/black%20box`
 * `https://low-second.glitch.me/api/cars?offset=5`

**View recent searches:**
 * `https://low-second.glitch.me/latest`

**Example output:**  
  
 ```json
 [ 
    { 
      "image-url":"http://images.fonearena.com/blog/wp-content/uploads/2011/04/NokiaE6_WHTE_FRT.jpg",  
      "alt-text":"Nokia E6-00 Official Photos",  
      "page-url":"http://www.fonearena.com/blog/35201/nokia-e6-00-official-photos.html"     
     },     
    { 
      "image-url":"https://i.blogs.es/b54f0b/nokia-1110/original.jpg",  
      "alt-text":"Nokia vuelve con tel&eacute;fonos y tablets Android de la mano de ...",  
      "page-url":"https://www.xataka.com/moviles/microsoft-vende-sus-telefonos-mas-sencillos-a-foxconn" 
     }
  ]
 ```
  

