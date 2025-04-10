export const graphqlRequest = async <T>(query: string, variables?: Record<string, any>): Promise<T> => {

    const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60},
    })    

    if(!res.ok){
        console.error(await res.text());
        throw new Error('GraphQL fetch failed');
    }

    const json = await res.json();
    return json.data;
}