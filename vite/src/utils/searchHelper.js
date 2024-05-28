export const searchHelper = (key, posts)=>{
    const searchKeyAsNumber = Number(key);
    const isNumberSearch = !isNaN(searchKeyAsNumber);
    return posts.map((post) => {
        const search = key.toLowerCase();
        const isMatch = post.location.toLowerCase().includes(search) || 
                        (isNumberSearch && (post.BHK === searchKeyAsNumber || 
                        post.price === searchKeyAsNumber));
                        
        post.visible = isMatch;
        return post;
    });
}