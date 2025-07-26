/* eslint-disable  @typescript-eslint/no-explicit-any */
"use server"
const access_key = process.env.UNSPLASH_ACCESS_KEY
export const SearchUnsplashImage = async(query:string):Promise<string[]>=>{
    const url = 'https://api.unsplash.com/search/collections?query='+query;
    const request = await fetch(url,{
          headers: {
    Authorization: 'Client-ID '+access_key,
  },
    });
    if(request.ok) {
        const response = await request.json();
        const results = response?.results 
        console.log(results.length)
        const urls = results.map((r:any, )=>{
            return r.cover_photo.urls.regular

        })
        return urls|| []
    }
    return []
}