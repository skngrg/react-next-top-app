import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from 'axios'
import { MenuItem } from "../../interfaces/menu.interface";
import {TopPageModel} from "../../interfaces/topoage.interface";
import {ParsedUrlQuery} from "querystring";
import {ProductModel} from "../../interfaces/product.interface";
import {withLayout} from "../../layout/Layout";

const firstCategory = 0;

function Course({ menu, page, products }:CourseProps): JSX.Element {

    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find/', { firstCategory });

    return {
      paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
      fallback: true
  }
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return {
            notFound: true
        };
    }
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const { data: page } = await axios.get<TopPageModel>(domain + '/api/top-page/byAlias/' + params.alias);
    const { data: menu } = await axios.post<MenuItem[]>(domain + '/api/top-page/find/', {
        firstCategory
    });
    const { data: products } = await axios.post<ProductModel[]>(domain + '/api/product/find/', {
        category: page.category,
        limit: 10
    });
    return {
        props: {
            firstCategory,
            page,
            menu,
            products
        }
    };
};

interface CourseProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
    products: ProductModel[]
}
