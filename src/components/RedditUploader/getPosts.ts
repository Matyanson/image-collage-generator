export type searchOptions = {
    subreddits: string[],
    keywords: string[],
    nsfw: boolean,
    count?: number
}

async function getPosts(baseUrl: string, options: searchOptions): Promise<any[]> {
    let { subreddits, keywords, nsfw, count = 10 } = options;

    if (subreddits.length == 0) subreddits = ['']; 
    if (keywords.length == 0) keywords = ['']; 

    baseUrl += baseUrl.includes('?') ? '&' : '?';
    const url = baseUrl+'include_over_18='+(nsfw ? 'on' : 'off');
    subreddits = subreddits.map(x => x.toLowerCase());
    keywords = keywords.map(x => x.toLowerCase());
    const limit = Math.min(count, 100);
    const posts = [];

    let data = await fetchReddit(`${url}&limit=${limit}`);
    let items = data.children;

    const filter = (item) => {
        let data = item.data;
        return subreddits.some(s => data.subreddit.toLowerCase().includes(s)) ||
        keywords.some(k => data.title.toLowerCase().includes(k))
    }

    for(let i = 0; i < items.length; i++) {
        if(filter(items[i]))
            posts.push(items[i].data);
    }
    let loadedCount = items.length;
    while(data?.after && loadedCount < count) {
        data = await fetchReddit(baseUrl+'&after='+data.after);
        items = data.children;

        for(let i = 0; i < items.length; i++) {
            if(filter(items[i]))
                posts.push(items[i].data);
        }
        loadedCount += items.length;
    }

    return posts;
}


async function fetchReddit(url: string) {
    try{
        console.log('fetch', url);
        const res = await fetch(url);
        if(res.status == 403) console.log("forbidden, don't forget to sign into reddit");
        console.log(res);
        const jsonData = await res.json();
        return jsonData.data;
    }catch(e){
        console.log(e);
    }
}

export default getPosts;