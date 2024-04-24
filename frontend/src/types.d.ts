type episode = {
    id: number,
    name: string,
    episode: string,
    air_date: string
}

type character = {
    id: number,
    name: string,
    status: string,
    species?: string,
    gender: string,
    image: string,
    episode?: episode[],
    created: string
}

type filter = {
    name?: string,
    gender?: string,
    page: number
}