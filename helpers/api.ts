const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
    topPage: {
        find: domain + '/api/top-page/find/',
        byAlias: domain + '/api/top-page/byAlias/'
    },
    product: {
        find: domain + '/api/product/find/'
    },
    review: {
        createDemo: domain + '/api/review/create-demo/'
    }
}