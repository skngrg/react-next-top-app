import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from 'axios'
import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/topoage.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { withLayout } from "../../layout/Layout";
import { firstLeveMenu } from "../../helpers/helpers";

function Course({ menu, page, products }:CourseProps): JSX.Element {

    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for(const m of firstLeveMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find/', {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
    }

    return {
      paths,
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
    const firstCategoryItem = firstLeveMenu.find(m => m.route === params.type);
    if(!firstCategoryItem) {
        return {
            notFound: true
        };
    }
    try {
        const { data: page } = await axios.get<TopPageModel>(domain + '/api/top-page/byAlias/' + params.alias);
        const { data: menu } = await axios.post<MenuItem[]>(domain + '/api/top-page/find/', {
            firstCategory: firstCategoryItem.id
        });
        if (menu.length === 0) {
            return {
                notFound: true
            };
        }
        const { data: products } = await axios.post<ProductModel[]>(domain + '/api/product/find/', {
            category: page.category,
            limit: 10
        });
        return {
            props: {
                firstCategory: firstCategoryItem.id,
                page,
                menu,
                products
            }
        };
    } catch {
        return {
            notFound: true
        };
    }
};

interface CourseProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[]
}
