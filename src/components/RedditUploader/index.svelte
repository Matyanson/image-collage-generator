<script lang="ts">
    import type { searchOptions } from "./getPosts";
    import getPosts from "./getPosts";
    import { images } from '../../store';

    let mode = 0;
    let customUrl = "";
    let subsStr = "";
    let keywordsStr = "";
    let username = "";
    let userCategories = ["upvoted", "posts"];
    let selectedCategory;
    let options: searchOptions;
    $: options = {
        subreddits: splitToItems(subsStr),
        keywords: splitToItems(keywordsStr),
        nsfw: true,
        count: 5
    }

    function parseUrl(): string {
        let res = 'https://www.reddit.com';
        switch(mode) {
            case 0: res += `/user/${username}/${selectedCategory}`; break;
            case 1: res += `/search/?q=${options.keywords.join(' ')}`; break;
            case 2: res = customUrl; break;
        }
        return res;
    }

    async function load() {
        let url = parseUrl();
        let parts = url.split(/\/\?|\?/);
        url = `${parts[0]}.json${parts[1] ? '?'+parts[1] : ''}`;
        if(mode == 1) options.keywords = [];
        const posts = await getPosts(url, options);

        for(let post of posts) {
            images.push({
                url: post?.url_overridden_by_dest ?? post?.url,
                name: post?.title
            });
        }
    }

    function splitToItems(s: string) {
        return s.split(/[ ,;]/).filter(lab => lab.trim().length > 0);
    }

</script>
<div class="redditSearch">
    <div class="head">
        <button on:click={() => mode = 0}>user</button>
        <button on:click={() => mode = 1}>search</button>
        <button on:click={() => mode = 2}>custom</button>
    </div>
    <div class="options">
        {#if mode == 2}
            url: <input type="text" bind:value={customUrl}><br>
        {:else}
            {#if mode == 0}
                username: u/<input type="text" bind:value={username}><br>
                category: 
                <select bind:value={selectedCategory}>
                    {#each userCategories as category}
                    <option value={category}>{category}</option>
                    {/each}
                </select><br>
            {/if}
            search: <input type="text" bind:value={keywordsStr} placeholder='keywords split by " ,;"'><br>
            subreddits: <input type="text" bind:value={subsStr} placeholder='keywords split by " ,;"'><br>
        {/if}
        count: <input type="number" bind:value={options.count}><br>
        nsfw: <input type="checkbox" bind:checked={options.nsfw}>
    </div>
    <button on:click={load}>load</button>
</div>